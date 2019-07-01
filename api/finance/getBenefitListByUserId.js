var config = require('../../config');

getBenefitListByUserId = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;

		
		let userId = obj.user_id;
		if(userId){
			let b_Data = await config.benefitData.findAll({where:{user_id:userId}})
			if(b_Data && b_Data.length>0){
				return res.send(config.utils.result_req(0,"10010",b_Data))
			}
			return res.send(config.utils.result_req(-1,"10011","data is null"))
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"))		
	}catch(e){
		config.logger.error("getBenefitListByUserId",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	getBenefitListByUserId
}
