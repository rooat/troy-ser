var config = require('../../config');

getNoticeList = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req)
		let lan = obj.lan;

		let noticeArr = await config.noticeData.findAll({
				where:{state:0},
				limit:20,
				order:[['timestamps','DESC']]
			})
			if(noticeArr!=null && noticeArr.length>0){
				return res.send({"resp":{"state":0,"datas":noticeArr}});
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].DATA_NULL));
	}catch(e){
				config.logger.error("getNoticeList",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	getNoticeList
}
