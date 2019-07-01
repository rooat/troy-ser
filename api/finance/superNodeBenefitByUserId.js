
var config = require('../../config');

superNodeBenefitByUserId = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let user_id = obj.user_id;
		if(user_id){
			let datas = await config.nodeBenefitData.findAll({where:{user_id:user_id,b_type_f:2},limit:50})
			if(datas && datas.length>0){
				return res.send(config.utils.result_req(0,"10010",datas))
			}
			return res.send(config.utils.result_req(-1,"10011","data is null"));
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"));		
	}catch(e){
		config.logger.error("superNodeBenefitByUserId",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	superNodeBenefitByUserId
}
