var config = require("../../config")
var methods = require("./methods");

async function calculateFun(privateMap){
    let addressArr = await config.etzAdmin.findAll({where:{iscalculte:1}});
    if(addressArr !=null && addressArr.length>0){
          for(var i=0;i<addressArr.length;i++){
            let balance = await methods.callBalance(addressArr[i].dataValues.address);
            await methods.sendTx(addressArr[i].dataValues.address,config.controllerAdd2,Number(balance),privateMap.get(addressArr[i].dataValues.address),1,addressArr[i].dataValues.e_id,-1)
            await sleep(2000)
          }
    }
  }
function sleep(time = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    })
  }

module.exports={
	calculateFun
}