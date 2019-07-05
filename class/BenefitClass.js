var config = require('../config');
      
class BenefitClass{
	constructor(){
		this.totalStaticBenefitDay =0;
		this.nextTime = new Date(config.utils.nextTimeFormat()).getTime();
		this.zcprice_usd =0;
		this.isNewMap = new Map();
	}
	async start(){
		let that = this;
		setInterval(async function(){
			console.log("=========benefit-------")
		    //  if(new Date().getTime()>that.nextTime){
		      	let zc = await config.priceData.findOne({where:{symbol:"ZC"}})
				that.zcprice = zc.price_usd
		        that.loopBenefit();
		        that.nextTime = new Date(config.utils.nextTimeFormat()).getTime();
		    //  }
		},config.benefitTimeCal)
		
	}

	async  loopBenefit(){
		try{
			let userData = await config.etzAdmin.findAll();
			
			for(var i=0;i<userData.length;i++){
				//将上一个周期到期的产品状态改为2；
				await this.updateState(userData[i])
				//静态收益
				await this.staticBenefit(userData[i]);

			}
			await this.nodeAndsuperBenefit()
			
		}catch(e){
	        config.logger.error("BenefitClass error",config.utils.getFullTime(),e)
	    }
	}
	//节点 超级节点分配收益
	async nodeAndsuperBenefit(){
		let nodeData = await config.etzAdmin.findAll({where:{user_type:{$in:[1,2]}}})
		if(nodeData && nodeData.length>0 && this.totalStaticBenefitDay>0){
			let benefitss = Number(this.totalStaticBenefitDay)*7.5/100;
			let benefitss_per = benefitss/nodeData.length;
			for(var ia=0;ia<nodeData.length;ia++){
				//节点平分所有静态收益的7.5%
				//更新动态收益
			    let lock_values = Number(nodeData[ia].dataValues.lock_values)+(benefitss_per*Number(this.zcprice)*30/100);
			    let newBlances = benefitss_per + Number(nodeData[ia].dataValues.benefitBalance)
		        let totals = benefitss_per +Number(nodeData[ia].dataValues.totalBenefit)
			    await config.etzAdmin.update({
		        	benefitBalance :newBlances,
		        	totalBenefit :totals,
		        	lock_values:lock_values
		        },{where:{e_id:nodeData[ia].dataValues.e_id}})
			}
		}
		this.totalStaticBenefitDay=0;
	}


	async  updateState(user){
		let financeDatas = await config.financeData.findAll({where:{user_id:user.e_id,state:1}});
		if(financeDatas && financeDatas.length>0){
			for(var jk=0;jk<financeDatas.length;jk++){
				if(Number(financeDatas[jk].dataValues.f_finance_time)<new Date().getTime()){
					await config.financeData.update({
						state:2
					},{where:{e_id:financeDatas[jk].e_id}})
				}
			}
		}
		
	}
//=========================================================================================================================
	//计算静态收益
	async  staticBenefit(user){

		let currentTime = new Date().getTime();
		let financeData = await config.financeData.findAll({where:{user_id:user.e_id,state:1,f_finance_time:{$gt:currentTime}}});
		if(financeData && financeData.length>0){
			let type_1_total =0; //当日类型1 总投资额；
			let type_2_total =0; //当日类型2 总投资额；
			let type_3_total =0; //当日类型3 总投资额；
			let type_4_total =0; //当日类型4 总投资额；

			let benefitStaticDay =0;//当日静态收益总和
			for(var j=0;j<financeData.length;j++){
				let ff_type = financeData[j].dataValues.f_type
				let benefit_one=0;//当前产品理财收益；
				let invet_value = Number(financeData[j].dataValues.f_value);
				  if(ff_type==1){
				  		type_1_total+=invet_value;
			            if(user.isNew==1){//如果首次体验 0.8%
			            	if(this.isNewMap.get(user.email)){
			            		if(this.isNewMap.get(user.email)==6){
			            			await config.etzAdmin.update({isNew:2},{where:{e_id:user.e_id}})
			            		}else{
			            			let count = Number(this.isNewMap.get(user.email))+1;
			            			this.isNewMap.set(user.email,count);
			            		}
			            	}else{
			            		this.isNewMap.set(user.email,1)
			            	}
			               
			               benefit_one = invet_value*8/1000;
			               
			            }else{
			               //收益= 投资额的0.5%；
			               benefit_one = Number(invet_value)*5/1000;
			            }
		          }else if(ff_type==2){
		          	type_2_total+=invet_value;
		            benefit_one = invet_value*1/100;
		          }else if(ff_type==3){
		          	type_3_total+=invet_value;
		            benefit_one = invet_value*12/1000;
		          }else if(ff_type==4){
		          	type_4_total+=invet_value;
		            benefit_one = invet_value*15/1000;
		          }
	          //记录当天收益
	          await config.benefitData.create({
	                b_type:ff_type,
	                b_value:benefit_one,
	                b_type_f:0,//静态收益
	                timestamps:new Date(config.utils.getTimeDate()).getTime(),
	                user_id:user.e_id,
	                f_id:financeData[j].dataValues.e_id,
	                operate:0
	          })
	          benefitStaticDay += benefit_one
	          this.totalStaticBenefitDay+=benefit_one;

			}
			console.log("benefitStaticDay===",benefitStaticDay)
	          console.log("this.totalStaticBenefitDay=---",this.totalStaticBenefitDay)
			//新的收益

			let newStaticBenefitBalance = benefitStaticDay+Number(user.staticBenefitBalance);
			let newTotalStaticBenefit =benefitStaticDay+Number(user.totalStaticBenefit);
			let newBenefitBalance =benefitStaticDay+Number(user.benefitBalance);
			let newTotalBenefit =benefitStaticDay+Number(user.totalBenefit);
			
			let new_type_1_total = type_1_total +Number(user.type_1_total);
			let new_type_2_total = type_2_total +Number(user.type_2_total);
			let new_type_3_total = type_3_total +Number(user.type_3_total);
			let new_type_4_total = type_4_total +Number(user.type_4_total);
			//更新收益
			await config.etzAdmin.update({
				staticBenefitBalance:newStaticBenefitBalance,
				totalStaticBenefit: newTotalStaticBenefit,
				benefitBalance : newBenefitBalance,
				totalBenefit : newTotalBenefit,
				type_1_total: new_type_1_total,
				type_2_total: new_type_2_total,
				type_3_total: new_type_3_total,
				type_4_total: new_type_4_total
			},{where:{e_id:user.e_id}});

			let invite_code = user.invite_code;//推荐人
			let invitor = await config.etzAdmin.findOne({where:{invite2_code:invite_code}});
			if(invitor){//如果推荐人存在
				let invit_benefit_day = benefitStaticDay*35/100;//直推人奖励。，推荐人的动态收益
		        await config.benefitData.create({
		            b_type:0,
		            b_value:invit_benefit_day,
		            b_type_f:1,//直推奖励
		            timestamps:new Date(config.utils.getTimeDate()).getTime(),
		            user_id:invitor.e_id,
		            operate:0,
		            f_id:0
		        })
		        let lock_values = Number(invitor.lock_values)+(invit_benefit_day*Number(this.zcprice)*30/100);
		        let invit_benefit_day_bal = invit_benefit_day*70/100;

		        let newBlance = invit_benefit_day_bal + Number(invitor.benefitBalance)
		        let total = invit_benefit_day +Number(invitor.totalBenefit)
		        

		        //更新动态收益
		        await config.etzAdmin.update({
		        	benefitBalance :newBlance,
		        	totalBenefit :total,
		        	lock_values:lock_values
		        },{where:{e_id:invitor.e_id}})

		        let invite_invite_code = invitor.invite_code;//推荐人的推荐人
		        await this.refferr_benefit_50(invit_benefit_day,invite_invite_code)
			}
		}
	}
	// select benefitBalance ,totalBenefit,lock_values from etzadmin where e_id=1;
	// update etzadmin  set benefitBalance=0 where e_id=1;
	// update etzadmin  set totalBenefit=0 where e_id=1;
	// update etzadmin  set lock_values=0 where e_id=1;
	 //计算10代奖励，对半分，
	async  refferr_benefit_50(invit_benefit_day,invite_invite_code){
		let invite_codex = invite_invite_code;
		let new_benfit = invit_benefit_day
		for(var k=0;k<9;k++){
			let invitor_invite = await config.etzAdmin.findOne({where:{invite2_code:invite_codex}});
		    if(invitor_invite){//如果推荐人的推荐人存在，将获得动态奖励的50%；
		    	let invite_invite_benefit = new_benfit *50/100;
		    	invite_codex = invitor_invite.invite_code;
		    	new_benfit = invite_invite_benefit;
		    	await config.benefitData.create({
			      b_type:0,
			      b_value:invite_invite_benefit,
			      b_type_f:2,//见点奖励
			      timestamps:new Date(config.utils.getTimeDate()).getTime(),
			      user_id:invitor_invite.e_id,
			      operate:0,
			      f_id:0
			    })
			    //更新动态收益
			    let lock_values = Number(invitor_invite.lock_values)+(invite_invite_benefit*Number(this.zcprice)*30/100);

			    let newBlances = invite_invite_benefit + Number(invitor_invite.benefitBalance)
		        let totals = invite_invite_benefit +Number(invitor_invite.totalBenefit)
			    await config.etzAdmin.update({
		        	benefitBalance :newBlances,
		        	totalBenefit :totals,
		        	lock_values:lock_values
		        },{where:{e_id:invitor_invite.e_id}})
		    }else{
		    	console.log("invite_invite  null......")
		    	break;
		    }
		}
	}

}

var benefitClass = new BenefitClass()
benefitClass.start()

