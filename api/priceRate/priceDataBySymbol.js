var config = require('../../config');

priceDataBySymbol = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req);
		if(!obj){
			return res.send(config.utils.result_req(-1,"10011","params invalid"));
		}
		let symbol = obj.symbol;
		if(symbol!=null&&symbol.length>0){
			let priceDatas = await config.priceData.findOne({where:{symbol:symbol}});
			if(priceDatas){
				return res.send(config.utils.result_req(0,"10010",priceDatas))
			}
			return res.send(config.utils.result_req(-1,"10011","data is null"));
		}
		return res.send(config.utils.result_req(-1,"10011","params invlaid"));
		
	}catch(e){
				config.logger.error("priceDataBySymbol",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	priceDataBySymbol
}
