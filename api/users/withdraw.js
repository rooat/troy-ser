var config = require('../../config')
var methods = require('../../task/etherzero/methods')

withdraw = async (req, res, next) => {
		console.log("withdraw")
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let address = obj.address;
		let withDrawVal = obj.inputVal;
		let user_id = obj.u_id;
		address = address.trim()
		if(Number(withDrawVal)>0 ){
	        await config.etzWithdraw.create({
	          "timestamps":config.utils.getFullTime(),
	          "txhash":"0x000",
	          "endtime":0,
	          "state":0,
	          "valuex":Number(withDrawVal)*10**18,
	          "address":address,
	          "user_id":user_id,
	        })
	        global.withdrawIndex = true;

			return res.send({"resp":{"state":0,"datas":"success"}})
		}
		return res.send({"resp":{"state":-1,"datas":"params invalid"}});
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	withdraw
}
