var config = require('../../config');

getFinanceById = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let f_id = obj.f_id;
		let lan = obj.lan;
		if(f_id){
			let b_Data = await config.financeData.findOne({where:{e_id:f_id}})
			if(b_Data){
				return res.send(config.utils.result_req(0,"10010",b_Data))
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].DATA_NULL))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));

	}catch(e){
		config.logger.error("getFinanceById",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	getFinanceById
}
