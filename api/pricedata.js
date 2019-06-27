var config = require('../config');

pricedata = async (req, res, next) => {
	try{
		let priceArr = await config.priceData.findAll();
		if(priceArr!=null && priceArr.length>0){
			return res.send({"resp":priceArr})
		}
		return res.send({"resp":null});
		
	}catch(e){
		console.log("e:",e)
		return res.send({"resp":null});
	}
	
}

module.exports = 
{
	pricedata
}
