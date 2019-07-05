var config = require('../../config');

friendData = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		let lan = obj.lan;
		let mycode = obj.mycode;
		if(mycode){
			let datas = await config.etzAdmin.findOne({where:{invite2_code:mycode}})
			if(datas){
				let friend = await config.etzAdmin.findAll({where:{invite_code:mycode}})
				if(friend && friend.length>0){
					let arr = new Array();
					for(var i=0;i<friend.length;i++){
						let obj = {
							"email":friend[i].dataValues.email,
							"state":friend[i].dataValues.state,
							"totalInvet":friend[i].dataValues.totalInvet
						}
						arr.push(obj);
					}
					 return res.send(config.utils.result_req(0,"10010",arr))
				}
				return res.send(config.utils.result_req(-1,"10011",config.tips[lan].DATA_NULL));
			}
		}
		return res.send(config.utils.result_req(-1,"10011",config.tips[lan].PARAMS_ERROR));
	}catch(e){
		config.logger.error("friendData",config.utils.getFullTime(),e)
		return res.send(config.utils.result_req(-1,"10012",config.tips[lan].SOMETHING_ERROR))		
	}
	
}

module.exports = 
{
	friendData
}
