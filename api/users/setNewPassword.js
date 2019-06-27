var config = require('../../config');

setNewPassword = async (req, res, next) => {
	try{
		
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;

		let email = obj.email_num;
		let address = obj.address;
		let new_password = obj.password;
		let email_code = obj.code;
		email = email.trim();
		address = address.trim();
		new_password = new_password.trim();

		let newCode = await config.getAsync(email);
		let currentCode = config.utils.md5(String(email_code));
		if(currentCode!=newCode){
			return res.send({"resp":{"state":-1,"datas":"code invalid"}})
		}

		if( new_password.length>=6){
			let login_pwd = config.utils.md5(new_password)
			let user = await config.etzAdmin.findOne({where:{email:email,address:address}})
			if(user){
				await config.etzAdmin.update({login_pwd_origin:login_pwd},{where:{e_id:user.e_id}});
				return res.send({"resp":{"state":0,"datas":"success"}})
			}
		}
		return res.send({"resp":{"state":-1,"datas":"params invalid"}});
	}catch(e){
		console.log(e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	setNewPassword
}
