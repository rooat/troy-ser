var price = require('./pricedata')
var rate = require("./ratedata");
var updatePriceTime=180000;
var version =0

class PriceClass{
	async init(){
		await rate.initRateFun()
		await price.initPriceFun();
	}
	async start(){
		await this.init();
		setInterval(function(){
			version++
			console.log("version:",version)
			price.updatePriceFun(version);
			rate.updateRateFun()
			if(version==100){
				version=0;
			}
		},updatePriceTime)
	}

}

var priceClass = new PriceClass();
priceClass.start();