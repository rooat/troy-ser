var config = require('../../config');

updateAddress = async (req, res, next) => {
	try{
                let obj = await config.utils.getObj(req,config);
                let lan = obj.lan;
                if(obj.type==-1){
                        return res.send(obj.data);
                }
                obj = obj.data;
                
		let a_type = obj.a_type;
                let address = obj.address;
                let comment = obj.comment;
                let id = obj.id;
                if(!lan){
                        lan = global.lan;
                }
                if(a_type&&address&&comment&&id&&config.utils.invalidAddress(address)){
                        let details = await config.addressData.findOne({where:{e_id:id}})
                        if(details){
                                await config.addressData.update({a_type:a_type,address:address.toLowerCase(),comment:comment},{where:{e_id:id}})
                                return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS));
                        }
                                return res.send(config.utils.result_req(-1,"10011",config.tips[lan].OPERATE_FAILURE));
                }
                return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));;
	}catch(e){
                config.logger.error("updateAddress",config.utils.getFullTime(),e)
                return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR));
	}
	
}

module.exports = 
{
	updateAddress
}
