var config = require('../../config');

getFinanceById = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let f_id = obj.f_id;
		if(f_id){
			let b_Data = await config.financeData.findOne({where:{e_id:f_id}})
			if(b_Data){
				return res.send(config.utils.result_req(0,"10010",b_Data))
			}
			return res.send(config.utils.result_req(-1,"10011","data is null"))
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"))

	}catch(e){
		config.logger.error("getFinanceById",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	getFinanceById
}
