
var config = require('../../config');
var utils = require('./utils')

superNodeBenefitByUserId = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		let user_id = obj.user_id;

		let lan = obj.lan;
		let page = obj.page;
		let pageSize = obj.pageSize;
		lan = config.utils.isLan(lan)
		page = config.utils.isPage(page)
		pageSize = config.utils.isPageSize(pageSize)

		if(user_id){
			let datas = await utils.node_beneift_list(page,pageSize,user_id,2)
			return res.send(config.utils.result_req(0,"10010",datas))
		}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));	
	}catch(e){
		config.logger.error("superNodeBenefitByUserId",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	superNodeBenefitByUserId
}