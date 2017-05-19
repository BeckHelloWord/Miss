<!--提现结果 hmc-->
<template>
  <div class="recharge-all">
   <div class="rechargeResult">
     <div class="rechargeSuccess" v-if="resultSuccess">
       <div class="img"><img src="../../../assets/images/rechargeSuccess.png"></div>
       <h3>恭喜您，提现成功</h3>
       <ul>
         <li class="clearfix"><div class="li"><h6>提现：{{amount | formatMoney}}元</h6><span>{{time}}</span></div></li>
         <li class="clearfix"><div class="li"><p>预计1-2个工作日内到账</p></div></li>
       </ul>
       <router-link to="/home/index" class="withDrawSuccessBtn">确定</router-link>
     </div>
     <div class="rechargeFail" v-else>
       <div class="img"><img src="../../../assets/images/rechargeFail.png"></div>
       <h3>很遗憾，提现失败</h3>
       <ul>
         <li class="clearfix"><div class="li"><h6>提现：{{amount | formatMoney}}元</h6><span>{{time}}</span></div></li>
         <li class="clearfix"><div class="li"><p>请重试，或联系宝象客服</p></div></li>
       </ul>
       <router-link to="/home/index" class="withDrawFailBtn">确定</router-link>
     </div>
   </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data: function() {
      return {
        time:"",
        resultSuccess: false,
        amount:0
      }
    },
    methods: {
    },
    mounted: function() {
      window.Hub.$emit('refresh', null);
      window.Hub.$emit('setTitle', "提现", false, null, " ", null);
      window.Hub.$emit('setFooter',false);
      $(".recharge-all").height($(window).height() - 50);//按钮
      //提现带的时间
      if(window.Hub.withDraw){
        this.time = window.Hub.withDraw.time;
      }
      //显示成功失败
      if(this.$route.query.success || this.$route.query.success === "true"){
        this.resultSuccess = true;
      }else{
        this.resultSuccess = false;
      }

      if(this.$route.query.amount){
        this.amount = this.$route.query.amount;
      }
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @import "../../../assets/skin";

.rechargeResult{

  position:relative;
  height: 100%;
  text-align:center;
  color:#333;

  .img{width:pxToRem(166);margin:0 auto;padding:pxToRem(88) 0 pxToRem(60);}
  .img img{width:$img;}

  h3{font-size: pxToRem(36);font-weight:normal;margin-bottom:pxToRem(130);}
  h6{color:$red;font-size: pxToRem(32);font-weight:normal;}
  span{font-size: pxToRem(20);color:#999;}

  ul{width:80%;text-align:left;margin:0 auto;}
  ul li{height:pxToRem(100);position:relative;}
  ul li .li{padding-left:pxToRem(64);}
  ul li:nth-child(2) .li{position:absolute;bottom:2px;}
  ul li:before{content:"";width:pxToRem(44);height:pxToRem(100);float:left;display:block;}
  ul li:nth-child(1):before{background:url(../../../assets/images/rechargeResult01.png) no-repeat left center;background-size:100%;}
  ul li:nth-child(2):before{background:url(../../../assets/images/rechargeResult02.png) no-repeat left center;background-size:100%;}


  p{color:#666;}
  .withDrawSuccessBtn{@include btn-bottom;}
  .withDrawFailBtn{@include btn-bottom;}

  }
</style>
