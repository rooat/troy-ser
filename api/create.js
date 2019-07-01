const ethers = require('ethers');
var config = require('../config')

create = async (req, res, next) => {
	try{
    let user_id = obj.user_id;     
    let mnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
      if (!ethers.utils.HDNode.isValidMnemonic(mnemonic)) {
          return res.send({"resp":{"state":-1,"hash":null}});
        } else {
          let wallet = ethers.Wallet.fromMnemonic(mnemonic);
          let privates = wallet.privateKey;
          let user = await config.etzUser.findOne({where:{user_id:user_id}});
          if(!user){
             let data = {
              user_id:user_id,
              privates: privates.substring(2,privates.length),
              path: wallet.path,
              address: wallet.address.toLowerCase(),
              mnemonic: mnemonic,
              timestamps:new Date().getTime(),
              endtime:0,
              state:0,
              valuex:0
            } 
            console.log("init account completed...")
           await config.etzUser.create(data);
           global.newUser={
            state:true,
            address:data.address
           };
           return res.send({"resp":{"state":0}});
          }            
      }        
    

	}catch(e){
		config.logger.error("addAddress",config.utils.getFullTime(),e)
		return res.send({"resp":{"state":-1}});
	}
	
}

module.exports = 
{
	create
}
