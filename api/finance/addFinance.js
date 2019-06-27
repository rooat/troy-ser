var config = require('../../config');

addFinance = async (req, res, next) => {
	try{
		let obj = await config.utils.getObj(req,config);
		if(obj.type==-1){
			return res.send(obj.data);
		}
		obj = obj.data;

		//1，2，3，4
		let email = obj.email_num;
		let trade_pad = obj.trade_pad;
		let f_type = obj.type;
		let f_amount = obj.value;
		let f_benefit_time = obj.benefit_time;
		let f_finance_time = obj.finance_time;


		if(trade_pad && f_type &&config.utils.IsEmail(email) && config.utils.IsNumber(f_amount) && config.utils.IsDate(f_benefit_time) && config.utils.IsDate(f_finance_time)){
			let now = new Date().getTime()
			if(new Date(f_benefit_time).getTime()>now&& new Date(f_finance_time).getTime()>now){
				let pwd = config.utils.md5(trade_pad);
				let user = await config.etzAdmin.findOne({where:{email:email,trade_pwd_origin:pwd}});
				if(user){
					let usd = user.usd_value;
					if(Number(usd)>0 && Number(usd)>=Number(f_amount)){
						let newUsd = Number(usd)-Number(f_amount);
						await config.etzAdmin.update({usd_value:newUsd,isInveted:1},{where:{e_id:user.e_id}})
						await config.financeData.create({
							f_type:f_type,
							f_value:f_amount,
							timestamps:now,
							f_benefit_time:f_benefit_time,
							f_finance_time:f_finance_time,
							end_time:"0000-00-00",
							user_id:user.e_id,
							state:1
						})
						return res.send(config.utils.result_req(0,"10010","success"))
					}
					return res.send(config.utils.result_req(-1,"10011","balance invalid"))
				}
				return res.send(config.utils.result_req(-1,"10011","email or password invalid"))
			}
			return res.send(config.utils.result_req(-1,"10011","time invalid"))
		}
		return res.send(config.utils.result_req(-1,"10011","params invalid"))
	}catch(e){
		console.log("e:",e)
		return res.send(config.utils.result_req(-1,"10012","error"))
	}
	
}

module.exports = 
{
	addFinance
}
