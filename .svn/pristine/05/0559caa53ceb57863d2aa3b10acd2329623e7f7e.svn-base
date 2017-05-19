<!--提现页面获取验证码 hmc-->
<!--* 获取验证码接口-->
<!--*-->
<!--h3. * 接口名称：-->
<!--&gt; > 获取验证码接口-->
<!--h3. * 接口访问地址：-->
<!--&gt; > wd_api/userCenter/sendVerifyOn-->
<!--h3. * 接口输入参数：-->
<!--&gt; > mobile：手机号-->
<!--&gt; > type：验证码类型（暂时没用）-->
<!--&gt; > operate：中文信息，用于显示在短信上						通过宝象金融手机客户端进行提现操作"-->
<!--&gt; > voice  是否需要语音  true 需要  false 不需要 或者不传也是不需要-->
<!--&gt; > > 例如：您正在${action}，本次的动态验证码为。。。-->
<!--h3. * 接口返回参数：-->
<!--&gt; > 返回类型：APIResponse-->
<!--&gt; > > int size：每页显示的记录条数-->
<!--&gt; > > int page：当前多少页-->
<!--&gt; > > long totalCount：总记录条数-->
<!--&gt; > > Object data：List数据对象-->
<!--&gt; > > > 无数据-->
<!--&gt; > > int status：状态码(200：正常，401：验证失败，500：系统异常)-->
<!--&gt; > > String message：需要返回的提示信息-->
<!--&gt; > > boolean isSuccess：接口处理是否成功-->

<!--* 提现操作-->
<!--* 接口访问地址：-->
<!--* wd_api/recharge/doWithdraw-->
<!--* 接口输入参数：-->
<!--* params amount 金额-->
<!--* params outPassword 交易密码-->
<!--* params verifyNo 校验码-->
<!--* 接口返回参数：-->
<!--* @return 200 成功-->



<template>
  <div class="recharge-all">
    <div id="phoneDom">
      <form id="phone-form" class="phone-form">
        <mt-field label="预留手机号" v-model="mobile"></mt-field>
        <mt-field label="验证码" v-model="verifyNo">
          <div class="getVerifyNo" @click="getVerifyNo" :class="graycolor">{{getVerifyNoText}}</div>
        </mt-field>
        <a class="phone-form-btn" @click="doWithdraw">确认提现</a>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Field,Toast } from 'mint-ui';
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
        graycolor:"",
        curCount:60,
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
          this.graycolor = "";
        }else {
          this.curCount--;
          this.getVerifyNoText = this.curCount + "s 重新发送";
          this.graycolor = "graycolor";
        }
      },
//      获取验证码
      getVerifyNo(){
          Public.API_GET({
            url : 'sendVerifyOn',
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
            }
          });
      },
//      确认提现
      doWithdraw(){
        var doWithdrawData = {amount:this.$parent.amount,outPassword:this.$parent.password,verifyNo:this.verifyNo};
        Public.API_GET({
          url : 'doWithdraw',
          data:doWithdrawData ,
          success : (result,request) => {
            if(!result.isSuccess){
              Toast({
                message: result.message,
                position: 'bottom',
                duration: 2000
              });
              return
            }
            var time = new Date(request.getResponseHeader('Date'));
            time = time.getFullYear() + '.' + (time.getMonth() + 1) + '.' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() ;
            window.Hub.withDraw={time:time};

            if(result.status && result.status == 200){
              this.$router.push({ path: '/home/bank/withDrawResult',query: {"success":true,"amount":this.$parent.amount}});
            }else{
              this.$router.push({ path: '/home/bank/withDrawResult',query: {"success":false,"amount":this.$parent.amount}});
            }
          }
        });
      }
    },
    mounted: function() {
      window.Hub.$emit('refresh', null);
      window.Hub.$emit('setTitle', "提现", false, null, " ", null);
      window.Hub.$emit('setFooter',false);
      //如果有手机号直接显示
      if(this.$parent.sendData.mobile){
        this.mobile = this.$parent.sendData.mobile;
      }else{
        this.mobile = "";
      }

    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @import "../../../assets/skin";
  .recharge-all{
  .phone-form-btn {@include btn;}
  .getVerifyNo{color:#b91a30;}
  .graycolor{color:$graycolor;}
  }
</style>
