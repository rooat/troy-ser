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

		
		let noticeId = obj.noticeId;
		let noticeType = obj.noticeType;
		let noticeComment = obj.noticeComment;
		let state = obj.state;

		noticeComment = noticeComment.trim()
		if(noticeId > 0 && noticeType!=null && noticeComment!=null && state>=0){
			await config.noticeData.update({
				notice_type:noticeType,
				notice_comment:noticeComment,
				timestamps:config.utils.getFullTime(),
				state:state
			},{where:{e_id:noticeId}})
			return res.send({"resp":{"state":0,"datas":"success"}})
		}
		return res.send({"resp":{"state":-1,"datas":"params invalid"}});
	}catch(e){
		console.log(e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	updateNotice
}
