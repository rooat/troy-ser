var config = require('../../config');

delCoinType = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			if(obj.role<1){
				return res.send(config.utils.result_req(-1,"10011","Not an administrator"))
			}
			return res.send(obj.data);
		}
		obj = obj.data;

		let id = obj.c_id;
		if(id){
			let coins = await config.coinTypeData.findOne({where:{e_id:id}})
			if(coins){
				await config.coinTypeData.update({
					state:1,
				})
				return res.send(config.utils.result_req(0,"10010","success"))
			}
			return res.send(config.utils.result_req(-1,"10011","not existed"))
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"));
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"));
	}
	
}

module.exports = 
{
	delCoinType
}
