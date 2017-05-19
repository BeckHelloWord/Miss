<!--连连 hmc-->
<!--/**-->
<!--* 连连充值申请接口 （H5接口适用）-->
<!--*-->
<!--&gt; > wd_api/recharge/lianlianSubmitByProj-->
<!--h3. * 接口输入参数：-->
<!--&gt; > tradeNo  投资订单号-->
<!--&gt; > way：第三方通道-->
<!--&gt; > > > llwap ：连连H5认证支付-->
<!--&gt; > amount：资金-->
<!--&gt; > bankNo：银行卡号(可选，与银行卡ID必填一项)-->
<!--&gt; > bankId：银行卡ID(可选，与银行卡号必填一项)-->
<!--&gt; > realName: 真实姓名-->
<!--&gt; > idCard ： 身份证号-->
<!--h3. * 接口返回参数：-->
<!--&gt; > 返回类型：APIResponse-->
<!--&gt; > > Object data paySubmit：-->
<!--&gt; > > > String submitUrl：提交的URL-->
<!--&gt; > > Map submitData：提交的参数-->
<!--&gt; > > > String amount：资金-->
<!--&gt; > > > String noticeUrl：第三方支付回调地址-->


<template>
  <div class="recharge-all">
      <form id="pay-form" class="pay-form" :action="backUrl" method="post">
        <input name='req_data' :value="list"type="hidden" />
      </form>
  </div>
</template>

<script type="text/javascript">
  import { Toast } from 'mint-ui';
  export default {
    components:{
      Toast
    },
    data: function() {
      return {
        backUrl:'',
        list:""
      }
    },
    methods: {
      toBankCardLl(){
        Public.API_GET({
          url : 'toBankCardLl',
          data:this.$parent.sendData,
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
            window.Hub.recharge={time:time};
            this.list = result.data.req_data;//值
            this.backUrl = result.data.submitUrl;//提交链接
        setTimeout(function () {
          $("#pay-form").submit();
        },0)
          }
        });
      }
    },
    mounted: function() {
      window.Hub.$emit('refresh', null);
      window.Hub.$emit('setTitle', "充值", false, null, " ", null);
      window.Hub.$emit('setFooter',false);
      this.toBankCardLl();

    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @import "../../../assets/skin";
  .recharge-all{

  }
</style>
