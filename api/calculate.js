var config = require('../config');

calculate = async (req, res, next) => {
	try{
		global.calculateStart = true;
		return res.send({"resp":{"state":0}});
		
	}catch(e){
		console.log("e:",e)
		return res.send({"resp":{"state":-1}});
	}
	
}

module.exports = 
{
	calculate
}
