<!--充值页面获取验证码 hmc-->
<!--* 京东支付第一步-->
<!--* 访问地址：-->
<!--* wd_api/jDPay/doJDReadyPay-->
<!--* 参数：-->
<!--* tradeNo  投资订单号  (可选)-->
<!--* way：第三方通道-->
<!--*          JDH5 ：安卓端京东认证支付-->
<!--*          JDandroid ：安卓端京东认证支付-->
<!--*          JDios ：苹果端京东认证支付-->
<!--* amount：资金-->
<!--* bankNo：银行卡号(可选，与银行卡ID必填一项)-->
<!--* bankId：银行卡ID(可选，与银行卡号必填一项)-->
<!--* realName: 真实姓名  (可选，第一次的时候需要)-->
<!--* idCard ： 身份证号  (可选，第一次的时候需要)-->
<!--* mobile ： 银行预留手机号码-->
<!--* 返回map-->
<!--* orderNo 充值订单号-->
<!--* amount  充值金额-->


<!--* 京东支付第二步-->
<!--* 访问地址：-->
<!--* wd_api/jDPay/doJDPay-->
<!--* 参数：-->
<!--* orderNo： 充值订单号-->
<!--* amount： 资金-->
<!--* mobile： 银行预留手机号码-->
<!--* verifyNo： 验证码-->
<!--* 返回map-->
<!--* orderNo 充值订单号-->
<!--* amount  充值金额-->


<template>
  <div class="recharge-all">
    <div id="phoneDom">
      <form id="phone-form" class="phone-form">
        <mt-field label="预留手机号" v-model="mobile"></mt-field>
        <mt-field label="验证码" v-model="verifyNo">
          <div class="getVerifyNo" @click="getVerifyNo" :class="color">{{getVerifyNoText}}</div>
        </mt-field>
        <a class="phone-form-btn" @click="sureRecharge">确认充值</a>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Field,Toast  } from 'mint-ui';
  export default {
    components:{
      mtField:Field,
      Toast
    },
    data: function() {
      return {
        mobile:"",
        verifyNo:"",
        getVerifyNoText:"获取验证码",
        color:"grayColor",
        curCount:60,
      }
    },
    watch:{
      mobile:function(){
        this.getNo();
      }
    },
    methods: {
//        倒计时
      SetRemainTime() {
        if(this.curCount < 60){
          return;
        }
        this.curCount--;
        this.InterValObj = window.setInterval(this.setTime,1000);
      },
      setTime(){
        if (this.curCount == 0) {
          this.curCount = 60;
          this.getVerifyNoText = "获取验证码";
          window.clearInterval(this.InterValObj);
          this.color = "redColor";
        }else {
          this.curCount--;
          this.getVerifyNoText = this.curCount + "s 重新发送";
          this.color = "grayColor";
        }
      },
      //获取验证码
      getVerifyNo(){
        //获取倒计时变成灰色时，不点击
          if(this.color == "grayColor"){
            return
          }
          this.$parent.sendData.mobile = this.mobile;
          Public.API_GET({
            url : 'toBankCardJd',
            data: this.$parent.sendData,
            success : (result) => {
              if(!result.isSuccess){
                Toast({
                  message: result.message,
                  position: 'bottom',
                  duration: 2000
                });
                return
              }
            //返回的订单号
              this.$parent.sendData.orderNo = result.data.orderNo;
              this.$parent.sendData.amount = result.data.amount;
              setTimeout(this.SetRemainTime());
            }
          });
      },
//      确认充值
      sureRecharge(){
        var toBankCardJdPayData = this.$parent.sendData ;
        toBankCardJdPayData.verifyNo = this.verifyNo;

        Public.API_GET({
          url : 'toBankCardJdPay',
          data:toBankCardJdPayData,
          success : (result,request) => {
            if(!result.isSuccess){
              Toast({
                message: result.message,
                position: 'bottom',
                duration: 2000
              });
              return
            }
            //有订单号直接调回投资成功，否则跳入充值成功
            if(this.$route.query.tradeNo){
              this.$router.push({ path: '/invest/paySuccess',query:{tradeNo:this.$route.query.tradeNo} });
            }else{
              var time = new Date(request.getResponseHeader('Date'));
              time = time.getFullYear() + '.' + (time.getMonth() + 1) + '.' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() ;
              window.Hub.recharge={time:time};

              if(result.status && result.status == 200){
                this.$router.push({ path: '/home/bank/rechargeResult',query: {"success":true,"amount":this.$parent.sendData.amount} });
              }else{
                this.$router.push({ path: '/home/bank/rechargeResult',query: {"success":false,"amount":this.$parent.sendData.amount} });
              }
            }
          }
        });
      },
      getNo(){
          if(this.mobile == ""){
            this.color = "garyColor"
          }else{
            this.color = "redColor"
          }
      }
    },
    mounted: function() {
      window.Hub.$emit('refresh', null);
      window.Hub.$emit('setTitle', "充值", false, null, " ", null);
      window.Hub.$emit('setFooter',false);
      //获取验证码直接将登陆号码带入
      var loginMobile = JSON.parse(localStorage.getItem("persion"));
      this.mobile = loginMobile.mobile;

      //如果有手机号直接显示
      if(this.$parent.sendData.mobile){
        this.mobile = this.$parent.sendData.mobile;
      }
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @import "../../../assets/skin";
  .recharge-all{
  .phone-form-btn {@include btn;}
  .getVerifyNo{color:#b91a30;}
  .grayColor{color:$graycolor;}
  .redColor{color:$red;}
  }
</style>
