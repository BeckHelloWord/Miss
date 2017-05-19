<!--已实名已绑卡页面 hmc-->
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
    <div id="recharge">
      <bank-card></bank-card>
      <form id="module-form" class="module-form">
        <mt-field label="充值金额" placeholder="最低充值100.00元" v-model="amount" :readonly="amountReadOnly"></mt-field>
        <div :class="btnClass" @click="next">确认充值</div>
      </form>
    </div>

    <div v-if="getBankVerifyNo" id="getBankVerifyNo">
      <get-bank-verify-no></get-bank-verify-no>
    </div>
    <div v-if="llweb" id="bankLlweb">
      <bank-llweb></bank-llweb>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Field, Toast,Indicator } from 'mint-ui';
  import bankCard from '../../public/bankCard';
  import getBankVerifyNo from './getBankVerifyNo';
  import bankLlweb from './bankLlweb';

  export default {
    components:{
      mtField:Field,
      bankCard:bankCard,
      getBankVerifyNo:getBankVerifyNo,
      Toast,
      Indicator,
      bankLlweb:bankLlweb
    },
    data: function() {
      return {
        amount:"",
        sendData:{isProj:true},
        getBankVerifyNo:false,
        llweb:false,
        amountReadOnly:false,
        btnClass:"gary",
      }
    },
    watch:{
      amount : function (){
        this.btnFun();
      }
    },
    methods: {
      next(){
        if(this.btnClass == "gary"){
          return;
        }
        this.sendData.amount = this.amount
        if(this.sendData.way == "jdapi"){
            $("#recharge").hide();
            $("#getBankVerifyNo").show();
            this.getBankVerifyNo = true;
          }else{
            this.llweb = true;
            this.sendData.way = "llwap"
            Indicator.open({
              text: '加载中...',
            });
          }
        },
      btnFun(){
        if(this.amount >= 100 || this.$route.query.amount){
          this.btnClass = "red";
        }else{
          this.btnClass = "gary";
          return;
        }
      }
    },
    mounted: function() {
      window.Hub.$emit('refresh', null);
      window.Hub.$emit('setTitle', "充值", false, null, " ", null);
      window.Hub.$emit('setFooter',false);

      // 投资列表带数据金额
      if(this.$route.query.amount){
        this.amount = this.$route.query.amount ;
        window.Hub.$emit('setTitle', "投资", false, null, " ", null);
        this.amountReadOnly = true;
      };
      // 投资列表带投资订单号
      if(this.$route.query.tradeNo){
        this.sendData.tradeNo = this.$route.query.tradeNo ;
        window.Hub.$emit('setTitle', "投资", false, null, " ", null);
      };
      //我的银行卡页面带来的参数
      window.Hub.$on('bankCardData', (event) => {
        this.sendData.way = event.channelCode;
        this.sendData.bankNo = event.bankAccount;
        this.sendData.bankId = event.bankId;
        this.sendData.realName = event.realName;
        this.sendData.idCard = event.idCard;
        this.sendData.mobile = event.mobile;
      });
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">
@import "../../../assets/skin";
.red{@include btn;}
.gary{@include btn;background:$gary;color:$garyFont;}
</style>
