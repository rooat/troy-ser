var config = require('./config');

class TeamClass{
	constructor(){
		this.countMember =0;
		this.countInvet =0;
	}
	start(){
		let that = this
		setInterval(function(){
			that.loopTeam()
		},1000)
	}
	async  loopTeam(){
		try{
			let userData = await config.testM.findAll();
			for(var i=0;i<userData.length;i++){
				 await this.teamMemberAndInvet(userData[i].dataValues.invite2_code);
				 console.log("ddd",this.countMember)
				 console.log("aaa",this.countInvet)
				 // 	await config.etzAdmin.update({
					// 	teamMember:this.countMember,
					// 	teamInvet:this.countInvet
					// },{where:{e_id:userData[ic].dataValues.e_id}});
					this.countMember =0;
					this.countInvet=0;
			}

		}catch(e){
			console.log("e====",e)
		}
	}

	async  teamMemberAndInvet(myCode){
		let inviterx = await config.testM.findAll({where:{invite_code:myCode}})
		if(inviterx && inviterx.length>0){
			for(var ac=0;ac<inviterx.length;ac++){
				this.countMember++;
				console.log(ac)
				// let financeDatasx = await config.financeData.findAll({where:{user_id:inviterx.e_id,state:{$in:[1,2]}}});
				// if(financeDatasx && financeDatasx.length>0){
				// 	for(var jk;jk<financeDatasx.length;jk++){
				// 		this.countInvet+=Number(financeDatasx[jk].dataValues.f_value);
				// 	}
				// }
				this.teamMemberAndInvet(inviterx[ac].dataValues.invite2_code)
			}
		}else{
			return ;
		}

	}
}

var team = new TeamClass();
team.start();