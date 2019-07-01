var config = require('../../config');

getUser = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;

		
		let email = obj.email_num;
		
		if(email && config.utils.IsEmail(email)){
			let user = await config.etzAdmin.findOne({where:{email:email}})
			if(user){
				let newUser = {
					"type":user.user_type,
					"role":user.role,
					"email":user.email,
					"invited_code":user.invite_code,
					"my_code":user.invite2_code,
					"etz_value":user.etz_value,
					"usd_value":user.usd_value,
					"lock_values":user.lock_values,
					"login_time":user.last_login_time,
					"regist_time":user.regist_time,
					"address":user.address,
					"isNew":user.isNew,
					"totalInvetDay":user.totalInvetDay,
					"totalStaticBenefit":user.benefitBalance,
					"staticBenefitDay":user.staticBenefitDay,
					"teamMember":user.teamMember,
					"teamInvet":user.teamInvet,
					"id":user.e_id
				}
				return res.send(config.utils.result_req(0,"10010",newUser));
			}
			return res.send(config.utils.result_req(-1,"10011","email not existed"))
		}
		return res.send(config.utils.result_req(-1,"10011","email invalid"));
	}catch(e){
				config.logger.error("getUser",config.utils.getFullTime(),e)

		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}


module.exports = 
{
	getUser
}
