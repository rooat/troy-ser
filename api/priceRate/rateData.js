var config = require('../../config');

rateData = async (req, res, next) => {
	try{
		let rateArr = await config.rateData.findAll();
		if(rateArr!=null && rateArr.length>0){
			return res.send(config.utils.result_req(0,"10010",rateArr))
		}
		return res.send(config.utils.result_req(-1,"10011","data is null"))
		
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	rateData
}
