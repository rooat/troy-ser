var config = require('../../config');
var methods = require('./methods');
var axios = require('axios');
var withdraw = require("./withdraw")
var calculate = require("./calculate");
let loopBenefit = require('../benefit/loopBenefit')

const COMFIRM = 3;
var currentBlockNumber = 8356019;
var netBlock=0;
var count=0;
var hashSet = new Set();
var addressSet =new Set() ;
var privateMap = new Map();
var withTag = 0;
var nextTime=0
var settle=0;


class ETHEventListener {
  async init(){
    nextTime = new Date(config.utils.nextTimeFormat()).getTime()
    let etzUser = await config.etzUser.findAll()
    if(etzUser!=null && etzUser.length>0){
      for(var i=0;i<etzUser.length;i++){
        addressSet.add(etzUser[i].dataValues.address);
        privateMap.set(etzUser[i].dataValues.address,etzUser[i].dataValues.privates)
      }
    }
  }
  async start(){
    await this.init();
    currentBlockNumber = await methods.callBlockNumber();
    //let maxNumber = await config.etzData.max("blocknumber")
    // if(Number(maxNumber)>0){
    //   currentBlockNumber = Number(maxNumber)
    // }
    netBlock = Number(currentBlockNumber);
    currentBlockNumber++
    this.task()
  }

  task(){
    let that = this
    setInterval(async function(){
      
      if(global.newUser.state){
         addressSet =new Set() ;
         privateMap = new Map();
        await that.init();
        global.newUser.state = false;
      }
      if(global.calculateStart){
         global.calculateStart = false;
         calculate.calculateFun(privateMap);
      }
      if(global.withdrawIndex){
        withdraw.withdrawFun();
      }
      
        count++;
         let nextBlock = await methods.callBlockNumber();
         if(netBlock<=Number(nextBlock)){
           netBlock = Number(nextBlock);
          that.exFun()
          netBlock++;
        }
        if(count==1000){
          count=0
        }
        console.log("user number:",addressSet.size)
    },1000);

    setInterval(function(){//每10分钟统计一遍团队
      loopBenefit.loopBenefit();
    },10000)
  }

  async exFun(){
      let that =this;
      if (currentBlockNumber < netBlock) {
          let cur = currentBlockNumber;
          currentBlockNumber = netBlock;
          try{
            for (let i = cur; i < netBlock; i++) {
             methods.eth_getBlockByNumber(i-COMFIRM, false).then(async function(block){
              if(block.transactions.length>0){
              for (let ii = 0; ii < block.transactions.length; ii++) {
              
                  let txhash = block.transactions[ii];
                      let tx=await methods.eth_getTransactionByHash(txhash);
                      if(tx!=null && tx.from!=null && tx.to!=null){
                          let from = tx.from;
                          let to = tx.to;
                          let value = Number(tx.value); 
                          from = from.toLowerCase();
                          to = to.toLowerCase();
                          if(addressSet.has(to) && value>0 && !hashSet.has(txhash)){
                            console.log("from:",from)
                            console.log("to:",to)
                            hashSet.add(txhash);
                            if(hashSet.size==3){
                              hashSet = new Set();
                            }
                              let times = new Date().getTime();
                                await config.etzData.create({
                                  txhash:txhash,
                                  blocknumber:String(i-COMFIRM),
                                  timestamps:times,
                                  state:1,
                                  valuex:tx.value,
                                  address:to,
				                          fromadd:from
				                        })
                                let user = await config.etzAdmin.findOne({where:{address:to}});
                                if(user){
                                  let amount = Number(user.etz_value)+Number(value)/10**18;
                                  config.etzAdmin.update({etz_value : amount,update_time:times,iscalculte:1},{where:{e_id:user.e_id}});
                                }
                                
                                
                          }
                      }
                }
              }
              })
            }
          }catch(e){
              currentBlockNumber-=5;
                  console.log(e);
          }
        }
  }
  
}



var listener = new ETHEventListener()
listener.start()



