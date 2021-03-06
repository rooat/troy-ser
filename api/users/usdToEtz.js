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
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		
		if(email && config.utils.IsEmail(email) && config.utils.IsNumber(amount)){
			let  user = await config.etzAdmin.findOne({where:{email:email}})
			let etzData = await config.priceData.findOne({where:{symbol:"ETZ"}});
			if( user && etzData){
				if(Number(user.usd_value)>=amount){
					let etzval = amount/Number(etzData.price_usd);
					let newUsd_values = Number(user.usd_value)-Number(amount);
					let newEtz_values = Number(user.etz_value)+Number(etzval);
					await config.etzAdmin.update({etz_value:newEtz_values,usd_value:newUsd_values},{where:{e_id:user.e_id}})
					await config.exchangeData.create({
						e_type:33,//11为usd兑换zc ，22为zc兑换etz ，33 usd兑换etz ， 44 zc兑换usd ,55,etz兑换usd
                        e_value:amount,
                        timestamps:new Date().getTime(),
                        user_id:user.e_id,
                        operate:1
					})
					return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS))
				}
				return res.send(config.utils.result_req(-1,"10011",config.tips[lan].BALANCE_INVALID))
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].LOGIN_PASS_EMAIL_ERROR))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));
	}catch(e){
		config.logger.error("usdToEtz",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	usdToEtz
}
