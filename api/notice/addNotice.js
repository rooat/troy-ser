var config = require('../../config');

addNotice = async (req, res, next) => {
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
		let content_type = obj.content_type;
		let notice_comment = obj.notice_comment;
		if(content_type && notice_comment ){
			await config.noticeData.create({
				notice_type:content_type,
				notice_comment:notice_comment,
				timestamps:new Date().getTime(),
				state:0
			});
			return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS));
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));;
	}catch(e){
		config.logger.error("addNotice",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	addNotice
}
