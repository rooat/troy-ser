var config = require('../../config');

getNotice = async (req, res, next) => {
	try{
		let obj =  config.utils.getObjParams(req)
		let noticeId = obj.noticeId;
		if(noticeId){
			let notice = await config.noticeData.findOne({
				where:{e_id:noticeId,state:0}
			})
			if(notice){
				return res.send(config.utils.result_req(0,"10010",notice))
			}
			return res.send(config.utils.result_req(-1,"10011","id invalid"))
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"));
	}catch(e){
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
}

module.exports = 
{
	getNotice
}
