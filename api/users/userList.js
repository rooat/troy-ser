var config = require('../../config');

userList = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			if(obj.role<1){
				return res.send(config.utils.result_req(-1,"10011","Not an administrator"))
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

		let option =" invite_code,invite2_code,email,address,etz_value,usd_value,user_type,state,isNew,benefitBalance ";
		let options = " where state=? ";
		let params = [0];
		let userArray = await config.utils.list_page(config," etzadmin ",option,options,params,page,pageSize);
		return res.send({"resp":{"state":0,"datas":userArray}});
			
	}catch(e){
				config.logger.error("userList",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	userList
}
