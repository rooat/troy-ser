var config = require('../../config');

getNoticeList = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req);
		if(!obj){
			return res.send(config.utils.result_req(-1,"10011","params invalid"));
		}
		let content_type = obj.content_type;
		if(content_type!=null){
			let noticeArr = await config.noticeData.findAll({
				where:{notice_type:content_type,state:0},
				limit:20
			})
			if(noticeArr!=null && noticeArr.length>0){
				return res.send({"resp":{"state":0,"datas":noticeArr}});
			}
		}
		return res.send({"resp":{"state":-1,"datas":"params invalid"}});
	}catch(e){
		console.log(e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	getNoticeList
}
