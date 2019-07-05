
var config = require('../../config');

superNodeBenefitByUserId = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		let lan = obj.lan;
		let user_id = obj.user_id;
		if(!lan){
			lan = global.lan;
		}
		if(user_id){
			let datas = await config.nodeBenefitData.findAll({where:{user_id:user_id,b_type_f:2},limit:50,order:[['timestamps','DESC']]})
			if(datas && datas.length>0){
				return res.send(config.utils.result_req(0,"10010",datas))
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].DATA_NULL));
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));;		
	}catch(e){
		config.logger.error("superNodeBenefitByUserId",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	superNodeBenefitByUserId
}
