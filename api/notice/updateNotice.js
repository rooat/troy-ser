var config = require('../../config');

updateNotice = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			if(obj.role<1){
				return res.send(config.utils.result_req(-1,"10011","Not an administrator"))
			}
			return res.send(obj.data);
		}
		obj = obj.data;

		let lan = obj.lan
		let noticeId = obj.noticeId;
		let noticeType = obj.noticeType;
		let noticeComment = obj.noticeComment;
		let state = obj.state;

		noticeComment = noticeComment.trim()
		if(noticeId > 0 && noticeType!=null && noticeComment!=null && state>=0){
			await config.noticeData.update({
				notice_type:noticeType,
				notice_comment:noticeComment,
				timestamps:new Date().getTime(),
				state:state
			},{where:{e_id:noticeId}})
			return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS))
		}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR))
	}catch(e){
				config.logger.error("updateNotice",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	updateNotice
}
