var config = require('../../config');


makecode = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req)
		if(obj==null){
			return res.send(config.utils.result_req(-1,"10011","PARAMS ERROR"));
		}
		let email = obj.email_num;
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		if(config.utils.IsEmail(email)){
			let resCode = await config.getAsync(email+"emailcode");
			if(!resCode){
				await config.utils.sendCode(email,config);
				return res.send(config.utils.result_req(0,"10010",config.tips[lan].CHECK_EMAIL_CODE));
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].AFTER_60_SECONDs))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].EMAIL_IS_NOTEXIST));
	}catch(e){
		config.logger.error("makecode",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	makecode
}


