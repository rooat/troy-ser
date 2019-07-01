var config = require('../../config');

addCoinType = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			if(obj.role<1){
				return res.send(config.utils.result_req(-1,"10011","Not an administrator"))
			}
			return res.send(obj.data);
		}
		obj = obj.data;

		let coin_name = obj.coinname;
		let comment = obj.comment;
		if(coin_name&& comment){
			let coins = await config.coinTypeData.findOne({where:{coinname:coin_name}})
			if(!coins){
				await config.coinTypeData.create({
					coinname:coin_name,
					comment:comment,
					state:0,
				})
				return res.send(config.utils.result_req(0,"10010","success"))
			}
			return res.send(config.utils.result_req(-1,"10011","existed"))
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"));
	}catch(e){
		config.logger.error("addCoinType",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012","error"));
	}
	
}

module.exports = 
{
	addCoinType
}
