var config = require('../../config');

usdToZc = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let email = obj.email_num;
		let amount = obj.trans_amount;

		if(config.utils.IsEmail(email) && config.utils.IsNumber(amount)){
			let  user = await config.etzAdmin.findOne({where:{email:email}})
			let zcData = await config.priceData.findOne({where:{symbol:"ZC"}});
			
			if(user  &&zcData){ //etz ===> usd
				if(Number(user.totalStaticBenefit)>=amount){
					let trans_amount_zc = Number(amount)/Number(zcData.price_usd);
					let newUsd_value = Number(user.usd_value)-Number(amount);
					let newZc_value = Number(user.totalStaticBenefit)+Number(trans_amount_zc)
					await config.etzAdmin.update({usd_value:newUsd_value,totalStaticBenefit:newZc_value},{where:{e_id:user.e_id}})
					await config.benefitData.create({
			                b_type:11,
			                b_value:trans_amount_zc,
			                b_type_f:3,
			                timestamps:new Date(config.utils.getTimeDate()).getTime(),
			                user_id:user.e_id,
			                f_id:0,
			                operate:0
			          })
					return res.send(config.utils.result_req(0,"10010","success"))
				}
				return res.send(config.utils.result_req(-1,"10011","balance invalid"))
			}
			return res.send(config.utils.result_req(-1,"10011","email invalid"))
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"))
	}catch(e){
		console.log(e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	usdToZc
}