var config = require('../../config');

updateLoginPwd = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let email = obj.email_num;
		let email_code =obj.code;
		let old_login_pwd = obj.old_login_pwd;
		let new_login_pwd = obj.new_login_pwd;
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		if(email && email_code&&old_login_pwd&&new_login_pwd&&config.utils.IsEmail(email)){
			let newCode = await config.getAsync(email);
			let currentCode = config.utils.md5(String(email_code));
			if(currentCode==newCode){
				if(old_login_pwd.length>=6 && new_login_pwd.length>=6){
					
						let old_pwds = config.utils.md5(old_login_pwd)
						let user = await config.etzAdmin.findOne({where:{email:email,login_pwd_origin:old_pwds}})
						if(user){
							let login_pwds = config.utils.md5(new_login_pwd);
				  			await config.etzAdmin.update({
				  				login_pwd_origin:login_pwds,
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
		config.logger.error("updateLoginPwd",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	updateLoginPwd
}
