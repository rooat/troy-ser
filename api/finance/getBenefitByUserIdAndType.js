var config = require('../../config');

getBenefitByUserIdAndType = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;

		
		let userId = obj.user_id;
		let type = obj.type;
		let kind = obj.kind;
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		if(userId && type&&kind){
			let b_Data = await config.benefitData.findAll({where:{user_id:userId,b_type:type,b_type_f:kind}})
			console.log("b_data===",b_Data)
			if(b_Data && b_Data.length>0){
				let value=0;
				for(var i=0;i<b_Data.length;i++){
					console.log("b_Data[i].dataValues.b_value:::",b_Data[i].dataValues.b_value)
					value +=Number(b_Data[i].dataValues.b_value);
				}
				return res.send(config.utils.result_req(0,"10010",value))
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].DATA_NULL))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));		
	}catch(e){
		config.logger.error("getBenefitByUserIdAndType",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	getBenefitByUserIdAndType
}
