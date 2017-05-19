<!-- 我的页面 liuhan-->
<!--
 *  2017.05.08
 *  获取首页用户相关信息接口（登录后用--- H5接口适用）
 *
 * 接口访问路径：
 * wd_api/homePage/homePageByProjMember
 *
 *  params memberId 登录用户id
 *  params reqSource
 *      reqSource = xn 想念
 *
 * @return map
 *  member 用户信息
 *  totalAsset 总资产
 *  available 账户余额
 *  userName 用户名
 *  hideMobile 手机号
 *  size 未使用的红包个数
 *  count 未读消息条数
 -->


<template>
    <div class="home-index">
        <div class="index-top padding-content">
            <div class="user-name">{{user.userName}}（{{user.hideMobile}}）</div>
            <!-- <div class="user-asset t_c">
                <h3>总资产</h3>
                <p><span>{{user.totalAsset | formatMoney}}</span>元</p>
            </div> -->
            <router-link to='/home/assets' tag='div' class='user-asset t_c'>
                <h3>总资产</h3>
                <p><span>{{user.totalAsset | formatMoney}}</span>元</p>
            </router-link>
        </div>
        <div class="index-recharge padding-content clearfix">
            <div class="left">
                <p>{{user.available | formatMoney}}</p>
                <p>账户余额</p>
            </div>
            <div class="right t_c">
                <router-link to="/home/bank/withdraw">提现</router-link>
                <router-link to="/home/bank/bindCard">充值</router-link>
            </div>
        </div>
        <div class="set-list">
            <div class="module padding-content">
                <router-link class="invest module-item clearfix" to="/home/record">
                    <i class="iconfont icon-record fl"></i>
                    <span class="fl">投资记录</span>
                    <i class="iconfont icon-arrow fr"></i>
                </router-link>
                <router-link class="capital module-item clearfix" to="/home/money">
                    <i class="iconfont icon-capital fl"></i>
                    <span class="fl">资金流水</span>
                    <i class="iconfont icon-arrow fr"></i>
                </router-link>
            </div>
            <div class="module padding-content">
                <router-link class="packet module-item clearfix" to="/home/packet">
                    <i class="iconfont icon-packet fl"></i>
                    <span class="fl">我的红包</span>
                    <span class="msg fl" v-if="user.size">{{user.size}}</span>
                    <i class="iconfont icon-arrow fr"></i>
                </router-link>
            </div>
            <div class="module padding-content">
                <router-link class="set module-item clearfix" to="/home/set">
                    <i class="iconfont icon-setting fl"></i>
                    <span class="fl">账户设置</span>
                    <i class="iconfont icon-arrow fr"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        data: function() {
            return {
                user: {}
            }
        },
        methods: {
            getUserData: function() {
                Public.API_GET({
                    url: 'homePageByProjMember',
                    async: false,
                    success: (result) => {
                        this.user = result.data;
                        this.init();
                    }
                });
            },
            init: function() {
                window.Hub.$emit('refresh', null);
                window.Hub.$emit('setTitle', "个人中心", false, null, '<i class="iconfont icon-bussinessman menu-msg fl"><i class="menu-msg-num">' + this.user.count + '</i></i>', null);
                window.Hub.$emit('setFooter', true);

                if (!this.user.count) {
                    $(".menu-msg-num").hide();
                }
            }
        },
        mounted: function() {
            this.getUserData();
        }
    }

</script>
<style lang="sass-loader">
    @import "../../assets/home";

</style>
