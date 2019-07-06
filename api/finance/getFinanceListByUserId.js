var config = require('../../config');
var utils = require('./utils')

getFinanceListByUserId = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;

		let user_id = obj.user_id;
		let f_type = obj.type;

		let lan = obj.lan;
		let page = obj.page;
		let pageSize = obj.pageSize;
		lan = config.utils.isLan(lan)
		page = config.utils.isPage(page)
		pageSize = config.utils.isPageSize(pageSize)

		if(user_id&&f_type){
			let sf_Data;
			if(f_type==0){
				sf_Data = await utils.list_finance(user_id,page,pageSize,-1)
			}else{
				sf_Data = await utils.list_finance(user_id,page,pageSize,f_type)
			}
			let f_Data = await makeData(sf_Data,f_type,page,pageSize);
			
			if(f_Data && f_Data.length>0){
				return res.send(config.utils.result_req(0,"10010",f_Data));
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].DATA_NULL));
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));;
	}catch(e){
		config.logger.error("getFinanceListByUserId",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

async function makeData(sf_Data,f_type,page,pageSize){
	if(sf_Data&& sf_Data.length>0){
		let arr = new Array();
		
		for(var i=0;i<sf_Data.length;i++){
			let detail= await config.financeDetail.findOne({where:{f_type_id:sf_Data[i].f_type}});
			
			let f_id = sf_Data[i].e_id;

			let lastdays = config.utils.lastTimeFormat();
			console.log("page,",page)
			console.log("pageSiz,",pageSize)
			console.log(f_type)
			console.log(f_id)

			let benefitValue = await utils.benefitall_finace_by_f_id(f_id,f_type,0,new Date(lastdays).getTime())
			console.log("benefitValue---",benefitValue)
			let lastBenefit = await utils.benefitall_finace_by_f_id(f_id,f_type,-1,new Date(lastdays).getTime())
				console.log("lastBenefit---",lastBenefit)
			let benefitDatas = await utils.benefitall_finace_list_by_id(f_id,f_type,0,page,pageSize);
			
			let obj ={
				"e_id":sf_Data[i].e_id,
	            "f_type":sf_Data[i].f_type,
	            "f_value":sf_Data[i].f_value,
	            "get_value":sf_Data[i].get_value,
	            "timestamps":sf_Data[i].timestamps,
	            "f_benefit_time":sf_Data[i].f_benefit_time,
	            "f_finance_time":sf_Data[i].f_finance_time,
	            "end_time":sf_Data[i].end_time,
	            "user_id":sf_Data[i].user_id,
	            "state":sf_Data[i].state,
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
