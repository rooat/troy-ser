var config = require('../../config');

getFinanceListByUserId = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;

		let user_id = obj.user_id;
		let f_type = obj.type;

		if(user_id&&f_type){
			let sf_Data;
			if(f_type==0){
				sf_Data = await config.financeData.findAll({where:{user_id:user_id},order:[['timestamps','DESC']]})
			}else{
				sf_Data = await config.financeData.findAll({where:{user_id:user_id,f_type:f_type}})
			}
			let f_Data = await makeData(sf_Data,user_id,f_type);
			
			if(f_Data && f_Data.length>0){
				return res.send(config.utils.result_req(0,"10010",f_Data));
			}
			return res.send(config.utils.result_req(-1,"10011","data is null"));
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"));
	}catch(e){
		config.logger.error("getFinanceListByUserId",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

async function makeData(sf_Data,user_id,f_type){
	if(sf_Data&& sf_Data.length>0){
		let arr = new Array();
		
		for(var i=0;i<sf_Data.length;i++){
			let detail= await config.financeDetail.findOne({where:{f_type_id:sf_Data[i].dataValues.f_type}});
			
			let f_id = sf_Data[i].dataValues.e_id;
			let params={
				user_id:user_id,
				b_type:f_type,
				f_id:f_id,
				b_type_f:0}

				

			if(f_type==0){
				params = {
					user_id:user_id,
					f_id:f_id,
					b_type_f:0}
			}
			
			
			let benefitDatas = await config.benefitData.findAll({where:params,order:[['timestamps','DESC']]})
			let benefitValue=0;
			let lastBenefit=0;
			if(benefitDatas && benefitDatas.length>0){
						
				let lastdays = config.utils.lastTimeFormat();
				for(var ik=0;ik<benefitDatas.length;ik++){
					benefitValue +=Number(benefitDatas[ik].dataValues.b_value);
					if(new Date(lastdays).getTime()==Number(benefitDatas[ik].dataValues.timestamps)){
						lastBenefit = Number(benefitDatas[ik].dataValues.b_value);
					}
				}
			}
			
			let obj ={
				"e_id":sf_Data[i].dataValues.e_id,
	            "f_type":sf_Data[i].dataValues.f_type,
	            "f_value":sf_Data[i].dataValues.f_value,
	            "get_value":sf_Data[i].dataValues.get_value,
	            "timestamps":sf_Data[i].dataValues.timestamps,
	            "f_benefit_time":sf_Data[i].dataValues.f_benefit_time,
	            "f_finance_time":sf_Data[i].dataValues.f_finance_time,
	            "end_time":sf_Data[i].dataValues.end_time,
	            "user_id":sf_Data[i].dataValues.user_id,
	            "state":sf_Data[i].dataValues.state,
	            "totalBenefit":benefitValue,
				"lastBenefit":lastBenefit,
				"rate":detail.day_benefit
			}
			arr.push({"finance":obj,"benefit":benefitDatas})
		}
		return arr;
	}
	return null;
}

module.exports = 
{
	getFinanceListByUserId
}
