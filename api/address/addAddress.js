
var config = require('../../config');

addAddress = async (req, res, next) => {
	try{
                let obj = await config.utils.getObj(req,config);
                if(obj.type==-1){
                        if(obj.role<1){
                                return res.send(config.utils.result_req(-1,"10011","Not an administrator"))
                        }
                        return res.send(obj.data);
                }
                obj = obj.data;
                
                let a_type = obj.type;
                let address = obj.address;
                let comment = obj.comment;
                let user_id = obj.user_id;

                if(a_type && address && comment && user_id &&config.ethereum.isValidAddress(address)){
                        let addr = await config.addressData.findOne({where:{address:address}});
                        if(!addr){
                                await config.addressData.create({
                                        a_type:a_type,
                                        address:address,
                                        comment:comment,
                                        state:0,
                                        user_id:user_id,
                                        timestamps:new Date().getTime()
                                })
                                return res.send(config.utils.result_req(0,"10010","success"))
                        }
                        return res.send(config.utils.result_req(-1,"10011","address existed"))
                }
                return res.send(config.utils.result_req(-1,"10011","params invalid"))
		
	}catch(e){
		config.logger.error("addAddress",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"));
	}
	
}

module.exports = 
{
	addAddress
}
