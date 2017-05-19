<template>
	<div class="pay">
		<div class="h5_title p14">投资总额</div>
		<div class="field">
			<span class="label">投资金额</span>
			<span class="labelText"><strong class="amount">{{data.memberAmt+data.truthAmt}}</strong>元</span>
		</div>
		<div class="h5_title p14">投资方式</div>
		<div class="field">
			<span class="label"><i class="iconfont icon-bussinessman"></i>可用余额</span>
			<span class="labelText">{{data.memberAmt}}元</span>
		</div>
		<div class="field">
			<span class="label"><i class="iconfont icon-bussinessman"></i>{{data.bankName}}({{data.bankAccount?data.bankAccount.substr(data.bankAccount.length-5,4):""}})</span>
			<span class="labelText">{{data.truthAmt}}元</span>
		</div>
		<div class="nextBtn" @click="toNext">下一步</div>
	</div>
</template>

<script>
import { Field } from 'mint-ui';
	export default {
		components: {
			mtField:Field
		},
		methods:{
			toNext(){
				this.$router.push({ path: '/home/bank/bindCard', query: { "amount": this.data.truthAmt , "tradeNo": this.data.tradeNo}})
			}
		},
		data: function() {
			return {
				data:{}
			}
		},
		mounted: function() {
			this.data = JSON.parse(sessionStorage.getItem("payData"))
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "收银台", false, null, " ", null)
			window.Hub.$emit('setFooter', false);
		},
		beforeMount: function() {

		}
	}
</script>
<style lang="scss" scoped="" type="text/css">
@import "../../assets/skin";
.pay{
	.h5_title{
		color: #999;
		height: 30px;
		line-height: pxToRem(60);
		font-size: pxToRem(24);
		padding-left: pxToRem(28);
	}
	.field{
		background: #fff;
		padding: 0 pxToRem(28);
					height: pxToRem(100);
			line-height: pxToRem(100);
		span{
			display: inline-block;

			border-bottom: 1px solid #f5f5f5;
		}
		.label{
			width: 40%;
		}
		.labelText{
			width:58%;
			text-align: right;
		}
		.amount{
			color: $red;
			font-size: pxToRem(30);
		}
	}
	.nextBtn{
		margin: 10px;
		background: #b91a30;
		color: #fff;
		height: 46px;
		line-height: 46px;
		font-size: 22px;
		border: 0;
		text-align: center;
	}
}
</style>
