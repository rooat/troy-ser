var request = require('request');
var config = require('../../config');

async function initRateFun(){
	let rate = await config.rateData.findOne();
	if(rate){
		updateRateFun();
	}else{
		try{
			request(config.rateurl,async function(err,res,data){
		      let datas = JSON.parse(data).data;
		      for(var d=0;d<datas.length;d++){
		        await config.rateData.create({
		          code:datas[d].code,
		          name:datas[d].name,
		          rate:datas[d].rate
		        })
		      }
		    })
	    }catch(e){
			config.logger.error("initRateFun error",config.utils.getFullTime(),e)
		}
	}
}

function updateRateFun(){
    request(config.rateurl,async function(err,res,data){
      let datas = JSON.parse(data).data;
      for(var d=0;d<datas.length;d++){
        await config.rateData.update({
          name:datas[d].name,
          rate:datas[d].rate
        },{where:{code:datas[d].code}})
      }
    })
 }

module.exports={
	updateRateFun,initRateFun
}