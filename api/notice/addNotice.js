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


		let content_type = obj.content_type;
		let notice_comment = obj.notice_comment;
		if(content_type && notice_comment ){
			await config.noticeData.create({
				notice_type:content_type,
				notice_comment:notice_comment,
				timestamps:config.utils.getFullTime(),
				state:0
			});
			return res.send(config.utils.result_req(0,"10010","success"));
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"));
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	addNotice
}
