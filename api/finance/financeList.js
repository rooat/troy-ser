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
		let page = obj.page;
		let pageSize = obj.pageSize;
		lan = config.utils.isLan(lan)
		page = config.utils.isPage(page)
		pageSize = config.utils.isPageSize(pageSize)

		let financeDetail = await config.financeDetail.findAll();
		

		if(userId){
			let financeDetail = await config.utils.list_page(config," financedetail ","",[],page,pageSize);

			let lastdays = config.utils.lastTimeFormat();

			let arr =new Array();

			for(var k=0;k<financeDetail.length;k++){
				let b_type_f = financeDetail[k].f_type_id
				//计算总静态收益
				let benefit= await utils.benefitAll(userId,b_type_f,0);
				//计算昨日静态收益
				let lastdays = config.utils.lastTimeFormat();

				//
				 let names = "b_value";
				 let option = " where user_id=? and b_type=? and b_type_f=? and timestamps=?";
				 let params = [userId,b_type_f,2,new Date(lastdays).getTime()];
				 let lastbenefit = await config.utils.list_sum(config,names,"benefitdata",option,params);

// async function calculateBalanceAll(userId,state,b_type_f){
//     let sqlBenefit = "select sum(f_value) as sum from financedata where user_id=? and state=? and f_type=?";
//     let params =[userId,state,b_type_f]
//     let balance= await config.utils.queryFromSql(config,sqlBenefit,params);
//     balance = balance.result[0].sum;
//     return balance;
// }		
				//计算正在进心中
				 let namesb = "f_value";
				 let optionb = " where user_id=? and state=? and f_type=?";
				 let paramsb = [userId,1,2];
				 let balance = await config.utils.list_sum(config,namesb,"financedata",optionb,paramsb);


				 console.log("lastbenefit---",lastbenefit)
				//let balance = await utils.calculateBalanceAll(userId,1,b_type_f);
				let obj ={
					"id":financeDetail[k].f_type_id,
					"benefit":Number(benefit).toFixed(2),
					"balance":Number(balance).toFixed(2),
					"lastbenefit":Number(lastbenefit).toFixed(2),
					"time_limit":financeDetail[k].time_limit,
					"day_benefit":financeDetail[k].day_benefit
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

// function cal_sum(){
// 	let names = "b_value";
// 	 let option = " where user_id=? and b_type=? and b_type_f=? and timestamps=?";
// 	 let params = [userId,b_type_f,2,new Date(lastdays).getTime()];
// 	 let lastbenefit = await config.utils.list_sum(config,names,"benefitdata",option,params);
// }

module.exports = 
{
	financeList
}
