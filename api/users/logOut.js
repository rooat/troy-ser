var config = require('../../config');

logOut = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req);
		if(!obj){
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));;
		}
		let token = obj.token;
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		console.log("token---",token)
		let keysuser =await config.getAsync(token);
		console.log("keysuser::::",keysuser)
		if(keysuser){
			let keys = config.utils.md5(keysuser);
			console.log("keys----",keys)
			if(token==keys||!token){
				//let sessionId = config.utils.md5(JSON.stringify(req.cookies))
				await config.expireAsync(token,0);
				//await config.expireAsync(sessionId,0)
				return res.send(config.utils.result_req(0,"10010",config.tips[lan].LOGOUT_SUCCESS))
			}
		}
		return res.send(config.utils.result_req(-2,"10011",config.tips[lan].TOKEN_INVALID));
			
	}catch(e){
		config.logger.error("logOut",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	logOut
}