var price = require('../task/price/pricedata')
var rate = require("../task/price/ratedata");

class PriceClass{
	constructor(){
		this.updatePriceTime = 180000;
		this.version = 0;
	}
	async init(){
		await rate.initRateFun()
		await price.initPriceFun();
	}
	async start(){
		await this.init();
		setInterval(function(){
			this.version++
			console.log("version:",version)
			price.updatePriceFun(version);
			rate.updateRateFun()
			if(version==100){
				version=0;
			}
		},this.updatePriceTime)
	}

}

var priceClass = new PriceClass();
//priceClass.start();