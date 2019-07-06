var config = require('../../config');
var utils = require('./utils')

getBenefitListByUserId = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let userId = obj.user_id;

		let lan = obj.lan;
		let page = obj.page;
		let pageSize = obj.pageSize;
		lan = config.utils.isLan(lan)
		page = config.utils.isPage(page)
		pageSize = config.utils.isPageSize(pageSize)

		if(userId){
			let b_Data = await utils.list_benefit_by_user_id(userId,page,pageSize)
			return res.send(config.utils.result_req(0,"10010",b_Data))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));		
	}catch(e){
		config.logger.error("getBenefitListByUserId",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}




module.exports = 
{
	getBenefitListByUserId
}
