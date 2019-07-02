var config = require('../config');

class NodeClass{
  
  constructor() {
        this.node_max_value = 3000;//符合节点的3000USD
        this.node_Invet_com = 100000;//符合节点10万USD
        this.node_Invet_super = 300000;//符合节点10万USD
        this.per_week_time =10000;//604900000
        this.maps = new Map();
  }
	start(){
		let that = this;
		setInterval(function(){
			that.calNodePerWeek()
		},this.per_week_time)
	}
	 async calNodePerWeek(){
    //查找符合节点条件的用户
    let adminTotal = await config.etzAdmin.findAll();
    for(var ai=0;ai<adminTotal.length;ai++){
      let userid = adminTotal[ai].dataValues.e_id;
      let invite2_code = adminTotal[ai].dataValues.invite2_code;
      let type_4_total = adminTotal[ai].dataValues.type_4_total;//当天本人定投类型180天，总投资额
      if(type_4_total>this.node_max_value){
        let newUserType =0;
        let resultNode = teamCalFun(invite2_code)
        await config.etzAdmin.update({user_type:resultNode},{where:{e_id:userid}})
      }else{
        console.log("本人账号 定投180天小于3000美金")
      }
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
         let currentUserType = adminsuper[aj].dataValues.user_type;
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
}


var nodeClass = new NodeClass();
nodeClass.start()