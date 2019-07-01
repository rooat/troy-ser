var config = require('../../config');

getAddressList = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let user_id = obj.user_id;
		if(user_id){
			let addressArr = await config.addressData.findAll({where:{user_id:user_id}});
			if(addressArr && addressArr.length>0){
				return res.send(config.utils.result_req(0,"10010",addressArr));
			}				
			return res.send(config.utils.result_req(-1,"10011","address null"));
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"));
	}catch(e){
		config.logger.error("getAddressList",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"));
	}
	
}

module.exports = 
{
	getAddressList
}
