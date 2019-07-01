var config = require('../config');

calculate = async (req, res, next) => {
	try{
		global.calculateStart = true;
		return res.send({"resp":{"state":0}});
		
	}catch(e){
		config.logger.error("addAddress",config.utils.getFullTime(),e)
		return res.send({"resp":{"state":-1}});
	}
	
}

module.exports = 
{
	calculate
}
