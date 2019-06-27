var config = require('../../config');

delAddress = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			if(obj.role<1){
				return res.send(config.utils.result_req(-1,"10011","Not an administrator"))
			}
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let user_id = obj.user_id;
		let address = obj.address;
		if(user_id && address && config.ethereum.isValidAddress(address)){
			let addressDetail = await config.addressData.findOne({where:{address:address,user_id:user_id}})
			if(addressDetail){
				await config.addressData.update({state:1},{where:{e_id:addressDetail.e_id}});
				return res.send(config.utils.result_req(0,"10010","success"));
			}
			return res.send(config.utils.result_req(-1,"10011","address is not existed"))
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"))
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"));
	}
	
}

module.exports = 
{
	delAddress
}
