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

		email = email.trim();
		old_login_pwd = old_login_pwd.trim();
		new_login_pwd = new_login_pwd.trim();

		if(email_code==''){
			return res.send({"resp":{"state":0,"datas":"code invalid"}})
		}
		let newCode = await config.getAsync(email);
		let currentCode = config.utils.md5(String(email_code));
		if(currentCode!=newCode){
			return res.send({"resp":{"state":0,"datas":"code invalid"}})
		}

		if(old_login_pwd.length<6 || new_login_pwd.length<6){
			return res.send({"resp":{"state":-1,"datas":"length>=6"}})
		}


		if(config.utils.IsEmail(email) ){
			let old_pwds = config.utils.md5(old_login_pwd)
			let user = await config.etzAdmin.findOne({where:{email:email,login_pwd_origin:old_pwds}})
			if(user){
				let login_pwds = config.utils.md5(new_login_pwd);
	  			await config.etzAdmin.update({
	  				login_pwd_origin:login_pwds,
	  			},{where:{e_id:user.e_id}})
	  			delete req.session.user;
				return res.send({"resp":{"state":0,"datas":"success"}});
			}
		}
		return res.send({"resp":{"state":-1,"datas":"email invalid"}});
	}catch(e){
		config.logger.error("addAddress",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	updateLoginPwd
}
