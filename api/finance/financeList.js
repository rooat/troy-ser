var config = require('../../config');
var utils = require('./utils')

financeList = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;

		let userId =obj.user_id;
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		let financeDetail = await config.financeDetail.findAll();

		if(userId &&financeDetail && financeDetail.length>0){
			let lastdays = config.utils.lastTimeFormat();

			let arr =new Array();
			for(var k=0;k<financeDetail.length;k++){
				let b_type_f = financeDetail[k].dataValues.f_type_id
				//计算总静态收益
				let benefit= await utils.benefitAll(userId,b_type_f,0);
				//计算昨日静态收益
				let lastdays = config.utils.lastTimeFormat();
				 let lastbenefit =await utils.benefitLast(userId,b_type_f,0,new Date(lastdays).getTime());
				

				let balance = await utils.calculateBalanceAll(userId,1,b_type_f);
				let obj ={
					"id":financeDetail[k].dataValues.f_type_id,
					"benefit":Number(benefit).toFixed(2),
					"balance":Number(balance).toFixed(2),
					"lastbenefit":Number(lastbenefit).toFixed(2),
					"time_limit":financeDetail[k].dataValues.time_limit,
					"day_benefit":financeDetail[k].dataValues.day_benefit
				}
				arr.push(obj);
			}
			return res.send({"resp":{"state":0,"datas":arr}});
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));
	}catch(e){
		config.logger.error("financeList",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	financeList
}
