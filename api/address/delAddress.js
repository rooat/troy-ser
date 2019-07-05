var config = require('../../config');

delAddress = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		let lan = obj.lan;
		if(!lan){
			lan = global.lan;
		}
		let user_id = obj.user_id;
		let address = obj.address;
		if(user_id && address && config.utils.invalidAddress(address)){
			let addressDetail = await config.addressData.findOne({where:{address:address,user_id:user_id}})
			if(addressDetail){
				await config.addressData.update({state:1},{where:{e_id:addressDetail.e_id}});
				return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS));
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].ADDRESS_NOT_EXISTED))
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));
	}catch(e){
		config.logger.error("delAddress",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR));
	}
	
}

module.exports = 
{
	delAddress
}
