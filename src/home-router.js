// 创建一个路由器实例
// 并且配置路由规则
const homeRouter = [{

  // 我的
  path: '/home/index',
  component: (resolve) => {
    require(['./components/home/index.vue'], resolve)
  }
},{
        //我的红包
        path: '/home/packet',
        component: (resolve) => {
            require(['./components/home/packet.vue'], resolve)
        }
    },{
        //投资记录
        path: '/home/record',
        redirect:'home/record/process',
        component: (resolve) => {
            require(['./components/home/record/record.vue'], resolve)
        },
        children: [{
            path: '/home/record/:param',
            component: (resolve) => {
                require(['./components/home/record/recordList.vue'], resolve)
            }
        }]
    },{
        //投资详情
        name:'investDetail',
        path: '/home/investDetail/:status/:id',
        component: (resolve) => {
            require(['./components/home/record/detail.vue'], resolve)
        }
    },
    {
        //查看合同
        name:'contractCheck',
        path: '/home/contractCheck/:contractUrl',
        component: (resolve) => {
            require(['./components/home/record/contract.vue'], resolve)
        }
    },
    {
        //待回款详情
        name:'returnedDetail',
        path: '/home/returnedDetail/:status/:id',
        component: (resolve) => {
            require(['./components/home/record/returnedDetail.vue'], resolve)
        }
    },  {
        //资金流水
        path: '/home/money',
        // redirect:'/money/all',
        component: (resolve) => {
            require(['./components/home/money.vue'], resolve)
        }
    },{

        //消息中心
        path: '/home/message',
        component: (resolve) => {
            require(['./components/home/message.vue'], resolve)
        }
    },{

        //转让记录
        name:'transferRecord',
        path: '/home/transferRecord/:id',
        component: (resolve) => {
            require(['./components/home/record/transferRecord.vue'], resolve)
        }
    },{

        //总资产
        path: '/home/assets',
        component: (resolve) => {
            require(['./components/home/memberAsset.vue'], resolve)
        }
    },{

        //在途金额
        path: '/home/freezingAmount',
        component: (resolve) => {
            require(['./components/home/freezingAmount.vue'], resolve)
        }
    },{
            //修改交易密码
            path: '/home/setOutPassword',
            component: (resolve) => {
                require(['./components/home/setOutPassword.vue'], resolve)
            }
    }, {

            //修改登录密码
            path: '/home/setPassword',
            component: (resolve) => {
                require(['./components/home/setPassword.vue'], resolve)
            }
    },
    {
            //重置交易密码
            path: '/home/resetOutPassword',
            component: (resolve) => {
                require(['./components/home/resetOutPassword.vue'], resolve)
            }
    },{
    //充值 已经绑卡
    path: "/home/bank/bindCard",
    component: (resolve) => {
      require(['./components/home/bank/bindCard.vue'], resolve)
    },
    beforeEnter: (to, from, next) => {
      Public.API_GET({
        url: 'BankCard',
        data: {},
        success: (result) => {
          if (result.data) {
            sessionStorage.setItem("enterData", JSON.stringify(result.data));
          }
          if (result.data && result.data.bankAccount && result.data.realName && result.data.idCard) {
            next();
          } else {
            next({ path: '/home/bank/toBindCard',query: to.query});
          }
        }
      });
    }
  }, {
    //充值 去绑卡
    path: "/home/bank/toBindCard",
    component: (resolve) => {
      require(['./components/home/bank/toBindCard.vue'], resolve)
    }
  }, {
    //充值 银行卡详情
    path: "/home/bank/bankDetail",
    component: (resolve) => {
      require(['./components/home/bank/bankDetail.vue'], resolve)
    }
  }, {
    //充值 银行卡列表
    path: "/home/bank/bankList",
    // component: (resolve) => {
    //     require(['./components/public/bankList.vue'], resolve)
    // }
  }, {
    //充值 绑卡
    path: "/home/bank/BankCard",
    component: (resolve) => {
      require(['./components/public/bankCard.vue'], resolve)
    }
  }, {
    //充值 获取验证码
    path: "/home/bank/getBankVerifyNo",
    component: (resolve) => {
      require(['./components/home/bank/getBankVerifyNo.vue'], resolve)
    }
  }
  , {
    //充值 结果
    path: "/home/bank/rechargeResult",
    component: (resolve) => {
      require(['./components/home/bank/rechargeResult.vue'], resolve)
    }
  }, {
    //充值 开户信息
    path: "/home/bank/bankInfo",
    component: (resolve) => {
      require(['./components/home/bank/bankInfo.vue'], resolve)
    }
  }, {
    //充值 预留手机号
    path: "/home/bank/bankPhone",
    component: (resolve) => {
      require(['./components/home/bank/bankPhone.vue'], resolve)
    }
  }, {
    //提现
    path: "/home/bank/withdraw",
    component: (resolve) => {
      require(['./components/home/bank/withdraw.vue'], resolve)
    }
  }, {
    //添加银行卡
    path: "/home/bank/toAddBankCard",
    component: (resolve) => {
      require(['./components/home/bank/toAddBankCard.vue'], resolve)
    }
  }, {
    //提现 结果
    path: "/home/bank/withDrawResult",
    component: (resolve) => {
      require(['./components/home/bank/withDrawResult.vue'], resolve)
    }
  }]

export default homeRouter;
