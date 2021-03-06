var config = require('../../config');

rateData = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req)
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		let rateArr = await config.rateData.findAll();
		if(rateArr!=null && rateArr.length>0){
			return res.send(config.utils.result_req(0,"10010",rateArr))
		}
		return res.send(config.utils.result_req(-1,"10011","data is null"))
		
	}catch(e){
				config.logger.error("rateData",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	rateData
}
