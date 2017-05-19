var domain = window.location.host.indexOf("localhost") > -1 ? "10.0.20.101" : window.location.host;
// var host="http://"+domain;
// var host="http://10.0.1.52:5235/web";
//正式版本服务器
// var host = "http://10.0.1.33:8081/web";
var host = "http://10.0.1.33:8686";
// var host="https://www.bxjr.com";
var channel = "miss"; //想念

export default {
    Model: {
        //list接口
        investList: host + "/wd_api/miss/getMissListOn",
        //detail接口
        investDetail: host + "/wd_api/subject/detailNewOn",
        //投资详情
        investVoucher: host + "/wd_api/subject/memberAmountByBorrow",
        //投资详情
        investHistoryRank: host + "/wd_api/subject/getDetailHistoryRankOn",
        //投资详情
        investHistory: host + "/wd_api/subject/getDetailHistoryOn",
        //invest 风控文章读取
        investRisk: host + "/wd_api/about/getNoticeDetailByTypeOn",
        //invest 标的详情页面
        investDatum: host + "/wd_api/subject/getDetailOn",
        //invest 收益计算
        investIncome: host + "/wd_api/borrowInvestApp/computerInvestMoney",
        //invest 创建订单
        investOrder: host + "/wd_api/tradeOrdLog/newOrder",
        //invest 订单状态查询
        findOrder: host + "/wd_api/tradeOrdLog/findOrder",        
        //登录
        loginOn: host + "/wd_api/userCenter/loginOn",
        //设置登录密码
        editPassword: host + "/wd_api/userCenter/editPassword",
        //设置交易密码
        editOutPassword: host + "/wd_api/userCenter/editOutPassword",
        //重置交易密码（短信验证）
        resetOutPassword: host + "/wd_api/userCenter/resetOutPassword",
        //重置交易密码（短信验证）
        sendRestOutPassword: host + "/wd_api/memberInfoApp/sendRestOutPassword",
        //充值 实名绑卡
        BankCard: host + "/wd_api/appPay/getPayChannelCode",
        //获取银行卡信息
        bankDetail: host + "/wd_api/recharge/doWithdrawGetBank",
        //充值 银行列表
        bankList: host + "/wd_api/recharge/getBankList",
        //充值  去绑卡
        toBankCard: host + "/wd_api/appPay/getNewPayChannelCode",
        // 充值 开户信息
        bankInfo: host + "/wd_api/bankApp/changeBankDetail",
        bankMsg: host + "/wd_api/recharge/getMemberBankPhone",
        // 充值 预留手机号
        reBankPhone: host + "/wd_api/bankApp/changeBankMobile",
        //充值 京东支付
        toBankCardJd: host + "/wd_api/jDPay/doJDReadyPay",
        toBankCardJdPay: host + "/wd_api/jDPay/doJDPay",
        //充值 连连支付
        toBankCardLl: host + "/wd_api/recharge/lianlianSubmitByProj",
        //提现 手续费计算
        getMemberWithdraw: host + "/wd_api/recharge/getMemberWithdraw",
        //提现 可提现余额
        getMemberBalance: host + "/wd_api/memberAssetInfo/getMemberBalance",
        //提现 获取验证码接口
        sendVerifyOn: host + "/wd_api/userCenter/sendVerifyOn",
        //提现 银行卡添加以及修改
        saveBank: host + "/wd_api/recharge/saveBank",
        //提现 交易密码验证
        checkOutPassword: host + "/wd_api/userCenter/checkOutPassword",
        //确认提现
        doWithdraw: host + "/wd_api/recharge/doWithdraw",
        //提现绑定银行卡短信验证码
        bingBankOn: host + "/wd_api/userCenter/bingBankOn",
        //首页    共同信息接口
        homePage: host + '/wd_api/homePage/getHomePageByProjOn',
        //消息中心
        message: host + '/wd_api/userCenter/getUserMessageList',
        //资金流水
        flowAmount: host + '/wd_api/memberAssetInfo/getMemberAssetFlowAmount',

        //我的红包
        packetList: host + '/wd_api/packetApp/getVoucherListByProj',

        // 投资记录
        //
        // 我的投资
        investMine: host + '/wd_api/borrowInvestApp/memberInvestMoney',

        // 募集中
        process: host + '/wd_api/borrowInvestApp/memberInvestProcessList',

        //  待回款
        success: host + '/wd_api/borrowInvestApp/memberInvestSuccessList',

        //已回款
        done: host + '/wd_api/borrowInvestApp/memberInvestDoneList',

        //我的投资详情
        investDetails: host + '/wd_api/borrowInvestApp/memberInvestDetails',

        //未回款列表

        receiptWaitList: host + '/wd_api/borrowInvestApp/memberInvestDetailsReceiptWaitList',

        //已回款列表
        receiptDoneList: host + '/wd_api/borrowInvestApp/memberInvestDetailsReceiptDoneList',

        //债权转让
        receiptBondList: host + '/wd_api/borrowInvestApp/memberInvestDetailsReceiptBondList',

        // 我的
        homePageByProjMember: host + '/wd_api/homePage/homePageByProjMember',

        // 账户设置
        authentication: host + '/wd_api/userCenter/authentication',

        // 找回密码发送验证码
        sendRetrievePwdCode: host + "/wd_api/userCenter/sendRetrievePwdCodeOn",

        // 找回密码 验证码验证
        validRetrievePwdCode: host + '/wd_api/userCenter/validRetrievePwdCodeOn',

        // 找回密码 设置新的登陆密码

        doRetrievePwdReset:host+"/wd_api/userCenter/doRetrievePwdResetOn",
        //我的投资详情--债权转让
        memberInvestDetailsReceiptBondList:host+'/wd_api/borrowInvestApp/memberInvestDetailsReceiptBondList',
        //用手机号码注册或登录 验证短信码
        register:host+'/wd_api/userCenter/registerByProjOn',
        //用户资产明细
        memberAsset:host+'/wd_api/memberAssetInfo/getMemberAsset',
        // 在途金额明细接口
        freezingAmount:host+'/wd_api/memberAssetInfo/getMemberFreezingAmount',


    }
}
