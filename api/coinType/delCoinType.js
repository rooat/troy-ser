var config = require('../../config');

delCoinType = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			if(obj.role<1){
				return res.send(config.utils.result_req(-1,"10011","Not an administrator"))
			}
			return res.send(obj.data);
		}
		obj = obj.data;
		let lan = obj.lan;
		let id = obj.c_id;
		if(id){
			let coins = await config.coinTypeData.findOne({where:{e_id:id}})
			if(coins){
				await config.coinTypeData.update({
					state:1,
				})
				return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS))
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].OPERATE_FAILURE))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));;
	}catch(e){
		config.logger.error("delCoinType",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR));
	}
	
}

module.exports = 
{
	delCoinType
}
