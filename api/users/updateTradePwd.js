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
		let login_pwd = obj.login_pwd;
		let old_trade_pwd = obj.old_trade_pwd;
		let new_trade_pwd = obj.new_trade_pwd;

		console.log()
		if(email_code==''){
			return res.send({"resp":{"state":0,"datas":"code invalid"}})
		}

		if(login_pwd.length<6 || old_trade_pwd.length<6 || new_trade_pwd.length<6){
			return res.send({"resp":{"state":-1,"datas":"params invalid"}})
		}
		if(config.utils.IsEmail(email) ){
			let login = config.utils.md5(login_pwd)
			let old_trade = config.utils.md5(old_trade_pwd)
			let new_trade = config.utils.md5(new_trade_pwd)

			let user = await config.etzAdmin.findOne({where:{email:email,login_pwd_origin:login,trade_pwd_origin:old_trade}})
			console.log(user)
			if(user){
	  			await config.etzAdmin.update({
	  				trade_pwd_origin:new_trade
	  			},{where:{e_id:user.e_id}})
				return res.send({"resp":{"state":0,"datas":"success"}});
			}else{
				return res.send({"resp":{"state":-1,"datas":"params invalid or null"}});
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
	updateTradePwd
}
