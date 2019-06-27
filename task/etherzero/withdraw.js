var config = require("../../config")
var methods = require("./methods");

async function withdrawFun(){
    let withdraw = await config.etzWithdraw.findOne({where:{state:0}});
    if(withdraw!=null){
      let e_id = withdraw.e_id;
      let user_id = withdraw.user_id;
      await config.etzWithdraw.update({state:1},{where:{e_id:e_id}});
      await methods.sendTx(config.controllerAdd,withdraw.address,withdraw.valuex,config.controllerPrivate,2,e_id,user_id);
      
    }else{
      global.withdrawIndex = false;
    }
  }

module.exports={
	withdrawFun
}