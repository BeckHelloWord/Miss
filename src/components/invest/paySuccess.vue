<template>
  <div class="paySuccess">
   <div class="rechargeResult">
   <div v-if="!successFinish">
    <div class="successLoading">
    <div class="loadingCoin2"></div>
    </div>
   </div>
    <div v-if="successFinish">
        <div class="rechargeSuccess" v-if="success">
            <div class="successFace"><img src="../../assets/images/rechargeSuccess.png"></div>
            <h3>恭喜您，投资成功</h3>
            <div class="investSchedule">
                <ul class="clearfix">
                    <li>
                        <div class="img"><img src="../../assets/images/invest-Icon1.png"></div>
                        <p class="txtWord">订单处理</p>
                        <p>{{startTime}}</p>
                    </li>
                    <li class="on">
                        <div class="img"><img src="../../assets/images/invest-Icon2.png"></div>
                        <p class="txtWord">投资完成</p>
                        <p>{{endTime}}</p>
                    </li>
                    <li>
                        <div class="img"><img src="../../assets/images/invest-Icon3.png"></div>
                        <p class="txtWord">开始计息</p>
                        
                    </li>
                </ul>
            </div>
        </div>
        <div class="rechargeSuccess" v-if="!success">
            <div class="successFace"><img src="../../assets/images/rechargeFail.png"></div>
            <h3>很遗憾，投资操作失败</h3>
                <div class="investSchedule">
                    <ul class="clearfix">
                        <li>
                            <div class="img"><img src="../../assets/images/invest-Icon1.png"></div>
                            <p class="txtWord">订单处理</p>
                            <p>{{startTime}}</p>
                        </li>
                        <li class="on">
                            <div class="img"><img src="../../assets/images/invest-Icon4.png"></div>
                            <p class="txtWord">投资失败</p>
                            <p>{{endTime}}</p>
                        </li>
                        <li>
                            <div class="img"><img src="../../assets/images/invest-Icon3.png"></div>
                            <p class="txtWord">开始计息</p>
                           
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    <div class="btnBox">
        <router-link to="/home/record" class="investRecord">查看投资记录</router-link>
        <router-link to="/invest" class="toInvest">继续投资</router-link>
    </div>
   </div>
  </div>
</template>

<script>
import {Toast } from 'mint-ui';
	export default {
		data: function() {
			return {
                success:false,
                successFinish:false,
                startTime:"",
                endTime:""
			}
		},
        methods:{
            initData(){
                Public.API_GET({
					url: 'findOrder',
					data: {
                        tradeNo :this.$route.query.tradeNo
                    },
					success: (result) => {	   
                        if(result.status=="201"){
                            Toast({
                                message:result.message,
                                position: 'bottom',
                                duration: 2000
                            })
                        }else{
                            if(result.data.ordStatus=="notFinace"||result.data.ordStatus=="finace"){
                                this.successFinish=true;
                                if(result.data.ordStatus=="notFinace"){
                                    this.success=false;
                                }else{
                                    this.success=true;
                                }
                                var endDate=new Date()
                                this.endTime = endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDay()+" "+endDate.getHours()+":"+endDate.getMinutes()+":"+endDate.getSeconds()
                            }else{
                                window.setTimeout(this.initData,1000)
                            }
                        }
					}
				});
            }
        },
		mounted: function() {
            this.initData()
            var nowDate=new Date()
            this.startTime = nowDate.getFullYear()+"-"+(nowDate.getMonth()+1)+"-"+nowDate.getDay()+" "+nowDate.getHours()+":"+nowDate.getMinutes()+":"+nowDate.getSeconds()
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "收银台", false, null, " ", null)
			window.Hub.$emit('setFooter', false);
			 $(".paySuccess").height($(window).height() - 50);//按钮
		    $(".main-body").css("background","#fff")

		},
		destroyed:function(){
			$(".main-body").css("background","#edf0f3")
		},
		beforeMount: function() {
	
		}
	}
</script>
<style lang="scss"  type="text/css">
@import "../../assets/skin";

.paySuccess{
  position:relative;
  height: 100%;
  text-align:center;
  color:#333;
    .successLoading{
        padding-top:pxToRem(80);
    }
    .btnBox{
        position:fixed;
        width:100%;
        bottom:0;
        .investRecord{
            //按钮
            width: 40%;
            //按钮
            margin: pxToRem(40) 4%;
            height: pxToRem(80);
            line-height: pxToRem(80);
            border: 0;
            display: inline-block;
            color: $red;
            border:1px solid $red;
            background: $white;
            font-size: pxToRem(32);
            text-align: center;
        }
        .toInvest{
            //按钮
            width: 40%;
            //按钮
            margin: pxToRem(40) 4%;
            height: pxToRem(80);
            line-height: pxToRem(80);
            border: 0;
            display: inline-block;
            color: $white;
            border:1px solid $yellow;
            background: $yellow;
            font-size: pxToRem(32);
            text-align: center;
        }
    }

  .successFace{width:pxToRem(166);margin:0 auto;}
  .successFace img{width:$img;padding:pxToRem(88) 0 pxToRem(60);}

  h3{font-size: pxToRem(36);font-weight:normal;margin-bottom:pxToRem(80);}
  h6{color:$red;font-size: pxToRem(32);}
  span{font-size: pxToRem(20);color:#999;}

	p{color:#666;}
    

	.rechargeFailBtn{@include btn-bottom;}


  .investSchedule ul{margin-top:5%;}
	.investSchedule ul li {float:left;width:33.33%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;text-align: center;position: relative;}
	.investSchedule ul li + li:before{content: "";width:80%;border-top:2px solid #ccc;position: absolute;top:17%;left:-40%;z-index: -1;overflow: hidden;}
  .investSchedule .on:before{border-top:2px solid $red}
	.investSchedule ul li img{width:20%;margin-bottom:10px;position:relative;}
	.investSchedule ul li .txtWord{color:#666;}
	.investSchedule ul li p{font-size:14px;color:#999;line-height:1.6;}
	.investSchedule ul li p:last-child{font-size:1.1rem;}

  }
</style>