var config = require('../../config');

transferHistory = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let address  = obj.address;
		let type = obj.type;
		if(address==''||!config.ethereum.isValidAddress(address)){
			return res.send({"resp":{"state":-1,"datas":"params invalid"}})
		}

		if(type==1){//充值
			let depositHistory = await config.etzData.findAll({where:{address:address},limit:30})
			if(depositHistory && depositHistory.length>0){
				return res.send({"resp":{"state":0,"datas":depositHistory}})
			}
		}else if(type==2){//提现
			let withdrawHistory = await config.etzWithdraw.findAll({where:{address:address},limit:30})
			if(withdrawHistory && withdrawHistory.length>0){
				return res.send({"resp":{"state":0,"datas":withdrawHistory}})
			}
		}

		
		return res.send({"resp":{"state":0,"datas":"params invalid or null"}})
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	transferHistory
}