var config = require('../../config');

priceData = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req)
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		let priceArr = await config.priceData.findAll();
		
		if(priceArr && priceArr.length>0){
			return res.send(config.utils.result_req(0,"10010",priceArr))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].DATA_NULL));
		
	}catch(e){
				config.logger.error("priceData",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	priceData
}
