var config = require('../../config');

updateNickName = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		let lan = obj.lan;
		let email = obj.email_num;
		let nick_name = obj.username;
		if(!lan){
			lan = global.lan;
		}

		if(nick_name&&config.utils.IsEmail(email)){
			let user = await config.etzAdmin.findOne({where:{email:email}})
			if(user){
				await config.etzAdmin.update({nick_name:nick_name},{where:{e_id:user.e_id}});
				return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS))
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].EMAIL_IS_NOTEXIST))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR))

	}catch(e){
		config.logger.error("isExistUser",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	updateNickName
}
