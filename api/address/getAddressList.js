var config = require('../../config');

getAddressList = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		let lan = obj.lan;
		let page = obj.page;
		let pageSize = obj.pageSize;
		lan = config.utils.isLan(lan)
		page = config.utils.isPage(page)
		pageSize = config.utils.isPageSize(pageSize)

		let user_id = obj.user_id;
		if(user_id){
			let option = " where user_id=? ";
			let params = [user_id];
			let addressArr = await config.utils.list_page(config," addressdata ",option,params,page,pageSize);
			return res.send(config.utils.result_req(0,"10010",addressArr));
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));;
	}catch(e){
		config.logger.error("getAddressList",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR));
	}
	
}

module.exports = 
{
	getAddressList
}
