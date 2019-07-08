const Tx = require('ethereumjs-tx');
var config = require('../../config')
const axios = require("axios");

 async function sendTx(from,to,value,private,index,id,ids){
 	try {
      let nonce = await config.web3.eth.getTransactionCount(from)
      
	  console.log("from:",from)
      console.log("to:",to)
      console.log("value:",value)
      console.log("private:",private)
      console.log("nonce===",nonce)
      let gasss = await eth_gasPrice()
      value = Number(value)-Number(gasss)*50000;
      console.log("value:",value);
      var txObject = await config.web3.eth.accounts.signTransaction({
          from : from,
          to: to,
          data: '',
          gasPrice: gasss,
          gasLimit: '0x7530',
          nonce: nonce++,
          value: String(value)
      }, "0x"+private)
      console.log("txObject.rawTransaction:",txObject.rawTransaction)
      config.web3.eth.sendSignedTransaction(txObject.rawTransaction)
      .once('transactionHash', onSended(value,index,id,ids))
        .once('confirmation', onSuccess(value,index,id,ids))
        .once('error', onError(value,index,id,ids))
  } catch (e) {
      console.log("first err:",e);
      return null;
  }
}
function onSuccess(value,index,e_id,ids){
 var dosucess =async (confNumber, receipt) => {
   let hash = receipt.transactionHash;
   console.log("success hash:",hash)
   if(index==1){//iscalculte 2 已经归集
   		await config.etzAdmin.update({iscalculte:2},{where:{e_id:e_id}});
   }else if(index==2 && ids>-1){
   		let user = await config.etzAdmin.findOne({where:{e_id:ids}});
      if(user){
        let amount = Number(user.etz_value)-Number(value)/10**18;
        await config.etzWithdraw.update({txhash:hash,state:2},{where:{e_id:e_id}});
        await config.etzAdmin.update({etz_value:amount},{where:{e_id:ids}});
      }
   		
   }
   
 }
 return dosucess

}

function onSended(index,e_id){
 return async (hash) => {
   console.log("pendding hash:",hash)
   if(index==1){//iscalculte。4 归集中
   		await config.etzAdmin.update({iscalculte:4},{where:{e_id:e_id}});
   }else if(index==2){
   		await config.etzWithdraw.update({txhash:hash,state:4},{where:{e_id:e_id}});
   }
 }
}
function onError(e_id){
 var doerror = async (error) => {
   console.log("error:",error)
   if(index==1){//iscalculte。1 归集失败。下一周期归集
   		await config.etzAdmin.update({iscalculte:1},{where:{e_id:e_id}});
   }else if(index==2){
   		await config.etzWithdraw.update({txhash:hash,state:3},{where:{e_id:e_id}});
   }
 }
 return doerror
}
async function callNonce(from){
	return await config.web3.eth.getTransactionCount(from);
}
async function callBlockNumber(){
	return await config.web3.eth.getBlockNumber()
}

async function callBalance(from){
	return await config.web3.eth.getBalance(from)
}
async function eth_getBlockByNumber(blockNumber,flat){
	return await config.web3.eth.getBlock(blockNumber, flat);
	 
}
async function eth_getTransactionByHash(hash){
	return await config.web3.eth.getTransaction(hash)
}
async function eth_getTransactionReceipt(hash){
	return await config.web3.eth.getTransactionReceipt(hash)
}
async function eth_gasPrice(){
	return await config.web3.eth.getGasPrice();
}


module.exports ={
	sendTx,callBalance,callNonce,callBlockNumber,eth_getBlockByNumber,eth_getTransactionByHash,eth_getTransactionReceipt
}