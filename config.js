 const Sequelize = require('sequelize');
 const Web3 = require('web3')
 const nodemailer = require('nodemailer');
 const ethereum = require('ethereumjs-util')
 

const redis = require('redis');
const client = redis.createClient('6379','127.0.0.1');
client.on('error',function(error){
  console.log("client error",error);
});

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const expireAsync = promisify(client.expire).bind(client);
const llenAsync = promisify(client.llen).bind(client);
const lpushAsync = promisify(client.lpush).bind(client);
const rpopAsync = promisify(client.rpop).bind(client);
const delAsync = promisify(client.del).bind(client);

 // const config = {
 //     database: 'troy_db',
 //     username: 'root',
 //     password: 'HWLhwl@#896',
 //     host: 'localhost',
 //     port: 3306
 // };

const config = {
   database: 'troy_db',
   username: 'debian-sys-maint',
   password: 'Qb3lPxSEYmrbt116',
   host: 'localhost',
   port: 3306
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    timestamps: false
});


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
var exchangeData = sequelize.define('exchangedata',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        e_type:Sequelize.INTEGER(3),//1,2,3,4
                        e_value:Sequelize.DECIMAL(12,2),
                        timestamps:Sequelize.BIGINT(20),
                        user_id:Sequelize.BIGINT(11),
                        operate:Sequelize.INTEGER(1)

                    },{
                        freezeTableName:true,
                        timestamps: false
                    });
var coinTypeData = sequelize.define('cointypedata',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        coinname:Sequelize.STRING(10),
                        comment:Sequelize.STRING(30),
                        state:Sequelize.INTEGER(1),

                    },{
                        freezeTableName:true,
                        timestamps: false
                    });

var addressData = sequelize.define('addressdata',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        a_type:Sequelize.STRING(10),//1,2,3,4
                        address:Sequelize.STRING(50),
                        comment:Sequelize.STRING(50),
                        state:Sequelize.INTEGER(1),
                        user_id:Sequelize.BIGINT(11),
                        timestamps:Sequelize.STRING(20)

                    },{
                        freezeTableName:true,
                        timestamps: false
                    });

 var benefitData = sequelize.define('benefitdata',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        b_type:Sequelize.INTEGER(3),//1,2,3,4
                        b_value:Sequelize.DECIMAL(12,2),
                        b_type_f:Sequelize.INTEGER(1),//0 静态收益，1 直推奖，2，间点奖
                        timestamps:Sequelize.STRING(20),
                        user_id:Sequelize.BIGINT(11),
                        f_id:Sequelize.BIGINT(11),
                        operate:Sequelize.INTEGER(1)

                    },{
                        freezeTableName:true,
                        timestamps: false
                    });


 var nodeBenefitData = sequelize.define('nodebenefitdata',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        b_value:Sequelize.DECIMAL(12,2),
                        b_type_f:Sequelize.INTEGER(1),//0,节点奖励，1 超级节点奖励
                        timestamps:Sequelize.STRING(20),
                        user_id:Sequelize.BIGINT(11),
                        operate:Sequelize.INTEGER(1)
                        
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });
 var financeDetail = sequelize.define('financedetail',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        f_type_id:Sequelize.INTEGER(3),//1 为7天,2 为30天,3为60天,4为180天。11为美元兑换zc 22为zc兑换etz
                        time_limit:Sequelize.INTEGER(5),
                        day_benefit:Sequelize.DECIMAL(3,2)
                        
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });


 var financeData = sequelize.define('financedata',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        f_type:Sequelize.INTEGER(1),//1,2,3,4
                        f_value:Sequelize.DECIMAL(12,2),
                        get_value:Sequelize.DECIMAL(12,2),
                        timestamps:Sequelize.STRING(20),
                        f_benefit_time:Sequelize.STRING(40),
                        f_finance_time:Sequelize.STRING(40),
                        end_time:Sequelize.STRING(20),
                        user_id:Sequelize.BIGINT(11),
                        state:Sequelize.INTEGER(1),//1投资中，2，结束
                        
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });

 var emailCode = sequelize.define('emailcode',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        code:Sequelize.STRING(60),
                        email:Sequelize.BIGINT(50),
                        timestamps:Sequelize.STRING(20),
                        state:Sequelize.INTEGER(1)
                        
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });

 var etzUser = sequelize.define('ethusers',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        address:Sequelize.STRING(50),
                        privates:Sequelize.STRING(100),
                        path:Sequelize.STRING(50),
                        mnemonic:Sequelize.STRING(150),
                        timestamps:Sequelize.STRING(20),
                        endtime:Sequelize.STRING(20),
                        state:Sequelize.INTEGER(1),
                        valuex:Sequelize.DECIMAL(10,4),
                        
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });
 var etzAdmin = sequelize.define('etzadmin',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        nick_name:Sequelize.STRING(30),
                        role:Sequelize.INTEGER(1),//0普通会员，1，管理员，
                        user_type:Sequelize.INTEGER(1),//0默认用户，1节点用户，2，超级节点用户
                        email:Sequelize.STRING(50),
                        trade_pwd_origin:Sequelize.STRING(60),
                        login_pwd_origin:Sequelize.STRING(60),
                        invite_code:Sequelize.INTEGER(6),
                        invite2_code:Sequelize.INTEGER(6),
                        etz_value:Sequelize.DECIMAL(12,2),
                        usd_value:Sequelize.DECIMAL(12,2),
                        lock_values:Sequelize.DECIMAL(12,2),
                        last_login_time:Sequelize.STRING(20),
                        last_login_ip:Sequelize.STRING(20),
                        regist_time:Sequelize.STRING(20),
                        update_time:Sequelize.STRING(20),
                        address:Sequelize.STRING(50),
                        isInveted:Sequelize.INTEGER(1),//1已投，2，在结算，3，结束
                        node_member:Sequelize.BIGINT(8),
                        isNew:Sequelize.INTEGER(1),
                        totalInvetDay:Sequelize.DECIMAL(12,2),//当天个人总定投
                        benefitBalance:Sequelize.DECIMAL(12,2),//当前有效总收益余额（静态动态）
                        totalBenefit:Sequelize.DECIMAL(12,2),//累计收益包含已经提现和未提现
                        staticBenefitBalance:Sequelize.DECIMAL(12,2),//当前有效静态收益
                        totalStaticBenefit:Sequelize.DECIMAL(12,2),//累计静态收益
                        staticBenefitDay:Sequelize.DECIMAL(12,2),//当天个人总静态收益
                        teamMember:Sequelize.INTEGER(8),//团队总人数
                        directMember:Sequelize.INTEGER(8),//直推人数
                        teamInvet:Sequelize.DECIMAL(12,2),//团队总投资
                        type_1_total:Sequelize.DECIMAL(12,2),//类型1总定投
                        type_2_total:Sequelize.DECIMAL(12,2),//类型2总定投
                        type_3_total:Sequelize.DECIMAL(12,2),//类型3总定投
                        type_4_total:Sequelize.DECIMAL(12,2),//类型4总定投
                        iscalculte:Sequelize.INTEGER(1),

                    },{
                        freezeTableName:true,
                        timestamps: false
                    });


 var etzData = sequelize.define('ethdatas',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        timestamps:Sequelize.STRING(20),
                        txhash:Sequelize.STRING(150),
                        blocknumber:Sequelize.STRING(20),
                        state:Sequelize.INTEGER(1),
                        valuex:Sequelize.STRING(30),
                        address:Sequelize.STRING(50),
	 		fromadd:Sequelize.STRING(50),
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });



 var etzWithdraw = sequelize.define('ethwithdraw',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        timestamps:Sequelize.STRING(20),
                        txhash:Sequelize.STRING(150),
                        endtime:Sequelize.STRING(20),
                        state:Sequelize.INTEGER(1),
                        valuex:Sequelize.DECIMAL(10,4),
                        address:Sequelize.STRING(50),
	 		user_id:Sequelize.BIGINT(11),
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });


 var blockNum = sequelize.define('blocknum',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        timestamps:Sequelize.STRING(20),
                        nettype:Sequelize.STRING(10),
                        blocknumber:Sequelize.STRING(20),
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });
 var priceData = sequelize.define('pricedata',{
                        id:{
                            type:Sequelize.STRING(50),
                            primaryKey:true
                        },
                        name:Sequelize.STRING(50),
                        symbol:Sequelize.STRING(20),
                        rank:Sequelize.INTEGER(5),
                        price_usd:Sequelize.STRING(30),
                        price_btc:Sequelize.STRING(30),
                        market_cap_usd:Sequelize.STRING(30),
                        available_supply:Sequelize.STRING(0),
                        total_supply:Sequelize.STRING(30),
                        max_supply:Sequelize.STRING(30),
                        percent_change_1h:Sequelize.DECIMAL(8,2),
                        percent_change_24h:Sequelize.DECIMAL(8,2),
                        percent_change_7d:Sequelize.DECIMAL(8,2),
                        last_updated:Sequelize.STRING(15),
                        market_cap_btc:Sequelize.STRING(20),
                        version:Sequelize.INTEGER(3)
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });
 var rateData = sequelize.define('ratedata',{
                        e_id:{
                            type:Sequelize.BIGINT(11),
                            primaryKey:true
                        },
                        code:Sequelize.STRING(20),
                        name:Sequelize.STRING(50),
                        rate:Sequelize.STRING(20),
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });


var noticeData = sequelize.define('noticedata',{
                        e_id:{
                            type:Sequelize.STRING(10),
                            primaryKey:true
                        },
                        notice_type:Sequelize.STRING(30),
                        notice_comment:Sequelize.TEXT,
                        timestamps:Sequelize.BIGINT(20),
                        state:Sequelize.BIGINT(1) //0 默认状态 1，删除
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });



var transport = nodemailer.createTransport({
  host : "smtp.qq.com",
  secureConnection : true,
  port : 465,
  auth : {
    user : "205263298@qq.com",
    pass : "lhvhpdcldtbpcabi"
  }
})


// var controllerAdd = "0xCAAf10244E0F891a2C4f066F3d137914b47F1DCe";
// var controllerPrivate = "B528B0421C8D11504560B23AB15B377A2F2CECF8A97DA98217B8D669D1DDB48C";

var controllerAdd = "0x65E7801bd4b036081dAE9280Ec1b156b39d11Af5";
var controllerPrivate = "0xDA93CE2300BBC3455FC0F55C7C8B91B55DC544CCB28757DD3E798F36925C85CB";

var etzpriceurl = "https://api.bithumb.com/public/ticker/etz";
var allpriceurl ="https://api.coinmarketcap.com/v1/ticker/?limit=10000&convert=BTC";
var rateurl = "https://bitpay.com/rates";

//var url ="http://lasapp.io/api/user/eth/rechargessss";

// var params = process.argv.splice(2);
// var ethurl = params[0]
// var method = params[1]
// var type = params[2]

const web3 = new Web3(new Web3.providers.HttpProvider('http://etzrpc.org'));
 global.withdrawIndex=false;
 global.newUser = {
    state:false,
    user_id:0
 };
 global.calculateStart = false;
 global.newUser = {
    state:false,
    address:[]
 };
 global.checkWithdraw = false;

var utils = require('./utils/utils')

module.exports = {
    utils,ethereum,web3,coinTypeData,addressData,exchangeData,etzData,etzUser,etzAdmin,etzWithdraw,blockNum,priceData,noticeData,emailCode,financeData,rateData,benefitData,financeDetail,nodeBenefitData,controllerAdd,controllerPrivate,transport,etzpriceurl,allpriceurl,rateurl,getAsync,setAsync,expireAsync,llenAsync,lpushAsync,rpopAsync,delAsync
}

// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205s1s@qq.com","dddd","dddddd",22222,123456,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss2@qq.com","dddd","dddddd",123456,1234,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss3@qq.com","dddd","dddddd",123456,1235,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss4@qq.com","dddd","dddddd",123456,1236,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss5@qq.com","dddd","dddddd",123456,1237,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss6@qq.com","dddd","dddddd",123456,1238,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss7@qq.com","dddd","dddddd",123456,1239,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss8@qq.com","dddd","dddddd",123456,1240,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss9@qq.com","dddd","dddddd",123456,1241,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss10@qq.com","dddd","dddddd",123456,1242,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss11@qq.com","dddd","dddddd",123456,1243,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss12@qq.com","dddd","dddddd",123456,1244,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss13@qq.com","dddd","dddddd",123456,1245,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss14@qq.com","dddd","dddddd",123456,1246,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss15@qq.com","dddd","dddddd",123456,1247,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss16@qq.com","dddd","dddddd",123456,1248,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)
// insert into etzadmin (role,user_type,email,trade_pwd_origin,login_pwd_origin,invite_code,invite2_code,etz_value,usd_value,last_login_time,last_login_ip,regist_time,update_time,address,isInveted,node_member,isNew,totalInvetDay,totalStaticBenefit,staticBenefitDay,teamMember,teamInvet,type_1_total,type_2_total,type_3_total,type_4_total,iscalculte)values(0,0,"896466205ss17@qq.com","dddd","dddddd",123456,1249,233,233,232323,232323,2323,23232,"0xddgdg",0,233,0,2323,2323,2323,2323,323,2333,2323,233333,3333,0)




// insert into benefitdata (b_type,b_value,b_type_f,timestamps,user_id)values(1,1,1,"2033333",12);

 
