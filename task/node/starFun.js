var config = require('../../config');

var node_max_value = 3000;//符合节点的3000USD
var node_Invet_com = 100000;//符合节点10万USD
var node_Invet_super = 300000;//符合节点10万USD
var per_week_time =10000;//604800000

class NodeClass{
	start(){
		let that = this;
		setInterval(function(){
			that.calNodePerWeek()
			that.examineSuper();
		},per_week_time)
	}
	 async calNodePerWeek(){
    //查找符合节点条件的用户
    let adminTotal = await config.etzAdmin.findAll();
    for(var ai;ai<adminTotal.length;ai++){
      let invite2_code = adminTotal[ai].dataValues.invite2_code;
      let type_4_total = adminTotal[ai].dataValues.type_4_total;
      let userid = adminTotal[ai].dataValues.e_id;
      let resultNode = teamCalFun(invite2_code)
      let newUserType =0;
      if(resultNode==1 && type_4_total>node_max_value){//符合节点要求
        newUserType=1;
      }else if(resultNode==2 && type_4_total>node_max_value){//符合超级节点要求
        newUserType=2;
      }
      await config.etzAdmin.update({user_type:newUserType},{where:{e_id:userid}})
    }
  }
 
  //查找node节点，递归用户下的团队成员，筛选出最大值，并累加其他值
  async teamCalFun(invite2_code){
    
    let adminsx = await config.etzAdmin.findAll({where:{invite_code:invite2_code}})
    if(adminsx && adminsx.length>0){
      let arr = new Array();
      let countNode = 0;
      let total =0;
      for(var aj;aj<adminsx.length;aj++){
         let teamInvets = Number(adminsx[aj].dataValues.teamInvet);
         arr.push(teamInvets)
         total += Number(teamInvets)
         let currentUserType = adminsuper[aj].dataValues.user_type;
          if(currentUserType==1){
            countNode++;
          }
      }
      let max = Math.max(...arr);
      total -=Number(max);
      if(total>node_Invet_com){//符合节点要求
        if(countNode==3 || total>node_Invet_super){//符合超级节点要求
          return 2;
        }
        return 1;
      }
    }
    return 0;
  }

  //计算符合条件的节点
  async examineSuper(){
    //查看定存180天
    let currentDate = new Date(timeUtil.getTimeDate()).getTime();
    let lastTime = currentDate-per_week_time;
    let type_data = await config.benefitData.findAll({where:{f_type:4,timestamps:{gt:lastTime,lt:currentDate}}})
    if(type_data && type_data.length>0){
      let total_node;//符合节点要求的总和
      for(var ag;ag<type_data.length;ag++){

      }
    }
    
  }

}


var nodeClass = new NodeClass();
nodeClass.start()