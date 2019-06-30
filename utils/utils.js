const crypto = require('crypto'); 
const ethers = require('ethers');

function md5(pwd){
	return crypto.createHash('md5').update(pwd).digest("hex")
}

function createAccount(){
	 let mnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
	 if (ethers.utils.HDNode.isValidMnemonic(mnemonic)) {
		let wallet = ethers.Wallet.fromMnemonic(mnemonic);
		let address = wallet.address.toLowerCase();
		let privates = wallet.privateKey;
		privates = privates.substring(2,privates.length);
		let path = wallet.path;
		return {
			"address":address,
			"privates":privates,
			"path":path,
			"mnemonic":mnemonic
		}
	 }
	 return null;
	
}

async function isExistEmail(config,email){
	let user = await config.etzAdmin.findOne({where:{email:email}})
	if(user){
		return true;
	}
	return false;
}

async function sendCode(email,config){
try{
	var emailCode="";
	for(var i=0;i<6;i++){
		emailCode+=parseInt(Math.random()*10)
	} 
      let expire = await config.getAsync(email)
      if(!expire){
          await config.transport.sendMail({
          from : "test email code 205263298@qq.com",
          to : email,
          subject : "Troy Email Valid Code",
          text : "Troy Email Valid Code",
          html : "<b>"+emailCode+"</b>",
        })
    	  let code = md5(String(emailCode))
          await config.setAsync(email+"emailcode",code)
          await config.expireAsync(email+"emailcode",120)
          return 0;
     }
     return -1;
  }catch(e){
    console.log("send error:",e)
    return -1;
  }
}

function getObjParams(req){
	if(JSON.stringify(req.query)==="{}"){
		return req.body;
	}else if(JSON.stringify(req.body)==="{}"){
		return req.query;
	}
	return null;
}



function getTimeDate(){
	let dates = new Date()
	let years = dates.getFullYear();
	let months = dates.getMonth()+1;
	let dateday = dates.getDate();
	return years+"-"+months+"-"+dateday;
}

function getFullTime(){
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let datex = date.getDate();
	let hour = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();
	return year+"-"+month+"-"+datex+" "+hour+":"+min+":"+sec
}

function nextTimeFormat(){
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let datex = date.getDate()+1;
	return year+"-"+month+"-"+datex+" 00:00:00";
}

async function validToken(obj,req,config){
	let token = obj.token;
	let sessionId = md5(JSON.stringify(req.cookies))
	let keysuser = await config.getAsync(sessionId);
	if(!keysuser){
		return {"state":-1,"datas":"please login"}
	}
	let role = keysuser.split(",")[3];
	let keys = md5(keysuser.split(",").join(""));
	if(token!=keys){
		return {"state":-1,"datas":"token invalid","role":role}
	}
	return {"state":0,"datas":"success","role":role}
}

function IsEmail(str) {
	var reg=/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
		return reg.test(str);
}

function IsNumber(num){
	var reg=/^[0-9]+.?[0-9]*$/;
	if(reg.test(num)&& Number(num)>0){
		return true;
	}
	return false;
}
function IsDate(dates){
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
	return reg.test(dates);
}
function IsDateSec(dates){
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
	return reg.test(dates);
}

function result_req(state,code,message){
	return {"resp":
		{
			"state":state,
			"code":code,
			"datas":message
		}
	}
}

async function getObj(req,config){
	let objs = getObjParams(req);
	if(!objs){
		return {
		"type":-1,
		"data":result_req(-1,"10011","params invalid")
		};
	}
	//验证token
	let datax = await validToken(objs,req,config);
	if(datax.state!=0){
		return {
		"type":-1,
		"data":result_req(datax.state,"10011",datax.datas)
		};
	}
	return {"type":0,"data":objs,"role":datax.role};
}

module.exports={
	md5,createAccount,isExistEmail,sendCode,getObjParams,IsEmail,IsNumber,IsDate,IsDateSec,getTimeDate,getFullTime,nextTimeFormat,validToken,result_req,getObj
}
