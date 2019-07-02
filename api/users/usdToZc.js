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
				if(Number(user.benefitBalance)>=amount){
					let trans_amount_zc = Number(amount)/Number(zcData.price_usd);
					let newUsd_value = Number(user.usd_value)-Number(amount);
					let newZc_value = Number(user.benefitBalance)+Number(trans_amount_zc)
					await config.etzAdmin.update({usd_value:newUsd_value,benefitBalance:newZc_value},{where:{e_id:user.e_id}})
					await config.exchangeData.create({
						e_type:11,//11为usd兑换zc ，22为zc兑换etz ，33 usd兑换etz ， 44 zc兑换usd ,55,etz兑换usd
                        e_value:amount,
                        timestamps:new Date().getTime(),
                        user_id:user.e_id,
                        operate:1
					})
					return res.send(config.utils.result_req(0,"10010","success"))
				}
				return res.send(config.utils.result_req(-1,"10011","balance invalid"))
			}
			return res.send(config.utils.result_req(-1,"10011","email invalid"))
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"))
	}catch(e){
		config.logger.error("usdToZc",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	usdToZc
}