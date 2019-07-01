var config = require('../config');

class TeamClass{
	constructor(){
		// this.objMember = new Map();
		// this.objInvet = new Map();
		this.objx={};
	}
	start(){
		let that = this
		setInterval(function(){
			that.loopTeam()
		},10000)
	}
	async  loopTeam(){
		try{
			let objMember = new Map();
			let objInvet = new Map();

			let userData = await config.etzAdmin.findAll();
			
			for(var i=0;i<userData.length;i++){
				//汇总团队人数
				//await this.teamMemberAndInvet(userData[i].dataValues.invite_code);
				 await this.memberInvetFun(userData[i].dataValues.invite_code,0,0);
				if(objMember.get(userData[i].dataValues.invite_code)){
					let nums = objMember.get(userData[i].dataValues.invite_code);
					nums = Number(nums)+Number(this.objx.num);
					objMember.set(userData[i].dataValues.invite_code,nums);
				}else{
					objMember.set(this.objx.code,this.objx.num)
					console.log("-----m,",objMember.get(this.objx.code))
				}
				if(objInvet.get(userData[i].dataValues.invite_code)){
					let invet = objInvet.get(userData[i].dataValues.invite_code);
					invet = Number(invet)+Number(this.objx.invet);
					objInvet.set(userData[i].dataValues.invite_code,invet);
				}else{
					objInvet.set(this.objx.code,this.objx.invet)
					console.log("-----I,",objInvet.get(this.objx.code))
				}
				
			}
			console.log("*****************************************")
			for(var ic=0;ic<userData.length;ic++){
				console.log("====",userData[ic].dataValues.invite2_code)
				console.log("-----",objMember.get(userData[ic].dataValues.invite2_code))
				console.log("-----",objInvet.get(userData[ic].dataValues.invite2_code))
					// await config.etzAdmin.update({
					// 	teamMember:objMember.get(userData[ic].dataValues.invite2_code),
					// 	teamInvet:objInvet.get(userData[ic].dataValues.invite2_code)
					// },{where:{e_id:userData[ic].dataValues.e_id}});
				
			}
			objMember = new Map();
			objInvet = new Map();
			// for(var ic=0;ic<userData.length;ic++){
			// 	//更新直推人数
			// 	await this.directMemberFun(userData[i])
			// 	if(this.objMember&& this.objMember.get(userData[ic].dataValues.invite2_code)){
			// 		let teamMember = this.objMember.get(userData[ic].dataValues.invite2_code);
			// 		await config.etzAdmin.update({
			// 			teamMember:teamMember
			// 		},{where:{e_id:userData[ic].dataValues.e_id}});
			// 	}

			// 	if(this.objInvet&&this.objInvet.get(userData[ic].dataValues.invite2_code)){
			// 		let teamInvet = this.objInvet.get(userData[ic].dataValues.invite2_code);
			// 		await config.etzAdmin.update({
			// 			teamInvet:teamInvet
			// 		},{where:{e_id:userData[ic].dataValues.e_id}});
			// 	}
			// }
			//  this.objMember = new Map();
			//  this.objInvet = new Map();
		}catch(e){
			console.log("e====",e)
		}
	}

	async  directMemberFun(user){
		let arrs = await config.etzAdmin.findAll({where:{invite_code:user.invite2_code}})
		if(arrs && arrs.length>0){
			await config.etzAdmin.update({
				directMember:arrs.length
			},{where:{e_id:user.e_id}});
		}
	}

	async memberInvetFun(mycode,index,invetValue){
		let inviterx = await config.etzAdmin.findOne({where:{invite2_code:mycode}});
		if(!inviterx){
			this.objx = {"code":mycode,"num":index,"invet":invetValue}
			return;
		}else{
			index++;
			let financeDatasx = await config.financeData.findAll({where:{user_id:inviterx.e_id,state:1}});
			if(financeDatasx && financeDatasx.length>0){
				for(var jk;jk<financeDatasx.length;jk++){
					invetValue+=Number(financeDatasx[jk].dataValues.f_value);
				}
			}
			
			await this.memberInvetFun(inviterx.invite_code,index,invetValue)
		}
	}
	async  teamMemberAndInvet(myCode){
		let inviterx = await config.etzAdmin.findOne({where:{invite2_code:myCode}})
		if(inviterx){
			console.log("-------------------member---",this.objMember)
			if(this.objMember && this.objMember.get(myCode)){
				let nums = this.objMember.get(myCode);
				this.objMember = Number(nums)+1;
				this.objMember.set(myCode,nums);
			}else{
				this.objMember.set(myCode,1)
			}
			let directInvetMember=0;
			let financeDatasx = await config.financeData.findAll({where:{user_id:inviterx.e_id,state:1}});
			if(financeDatasx && financeDatasx.length>0){
				for(var jk;jk<financeDatasx.length;jk++){
					directInvetMember+=Number(financeDatasx[jk].dataValues.f_value);
				}
			}
			if(this.objInvet && this.objInvet.get(myCode)){
				let invet = this.objInvet.get(myCode);
				invet = Number(invet)+directInvetMember;
				this.objInvet.set(myCode,invet);
			}else{
				this.objInvet.set(myCode,directInvetMember)
			}
			this.teamMemberAndInvet(inviterx.invite_code)
		}

	}
	async arrAddMember(code,value){
		if(this.objMember&& this.objMember.length>0){
			for(var ia=0;ia<this.objMember.length;ia++){
				if(this.objMember[ia].code==code){
					this.objMember[ia].value+=value
					break;
				}
			}
		}
		
	}
}

var team = new TeamClass();
team.start();