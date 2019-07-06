var config = require('../../config');

getNoticeList = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req)
		let lan = obj.lan;
		let page = obj.page;
		let pageSize = obj.pageSize;
		lan = config.utils.isLan(lan)
		page = config.utils.isPage(page)
		pageSize = config.utils.isPageSize(pageSize)

			let option = " where state=? ";
			let params = [0];
			let noticeArr = await config.utils.list_page(config," noticedata ",option,params,page,pageSize);
			return res.send({"resp":{"state":0,"datas":noticeArr}});

			
	}catch(e){
				config.logger.error("getNoticeList",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	getNoticeList
}
