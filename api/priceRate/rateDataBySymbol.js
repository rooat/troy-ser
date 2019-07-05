var config = require('../../config');

rateDataBySymbol = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req);
		if(!obj){
			return res.send(config.utils.result_req(-1,"10011","params error"));;
		}
		let symbol = obj.symbol;
		if(symbol!=null&&symbol.length>0){
			let rateDatas = await config.rateData.findOne({where:{code:symbol}});
			if(rateDatas){
				return res.send(config.utils.result_req(0,"10010",rateDatas))
			}
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].DATA_NULL));
		
	}catch(e){
				config.logger.error("rateDataBySymbol",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	rateDataBySymbol
}
