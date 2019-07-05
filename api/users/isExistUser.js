var config = require('../../config');

isExistUser = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req)
		let email = obj.email_num;
		let lan = obj.lan;
		if(config.utils.IsEmail(email)){
			let resss = await config.utils.isExistEmail(config,email);
			if(resss){
				return res.send(config.utils.result_req(0,"10010",config.tips[lan].EMAIL_IS_EXIST))
			}		
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].EMAIL_IS_NOTEXIST))
	}catch(e){
		config.logger.error("isExistUser",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	isExistUser
}
