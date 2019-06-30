var config = require('../../config');

isExistUser = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req)
		let email = obj.email_num;
		if(config.utils.IsEmail(email)){
			let resss = await config.utils.isExistEmail(config,email);
			if(resss){
				return res.send({"resp":{"state":0,"datas":"email is existed"}})
			}else{
				return res.send({"resp":{"state":-1,"datas":"email is Non-existent"}})
			}		
		}
		return res.send({"resp":{"state":-1,"datas":"email invalid"}})
	}catch(e){
		console.log(e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	isExistUser
}
