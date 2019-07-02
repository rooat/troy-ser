var config = require('../../config');

logOut = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req);
		if(!obj){
			return res.send(config.utils.result_req(-1,"10011","params invalid"));
		}
		let token = obj.token;
		
		let sessionId = config.utils.md5(JSON.stringify(req.cookies))
		let keysuser = await config.getAsync(sessionId);
		if(!keysuser){
			return res.send(config.utils.result_req(-1,"10011","please login"))
		}

		let keys = config.utils.md5(keysuser.split(",").join(""));
		if(token==keys){
			await config.expireAsync(sessionId,0);
			delete req.session.user;
			return res.send(config.utils.result_req(0,"10010","success"))
		}
		return res.send(config.utils.result_req(-2,"10011","token invalid"));
			
	}catch(e){
		config.logger.error("addAddress",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	logOut
}