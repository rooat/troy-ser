var config = require('../config')
var methods = require('../task/etherzero/methods')

withdraw = async (req, res, next) => {
		console.log("withdraw")
	try{
		let address = obj.address;
		let withDrawVal = obj.inputVal;
		let user_id = obj.u_id;
		
		if( Number(withDrawVal)>0 ){
	        await config.etzWithdraw.create({
	          "timestamps":new Date().getTime(),
	          "txhash":"0x000",
	          "endtime":0,
	          "state":0,
	          "valuex":Number(withDrawVal)*10**18,
	          "address":address,
	          "user_id":user_id,
	        })
	        global.withdrawIndex = true;

			return res.send({"resp":{"state":0}})
		}
		return res.send({"resp":{"state":-1}});
	}catch(e){
		console.log("e:",e)
		return res.send({"resp":{"state":-1}});
	}
	
}

module.exports = 
{
	withdraw
}
