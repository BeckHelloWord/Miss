<!--预留手机号 hmc-->

<!--* 修改预留银行手机号码-->
<!--* 接口访问地址：-->
<!--* /wd_api/bankApp/changeBankMobile-->
<!--* 参数：-->
<!--* params.mobile 银行预留手机号-->
<!--* 返回值：-->
<!--* @return 200成功  500异常  返回异常信息-->
<template>
  <div class="recharge-all">
    <form id="bankMobileForm" class="bankMobileForm">
      <mt-field label="预留手机号" placeholder="请填写预留手机号" v-model="myMobile"></mt-field>
      <pre class="bankInfomsg"> * 为了您能顺利提现，请正确填写您的开户信息</pre>
      <div class="bankPhoneBtn" @click="mobileBtn">保存</div>
    </form>
  </div>
</template>



<script type="text/babel">
  import { Field,Toast } from 'mint-ui';
  export default {
    components:{
      mtField:Field
    },
    data() {
      return {
        myMobile:""
      };
    },
    methods: {
      mobileBtn(){
        var sendData = {mobile:this.myMobile};
        Public.API_GET({
          url : 'reBankPhone',
          data:sendData,
          success : (result) => {
            if(!result.isSuccess){
              Toast({
                message: result.message,
                position: 'bottom',
                duration: 2000
              });
              return
            }
            Toast({
              message: '开户信息修改成功',
              position: 'bottom',
              duration: 2000
            });
            this.$router.push({ path: '/home/bank/bankDetail' ,query:{redirect:this.$route.query.redirect}});
          }
        });
      }

    },
    mounted() {
      window.Hub.$emit('refresh', null);
      window.Hub.$emit('setTitle', "预留手机号", false, null, " ", null);
      window.Hub.$emit('setFooter',false);
      $(".recharge-all").height($(window).height() - 50);//按钮
    }
  };
</script>

<style lang="scss" scoped="" type="text/css">
  @import "../../../assets/skin";
  .recharge-all{
  pre{color:#999;font-size: pxToRem(24);margin:20px;}
  .bankPhoneBtn{@include btn;}
  }
</style>

