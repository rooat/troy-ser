var express = require('express');
var router = express.Router();

var auth = function (req, res, next) {
	if (req.session && req.session.isLogged) {
		return next();
		// req.session.destroy();
	}	
	else
		return res.json({ status: 'FAILED', message: 'Please Enter Deails gain.' });
};

router.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

//coinType
var getCoinType = require('../api/coinType/getCoinType')
var addCoinType = require('../api/coinType/addCoinType')
var delCoinType = require('../api/coinType/delCoinType')

//admin
var calculate = require('../api/admin/calculate');

//price
var priceDataBySymbol = require('../api/priceRate/priceDataBySymbol');
var priceData = require('../api/priceRate/priceData');
var rateData = require('../api/priceRate/rateData');
var rateDataBySymbol = require('../api/priceRate/rateDataBySymbol')

//notice
var addNotice = require('../api/notice/addNotice');
var deleteNotice = require('../api/notice/deleteNotice');
var getNotice = require('../api/notice/getNotice');
var getNoticeList = require('../api/notice/getNoticeList')
var updateNotice = require('../api/notice/updateNotice');

//user
var getUser = require('../api/users/getUser');
var isExistUser = require("../api/users/isExistUser")
var loginUser = require("../api/users/loginUser")
var logOut = require("../api/users/logOut")
var makecode = require('../api/users/makecode')
var register = require('../api/users/register');
var setNewPassword = require('../api/users/setNewPassword')
var etzToUsd = require('../api/users/etzToUsd');
var usdToEtz = require('../api/users/usdToEtz');
var usdToZc = require('../api/users/usdToZc')
var zcToEtz = require('../api/users/zcToEtz');
var updateLoginPwd = require('../api/users/updateLoginPwd')
var updateTradePwd = require('../api/users/updateTradePwd')
var withdraw = require('../api/users/withdraw')
var transferHistory = require('../api/users/transferHistory');


//finance
var addFinance = require('../api/finance/addFinance')
var financeList = require('../api/finance/financeList')
var getBenefitListByUserId = require('../api/finance/getBenefitListByUserId')
var getFinanceById = require('../api/finance/getFinanceById')
var getFinanceListByUserId = require('../api/finance/getFinanceListByUserId');
var redeem = require('../api/finance/redeem')
var nodeBenefitByUserId = require('../api/finance/nodeBenefitByUserId');
var superNodeBenefitByUserId = require('../api/finance/superNodeBenefitByUserId')
var getBenefitByUserIdAndType = require('../api/finance/getBenefitByUserIdAndType')
var productById = require('../api/finance/productById')


//address
var addAddress = require("../api/address/addAddress");
var delAddress = require("../api/address/delAddress");
var getAddressList = require("../api/address/getAddressList");
var updateAddress = require("../api/address/updateAddress");

//=========================================================

//coinType
router.get('/cointype/coin_type_list',getCoinType.getCoinType)
router.get('/cointype/add_coin_type',addCoinType.addCoinType)
router.get('/cointype/del_coin_type',delCoinType.delCoinType)

//admin
router.post('/admin/calculate',calculate.calculate);


//price rate
router.get('/price/price_data_by_symbol',priceDataBySymbol.priceDataBySymbol);
router.get('/price/price_data',priceData.priceData);
router.get('/price/rate_data',rateData.rateData);
router.get('/price/rate_data_by_symbol',rateDataBySymbol.rateDataBySymbol)

//notice
router.post('/notice/add_notice',addNotice.addNotice)
router.post('/notice/del_notice',deleteNotice.deleteNotice)
router.get('/notice/get_notice',getNotice.getNotice)
router.get('/notice/get_notice_list',getNoticeList.getNoticeList)
router.post('/notice/update_notice',updateNotice.updateNotice)

//user
router.post('/user/getuser',getUser.getUser);
router.get('/user/isExistUser',isExistUser.isExistUser);
router.post('/user/loginUser',loginUser.loginUser)
router.post("/user/logOut",logOut.logOut)
router.post('/user/makecode',makecode.makecode);
router.post('/user/register',register.register);
router.post("/user/setNewPassword",setNewPassword.setNewPassword)
router.post('/user/etz_to_usd',etzToUsd.etzToUsd)
router.post('/user/usd_to_etz',usdToEtz.usdToEtz)
router.post('/user/usd_to_zc',usdToZc.usdToZc)
router.post('/user/zc_to_etz',zcToEtz.zcToEtz)
router.post('/user/updateLoginPwd',updateLoginPwd.updateLoginPwd)
router.post('/user/updateTradePwd',updateTradePwd.updateTradePwd)
router.post('/user/withdraw',withdraw.withdraw);
router.post('/user/transfer_history',transferHistory.transferHistory)



router.post('/finance/add_finance',addFinance.addFinance);
router.post('/finance/product_ist',financeList.financeList)
router.post('/finance/get_benefit_list_by_user_id',getBenefitListByUserId.getBenefitListByUserId)
router.post('/finance/get_finance_by_id',getFinanceById.getFinanceById)
router.post('/finance/get_finance_list_by_user_id',getFinanceListByUserId.getFinanceListByUserId);
router.post('/finance/redeem',redeem.redeem)
router.post('/finance/node_benefit_by_user_id',nodeBenefitByUserId.nodeBenefitByUserId)
router.post('/finance/super_node_benefit_by_user_id',superNodeBenefitByUserId.superNodeBenefitByUserId)
router.post('/finance/get_benefit_by_user_id_and_type',getBenefitByUserIdAndType.getBenefitByUserIdAndType)
router.post('/finance/product_by_id',productById.productById)

router.post('/address/add_address',addAddress.addAddress);
router.post('/address/get_address_list',getAddressList.getAddressList);
router.post('/address/del_address',delAddress.delAddress);
router.post('/address/update_address',updateAddress.updateAddress);
module.exports = router;
