var config = require('../../config');

//计算当前理财类型正在进行的总投资额
async function calculateBalanceAll(userId,state,b_type_f){
    let lastdays = config.utils.lastTimeFormat();
    let sqlBenefit = "select sum(f_value) as sum from financedata where user_id=? and state=? and f_type=?";
    let params =[userId,state,b_type_f]
    let balance= await config.utils.queryFromSql(config,sqlBenefit,params);
    balance = balance.result[0].sum;
    return balance;
}

// 计算当前理财类型 静态收益总和，b_type 为理财类型ID.   b_type_f 0为静态收益。
async function benefitAll(userId,b_type,b_type_f){
    let sqlBenefit = "select sum(b_value) as sum from benefitdata where user_id=? and b_type=? and b_type_f=?";
    let params =[userId,b_type,b_type_f]
    let balance= await config.utils.queryFromSql(config,sqlBenefit,params);
    balance = balance.result[0].sum;
    return balance;
} 
//计算昨日当前类型 总收益
async function benefitLast(userId,b_type,b_type_f,timestamps){
    let sqlBenefit = "select sum(b_value) as sum from benefitdata where user_id=? and b_type=? and b_type_f=0 and timestamps=?";
    let params =[userId,b_type,0,timestamps]
    let balance= await config.utils.queryFromSql(config,sqlBenefit,params);
    balance = balance.result[0].sum;
    return balance;
}


//获取收益列表 user_id:userId,b_type:type,b_type_f:kind
async function list_benefit(userId,b_type,b_type_f){
	let sql = "select * from benefitdata where user_id=? and b_type=? and b_type_f=? order by timestamps desc";
	let params =[userId,b_type,b_type_f];
	let list = await config.utils.queryFromSql(config,sql,params)
	return list.result;
}
//获取收益列表 user_id:userId,b_type:type,b_type_f:kind
async function list_benefit_by_user_id(userId,page,pageSize){
	let pg = (Number(page)-1)*pageSize;
	let sql = "select * from benefitdata where user_id=? order by timestamps desc limit "+pg+","+pageSize;
	let params =[userId];
	let list = await config.utils.queryFromSql(config,sql,params)
	return list.result;
}

//获取用户理财列表
async function list_finance(userId,page,pageSize,index){
    let pg = (Number(page)-1)*pageSize;
    let params =[userId];
    let sql2=" ";
    if(index!=-1){
        sql2 = "and f_type=? ";
        params.push(index)
    }
    let sql = "select * from financedata where user_id=? "+sql2+" order by timestamps desc limit "+pg+","+pageSize;
    
    let list = await config.utils.queryFromSql(config,sql,params)
    return list.result;
}

//获取该理财产品的总收益  昨日收益
async function benefitall_finace_by_f_id(userId,f_id,f_type,index,timestamps){
    let sql2=" user_id=? and f_id=? and b_type_f=? "
    let params = [userId,f_id,0]; 
    if(f_type!=0){
        params.push(f_type)
        sql2 +=" and b_type=? "
    }
    if(index==-1){
        sql2 +=" and timestamps='?' "
        params.push(timestamps)
    }
    let sqlBenefit = "select sum(b_value) as sum from benefitdata where "+sql2;
    let balance= await config.utils.queryFromSql(config,sqlBenefit,params);
    balance = balance.result[0].sum;
    return balance;
}

//获取f_id 下的收益列表
async function benefitall_finace_by_f_id_list(userId,f_id,f_type,page,pageSize){
    let pg = (Number(page)-1)*pageSize;
    let sql2=" user_id=? and f_id=? and b_type_f=? "
    let params = [userId,f_id,0]; 
    if(f_type!=0){
        params.push(f_type)
        sql2 +=" and b_type=? "
    }
    let sqlBenefit = "select *  from benefitdata where "+sql2+" order by timestamps desc limit "+pg+","+pageSize;
    let balance= await config.utils.queryFromSql(config,sqlBenefit,params);
    balance = balance.result[0].sum;
    return balance;
}

//节点奖励. user_id:user_id,b_type_f:1为节点，2为超级节点
async function node_beneift_list(page,pageSize,userId,b_type_f){
    let pg = (Number(page)-1)*pageSize;
    let params =[userId,b_type_f];
    let sql = "select * from nodebenefitdata where user_id=? and b_type_f=? order by timestamps desc limit "+pg+","+pageSize;
    
    let list = await config.utils.queryFromSql(config,sql,params)
    return list.result;
}


module.exports = 
{
	calculateBalanceAll,benefitAll,benefitLast,list_benefit_by_user_id,list_finance,benefitall_finace_by_f_id,benefitall_finace_by_f_id_list,node_beneift_list
}