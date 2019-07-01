var config = require('../../config');

getNoticeList = async (req, res, next) => {
	try{
		let noticeArr = await config.noticeData.findAll({
				where:{state:0},
				limit:20,
				order:[['timestamps','DESC']]
			})
			if(noticeArr!=null && noticeArr.length>0){
				return res.send({"resp":{"state":0,"datas":noticeArr}});
			}
				return res.send({"resp":{"state":-1,"datas":"data is null"}});
	}catch(e){
				config.logger.error("getNoticeList",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	getNoticeList
}
