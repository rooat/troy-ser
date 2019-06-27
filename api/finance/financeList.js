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
			let arr =new Array();
			for(var k=0;k<financeDetail.length;k++){
				let b_type_f = financeDetail[k].dataValues.f_type_id
				let benefit=0;
				let balance =0;
				let b_Data = await config.benefitData.findAll({where:{user_id:userId,b_type:b_type_f,b_type_f:1}})
				if(b_Data && b_Data.length>0){
					for(var i=0;i<b_Data.length;i++){
						console.log("b_Data[i].dataValues.b_value:::",b_Data[i].dataValues.b_value)
						benefit +=Number(b_Data[i].dataValues.b_value);
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
					"benefit":benefit,
					"balance":balance,
					"time_limit":financeDetail[k].dataValues.time_limit,
					"day_benefit":financeDetail[k].dataValues.day_benefit
				}
				arr.push(obj);
			}
			return res.send({"resp":{"state":0,"datas":arr}});
		}
		return res.send({"resp":{"state":-1,"datas":"params invalid or null"}});
	}catch(e){
		console.log("e:",e)
		return res.send({"resp":{"state":-1,"datas":"error"}});
	}
	
}

module.exports = 
{
	financeList
}
