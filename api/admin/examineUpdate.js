var config = require('../../config');

var examineUpdate = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);

		if(obj.type==-1){
			if(obj.role<1){
				return res.send(config.utils.result_req(-1,"10011","Not administrator"))
			}
			return res.send(obj.data);
		}
		obj = obj.data;
		let token = obj.token;
		let ex_id = obj.ex_id;
		let lan = obj.lan;
		lan = config.utils.isLan(lan)

		if(ex_id &&token){
			let keysuser = await config.getAsync(token)
			let email = keysuser.split(",")[0];


			let exData = await config.examineData.findOne({where:{e_id:ex_id,state:0}});
			if(exData){
				await config.examineData.update({state:1,op_email:email,endtime:new Date().getTime()},{where:{e_id:ex_id}});
				await config.etzWithdraw.create({
			          "timestamps":new Date().getTime(),
			          "txhash":"0x000",
			          "endtime":0,
			          "state":0,
			          "valuex":Number(exData.valuex)*10**18,
			          "address":exData.address.toLowerCase(),
			          "user_id":exData.user_id,
			        })
			        global.withdrawIndex = true;
				return res.send(config.utils.result_req(0,"10010",config.tips[lan].OPERATE_SUCCESS));
			}
			return res.send(config.utils.result_req(-1,"10011",config.tips[lan].DATA_NULL));
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));
		
	}catch(e){
		config.logger.error("examineList",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR));
	}
	
}

module.exports = 
{
	examineUpdate
}
