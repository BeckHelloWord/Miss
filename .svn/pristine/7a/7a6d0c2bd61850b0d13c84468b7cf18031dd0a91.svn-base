<!--添加银行卡获取验证码 hmc-->
<!--//  提现绑定银行卡短信验证码-->
<!--#define API_URI_BINGBANKON-->
<!--@"wd_api/userCenter/bingBankOn"-->

<template>
  <div class="recharge-all">
    <div id="phoneDom">
      <form id="phone-form" class="phone-form">
        <mt-field label="预留手机号" v-model="mobile"></mt-field>
        <mt-field label="验证码" v-model="verifyNo">
          <div class="getVerifyNo" @click="bingBankOn" :class="graycolor">{{getVerifyNoText}}</div>
        </mt-field>
        <a class="phone-form-btn" @click="saveBank">确认</a>
      </form>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Field} from 'mint-ui';
  export default {
    components:{
      mtField:Field
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
      bingBankOn(){
        var bingBankOnData = {mobile:this.mobile};
          Public.API_GET({
            url : 'bingBankOn',
            data: bingBankOnData,
            success : (result) => {
              if(!result.isSuccess){
                Toast({
                  message: result.message,
                  position: 'bottom',
                  duration: 2000
                });
                return
              }
              this.verifyNo = result.data.verifyNo
            }
          });
      },
//      确认提现
      saveBank(){
        var saveBankData = {realName:this.$parent.realName,idCard:this.$parent.idCard,bankAccount:this.$parent.bankAccount,bankName:this.$parent.bankName,bankSubName:this.$parent.bankSubName,province:this.$parent.addressProvince,city:this.$parent.addressCity,mobile:this.mobile,verifyNo:this.verifyNo};
        Public.API_GET({
          url : 'saveBank',
          data:saveBankData,
          success : (result) => {
            if(!result.isSuccess){
              Toast({
                message: result.message,
                position: 'bottom',
                duration: 2000
              });
              return
            }
            this.$router.push({ path: '/home/bank/withdraw' });
          }
        });},
    },
    mounted: function() {
      window.Hub.$emit('refresh', null);
      window.Hub.$emit('setTitle', "添加银行卡", false, null, " ", null);
      window.Hub.$emit('setFooter',false);
      this.mobile = this.$parent.mobile;
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
