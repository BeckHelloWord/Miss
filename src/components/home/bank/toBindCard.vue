<!--未实名未绑卡（已实名未绑卡）页面 hmc-->

<!--* 根据新银行卡号获取支付渠道-->
<!--* 访问地址：-->
<!--* wd_api/appPay/getNewPayChannelCode-->
<!--* 参数：-->
<!--* bankAccount 银行卡号-->
<!--* realName: 真实姓名  (可选，传了之后就校验)-->
<!--* idCard ： 身份证号  (可选，传了之后就校验)-->
<!--* 返回map-->
<!--* channelCode ：jdapi 京东支付  llweb 连连支付-->

<template>
  <div class="recharge-all">
    <div class="recharge" id="recharge">
      <form class="recharge-form">
        <div class="page-part page-part01">
          <mt-field label="充值金额" placeholder="最低充值100.00元" v-model="sendData.amount" :readonly="amountReadOnly"></mt-field>
        </div>
        <div class="page-part page-part02">
          <mt-field label="持卡人" placeholder="请输入持卡人姓名" v-model="sendData.realName" :readonly="realNameReadOnly"></mt-field>
          <mt-field label="身份证" placeholder="请输入持卡人身份证" v-model="sendData.idCard" :readonly="idCardReadOnly"></mt-field>
        </div>
        <div class="page-part page-part03">
          <div @click="aloneBank" class="selBank" >
            <mt-field label="所属银行" placeholder="请选择所属银行" v-model="sendData.bankName" readonly="readonly" :class="test"></mt-field>          
          </div>
          <mt-field label="银行卡卡号" placeholder="请输入银行卡卡号" v-model="sendData.bankNo" v-validate="'required|email'" data-vv-value-path="innerValue" data-vv-as="银行卡卡号:" data-vv-name="custom" :has-error="errors.has('custom')"></mt-field>
           <span v-show="errors.has('custom')" class="help is-danger">{{ errors.first('custom') }}</span>
        </div>
        <div :class="btnClass" @click="toBankCard" >下一步</div>
      </form>
      <div class="img"><img src="../../../assets/images/tip.png" class="img" /></div>
    </div>
    <div v-show="false" id="bankList">
      <bank-list></bank-list>
    </div>
    <div v-if="llweb" id="bankLlweb">
      <bank-llweb></bank-llweb>
    </div>
    <div v-if="getBankVerifyNo" id="getBankVerifyNo">
      <get-bank-verify-no></get-bank-verify-no>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Field,Toast,Indicator } from 'mint-ui';
  import bankList from '../../public/bankList';
  import bankLlweb from './bankLlweb';
  import getBankVerifyNo from './getBankVerifyNo';

  export default {
    components:{
      mtField:Field,
      bankList:bankList,
      bankLlweb:bankLlweb,
      getBankVerifyNo:getBankVerifyNo,
      Toast,
      Indicator
    },
    data: function() {
      return {
        tradeNo:"",
        way:"",
        test:"off",
        InterValObj:"",
        sendData : {
          amount:"",
          realName:"",
          idCard: "",
          bankName:"",
          bankNo: "",
          isProj:true
        },
        llweb:false,
        getBankVerifyNo:false,
        btnClass:"gary",
        amountReadOnly:false,
        realNameReadOnly:false,
        idCardReadOnly:false
      }
    },
    watch: {
      "sendData.amount" : function (){
        this.btnFun();
      },
      "sendData.realName" : function (){
        this.btnFun();
      },
      "sendData.idCard" : function (){
        this.btnFun();
      },
      "sendData.bankNo" : function (){
        this.btnFun();
      },
      "sendData.bankName" : function (){
        this.btnFun();
      }
    },
    methods: {
      aloneBank(){
        $("#bankList").show();
        $("#recharge").hide();
        window.Hub.$emit('setTitle', "银行卡列表", false, this.closeBankList, " ", null);
      },
      closeBankList(){
        $("#recharge").show();
        $("#bankList").hide();
        window.Hub.$emit('setTitle', "充值", false, null, " ", null)
      },
      toBankCard(){
        if(this.btnClass == "gary"){
          return;
        }
        var sendDataLong = {realName:this.sendData.realName,idCard:this.sendData.idCard,bankAccount:this.sendData.bankNo};

        Public.API_GET({
          url : 'toBankCard',
          data:sendDataLong,
          success : (result) => {
            if(!result.isSuccess){
              Toast({
                message: result.message,
                position: 'bottom',
                duration: 2000
              });
              return
            }

            this.sendData.way = "llwap";
            if(result.data.channelCode == "jdapi"){
              $("#recharge").hide();
              $("#getBankVerifyNo").show();
              this.getBankVerifyNo = true;
            }else{
              this.llweb = true;
              Indicator.open({
                text: '加载中...',
              });
            }

          }
        });
      },
      btnFun(){
        if((this.sendData.amount >= 100 || this.$route.query.amount)  && this.sendData.realName != "" && this.sendData.idCard != "" && this.sendData.bankNo != "" && this.sendData.bankName != ""){
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
      window.Hub.$emit('setFooter', false);
      // 投资列表带数据金额
      if(this.$route.query.amount){
        this.sendData.amount = this.$route.query.amount ;
        window.Hub.$emit('setTitle', "投资", false, null, " ", null);
        this.amountReadOnly = true;
      }
      // 投资列表带投资订单号
      if(this.$route.query.tradeNo){
        this.sendData.tradeNo = this.$route.query.tradeNo ;
        window.Hub.$emit('setTitle', "投资", false, null, " ", null);
      }

      //点击银行卡列表
      window.Hub.$on('bankName', (event) => {
        this.sendData.bankName = event;
        this.test="on";
        $("#recharge").show();
        $("#bankList").hide();
        window.Hub.$emit('setTitle', "充值", false, null, " ", null);
      });
      //接口实名带数据
      var getSenData = sessionStorage.getItem("enterData");
      getSenData = JSON.parse(getSenData);
      //已绑卡未实名不许点击
      if( getSenData.idCard ){
        this.sendData.idCard = getSenData.idCard;
        this.idCardReadOnly = true;
      }
      if( getSenData.realName ){
        this.sendData.realName = getSenData.realName;
        this.realNameReadOnly = true;
      }
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @import "../../../assets/skin";
  .recharge-all{
  .page-part {margin-top: pxToRem(20);}
  .page-part02 {margin-top: pxToRem(30);}

  .img{width:pxToRem(300);margin:0 auto;}
  .img img{width:$img;}

  .mint-cell-title{width: 105px;-webkit-box-flex: 0;-ms-flex: none;flex: none;}

  .red{@include btn;}
  .gary{@include btn;background:$gary;color:$garyFont;}

  }
</style>

