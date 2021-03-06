var config = require('../../config');

register = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req)
		if(obj==null){
			return res.send({"resp":{"state":-1,"datas":"params is null"}});
		}
		let email = obj.email_num;
		let email_code = obj.code;
		let login_pwd = obj.loginpwd;
		let trade_pwd = obj.tradepwd;
		let invite_num = obj.invite;
		let lan = obj.lan
		if(!lan){
			lan = global.lan;
		}

		if(email&&email_code&&login_pwd&&trade_pwd&&invite_num&&config.utils.IsEmail(email)){
			if(login_pwd==trade_pwd){
				return res.send(config.utils.result_req(-1,"10011",config.tips[lan].LOGIN_TEADE_PASSWORD_ERROR))
			}
			if(String(login_pwd).length>=6 && String(trade_pwd).length>=6){
				let coder = await config.getAsync(email+"emailcode")
				let currentCode = config.utils.md5(email_code);
				if(coder&&coder==currentCode){
					let invitor = await config.etzAdmin.findOne({where:{"invite2_code":invite_num}});
					let users = await config.etzAdmin.findOne({where:{email:email}});
					if(users){
						return res.send(config.utils.result_req(-1,"10011",config.tips[lan].EMAIL_IS_EXIST))
					}
					if(invitor){
						let login_pwds = config.utils.md5(login_pwd);
				  		let trade_pwds = config.utils.md5(trade_pwd);
						let account =await config.utils.createAccount();
						if(account){
							let invit_code = await config.utils.makeInviteCode(config,email)
							await config.etzAdmin.create({
						  			role:0,
						  			user_type:0,
						  			email:email,
						  			trade_pwd_origin:trade_pwds,
						  			login_pwd_origin:login_pwds,
						  			invite_code:invite_num,
						  			invite2_code:invit_code,
						            etz_value:0,
						            usd_value:0,
						            lock_values:0,
						            last_login_time:"0",
						            last_login_ip:"0.0.0.0",
						            regist_time:new Date().getTime(),
						            update_time:new Date().getTime(),
						            address:account.address,
						            isInveted:0,
						            node_member:0,
						            isNew:1,//新用户
						            totalInvetDay:0,//当天个人总定投
					                benefitBalance:0,//当前总收益（包含静态和动态）
					                totalBenefit:0,//累计收益，包含已经提现和未提现
					                totalStaticBenefit:0,//当前有效静态收益
					                staticBenefitBalance:0,//累计静态收益
					                staticBenefitDay:0,//当天个人总静态收益
					                teamMember:0,//团队总人数
					                directMember:0,//直推人数
					                teamInvet:0,//团队总投资
					                type_1_total:0,//类型1总定投
					                type_2_total:0,//类型2总定投
					                type_3_total:0,//类型3总定投
					                type_4_total:0,//类型4总定投
					                iscalculte:0,
					                nick_name:'hello',
					                state:0,
					                totalInvet:0//个人累计总定投
					                
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
					            
					           return res.send(config.utils.result_req(0,"10010",config.tips[lan].REGIST_SUCCESS));
						}
						return res.send(config.utils.result_req(-1,"10011",config.tips[lan].CREATE_ACCOUNT_ERROR))
					}
					return res.send(config.utils.result_req(-1,"10011",config.tips[lan].INVITE_ERROR))
				}
				return res.send(config.utils.result_req(-1,"10011",config.tips[lan].EMAIL_CODE_ERROR));
			}
			return res.send(config.utils,result_req(-1,"10011",config.tips[lan].PASSWORD_LEN_ERROR))
		}
		
		
	}catch(e){
		console.log(e)
		config.logger.error("register",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	register
}
