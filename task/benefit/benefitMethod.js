var config = require('../../config')

var members =0;//团队名下人数
var node_count=0;//最多10代
var all_member_benefit_static=0;//当天所有总静态收益
var totalTeamInvet =0;//团队总定投
var invetTeamArr = new Array();//记录名下各团队总投资


//定时汇总更新伞下的总人数
  async function foreachAdmin(){
    let adminData = await config.etzAdmin.findAll();
    if(adminData && adminData.length>0){
      for(var ad=0;ad<adminData.length;ad++){
        let invite_code = adminData[ad].dataValues.invite_code;
        let invite2_code = adminData[ad].dataValues.invite2_code;
        let isNew = adminData[ad].dataValues.isNew;
        let userid = adminData[ad].dataValues.e_id;
        let totalStaticBenefit = adminData[ad].dataValues.totalStaticBenefit;//当前有效静态收益
        let totalStaticBenefit = adminData[ad].dataValues.totalStaticBenefit;//当前总静态收益
        let totalStaticBenefit = adminData[ad].dataValues.totalStaticBenefit;//当前有效总收益
        let totalStaticBenefit = adminData[ad].dataValues.totalStaticBenefit;//累计总收益
        let invitor_id =0;
        let invitor_invite=0;
        //推荐人
        let invitor =  await config.etzAdmin.findOne({where:{invite2_code:invite_code}});
        if(invitor){
          invitor_id = invitor.e_id;
          invitor_invite = invitor.invite_code;
        }
        //计算直推奖35%
        await calculate_benefit_35(userid,isNew,totalStaticBenefit,invitor_id,invitor_invite);
        let node_benefit_totale = all_member_benefit_static*75/1000;
        let commNode = await config.etzAdmin.findAll({where:{"user_type":1}})
        let superNode = await config.etzAdmin.findAll({where:{"user_type":2}})

        await node_benefit(node_benefit_totale,commNode,0)
        await node_benefit(node_benefit_totale,superNode,1)
        all_member_benefit_static=0;

        //计算团队总定投，和总人数
        await calTotalInvetMember(invite2_code)
        //写入数据库并清0
        await config.etzAdmin.update({
          teamInvet:totalTeamInvet,
          teamMember:members
          },{
            where:{
              e_id:userid
            }
          })
        totalTeamInvet = 0;
        members = 0;
       }
    }
  }

  //汇总，各团队总定存量
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

  async function calculate_benefit_35(userid,isNew,totalStaticBenefit,invitor_id,invite_code){
    let datas = await config.financeData.findAll({where:{"state":1,"user_id":userid}});
    let currentTime = new Date().getTime()
    if(datas!=null && datas.length>0){
      let ower_benefit_day =0;//个人当天所有静态收益
      let type_1_total=0;
      let type_2_total=0;
      let type_3_total=0;
      let type_4_total=0;
      let personalTotal =0 //个人当天所有总定存量
      for(var ae=0;ae<datas.length;ae++){
        let end_time = Number(datas[ae].dataValues.f_finance_time);
        if(end_time<currentTime){
          let benefit_one=0;
          personalTotal += datas[ae].dataValues.f_value;//累加当天个人定存
          let ff_type = datas[ae].dataValues.f_type
          if(ff_type==1){
             type_1_total += Number(datas[ae].dataValues.f_value);
            if(isNew==1){//如果首次体验 0.8%
               benefit_one = Number(datas[ae].dataValues.f_value)*8/1000;
               await config.etzAdmin.update({isNew:2},{where:{e_id:userid}})
            }else{
               //收益= 投资额的0.5%；
               benefit_one = Number(datas[ae].dataValues.f_value)*5/1000;
            }
          }else if(ff_type==2){
            type_2_total += Number(datas[ae].dataValues.f_value);
            benefit_one = Number(datas[ae].dataValues.f_value)*1/100;
          }else if(ff_type==3){
            type_3_total += Number(datas[ae].dataValues.f_value);
            benefit_one = Number(datas[ae].dataValues.f_value)*12/1000;
          }else if(ff_type==4){
            type_4_total += Number(datas[ae].dataValues.f_value);
            benefit_one = Number(datas[ae].dataValues.f_value)*15/1000;
          }
          all_member_benefit_static+=benefit_one;//累计当天所有静态收益总和

          ower_benefit_day+=benefit_one;//累计当天个人静态收益总和
          await config.benefitData.create({
                b_type:ff_type,
                b_value:benefit_one,
                b_type_f:0,
                timestamps:new Date(config.utils.getTimeDate()).getTime(),
                user_id:userid,
                f_id:datas[ae].dataValues.e_id,
                operate:0
          })
        }else{//合约时间到期，本金返还
          timeIsStopFun(datas[ae].dataValues.f_value,userid,datas[ae].dataValues.e_id);
        }
      }
      let newTotalBenefit = Number(totalStaticBenefit)+Number(ower_benefit_day)
      await config.etzAdmin.update({
        totalInvetDay:personalTotal,
        totalBenefit:newTotalBenefit,
        staticBenefitDay:ower_benefit_day,
        type_1_total:type_1_total,
        type_2_total:type_2_total,
        type_3_total:type_3_total,
        type_4_total:type_4_total
      },{where:{e_id:userid}})
      

      if(invitor_id!=0){
        let invit_benefit_day = ower_benefit_day*35/100;
        await config.benefitData.create({
            b_type:ff_type,
            b_value:invit_benefit_day,
            b_type_f:1,
            timestamps:new Date(config.utils.getTimeDate()).getTime(),
            user_id:invitor_id,
            operate:0
        })
        //计算50%；
        refferr_benefit_50(ff_type,invit_benefit_day,invite_code)
      }
    }
  }
  
  //计算10代奖励，对半分，
  async function refferr_benefit_50(b_type,benfit_35,invite_code){
    let reffer = await config.etzAdmin.findOne({where:{invite2_code:invite_code}})
    if(reffer){
        let ref_benefit = benfit_35*50/100;
        await config.benefitData.create({
          b_type:b_type,
          b_value:ref_benefit,
          b_type_f:2,
          timestamps:new Date(config.utils.getTimeDate()).getTime(),
          user_id:reffer.e_id,
          operate:0
        })

        node_count++
        if(node_count<=10){
          refferr_benefit_50(ref_benefit,reffer.invite_code);
        }
    }
    
  }
  //合约时间到期，本金返还
  async function timeIsStopFun(fin_value,userid,e_id){
      await config.financeData.update({state:2},{where:{e_id:e_id}})
      let user = await config.etzAdmin.findOne({where:{e_id:userid}});

      let newValue = Number(user.usd_value)+Number(fin_value);
      await config.etzAdmin.update({usd_value:newValue},{where:{e_id:userid}});

  }

  module.exports={
    foreachAdmin
  }