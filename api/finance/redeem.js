var config = require('../../config');
redeem = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;
		
		let f_id = obj.f_id;
		let email = obj.email_num;
		let password = obj.trade_pwd;

		if(f_id && email && password&& config.utils.IsEmail(email)){
			let finance = await config.financeData.findOne({where:{e_id:f_id,state:1}})
			if(finance){
				let endTime = new Date(finance.f_finance_time).getTime()
				let current = new Date().getTime();
				if(Number(endTime) >current){
					let userId = finance.user_id;
					let pwd = config.utils.md5(password);
					let user = await config.etzAdmin.findOne({where:{e_id:userId,email:email,trade_pwd_origin:pwd}})
					if(user){
						let now = config.utils.getFullTime()
						let fin_value = finance.f_value;
						let origin_value = user.usd_value;
						origin_value = Number(origin_value)+ Number(fin_value);
						 await config.etzAdmin.update({usd_value:origin_value},{where:{e_id:user.e_id}})
						 await config.financeData.update({state:2,end_time:now},{where:{e_id:finance.e_id}})
						return res.send(config.utils.result_req(0,"10010","success"))
					}
					return res.send(config.utils.result_req(-1,"10011","email or password invalid")) 
				}
				return res.send(config.utils.result_req(-1,"10011","time invalid"))
			}
			return res.send(config.utils.result_req(-1,"10011","f_id invalid"))
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"))
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"))		
	}
	
}

module.exports = 
{
	redeem
}
