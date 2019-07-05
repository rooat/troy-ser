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
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		if(noticeId){
			let notice = await config.noticeData.findOne({where:{e_id:noticeId}});
			if(notice){
				await config.noticeData.update({state:1},{where:{e_id:noticeId}})
				return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS))
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));
	}catch(e){
		config.logger.error("deleteNotice",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	deleteNotice
}

