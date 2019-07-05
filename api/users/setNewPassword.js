var config = require('../../config');

setNewPassword = async (req, res, next) => {
	try{
		
		let obj = config.utils.getObjParams(req);
		if(!obj){
			return res.send(config.utils.result_req(-1,"10011","Params error"));
		}

		let email = obj.email_num;
		let new_password = obj.password;
		let email_code = obj.code;
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		if(email &&new_password &&email_code ){
			let newCode = await config.getAsync(email+"emailcode");
			let currentCode = config.utils.md5(String(email_code));
			if(currentCode==newCode){
				if( new_password.length>=6){
					let login_pwd = config.utils.md5(new_password)
					let user = await config.etzAdmin.findOne({where:{email:email}})
					if(user){
						await config.etzAdmin.update({login_pwd_origin:login_pwd},{where:{e_id:user.e_id}});
						return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS))
					}
					return res.send(config.utils.result_req(-1,"10011",config.tips[lan].EMAIL_IS_NOTEXIST))
				}
				return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PASSWORD_LEN_ERROR))
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].EMAIL_CODE_ERROR))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));
	}catch(e){
		config.logger.error("setNewPassword",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	setNewPassword
}
