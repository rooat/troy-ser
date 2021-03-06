var config = require('../../config');

zcToUsd = async (req, res, next) => {
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
		if(config.utils.IsEmail(email) && config.utils.IsNumber(amount)){
			let  user = await config.etzAdmin.findOne({where:{email:email}})
			let zcData = await config.priceData.findOne({where:{symbol:"ZC"}});
			
			if(user && etzData &&zcData){ //etz ===> usd
				if(Number(user.totalStaticBenefit)>=amount){
					let trans_amount_usd = Number(zcData.price_usd) * amount;
					let newUsd_value = Number(user.usd_value)+Number(trans_amount_usd);
					let newZc_value = Number(user.totalStaticBenefit)-Number(amount)
					await config.etzAdmin.update({usd_value:newUsd_value,totalStaticBenefit:newZc_value},{where:{e_id:user.e_id}})
					await config.exchangeData.create({
						e_type:22,//11为usd兑换zc ，22为zc兑换etz ，33 usd兑换etz ， 44 zc兑换usd ,55,etz兑换usd
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
		config.logger.error("zcToUsd",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	zcToUsd
}