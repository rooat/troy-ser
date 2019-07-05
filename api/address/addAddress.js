
var config = require('../../config');

addAddress = async (req, res, next) => {
	try{
                let obj = await config.utils.getObj(req,config);
                if(obj.type==-1){
                        return res.send(obj.data);
                }
                obj = obj.data;
                
                let a_type = obj.type;
                let address = obj.address;
                let comment = obj.comment;
                let user_id = obj.user_id;
                let lan = obj.lan;

                if(a_type && address && comment && user_id &&config.utils.invalidAddress(address)){
                        let addr = await config.addressData.findOne({where:{address:address}});
                        if(!addr){
                                await config.addressData.create({
                                        a_type:a_type,
                                        address:address.toLowerCase(),
                                        comment:comment,
                                        state:0,
                                        user_id:user_id,
                                        timestamps:new Date().getTime()
                                })
                                return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS))
                        }
                        return res.send(config.utils.result_req(-1,"10011",config.tips[lan].ADDRESS_EXISTED))
                }
                return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));
		
	}catch(e){
		config.logger.error("addAddress",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR));
	}
	
}

module.exports = 
{
	addAddress
}
