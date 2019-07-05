var config = require('../../config');

productById = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let f_id = obj.f_id;
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		if(f_id){
			let financeData = await config.financeData.findOne({where:{e_id:f_id}});
			if(financeData){
				let f_type = financeData.f_type;
				let detail = await config.financeDetail.findOne({where:{f_type_id:f_type}})
				if(detail){
					let benefitDatas = await config.benefitData.findAll({where:{f_id:f_id},order:[['timestamps','DESC']]})
					if(benefitDatas && benefitDatas.length>0){
						let benefitValue=0;
						let lastBenefit=0;
						let lastdays = config.utils.lastTimeFormat();
						for(var i=0;i<benefitDatas.length;i++){
							benefitValue +=Number(benefitDatas[i].dataValues.b_value);
							if(new Date(lastdays).getTime()==Number(benefitDatas[i].dataValues.timestamps)){
								lastBenefit = Number(benefitDatas[i].dataValues.b_value);
							}
						}
						let obj ={
							"totalBenefit":benefitValue,
							"lastBenefit":lastBenefit,
							"rate":detail.day_benefit
						}
						return res.send(config.utils.result_req(0,"10010",obj))
					}
				}
			}
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));;
	}catch(e){
		config.logger.error("nodeBenefitByUserId",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	productById
}
