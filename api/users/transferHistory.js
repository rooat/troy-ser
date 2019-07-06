var config = require('../../config');

transferHistory = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		let lan = obj.lan;
		let page = obj.page;
		let pageSize = obj.pageSize;
		lan = config.utils.isLan(lan)
		page = config.utils.isPage(page)
		pageSize = config.utils.isPageSize(pageSize)

		let user_id = obj.user_id;
		if(user_id){
			let user = await config.etzAdmin.findOne({where:{e_id:user_id}});
			if(user){
				let arr = new Array();
				let option = " where address=? ";
				let params = [user.address];
				let depositHistory = await config.utils.list_page(config," ethdatas ",option,params,page,pageSize);
				let withdrawHistory = await config.utils.list_page(config," ethwithdraw ",option,params,page,pageSize);
				 option = " where user_id=? ";
				 params = [user_id];
				let exchangeHistory = await config.utils.list_page(config," exchangedata ",option,params,page,pageSize);

				//let benefit = await config.benefitData.findAll(where:{user_id:user_id},limit:30,order:[['timestamps','DESC']])
				if(depositHistory &&depositHistory.length>0){
					for(var i=0;i<depositHistory.length;i++){
					let obj1 = {
						"timestamps":depositHistory[i].timestamps,
						"value":Number(depositHistory[i].valuex)/10**18,
						"type":1,
						"id":depositHistory[i].e_id,
						"from":depositHistory[i].fromadd,
						"to":depositHistory[i].address,
					}
					arr.push(obj1)
					}
				}
				
				if(withdrawHistory &&withdrawHistory.length>0){
					for(var j=0;j<withdrawHistory.length;j++){
					let obj2 = {
						"timestamps":withdrawHistory[j].timestamps,
						"value":Number(withdrawHistory[j].valuex)/10**18,
						"type":2,
						"id":withdrawHistory[j].e_id,
						"from":user.address,
						"to":withdrawHistory[j].address,
					}
					arr.push(obj2)
					}
				}
				if(exchangeHistory &&exchangeHistory.length>0){
					for(var k=0;k<exchangeHistory.length;k++){
					
					let obj3 = {
						"timestamps":exchangeHistory[k].timestamps,
						"value":exchangeHistory[k].e_value,
						"type":exchangeHistory[k].e_type,
						"id":exchangeHistory[k].e_id,
						"from":"",
						"to":user.address,
					}
					arr.push(obj3)
					}
				}
				let datas =arr.sort(objSort('timestamps'));
				if(datas && datas.length>0){
					return res.send(config.utils.result_req(0,"10010",datas));
				}
				return res.send(config.utils.result_req(-1,"10011",config.tips[lan].DATA_NULL));
			}
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));		
	}catch(e){
		config.logger.error("transferHistory",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

function objSort(prop){
                 return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }           
    }
}

module.exports = 
{
	transferHistory
}
