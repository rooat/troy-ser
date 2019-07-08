var price = require('../task/price/pricedata')
var rate = require("../task/price/ratedata");

class PriceClass{
	constructor(){
		this.updatePriceTime = 60000;
		this.version = 0;
	}
	async init(){
		await rate.initRateFun()
		await price.initPriceFun();
	}
	async start(){
		await this.init();
		let that = this;
		setInterval(function(){
			this.version++
			console.log("version:",that.version)
			price.updatePriceFun(that.version);
			rate.updateRateFun()
			if(that.version==100){
				that.version=0;
			}
		},this.updatePriceTime)
	}

}

var priceClass = new PriceClass();
priceClass.start();