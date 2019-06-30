var config = require('../../config');

getFinanceListByUserId = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;

		let user_id = obj.user_id;
		let f_type = obj.type;

		if(user_id&&f_type){
			let sf_Data;
			if(f_type==0){
				sf_Data = await config.financeData.findAll({where:{user_id:user_id},order:[['timestamps','DESC']]})
			}else{
				sf_Data = await config.financeData.findAll({where:{state:1,user_id:user_id,f_type:f_type}})
			}
			console.log("sf_Data----",sf_Data)
			console.log("user_id----",user_id)
			console.log("f_type----",f_type)
			let f_Data = await makeData(sf_Data,user_id,f_type);
				console.log("f_Data======",f_Data)
			
			if(f_Data && f_Data.length>0){
				return res.send(config.utils.result_req(0,"10010",f_Data));
			}
			return res.send(config.utils.result_req(-1,"10011","data is null"));
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"));
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

async function makeData(sf_Data,user_id,f_type){
	if(sf_Data&& sf_Data.length>0){
		let date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth()+1;
		let datex = date.getDate()-1;
		let lastdays = year+"-"+month+"-"+datex;

		let arr = new Array();
		for(var i=0;i<sf_Data.length;i++){
			let f_id = sf_Data[i].dataValues.e_id;
			let params={
				user_id:user_id,
				b_type:f_type,
				f_id:f_id,
				b_type_f:0}

			if(f_type==0){
				params = {
					user_id:user_id,
					f_id:f_id,
					b_type_f:0}
			}
			let dataBenefit = await config.benefitData.findAll({where:params,order:[['timestamps','DESC']]})						
			arr.push({"finance":sf_Data[i],"benefit":dataBenefit})
		}
		return arr;
	}
	return null;
}

module.exports = 
{
	getFinanceListByUserId
}
