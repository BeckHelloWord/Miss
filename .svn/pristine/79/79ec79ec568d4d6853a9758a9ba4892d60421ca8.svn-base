<!--银行卡列表 hmc-->
<!--* 获取银行卡限额接口-->
<!--* 地址：-->
<!--* /wd_api/recharge/getBankList-->
<!--* 参数：-->
<!--* params.channel 充值渠道：yibao lianlian jdapi-->
<!--* 返回值：-->
<!--* List-->
<!--* bankName 名称-->
<!--* onceMoney 单笔限额-->
<!--* dayMoney 单日限额-->
<!--* phone  电话号码-->
<!--* imageUrl 图片-->
<!--* content   备注-->
<!--* @return 200成功  500异常  返回异常信息-->
<template>
  <div class="select-bank" id="select-bank">
    <p class="tips">支付额度会根据银行规定适时调整，仅供参考</p>
    <div class="clearfix bankList"  v-for="item in bankListData" @click="bankChange(item.bankName)" >
      <div class="bankLogo fl"><img :src='"../../assets/images/bankLogo/bank_select_icon_"+ item.bankCode +".png"'></div>
      <div class="bankInfo">
        <h2>{{item.bankName}}</h2>
        <p>单笔{{item.onceMoney}}.00元,单日{{item.dayMoney}}.00元</p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data: function() {
      return {
        bankListData:[]
      }
    },
    methods: {
      bankChange(e){
        window.Hub.$emit('bankName', e);
      },
      bankList(){
        Public.API_GET({
          url : 'bankList',
          data:{},
          success : (result) => {
            if(!result.isSuccess){
              Toast({
                message: result.message,
                position: 'bottom',
                duration: 2000
              });
              return
            }
            this.bankListData = result.data;
          }
        });
      },/*moduleList接口*/
    },
    mounted: function() {
      this.bankList();
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @import "../../assets/skin";
  .bankLogo img {width: $img;}
  .tips {color: #666;font-size: pxToRem(30);min-height: pxToRem(140);line-height: pxToRem(140);padding-left: 40px;background: #e9e9e9 url(../../assets/images/selbank-remind-icon.png) no-repeat 17px center;}

  .bankList {
    max-height: pxToRem(120);
    border-bottom: 1px solid #dedede;
    background: #fff;

    .bankLogo {width: 10%;padding: 6px 10px 0;}
    .bankInfo {
      padding: 9px 0;
      h2 {font-size: pxToRem(30);color: #333;font-weight: normal;}
      p {font-size: pxToRem(20);color: #dbdbdb;}
    }
  }
</style>
