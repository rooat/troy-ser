(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e,t,n){"use strict";(function(e){n.d(t,"a",function(){return S});var a=n(3),i=n.n(a),r=n(6),c=n(7),o=n(9),s=n(8),l=n(10),d=n(15),u=n(1),p=n.n(u),m=(n(40),n(11)),f=n(14),v=(n(59),n(24)),g="http://13.124.2.239/apiserver/api/user";function h(e,t){f.b[e](t,{position:f.b.POSITION.BOTTOM_CENTER,hideProgressBar:!0})}function b(e,t,n,a,i){return w.apply(this,arguments)}function w(){return(w=Object(d.a)(i.a.mark(function e(t,n,a,r,c){var o,s,l;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=Object.entries(a).map(function(e){return"".concat(e[0],"=").concat(e[1])}).join("&"),console.log("\u53c2\u6570",o),e.next=4,fetch(g+t,{method:n,headers:{"Content-Type":"application/x-www-form-urlencoded"},body:o});case 4:return s=e.sent,console.log("response==",s),e.next=8,s.json();case 8:0===(l=e.sent).resp.state&&r(l.resp.datas),-1===l.resp.state&&c(l.resp.datas);case 11:case"end":return e.stop()}},e)}))).apply(this,arguments)}function y(e){return"zh"===e?0:"en"===e?1:2}f.b.configure({autoClose:2e3,draggable:!1});var k=function(e){function t(){return Object(r.a)(this,t),Object(o.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return p.a.createElement("div",{className:"inputcontainer"},p.a.createElement("div",{className:"titlecontainer"},p.a.createElement("span",null,this.props.title)),p.a.createElement("input",Object.assign({},this.props,{className:"inputitem"})))}}]),t}(p.a.Component),S=function(t){function n(t){var a;return Object(r.a)(this,n),(a=Object(o.a)(this,Object(s.a)(n).call(this,t))).onSubmit=Object(d.a)(i.a.mark(function t(){var n,r,c,o,s,l;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=a.state,r=n.email,c=n.vCode,o=n.loginPsd,s=n.tradePsd,l=n.inviteCode,r&&c&&o&&s&&l){t.next=4;break}return h("warn",a.intl("checkenter")),t.abrupt("return");case 4:b("/register","POST",{email_num:r,code:c,loginpwd:o,tradepwd:s,invite:l,lan:y(e.currentLan)},function(e){h("success",e),a.finishTimer(),a.setState({email:"",vCode:"",loginPsd:"",tradePsd:"",inviteCode:""})},function(e){h("error",e)});case 8:case"end":return t.stop()}},t)})),a.onSendVCode=Object(d.a)(i.a.mark(function e(){var t,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=a.state,n=t.email,!1!==t.locked){e.next=8;break}if(n){e.next=5;break}return h("warn",a.intl("enteremail")),e.abrupt("return");case 5:a.onSendCodeFetch(),a.setState({locked:!0}),a.timer=setInterval(a.updateTimer,1e3);case 8:case"end":return e.stop()}},e)})),a.updateTimer=function(){var e=a.state.initSecond;0===e?a.finishTimer():a.setState({initSecond:e-1,btnText:"".concat(e,"  S")})},a.finishTimer=function(){clearInterval(a.timer),a.setState({initSecond:60,btnText:a.intl("sendvcode"),locked:!1})},a.onSwitchLanguage=function(){var t=a.state.acitve;a.setState({acitve:t>2?0:t+1},function(){var t;e.currentLan=0===(t=a.state.acitve)?"zh":1===t?"en":2===t?"ko":"zh"})},a.state={email:"",vCode:"",loginPsd:"",tradePsd:"",inviteCode:"",locked:!1,initSecond:60,btnText:a.intl("sendvcode"),langList:["\u7e41\u4f53\u4e2d\u6587","English","\ud55c\uad6d\uc5b4"],acitve:0},a}return Object(l.a)(n,t),Object(c.a)(n,[{key:"componentWillMount",value:function(){e.currentLan="zh";var t=window.location.href,n=t.slice(t.lastIndexOf("=")+1);this.setState({inviteCode:n})}},{key:"componentWillUnmount",value:function(){clearInterval(this.timer)}},{key:"onSendCodeFetch",value:function(){b("/makecode","POST",{email_num:this.state.email,lan:y(e.currentLan)},function(e){h("success",e)},function(e){h("error",e)})}},{key:"intl",value:function(e){return p.a.createElement(m.a,{id:e})}},{key:"render",value:function(){var t=this,n=this.state,a=n.btnText,i=n.langList,r=n.acitve,c=n.inviteCode;return p.a.createElement(v.a,{locale:e.currentLan},p.a.createElement("div",{className:"App"},p.a.createElement("div",{onClick:this.onSwitchLanguage,className:"language"},i[r+1>2?0:r+1]),p.a.createElement(k,{type:"text",title:this.intl("email"),onChange:function(e){return t.setState({email:e.target.value})}}),p.a.createElement("div",{className:"vcodeinput"},p.a.createElement(k,{type:"text",title:this.intl("vcode"),onChange:function(e){return t.setState({vCode:e.target.value})}}),p.a.createElement("div",{className:"vcodebtn",onClick:this.onSendVCode},p.a.createElement("span",{className:"vcodetext"},a))),p.a.createElement(k,{type:"password",title:this.intl("loginpsd"),onChange:function(e){return t.setState({loginPsd:e.target.value})}}),p.a.createElement(k,{type:"password",title:this.intl("tradepsd"),onChange:function(e){return t.setState({tradePsd:e.target.value})}}),p.a.createElement(k,{type:"text",value:c,title:this.intl("invitecode"),onChange:function(e){return t.setState({inviteCode:e.target.value})}}),p.a.createElement("button",{type:"button",className:"button",onClick:this.onSubmit},p.a.createElement("span",null,this.intl("register"))),p.a.createElement("div",{className:"link"},p.a.createElement("a",{href:"https://cd.huomi.co/app.php/40"},this.intl("appdl"))),p.a.createElement(f.a,null)))}}]),n}(p.a.Component)}).call(this,n(17))},22:function(e,t){},24:function(e,t,n){"use strict";(function(e){n.d(t,"a",function(){return S});var a=n(6),i=n(7),r=n(9),c=n(8),o=n(10),s=n(16),l=n(11),d=n(1),u=n.n(d),p=n(25),m=n(26),f=n(27),v=n(28),g=n.n(v),h=n(29),b=n.n(h),w=n(30),y=n.n(w),k={en:m.a,zh:p.a,ko:f.a};Object(l.c)([].concat(Object(s.a)(g.a),Object(s.a)(b.a),Object(s.a)(y.a)));var S=function(t){function n(){return Object(a.a)(this,n),Object(r.a)(this,Object(c.a)(n).apply(this,arguments))}return Object(o.a)(n,t),Object(i.a)(n,[{key:"render",value:function(){return u.a.createElement(l.b,{locale:e.currentLan,messages:k[e.currentLan]},this.props.children)}}]),n}(d.PureComponent)}).call(this,n(17))},25:function(e,t,n){"use strict";t.a={login:"\u767b\u9304",inputemail:"\u8acb\u8f38\u5165\u90f5\u7bb1",inputpsd:"\u8acb\u8f38\u5165\u5bc6\u78bc",forgetpsd:"\u5fd8\u8a18\u5bc6\u78bc",nopsdregister:"\u9084\u6c92\u6709\u8cec\u865f\uff1f\u7acb\u5373\u8a3b\u518a",register:"\u8a3b\u518a",email:"\u90f5\u7bb1",vcode:"\u9a57\u8b49\u78bc",loginpsd:"\u767b\u9304\u5bc6\u78bc",confrimpsd:"\u78ba\u8a8d\u5bc6\u78bc",inputvcode:"\u8acb\u8f38\u5165\u9a57\u8b49\u78bc",confirmpsdagain:"\u8acb\u518d\u6b21\u78ba\u8a8d\u5bc6\u78bc",confrim:"\u78ba\u5b9a",emailcantempty:"\u90f5\u7bb1\u4e0d\u80fd\u70ba\u7a7a",vcodecantempty:"\u9a57\u8b49\u78bc\u4e0d\u80fd\u70ba\u7a7a",loginpsdcantempty:"\u767b\u9304\u5bc6\u78bc\u4e0d\u80fd\u70ba\u7a7a",psddiff:"\u5169\u6b21\u5bc6\u78bc\u4e0d\u4e00\u81f4",invitecode:"\u63a8\u85a6\u78bc",inputinvitecode:"\u8acb\u8f38\u5165\u63a8\u85a6\u78bc",invitecantenpty:"\u63a8\u85a6\u78bc\u4e0d\u80fd\u70ba\u7a7a",tradepsd:"\u4ea4\u6613\u5bc6\u78bc",inputtradepsd:"\u8acb\u8f38\u5165\u4ea4\u6613\u5bc6\u78bc",tradecantempty:"\u4ea4\u6613\u5bc6\u78bc\u4e0d\u80fd\u70ba\u7a7a",registersuccess:"\u8a3b\u518a\u6210\u529f",loginsuccess:"\u767b\u9304\u6210\u529f",inputloginpsd:"\u8acb\u8f38\u5165\u767b\u9304\u5bc6\u78bc",appdl:"App\u4e0b\u8f09",sendvcode:"\u767c\u9001\u9a57\u8b49\u78bc",checkenter:"\u8acb\u6aa2\u67e5\u8f38\u5165",enteremail:"\u8acb\u8f38\u5165\u90f5\u7bb1\u5730\u5740",sendagain:"s\u5f8c\u518d\u6b21\u767c\u9001"}},26:function(e,t,n){"use strict";t.a={login:"Login",inputemail:"please input your email\t",inputpsd:" Please enter your password\t",forgetpsd:" retrieve password\t",nopsdregister:"Not on Troy yet? Sign up now\t",register:"  Sign up\t",email:"Email",vcode:" SMS Verification code",loginpsd:"login password\t",confrimpsd:"confirm password",inputvcode:"please enter verification code",confirmpsdagain:"  Please confirm the password again\t",confrim:"  confirm\t",emailcantempty:"E-mail can't be blank",vcodecantempty:"verification code can't be blank",loginpsdcantempty:" Login password can't be blank",psddiff:"  Two passwords are inconsistent",invitecode:" Referral code\t",inputinvitecode:"Please enter a referral code",invitecantenpty:"Referral code can't be blank",tradepsd:"transaction password",inputtradepsd:" Please enter the transaction password",tradecantempty:"Transaction password can't be blank\t",registersuccess:"registration succeeded\t",loginsuccess:" login succeeded",inputloginpsd:"Please enter your password",appdl:"App Download",sendvcode:"Send sms code",checkenter:"Check your enter",enteremail:"Enter email",sendagain:"s Send again"}},27:function(e,t,n){"use strict";t.a={login:"\ub85c\uadf8\uc778",inputemail:"\uc774\uba54\uc77c\uc8fc\uc18c\ub97c \uc785\ub825\ud558\uc138\uc694",inputpsd:"\ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud558\uc138\uc694",forgetpsd:"\ube44\ubc00\ubc88\ud638 \ucc3e\uae30",nopsdregister:"\uc544\uc9c1 \uacc4\uc815\uc774 \uc5c6\uc73c\uc138\uc694? \ud68c\uc6d0 \uac00\uc785",register:"\ud68c\uc6d0\uac00\uc785",email:"\uc774\uba54\uc77c",vcode:"\uc778\uc99d\ucf54\ub4dc",loginpsd:"\ube44\ubc00\ubc88\ud638",confrimpsd:"\ube44\ubc00\ubc88\ud638\ub97c \ud655\uc778\ud558\uc138\uc694",inputvcode:"\uc778\uc99d\ucf54\ub4dc\ub97c \uc785\ub825\ud558\uc138\uc694",confirmpsdagain:"\ube44\ubc00\ubc88\ud638\ub97c \ub2e4\uc2dc \ud655\uc778\ud558\uc138\uc694",confrim:"\ud655\uc778",emailcantempty:"\uc774\uba54\uc77c\uc8fc\uc18c\ub294 \ud544\uc218\uc0ac\ud56d\uc785\ub2c8\ub2e4",vcodecantempty:"\uc778\uc99d\ucf54\ub4dc\ub294 \ud544\uc218\uc0ac\ud56d\uc785\ub2c8\ub2e4",loginpsdcantempty:"\ube44\ubc00\ubc88\ud638\ub294 \ud544\uc218\uc0ac\ud56d\uc785\ub2c8\ub2e4",psddiff:"\ube44\ubc00\ubc88\ud638\uac00 \uc77c\uce58\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4",invitecode:"\ucd94\ucc9c\ucf54\ub4dc",inputinvitecode:"\ucd94\ucc9c\ucf54\ub4dc\ub97c \uc785\ub825\ud558\uc138\uc694",invitecantenpty:"\ucd94\ucc9c\ucf54\ub4dc\ub294 \ud544\uc218\uc0ac\ud56d\uc785\ub2c8\ub2e4",tradepsd:"\uac70\ub798\ube44\ubc00\ubc88\ud638",inputtradepsd:"\uac70\ub798\ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud558\uc138\uc694",tradecantempty:"\uac70\ub798\ube44\ubc00\ubc88\ud638\ub294 \ud544\uc218\uc0ac\ud56d\uc785\ub2c8\ub2e4",registersuccess:"\ud68c\uc6d0\uac00\uc785\uc774 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4",loginsuccess:"\ub85c\uadf8\uc778\uc774 \uc131\uacf5\ub418\uc5c8\uc2b5\ub2c8\ub2e4",inputloginpsd:"\ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud558\uc138\uc694",appdl:"\ub2e4\uc6b4\ub85c\ub4dc",sendvcode:"\uc778\uc99d \ucf54\ub4dc \uc804\uc1a1",checkenter:"\uc785\ub825\uc744 \ud655\uc778\ud558\uc2ed\uc2dc\uc624.",enteremail:"\uc774\uba54\uc77c \uc8fc\uc18c\ub97c \uc785\ub825\ud558\uc2ed\uc2dc\uc624.",sendagain:"s \ub2e4\uc2dc \ubcf4\ub0b4\uae30"}},33:function(e,t,n){e.exports=n(62)},38:function(e,t,n){},40:function(e,t,n){},48:function(e,t){},54:function(e,t){},62:function(e,t,n){"use strict";n.r(t);var a=n(1),i=n.n(a),r=n(5),c=n.n(r),o=(n(38),n(21));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(o.a,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[33,1,2]]]);
//# sourceMappingURL=main.a8d2690e.chunk.js.map