var config = require('../../config');

var examineList = async (req, res, next) => {
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
		let page = obj.page;
		let pageSize = obj.pageSize;
		lan = config.utils.isLan(lan)
		page = config.utils.isPage(page)
		pageSize = config.utils.isPageSize(pageSize)

		let datas = await config.utils.list_page(config," examinedata ","",[],page,pageSize);
		return res.send(config.utils.result_req(0,"10010",datas));
		
	}catch(e){
		config.logger.error("examineList",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR));
	}
	
}

module.exports = 
{
	examineList
}
