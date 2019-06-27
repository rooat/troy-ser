var config = require('../../config');

logOut = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req);
		if(!obj){
			return res.send({"resp":{"state":-1,"datas":"params invalid"}});
		}
		let token = obj.token;
		
		let sessionId = config.utils.md5(JSON.stringify(req.cookies))
		let keysuser = await config.getAsync(sessionId);
		if(!keysuser){
			return res.send({"resp":{"state":-1,"datas":"please login"}})
		}

		let keys = config.utils.md5(keysuser.split(",").join(""));
		if(token==keys){
			await config.expireAsync(sessionId,0);
			return res.send({"resp":{"state":0,"datas":"success"}})
		}
		return res.send({"resp":{"state":-1,"datas":"token invalid"}});
			
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	logOut
}