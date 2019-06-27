var config = require('../../config');

deleteNotice = async (req, res, next) => {
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
		if(noticeId){
			let notice = await config.noticeData.findOne({where:{e_id:noticeId}});
			if(notice){
				await config.noticeData.update({state:1},{where:{e_id:noticeId}})
				return res.send(config.utils.result_req(0,"10010","success"))
			}
			return res.send(config.utils.result_req(-1,"10011","id invalid"))
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"))
	}catch(e){
		console.log(e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	deleteNotice
}

