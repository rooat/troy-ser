var config = require('../../config');
redeem = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let f_id = obj.f_id;
		let email = obj.email_num;
		let password = obj.trade_pwd;
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		if(
			f_id && email && password&& config.utils.IsEmail(email)){
			let finance = await config.financeData.findOne({where:{e_id:f_id,state:{$in:[1,2]}}})
			if(finance){
				let current = new Date().getTime();
					let userId = finance.user_id;
					let pwd = config.utils.md5(password);
					let user = await config.etzAdmin.findOne({where:{e_id:userId,email:email,trade_pwd_origin:pwd}})
					if(user){
						let fin_value = finance.f_value;
						if(current<Number(finance.f_finance_time)){
							let penalty = Number(finance.f_value)*0.1;
							fin_value = Number(fin_value)-penalty
						}

						let origin_value = user.usd_value;
						origin_value = Number(origin_value)+ Number(fin_value);
						 await config.etzAdmin.update({usd_value:origin_value},{where:{e_id:user.e_id}})
						 await config.financeData.update({state:3,end_time:new Date().getTime(),get_value:fin_value},{where:{e_id:finance.e_id}})
						return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS))
					}
					return res.send(config.utils.result_req(-1,"10011",config.tips[lan].LOGIN_PASS_EMAIL_ERROR)) 
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));
	}catch(e){
		config.logger.error("redeem",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	redeem
}
