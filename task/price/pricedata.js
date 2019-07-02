var request = require('request');
var config = require('../../config');

async function initPriceFun(){
	let datas = await config.priceData.findOne();
	if(datas){
		updatePriceFun()
	}else{
		request(config.allpriceurl,async function(err,res,data){
	      let datas = JSON.parse(data);
	      if(datas!=null && datas.length>0){
	        for(var c =0;c<datas.length;c++){
	          await config.priceData.create({
	          	id: datas[c].id,
	            name: datas[c].name,
	            symbol: datas[c].symbol,
	            rank: datas[c].rank,
	            price_usd: datas[c].price_usd,
	            price_btc: datas[c].price_btc,
	            market_cap_usd: datas[c].market_cap_usd,
	            available_supply: datas[c].available_supply,
	            total_supply: datas[c].total_supply,
	            max_supply: datas[c].max_supply,
	            percent_change_1h: datas[c].percent_change_1h,
	            percent_change_24h: datas[c].percent_change_24h,
	            percent_change_7d: datas[c].percent_change_7d,
	            last_updated: datas[c].last_updated,
	            market_cap_btc: datas[c].market_cap_btc,
	            version:0
	          })
	        }
	        await saveETZandEC();
	        
	      }
	    })
	}
}



function updatePriceFun(version){
    request(config.allpriceurl,async function(err,res,data){
      let datas = JSON.parse(data);
      if(datas!=null && datas.length>0){
        for(var c =0;c<datas.length;c++){
          await config.priceData.update({
            name: datas[c].name,
            symbol: datas[c].symbol,
            rank: datas[c].rank,
            price_usd: datas[c].price_usd,
            price_btc: datas[c].price_btc,
            market_cap_usd: datas[c].market_cap_usd,
            available_supply: datas[c].available_supply,
            total_supply: datas[c].total_supply,
            max_supply: datas[c].max_supply,
            percent_change_1h: datas[c].percent_change_1h,
            percent_change_24h: datas[c].percent_change_24h,
            percent_change_7d: datas[c].percent_change_7d,
            last_updated: datas[c].last_updated,
            market_cap_btc: datas[c].market_cap_btc,
            version:version
          },{where:{id: datas[c].id}})
        }
        await updateETZandEC(version)
      }
    })
 }

async function saveETZandEC(){
	let usd = await config.rateData.findOne({where:{code:"USD"}});
			let krw = await config.rateData.findOne({where:{code:"KRW"}});
			let cny = await config.rateData.findOne({where:{code:"CNY"}});
			var rate = Number(krw.rate)/Number(usd.rate);
		try{
			request(config.etzpriceurl,async function(err,res,data){
				if(!err){
					let datas = JSON.parse(data).data;
					console.log(datas.closing_price)
			 		let etz_usd_per = Number(datas.closing_price)/rate;
			 		let etz_btc_per =Number(etz_usd_per)/Number(usd.rate);
			 		await config.priceData.create({
			 			id: "Etherzero",
			            name: "Etherzero",
			            symbol: "ETZ",
			            rank: 101,
			            price_usd: etz_usd_per,
			            price_btc: etz_btc_per,
			            market_cap_usd: 0,
			            available_supply: 0,
			            total_supply: 0,
			            max_supply:0,
			            percent_change_1h: 0,
			            percent_change_24h: 0,
			            percent_change_7d: 0,
			            last_updated: 0,
			            market_cap_btc: 0,
			            version:0
			        })
			        let zc_usd_per = Number(usd.rate)/Number(cny.rate)
			        let zc_btc_per = Number(zc_usd_per)/Number(usd.rate)
			        await config.priceData.create({
			        	id: "ZC",
			            name: "ZC",
			            symbol: "ZC",
			            rank: 101,
			            price_usd: zc_usd_per,
			            price_btc: zc_btc_per,
			            market_cap_usd: 0,
			            available_supply: 0,
			            total_supply: 0,
			            max_supply:0,
			            percent_change_1h: 0,
			            percent_change_24h: 0,
			            percent_change_7d: 0,
			            last_updated: 0,
			            market_cap_btc: 0,
			            version:0
			        })
				}
		 	})
		}catch(e){
			config.logger.error("saveETZandEC error",config.utils.getFullTime(),e)
		}
}
async function updateETZandEC(version){
	let usd = await config.rateData.findOne({where:{code:"USD"}});
			let krw = await config.rateData.findOne({where:{code:"KRW"}});
			let cny = await config.rateData.findOne({where:{code:"CNY"}});
			let rate = Number(krw.rate)/Number(usd.rate);
			try{
				request(config.etzpriceurl,async function(err,res,data){
					if(!err){
						let datas = JSON.parse(data).data;
						console.log(datas.closing_price)
				 		let etz_usd_per = Number(datas.closing_price)/rate;
				 		let etz_btc_per =Number(etz_usd_per)/Number(usd.rate);
				 		await config.priceData.update({
				            name: "Etherzero",
				            symbol: "ETZ",
				            rank: 101,
				            price_usd: etz_usd_per,
				            price_btc: etz_btc_per,
				            market_cap_usd: 0,
				            available_supply: 0,
				            total_supply: 0,
				            max_supply:0,
				            percent_change_1h: 0,
				            percent_change_24h: 0,
				            percent_change_7d: 0,
				            last_updated: 0,
				            market_cap_btc: 0,
				            version:version
				        },{where:{id: "Etherzero"}})
				        let zc_usd_per = Number(usd.rate)/Number(cny.rate)
				        let zc_btc_per = Number(zc_usd_per)/Number(usd.rate)

				        await config.priceData.update({
				            name: "ZC",
				            symbol: "ZC",
				            rank: 101,
				            price_usd: zc_usd_per,
				            price_btc: zc_btc_per,
				            market_cap_usd: 0,
				            available_supply: 0,
				            total_supply: 0,
				            max_supply:0,
				            percent_change_1h: 0,
				            percent_change_24h: 0,
				            percent_change_7d: 0,
				            last_updated: 0,
				            market_cap_btc: 0,
				            version:version
				        },{where:{id: "ZC"}})
					}
			 	})
		 	}catch(e){
				config.logger.error("updateETZandZc error",config.utils.getFullTime(),e)
			}
}

module.exports ={
	updatePriceFun,initPriceFun
}