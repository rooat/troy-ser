var config = require('../../config');

financeList = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;

		let userId =obj.user_id;
		let financeDetail = await config.financeDetail.findAll();

		if(userId &&financeDetail && financeDetail.length>0){
			let lastdays = config.utils.lastTimeFormat();

			let arr =new Array();
			for(var k=0;k<financeDetail.length;k++){
				let b_type_f = financeDetail[k].dataValues.f_type_id
				let benefit=0;
				let balance =0;
				let lastbenefit =0;
				console.log("userId====",userId)
				console.log("b_type_f====",b_type_f)
				console.log("las ----",lastdays)
				console.log("last----",new Date(lastdays).getTime())
				let b_Data = await config.benefitData.findAll({where:{user_id:userId,b_type:b_type_f,b_type_f:0}})
				if(b_Data && b_Data.length>0){
					for(var i=0;i<b_Data.length;i++){
						benefit +=Number(b_Data[i].dataValues.b_value);
						if(Number(b_Data[i].dataValues.timestamps)==new Date(lastdays).getTime()){
							console.log("----laste data yyll....")
							lastbenefit += Number(b_Data[i].dataValues.b_value);
						}
					}
					
				}
				let f_Data = await config.financeData.findAll({where:{state:1,user_id:userId,f_type:b_type_f}})
				if(f_Data && f_Data.length>0){
					for(var ii=0;ii<f_Data.length;ii++){
						balance +=Number(f_Data[ii].dataValues.f_value);
					}
				}
				let obj ={
					"id":financeDetail[k].dataValues.f_type_id,
					"benefit":benefit.toFixed(2),
					"balance":balance.toFixed(2),
					"lastbenefit":lastbenefit.toFixed(2),
					"time_limit":financeDetail[k].dataValues.time_limit,
					"day_benefit":financeDetail[k].dataValues.day_benefit
				}
				arr.push(obj);
			}
			return res.send({"resp":{"state":0,"datas":arr}});
		}
		return res.send({"resp":{"state":-1,"datas":"params invalid or null"}});
	}catch(e){
		config.logger.error("financeList",config.utils.getFullTime(),e)
		return res.send({"resp":{"state":-1,"datas":"error"}});
	}
	
}

module.exports = 
{
	financeList
}
