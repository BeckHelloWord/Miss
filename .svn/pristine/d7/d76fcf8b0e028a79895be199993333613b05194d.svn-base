<!--已绑定银行卡-->
<!--* 根据银行卡ID获取支付渠道-->
<!--* 访问地址：-->
<!--* wd_api/appPay/getPayChannelCode-->
<!--* 参数：-->
<!--* memberId 用户Id-->
<!--* 返回map-->
<!--* channelCode ：jdapi 京东支付  llweb 连连支付-->
<!--* realName 用户真实姓名-->
<!--* idCard 用户身份证号-->
<!--* bankId 银行id-->
<!--* bankName 银行名称-->
<!--* bankAccount 银行账户号-->
<!--* mobile 银行卡预留手机号-->
<!--* bankProvince 开户省份-->
<!--* bankCity 开户城市-->
<!--* bankSubName 支行名称-->
<!--*-->
<!--* onceMoney  银行单次充值金额上限-->
<!--* dayMoney   银行单日充值金额上限-->
<!--* bankPhone  银行电话-->


<template>
  <div class="recharge-all">
    <div v-if="bind">
      <div class="module-bank-con">
        <div class="clearfix">
          <div class="module-bank-logo fl"><img :src='"../../assets/images/bankLogo/bank_select_icon_"+ BankCardData.bankCode +".png"'></div>
          <router-link  :to="{ path: '/home/bank/bankDetail', query: { redirect: 'bankCard' }} ">
            <div class="module-bank-info fl">
              <h2 class="module-bank-account">{{BankCardData.bankAccount | formatBankCard}}</h2>
              <p class="module-bank-name">{{BankCardData.bankName}}</p>
              <p class="module-bank-msg">储蓄卡</p>
            </div>
          </router-link>
        </div>
        <p class="module-bank-address">{{BankCardData.bankSubName|nameFun}} </p>
      </div>
      <p class="module-bank-direction">限额说明：<span>单笔{{ BankCardData.onceMoney|formatMoney }}元,单日{{ BankCardData.dayMoney|formatMoney }}元</span></p>
    </div>
    <div v-else id="toBindCard" class="toBindCard">
      <p>最低充值100元</p>
      <router-link to="/home/bank/toBindCard" class="linkHref">
        <span></span><h2>添加银行卡</h2>
      </router-link>
      <pre class="bankInfomsg"> * 为了您能顺利提现，请正确填写您的开户信息</pre>
      <div class="bankListHref" @click="aloneBank">查看所有支持银行</div>
    </div>
    <div v-show="false" id="bankList">
      <bank-list></bank-list>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Field,Cell ,Toast } from 'mint-ui';
  import bankList from '../public/bankList';
  export default {
    components:{
      mtField:Field,
      mtCell:Cell,
      bankList:bankList,
    },
    data: function() {
      return {
        BankCardData:{bankCode:'01030000',onceMoney:0,dayMoney:0,bankAccount:"",bankName:"",bankSubName:""},
        bind:false
      }
    },
    methods: {
      aloneBank(){
          console.log(1)
        $("#bankList").show();
        $("#toBindCard").hide();
        window.Hub.$emit('setTitle', "所有支持银行", false, this.closeBankList, " ", null);
      },
      closeBankList(){
        $("#toBindCard").show();
        $("#bankList").hide();
        window.Hub.$emit('setTitle', "充值", false, null, " ", null)
      },
      BankCard(){
        Public.API_GET({
          url : 'BankCard',
          success : (result) => {
            if(!result.isSuccess){
              Toast({
                message: result.message,
                position: 'bottom',
                duration: 2000
              });
              return
            }
            this.BankCardData = result.data;
            this.bankChange(this.BankCardData);
            if(result.data && result.data.bankAccount && result.data.realName && result.data.idCard){
              this.bind = true;
            }
        }
      });
      },
      //传参到已绑卡页面
      bankChange(e){
        window.Hub.$emit('bankCardData', e);
      },
    },
    mounted: function() {
      this.BankCard();
      window.Hub.$emit('refresh', null);
      window.Hub.$emit('setTitle', "我的银行卡", false, null, " ", null);
      window.Hub.$emit('setFooter',false);
      $(".toBindCard").height($(window).height() - 50);//按钮
    },
    filters: {
      //未填写支户信息填写暂无开户支行
      nameFun:function (result) {
          if(result == null || result == "" || result == undefined){
              result = "暂无开户支行";
          }
        return result;
      }
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @import "../../assets/skin";

  .module-bank-con {
    padding: 10px 10px 0;
    background: #fff;

    .module-bank-logo {
      width: 12%;
      padding: 0 10px;
    }
    .module-bank-logo img {
      width: 100%;
    }
    .module-bank-info {
      width: 80%;}
    .module-bank-account {
      font-weight: normal;
      color: #333;
      font-size: pxToRem(44);
    }
    .module-bank-name {
      color: #666;
      font-size: pxToRem(26);
      background: url(../../assets/images/module-more.png) no-repeat right center;
    }
    .module-bank-msg {
      width: pxToRem(90);
      height: pxToRem(32);
      line-height: pxToRem(32);
      margin: pxToRem(20) 0 pxToRem(46);
      background: #eabac0;
      color: #fff;
      font-size: pxToRem(22);
      text-align: center;
    }
    .module-bank-address {
      border-top: 1px solid #edf0f3;
      padding: pxToRem(40) 0 pxToRem(40) pxToRem(120);
      margin-right: -10px;
      color: #333;
      font-size: pxToRem(28);
    }
  }
  .module-bank-direction {
    padding: pxToRem(24) 10px;
    color: #999;
    font-size: pxToRem(26)
  }
  .toBindCard{
    padding:20px;font-size: pxToRem(28);background:#fff;
  .linkHref{width:100%;height:pxToRem(300);border:1px solid #e1e1e1;margin:10px 0;display:block;position:relative;}
  .linkHref h2{width:100%;font-weight:normal;font-size: pxToRem(32);text-align:center;position:absolute;bottom:20px;left:0;}
  .linkHref span:before{content:'';width:4px;height:60px;background:#e1e1e1;display:block;position:absolute;top:40%;left:50%;z-index:0;margin-top:-30px;margin-left:-2px;}
  .linkHref span:after{content:'';width:60px;height:4px;background:#e1e1e1;display:block;position:absolute;top:40%;left:50%;z-index:1;margin-top:-2px;margin-left:-30px;}
  }
.bankListHref{color:$red;text-decoration:underline;text-align:right;font-size: pxToRem(26);display:block;margin-top:pxToRem(50);}
</style>
