var config = require('../../config');
var objMember = new Map();
var objInvet = new Map();

async function loopTeam(){
	objMember = new Map();
	 objInvet = new Map();
	 
	let userData = await config.etzAdmin.findAll();
	
	for(var i=0;i<userData.length;i++){
		//汇总团队人数
		await teamMemberAndInvet(userData[i].dataValues.invite_code);
	}
	for(var ic=0;ic<userData.length;ic++){
		//更新直推人数
		await directMemberFun(userData[i])
		if(objMember.get(userData[ic].dataValues.invite2_code)){
			let teamMember = objMember.get(userData[ic].dataValues.invite2_code);
			await config.etzAdmin.update({
				teamMember:teamMember
			},{where:{e_id:userData[ic].dataValues.e_id}});
		}

		if(objInvet.get(userData[ic].dataValues.invite2_code)){
			let teamInvet = objInvet.get(userData[ic].dataValues.invite2_code);
			await config.etzAdmin.update({
				teamInvet:teamInvet
			},{where:{e_id:userData[ic].dataValues.e_id}});
		}
	}
	 objMember = new Map();
	 objInvet = new Map();
}

async function directMemberFun(user){
	let arrs = await config.etzAdmin.findAll({where:{invite_code:user.invite2_code}})
	if(arrs && arrs.length>0){
		await config.etzAdmin.update({
			directMember:arrs.length
		},{where:{e_id:user.e_id}});
	}
}

async function teamMemberAndInvet(myCode){
	let inviterx = await config.etzAdmin.findOne({where:{invite2_code:myCode}})
	if(inviterx){
		if(objMember.get(myCode)){
			let nums = objMember.get(myCode);
			objMember = Number(nums)+1;
			objMember.set(myCode,nums);
		}else{
			objMember.set(myCode,1)
		}
		let directInvetMember=0;
		let financeDatasx = await config.financeData.findAll({where:{user_id:inviterx.e_id,state:1}});
		if(financeDatasx && financeDatasx.length>0){
			for(var jk;jk<financeDatasx.length;jk++){
				directInvetMember+=Number(financeDatasx[jk].dataValues.f_value);
			}
		}
		if(objInvet.get(myCode)){
			let invet = objInvet.get(myCode);
			invet = Number(invet)+directInvetMember;
			objInvet.set(myCode,invet);
		}else{
			objInvet.set(myCode,directInvetMember)
		}
		teamMemberAndInvet(inviterx.invite_code)
	}

}

module.exports={
	loopTeam
}