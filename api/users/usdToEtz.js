var config = require('../../config');

usdToEtz = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let email = obj.email_num;
		let amount = obj.trans_amount;
		if(email && config.utils.IsEmail(email) && config.utils.IsNumber(amount)){
			let  user = await config.etzAdmin.findOne({where:{email:email}})
			let etzData = await config.priceData.findOne({where:{symbol:"ETZ"}});
			if( user && etzData){
				if(Number(user.usd_value)>=amount){
					let etzval = amount/Number(etzData.price_usd);
					let newUsd_values = Number(user.usd_value)-Number(amount);
					let newEtz_values = Number(user.etz_value)+Number(etzval);
					await config.etzAdmin.update({etz_value:newEtz_values,usd_value:newUsd_values},{where:{e_id:user.e_id}})
					return res.send({"resp":config.utils.result_req(0,"10010","success")})
				}else{
					return res.send({"resp":config.utils.result_req(-1,"10011","balance invalid")})
				}
			}else{
				return res.send({"resp":config.utils.result_req(-1,"10011","email is not exist")})
			}
		}
		return res.send({"resp":config.utils.result_req(-1,"10011","params invalid")})
	}catch(e){
		console.log(e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	usdToEtz
}
