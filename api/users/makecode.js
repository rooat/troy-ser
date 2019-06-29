var config = require('../../config');


makecode = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req)
		if(obj==null){
			return res.send({"resp":{"state":-1,"datas":"params is null"}});
		}
		let email = obj.email_num;
		if(config.utils.IsEmail(email)){
			let resCode = await config.getAsync(email);
			if(!resCode){
				await config.utils.sendCode(email,config);
				return res.send({"resp":{"state":0,"datas":"check your email"}});
			}
			return res.send({"resp":{"state":-1,"datas":"try a again after 60 seconds !"}})
		}
		return res.send({"resp":{"state":-1,"datas":"email invalid"}});
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	makecode
}


