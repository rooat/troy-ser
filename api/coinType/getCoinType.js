var config = require('../../config');

getCoinType = async (req, res, next) => {
	try{
		let coinData = await config.coinTypeData.findAll({where:{state:0}});
		if(coinData && coinData.length>0){
			return res.send(config.utils.result_req(0,"10010",coinData));
		}				
		return res.send(config.utils.result_req(-1,"10011","data is null"));
	}catch(e){
		config.logger.error("getCoinType",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"));
	}
	
}

module.exports = 
{
	getCoinType
}
