// 创建一个路由器实例
// 并且配置路由规则
const investRouter = [{
    //投资列表
    path: '/invest',
    component: (resolve) => {
        require(['./components/invest/list.vue'], resolve)
    }
},{
    //标的详情
    path: '/invest/detail/:investId',
    component: (resolve) => {
        require(['./components/invest/detail.vue'], resolve)
    }
}, {
    //标的投资记录
    path: '/invest/history/:investId',
    component: (resolve) => {
        require(['./components/invest/history.vue'], resolve)
    }
}, {
    //标的介绍
    path: '/invest/datum/:investId',
    component: (resolve) => {
        require(['./components/invest/datum.vue'], resolve)
    }
},{
    //收银台
    path: '/invest/pay',
    component: (resolve) => {
        require(['./components/invest/pay.vue'], resolve)
    }
},{
    //投资成功
    path: '/invest/paySuccess',
    component: (resolve) => {
        require(['./components/invest/paySuccess.vue'], resolve)
    }
}]

export default investRouter;
