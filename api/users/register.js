var config = require('../../config');

register = async (req, res, next) => {
	try{
		let obj = config.isLogin.getObjParams(req)
		if(obj==null){
			return res.send({"resp":{"state":-1,"datas":"params is null"}});
		}
		let email = obj.email_num;
		let email_code = obj.code;
		let login_pwd = obj.loginpwd;
		let trade_pwd = obj.tradepwd;
		let invite_num = obj.invite;

		if(!config.utils.IsEmail(email) ||email_code.length<6 || login_pwd.length<6 ||trade_pwd.length<6 || invite_num.length<6){
			return res.send({'resp':{"state":-1,"datas":"params invalid"}});
		}
		if(login_pwd==trade_pwd){
			return res.send({"resp":{"state":-1,"datas":"login password different from trade password"}})
		}
		let coder = await config.getAsync(email)
		let currentCode = config.utils.md5(email_code);
		
		let invitor = await config.etzAdmin.findOne({where:{"invite2_code":invite_num}});
		if(invitor){
			let login_pwds = config.utils.md5(login_pwd);
	  		let trade_pwds = config.utils.md5(trade_pwd);
			let account =await config.utils.createAccount();
			console.log("account:",account)
			if(account){
		  		await config.etzAdmin.create({
		  			role:0,
		  			user_type:0,
		  			email:email,
		  			trade_pwd_origin:trade_pwds,
		  			login_pwd_origin:login_pwds,
		  			invite_code:invite_num,
		  			invite2_code:parseInt(Math.random()*1000000),
		            etz_value:0,
		            usd_value:0,
		            last_login_time:"0000-00-00",
		            last_login_ip:"0.0.0.0",
		            regist_time:config.utils.getFullTime(),
		            update_time:config.utils.getFullTime(),
		            address:account.address,
		            isInveted:0,
		            node_member:0,
		            isNew:0,
		            totalInvetDay:0,//当天个人总定投
	                totalStaticBenefit:0,//累计总静态收益
	                staticBenefitDay:0,//当天个人总静态收益
	                teamMember:0,
	                teamInvet:0,
	                type_1_total:0,//类型1总定投
	                type_2_total:0,//类型2总定投
	                type_3_total:0,//类型3总定投
	                type_4_total:0,//类型4总定投
	                iscalculte:0
	                
		  		})
	             let data = {
	              privates: account.privates,
	              path: account.path,
	              address: account.address,
	              mnemonic: account.mnemonic,
	              timestamps:new Date().getTime(),
	              endtime:0,
	              state:0,
	              valuex:0
	            } 
	           await config.etzUser.create(data);
	           global.newUser.state=true;
	            
	           return res.send({"resp":{"state":0,"datas":"success"}});
	          
	  		}else{
	  			return res.send({"resp":{"state":-1,"datas":"invalid create account"}})
	  		}
		}else{
			return res.send({"resp":{"state":-1,"datas":"invite invalid"}})
		}

	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	register
}
