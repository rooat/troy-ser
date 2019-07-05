var config = require('../../config');

loginUser = async (req, res, next) => {
	// console.log('res==',res)
	try{
		
		let obj = config.utils.getObjParams(req);
		if(!obj){
			return res.send({"resp":{"state":-1,"datas":"params invalid"}});
		}
		let email = obj.email_num;
		let login_pwd = obj.login_pwd;

		if(config.utils.IsEmail(email)&& login_pwd.length>=6){
			let pwd = config.utils.md5(login_pwd)
			let user = await config.etzAdmin.findOne({where:{email:email,login_pwd_origin:pwd}})
			if(user){
				await config.etzAdmin.update({last_login_time:new Date().getTime()},{where:{e_id:user.e_id}})
				let rand = parseInt(Math.random()*100000);
				let key = config.utils.md5(email+pwd+rand+user.role)
				await config.setAsync(key,email+","+pwd+","+rand+","+user.role)
				await config.expireAsync(key,3110400);
				resetEmailMap(email,rand)

				return res.send({"resp":{"state":0,"datas":{"token":key}}});
			}
			return res.send(config.utils.result_req(-1,"10011","email or password invalid"))
		}
		return res.send({"resp":{"state":-1,"datas":"failure"}});
	}catch(e){
		config.logger.error("loginUser",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
}

function resetEmailMap(email,rand){
	global.sessionMap.set(email,rand)
}

module.exports = 
{
	loginUser
}
