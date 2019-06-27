var config = require('../../config');

calculate = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req);
		if(!obj){
			return res.send(config.utils.result_req(-1,"10011","params invalid"));
		}
		global.calculateStart = true;
		return res.send(config.utils.result_req(0,"10010","calculate started"));
		
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"));
	}
	
}

module.exports = 
{
	calculate
}
