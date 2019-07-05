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
		let lan = obj.lan;
		
		let address = obj.address;
		let withDrawVal = obj.inputVal;
		let user_id = obj.u_id;
		if(address&&user_id &&withDrawVal&& Number(withDrawVal)>0 && config.utils.invalidAddress(address)){
	        await config.etzWithdraw.create({
	          "timestamps":new Date().getTime(),
	          "txhash":"0x000",
	          "endtime":0,
	          "state":0,
	          "valuex":Number(withDrawVal)*10**18,
	          "address":address.toLowerCase(),
	          "user_id":user_id,
	        })
	        global.withdrawIndex = true;

			return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));
	}catch(e){
		config.logger.error("withdraw",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	withdraw
}
