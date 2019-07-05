var email   = require("emailjs");
var server  = email.server.connect({
    user:    "qtum001@naver.com",      // 你的QQ用户
    password:"Aa112233!!",           // 注意，不是QQ密码，而是刚才生成的授权码
    host:    "smtp.naver.com",         // 主机，不改
    ssl:     true                   // 使用ssl
});

var abc = 1234;
    

//开始发送邮件
server.send({
      //邮件内容
    from:    "qtum001@naver.com",        //谁发送的
    to:      "205263298@qq.com",       //发送给谁的
    subject: "测试",         //邮件主题
    text: "你的验证码是"+abc //内容
}, function(err, message) {
    //回调函数
    console.log(err || message);
});