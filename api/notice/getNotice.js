var config = require('../../config');

getNotice = async (req, res, next) => {
	try{
		let obj =  config.utils.getObjParams(req)
		let noticeId = obj.noticeId;
		let lan = lan;
		if(noticeId){
			let notice = await config.noticeData.findOne({
				where:{e_id:noticeId,state:0}
			})
			if(notice){
				return res.send(config.utils.result_req(0,"10010",notice))
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].DATA_NULL));
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));
	}catch(e){

				config.logger.error("getNotice",config.utils.getFullTime(),e)

		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
}

module.exports = 
{
	getNotice
}
