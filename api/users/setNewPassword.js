var config = require('../../config');

setNewPassword = async (req, res, next) => {
	try{
		
		let obj = config.utils.getObjParams(req);
		if(!obj){
			return res.send(config.utils.result_req(-1,"10011","params invalid"));
		}

		let email = obj.email_num;
		let new_password = obj.password;
		let email_code = obj.code;

		let newCode = await config.getAsync(email+"emailcode");
		let currentCode = config.utils.md5(String(email_code));
		if(currentCode!=newCode){
			return res.send({"resp":{"state":-1,"datas":"code invalid"}})
		}

		if( new_password.length>=6){
			let login_pwd = config.utils.md5(new_password)
			let user = await config.etzAdmin.findOne({where:{email:email}})
			if(user){
				await config.etzAdmin.update({login_pwd_origin:login_pwd},{where:{e_id:user.e_id}});
				return res.send({"resp":{"state":0,"datas":"success"}})
			}
			return res.send(config.utils.result_req(-1,"10011","email not existed"));
		}
		return res.send({"resp":{"state":-1,"datas":"params invalid"}});
	}catch(e){
		config.logger.error("setNewPassword",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	setNewPassword
}
