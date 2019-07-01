var config = require('../../config');

updateAddress = async (req, res, next) => {
	try{
                let obj = await config.utils.getObj(req,config);
                if(obj.type==-1){
                        if(obj.role<1){
                                return res.send(config.utils.result_req(-1,"10011","Not an administrator"))
                        }
                        return res.send(obj.data);
                }
                obj = obj.data;
                
		let a_type = obj.a_type;
                let address = obj.address;
                let comment = obj.comment;
                let id = obj.id;
                if(a_type&&address&&comment&&id&&config.ethereum.isValidAddress(address)){
                        let details = await config.addressData.findOne({where:{e_id:id}})
                        if(details){
                                await config.addressData.update({a_type:a_type,address:address,comment:comment},{where:{e_id:id}})
                                return res.send(config.utils.result_req(0,"10010","success"));
                        }
                                return res.send(config.utils.result_req(-1,"10011","update failure"));
                }
                return res.send(config.utils.result_req(-1,"10011","params invalid"));
	}catch(e){
                config.logger.error("updateAddress",config.utils.getFullTime(),e)
                return res.send(config.utils.result_req(-1,"10012","error"));
	}
	
}

module.exports = 
{
	updateAddress
}
