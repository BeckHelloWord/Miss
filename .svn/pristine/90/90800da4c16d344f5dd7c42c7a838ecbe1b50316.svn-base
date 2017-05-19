<!-- 我的页面 liuhan -->
<!--
 * 用户安全信息接口
 *
 h3. * 接口名称：
 > > 用户安全信息接口
 h3. * 接口访问地址：
 > > wd_api/userCenter/authentication
 h3. * 接口输入参数：
 h3. * 接口返回参数：
 > > 返回类型：APIResponse
 > > > int size：每页显示的记录条数
 > > > int page：当前多少页
 > > > long totalCount：总记录条数
 > > > Object data：List数据对象
 > > > > String mobileStatus：手机认证状态
 > > > > > ("未认证", "none"),
 > > > > > ("认证中", "process"),
 > > > > > ("认证通过", "verified")
 > > > > String mobile：手机
 > > > > String idCardStatus：实名认证状态
 > > > > > ("未认证", "none"),
 > > > > > ("认证中", "process"),
 > > > > > ("认证通过", "verified")
 > > > > String idCard：身份证
 > > > > String realName：真实姓名
 > > > > String outPasswordStatus：交易密码状态
 > > > > > ("未修改，和登录密码相同", "none"),
 > > > > > ("已修改", "verified")
 > > > int status：状态码(200：正常，401：验证失败，500：系统异常)
 > > > String message：需要返回的提示信息
 > > > boolean isSuccess：接口处理是否成功
 -->

<template>
    <div class="home-index">
        <div class="set-list">
            <div class="module padding-content">
                <a class="invest module-item clearfix">
                    <span class="fl">手机号码</span>
                    <i class="fr">
                        <i class="fl" v-if="user.mobile">{{ user.mobile | formatMobile }}</i>
                        <i class="fl" v-else>{{ user.mobileStatus | textTransform }}</i>
                    </i>
                </a>
                <router-link class="capital module-item clearfix" to="/home/bank/bankCard">
                    <span class="fl">银行卡</span>
                    <i class="fr">
                        <i class="fl" v-if="bankAccount">{{ bankAccount | formatBankCard }}</i>
                        <i class="fl" v-else>去充值绑卡</i>
                        <i class="iconfont icon-arrow fl"></i>
                    </i>
                </router-link>
                <a class="capital module-item clearfix">
                    <span class="fl">实名认证</span>
                    <i class="fr" v-if="user.realName">{{ user.realName }}</i>
                    <i class="fr" v-else>{{ user.idCardStatus | textTransform }}</i>
                </a>
            </div>
            <div class="module padding-content">
                <router-link class="packet module-item clearfix" to="/home/setOutPassword">
                    <span class="fl">交易密码</span>
                    <span class="msg fl" v-if="user.size">{{user.size}}</span>
                    <i class="fr">
                        <i class="fl">{{ user.outPasswordStatus | passwordTransform }}</i>
                        <i class="iconfont icon-arrow fl"></i>
                    </i>
                </router-link>
                <router-link class="packet module-item clearfix" to="/home/setPassword">
                    <span class="fl">登录密码</span>
                    <span class="msg fl" v-if="user.size">{{user.size}}</span>
                    <i class="iconfont icon-arrow fr"></i>
                </router-link>
            </div>
            <div class="set-btn" @click="logout">退出登录</div>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        components: {

        },
        data: function() {
            return {
                user: {},
                bankAccount: ""
            }
        },
        methods: {

            // 获取设置列表的状态
            getSetStatus: function() {
                Public.API_GET({
                    url: 'authentication',
                    async: false,
                    success: (result) => {
                        this.user = result.data;
                    }
                });
            },

            // 获取银行卡信息
            getBankDetail: function() {
                Public.API_GET({
                    url: 'bankDetail',
                    async: false,
                    success: (result) => {
                        this.bankAccount = result.data.bankAccount;
                    }
                });
            },

            // 退出登录
            logout: function() {
                Public.Auth.remove();

                this.$router.push({
                    path: '/index'
                });
            }
        },
        mounted: function() {
            window.Hub.$emit('refresh', null);
            window.Hub.$emit('setTitle', "账户设置", false, null, ' ', null);
            window.Hub.$emit('setFooter', false);

            this.getSetStatus();
            this.getBankDetail();
        },
        filters: {
            textTransform: function(value) {
                if (value == "verified") {
                    return "认证通过";
                } else if (value == "process") {
                    return "认证中";
                } else {
                    return "未认证";
                }
            },
            passwordTransform: function(value) {
                if (value == "verified") {
                    return "已修改";
                } else {
                    return "未修改，和登录密码相同";
                }
            }
        }
    }

</script>
<style lang="sass-loader">
    @import "../../assets/home";

</style>
