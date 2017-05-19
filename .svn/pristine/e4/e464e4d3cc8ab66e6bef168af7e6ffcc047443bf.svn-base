import investRouter from "./invest-router.js"
import indexRouter from "./index-router.js"
import homeRouter from "./home-router.js"
// 创建一个路由器实例
// 并且配置路由规则
const routerOption = {

    base: __dirname,
    routes: [
        {
            // 账户设置
            path: '/home/set',
            component: (resolve) => {
                require(['./components/home/set.vue'], resolve)
            }
    }, {
            path: '/',
            redirect: '/index/index'
    }]
}

function pushRouter(childRouter) {
    for (var i in childRouter) {
        routerOption.routes.push(childRouter[i])
    }
}
pushRouter(investRouter)
pushRouter(indexRouter)
pushRouter(homeRouter)

export default routerOption;
