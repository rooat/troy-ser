var config = require('../config');

class NodeClass{
  
  constructor() {
        this.countMember =0;
        this.countInvet =0;
        this.node_max_value = 3000;//符合节点的3000USD
        this.node_Invet_com = 100000;//符合节点10万USD
        this.node_Invet_super = 300000;//符合节点10万USD
        this.maps = new Map();
        this.nextDay = new Date(config.utils.nextWeekend()).getTime();
        this.startCal = false;
  }
	start(){
		let that = this;
		setInterval(async function(){
      console.log("teamcal .....")
      console.log("current...",new Date().getTime())
      console.log("that nextDay...",that.nextDay)
      if(new Date().getTime()>that.nextDay){
        await that.loopTeam()
        await that.calNodePerWeek();
        that.nextDay = new Date(config.utils.nextWeekend()).getTime();
      }
		},60000)
	}

   

	 async calNodePerWeek(){
    //查找符合节点条件的用户
    try{
      let adminTotal = await config.etzAdmin.findAll();
      for(var ai=0;ai<adminTotal.length;ai++){
        let userid = adminTotal[ai].dataValues.e_id;
        let invite2_code = adminTotal[ai].dataValues.invite2_code;
        let type_4_total = adminTotal[ai].dataValues.type_4_total;//当天本人定投类型180天，总投资额
        if(type_4_total>this.node_max_value){
          let newUserType =0;
          let resultNode = this.teamCalFun(invite2_code)
          await config.etzAdmin.update({user_type:resultNode},{where:{e_id:userid}})
        }else{
          console.log("本人账号 定投180天小于3000美金")
        }
      }
    }catch(e){
        config.logger.error("nodeclass error",config.utils.getFullTime(),e)
    }
  }


 
  //查找node节点，递归用户下的团队成员，筛选出最大值，并累加其他值
  async teamCalFun(invite2_code){
    
    let adminsx = await config.etzAdmin.findAll({where:{invite_code:invite2_code}})
    if(adminsx && adminsx.length>0){
      let arr = new Array();
      let countNode = 0;
      let total =0;
      for(var aj=0;aj<adminsx.length;aj++){
         let teamInvets = Number(adminsx[aj].dataValues.teamInvet);
         arr.push(teamInvets)
         total += Number(teamInvets)
         let currentUserType = adminsx[aj].dataValues.user_type;
          if(currentUserType==1){
            countNode++;
          }
      }
      let max = Math.max(...arr);
      total -=Number(max);
      if(total>this.node_Invet_com){//符合节点要求
        if(countNode==3 || total>this.node_Invet_super){//符合超级节点要求
          return 2;
        }
        return 1;
      }
    }
    return 0;
  }
  ///team....
  async  loopTeam(){
    try{
      let userData = await config.etzAdmin.findAll();
      for(var i=0;i<userData.length;i++){
         await this.teamMemberAndInvet(userData[i].dataValues.invite2_code);
          await config.etzAdmin.update({
            teamMember:this.countMember,
            teamInvet:this.countInvet
          },{where:{e_id:userData[i].dataValues.e_id}});
          this.countMember =0;
          this.countInvet=0;
      }

    }catch(e){
      config.logger.error("TeamClass error",config.utils.getFullTime(),e)
    }
  }

  async  teamMemberAndInvet(myCode){
    let inviterx = await config.etzAdmin.findOne({where:{invite_code:myCode}})
    if(inviterx && inviterx.length>0){
      for(var ac=0;ac<inviterx.length;ac++){
        this.countMember++;
        let financeDatasx = await config.financeData.findAll({where:{user_id:inviterx.e_id,state:{$in:[1,2]}}});
        if(financeDatasx && financeDatasx.length>0){
          for(var jk;jk<financeDatasx.length;jk++){
            this.countInvet+=Number(financeDatasx[jk].dataValues.f_value);
          }
        }
        this.teamMemberAndInvet(inviterx[ac].dataValues.invite2_code)
      }
    }else{
      return ;
    }

  }

}



var nodeClass = new NodeClass();
nodeClass.start()