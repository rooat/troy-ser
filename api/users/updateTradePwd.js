var config = require('../../config');

updateTradePwd = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let email = obj.email_num;
		let email_code = obj.code;
		let old_trade_pwd = obj.old_trade_pwd;
		let new_trade_pwd = obj.new_trade_pwd;
		let lan = obj.lan;
		if(email && email_code&&old_trade_pwd&&new_trade_pwd&&config.utils.IsEmail(email)){
			let newCode = await config.getAsync(email);
			let currentCode = config.utils.md5(String(email_code));
			if(currentCode==newCode){
				if(old_trade_pwd.length>=6 && new_trade_pwd.length>=6){
					
						let old_trade = config.utils.md5(old_trade_pwd)
						let new_trade = config.utils.md5(new_trade_pwd)
						let user = await config.etzAdmin.findOne({where:{email:email,trade_pwd_origin:old_trade}})
						if(user){
				  			await config.etzAdmin.update({
				  				trade_pwd_origin:new_trade
				  			},{where:{e_id:user.e_id}})
							return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS))
						}
					return res.send(config.utils.result_req(0,"10010",config.tips[lan].EMAIL_IS_NOTEXIST))
				}
				return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PASSWORD_LEN_ERROR))
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].EMAIL_CODE_ERROR))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));

	}catch(e){
		config.logger.error("updateTradePwd",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	updateTradePwd
}
