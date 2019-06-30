var config = require('../../config');

productById = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let f_id = obj.f_id;
		if(f_id){
			let financeData = await config.financeData.findOne({where:{e_id:f_id}});
			if(financeData){
				let f_type = financeData.f_type;
				let detail = await config.financeDetail.findOne({where:{f_type_id:f_type}})
				if(detail){
					let benefitDatas = await config.benefitData.findAll({where:{f_id:f_id}})
					if(benefitDatas && benefitDatas.length>0){
						let benefitValue=0;
						let lastBenefit=0;
						let date = new Date();
						let year = date.getFullYear();
						let month = date.getMonth()+1;
						let datex = date.getDate()-1;
						let lastdays = year+"-"+month+"-"+datex;
						for(var i=0;i<benefitDatas.length;i++){
							benefitValue +=Number(benefitDatas[i].dataValues.b_value);
							if(lastdays==Number(benefitDatas[i].dataValues.timestamps)){
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
					return res.send(config.utils.result_req(-1,"10011","benefit is null"));
				}
				return res.send(config.utils.result_req(-1,"10011","detail is null"));
			}
			return res.send(config.utils.result_req(-1,"10011"," finance data is null"));
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"));
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	productById
}
