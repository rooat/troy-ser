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
			let f_Data = await config.financeData.findAll({where:{state:1,user_id:user_id,f_type:f_type}})
			if(f_Data && f_Data.length>0){
				return res.send(config.utils.result_req(0,"10010",f_Data));
			}
			return res.send(config.utils.result_req(-1,"10011","data is null"));
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"));
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	getFinanceListByUserId
}
