// 创建一个路由器实例
// 并且配置路由规则
const indexRouter = [{
        //首页
        path: "/index/index",
        component: (resolve) => {
            require(['./components/index/index.vue'], resolve)
        }
    }, {
        //安全保障
        path: '/index/guarantee',
        component: (resolve) => {
            require(['./components/index/guarantee.vue'], resolve)
        }
    }, {
        //新手指南
        path: "/index/guide",
        component: (resolve) => {
            require(['./components/index/guide.vue'], resolve)
        }

    }, {
        //登录
        path: "/index/login",
        component: (resolve) => {
            require(['./components/index/login.vue'], resolve)
        }
    },{

        //注册
        path: '/index/register',
        component: (resolve) => {
            require(['./components/index/register.vue'], resolve)
        }
    } , {

        //忘记密码
        path: '/index/forget',
        component: (resolve) => {
            require(['./components/index/forget.vue'], resolve)
        }

    },  {

        // 注册协议
        path: '/index/protocol',
        component: (resolve) => {
            require(['./components/index/protocol.vue'], resolve)
        }
    },{

        //重置密码
        name:'resetPassword',
        path: '/index/resetPassword',
        component: (resolve) => {
            require(['./components/index/resetPassword.vue'], resolve)
        }
    },{

        //首页公告
        name:'notice',
        path: '/index/notice/:id',
        component: (resolve) => {
            require(['./components/index/notice.vue'], resolve)
        }
    }]

export default indexRouter;
