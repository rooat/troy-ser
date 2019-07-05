var config = require('../../config');

priceDataBySymbol = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req);
		if(!obj){
			return res.send(config.utils.result_req(-1,"10011","params error"));;
		}
		let symbol = obj.symbol;
		if(symbol!=null&&symbol.length>0){
			let priceDatas = await config.priceData.findOne({where:{symbol:symbol}});
			if(priceDatas){
				return res.send(config.utils.result_req(0,"10010",priceDatas))
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].DATA_NULL));
		}
		return res.send(config.utils.result_req(-1,"10011","params invlaid"));
		
	}catch(e){
				config.logger.error("priceDataBySymbol",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	priceDataBySymbol
}
