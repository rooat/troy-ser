var config = require('../../config');

calculate = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);

		if(obj.type==-1){
			if(obj.role<1){
				return res.send(config.utils.result_req(-1,"10011","Not administrator"))
			}
			return res.send(obj.data);
		}
		obj = obj.data;
		let lan = obj.lan;
		
		global.calculateStart = true;
		return res.send(config.utils.result_req(0,"10010",config.tips[lan].START_CALCULATE));
		
	}catch(e){
		config.logger.error("calculate",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR));
	}
	
}

module.exports = 
{
	calculate
}
