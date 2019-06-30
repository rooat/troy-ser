var obj = new Map();

function loopUser(){
	let userData = await config.etzAdmin.findAll();
	
	for(var i=0;i<userData.length;i++){
		//将上一个周期到期的产品状态改为2；
		await updateState(userData[i])
		//静态收益
		await staticBenefit(userData[i]);
		//汇总团队人数
		await teamMemberAndInvet(userData[i].dataValues.invite_code);
	}
	for(var ic=0;ic<userData.length;ic++){
		if(obj.get(userData[ic].dataValues.invite2_code)){
			let teamMember = obj.get(userData[ic].dataValues.invite2_code);
		}
	}
}

async function directMemberFun(mycode){
	let counts = await config.etzAdmin.findAll({where:{invite2_code}})
}

async function teamMemberAndInvet(myCode){
	let inviterx = await config.etzAdmin.findOne({where:{invite2_code:myCode}})
	if(inviterx){
		if(obj.get(myCode)){
			let nums = obj.get(myCode);
			nums = Number(nums)+1;
			obj.set(myCode,nums);
		}else{
			obj.set(myCode,1)
		}
		teamMemberAndInvet(inviterx.invite_code)
	}
	// let directMember =0;//直推人数
	// let directInvetMember =0;//直推投资总额
	// if(teamsArr && teamsArr.length>0){
	// 	 directMember= teamsArr.length;
	// 	for(var ik=0;ik<teamsArr.length;ik++){
	// 		let financeDatasx = await config.financeData.findAll({where:{user_id:teamsArr[ik].dataValues.e_id,state:1}});
	// 		if(financeDatasx && financeDatasx.length>0){
	// 			for(var jk;jk<financeDatasx.length;jk++){
	// 				directInvetMember+=Number(financeDatasx[jk].dataValues.f_value);
	// 			}
	// 		}
	// 	}
	// }
}



async function calTotalInvetMember(invite2_code){
    let adminsx = await config.etzAdmin.findAll({where:{invite_code:invite2_code}})
    if(adminsx && adminsx.length>0){
      for(var ah;ah<adminsx.length;ah++){
        members++;
        totalTeamInvet+=Number(adminsx[ah].dataValues.totalInvetDay);
        let invite2_codes = adminsx.invite2_code;
        calTotalInvet(invite2_codes);
      }
    }
  }

  async function node_benefit(benefit,adminArr,types){
    let comm_node_per = Number(benefit)/adminArr.length;
    for(var af;af<adminArr.length;af++){
      await config.nodeBenefitData.create({
        b_value:comm_node_per,
        b_value_f:types,
        timestamps:new Date(config.utils.getTimeDate()).getTime(),
        user_id:adminArr[af].dataValues.e_id,
        operate:0
      })
    }
  }



async function updateState(user){
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

//计算静态收益
async function staticBenefit(user){

	let currentTime = new Date().getTime();
	let financeData = await config.financeData.findAll({where:{user_id:user.e_id,state:1,f_finance_time:{$gt:currentTime}}});
	if(financeData && financeData.length>0){
		let benefitStaticDay =0;//当日静态收益总和
		for(var j=0;j<financeData.length;j++){
			let ff_type = dataValues.f_type
			let benefit_one=0;//当前产品理财收益；
		  if(ff_type==1){
	            if(isNew==1){//如果首次体验 0.8%
	               benefit_one = Number(datas[j].dataValues.f_value)*8/1000;
	               await config.etzAdmin.update({isNew:2},{where:{e_id:user.e_id}})
	            }else{
	               //收益= 投资额的0.5%；
	               benefit_one = Number(datas[j].dataValues.f_value)*5/1000;
	            }
          }else if(ff_type==2){
            benefit_one = Number(datas[j].dataValues.f_value)*1/100;
          }else if(ff_type==3){
            benefit_one = Number(datas[j].dataValues.f_value)*12/1000;
          }else if(ff_type==4){
            benefit_one = Number(datas[j].dataValues.f_value)*15/1000;
          }
          //记录当天收益
          await config.benefitData.create({
                b_type:ff_type,
                b_value:benefit_one,
                b_type_f:0,//静态收益
                timestamps:new Date(config.utils.getTimeDate()).getTime(),
                user_id:user.e_id,
                f_id:datas[j].dataValues.e_id,
                operate:0
          })
          benefitStaticDay += benefit_one
		}
		//新的收益
		let newStaticBenefitBalance = benefitStaticDay+Number(user.staticBenefitBalance);
		let newTotalStaticBenefit =benefitStaticDay+Number(user.totalStaticBenefit);
		let newBenefitBalance =benefitStaticDay+Number(user.benefitBalance);
		let newTotalBenefit =benefitStaticDay+Number(user.totalBenefit);
		//更新收益
		await config.etzAdmin.update({
			staticBenefitBalance:newStaticBenefitBalance,
			totalStaticBenefit: newTotalStaticBenefit,
			benefitBalance : newBenefitBalance,
			totalBenefit : newTotalBenefit
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
	            operate:0
	        })
	        let newBlance = invit_benefit_day + Number(invitor.benefitBalance)
	        let total = invit_benefit_day +Number(invitor.totalBenefit)
	        //更新动态收益
	        await config.etzAdmin.update({
	        	benefitBalance :newBlance,
	        	totalBenefit :total
	        },{where:{e_id:invitor.e_id}})

	        let invite_invite_code = invitor.invite_code;//推荐人的推荐人
	        await refferr_benefit_50(invit_benefit_day,invite_invite_code)
		}
	}
}

 //计算10代奖励，对半分，
async function refferr_benefit_50(invit_benefit_day,invite_invite_code){
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
		      operate:0
		    })
		    let newBlances = invite_invite_benefit + Number(invitor_invite.benefitBalance)
	        let totals = invite_invite_benefit +Number(invitor_invite.totalBenefit)
		    await config.etzAdmin.update({
	        	benefitBalance :newBlances,
	        	totalBenefit :totals
	        },{where:{e_id:invitor_invite.e_id}})
	    }
	}
}


