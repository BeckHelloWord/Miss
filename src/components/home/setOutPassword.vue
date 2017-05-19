<template>
	<div class="setPasswordBox">
	<div class="setPassword">
		<input placeholder="请输入原密码" v-model="oldPassword" type="password"/>
		<input placeholder="请输入新密码" v-model="newPassword" type="password"/>
		<input placeholder="请确认新密码" v-model="newPassword2" type="password"/>
		<p class="tips">时常更换交易密码可以更好的保护您的帐号安全</p>
	</div>
	<button class="subBtn" @click="sub" id="subBtn">确认修改</button>
	<p class="reset"><router-link :to="{ path: '/home/resetOutPassword'}">重置交易密码</router-link></p>
	</div>
</template>

<script>

import {Toast,Field} from 'mint-ui';
	export default {
		data: function() {
			return {
				oldPassword:"",
				newPassword:"",
				newPassword2:""
			}
		},
		methods: {
			check(){
				if(this.oldPassword==""||this.newPassword==""){
					Toast("请输入密码")
					return true
				}
				console.log(this.oldPassword===this.newPassword)
				if(this.oldPassword===this.newPassword){
					Toast("新老密码不能一致")
					return true
				}
				if(this.newPassword.length<6){
					Toast("密码小于6位")
					return true
				}
				if(this.newPassword2!=this.newPassword){
					Toast("两次密码输入不一致")
					return true
				}
				return false
			},
			sub() {
				if(this.check()){
					return
				}
				var sendData={
					oldOutPassword:this.oldPassword,
					newOutPassword:this.newPassword
				}
				Public.API_GET({
					url: 'editOutPassword',
					data: sendData,
					success: (result) => {
						if(result.isSuccess){
							Toast("修改成功")
						}else{
							Toast(result.message)
						}
					}
				});
				
			}
		},
		mounted: function() {
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "交易密码修改", false, null, " ", null)
			window.Hub.$emit('setFooter',false);
			$(".main-body").css("background","#fff")

		},
		destroyed:function(){
			$(".main-body").css("background","#edf0f3")
		},
		beforeMount: function() {

		}
	}
</script>
<style lang="scss" type="text/css">
@import "../../assets/skin";
.setPasswordBox{
	.setPassword{
		margin:  pxToRem(20) pxToRem(20) 0 pxToRem(20);
		font-size: pxToRem(26);
		position: relative;
		input{
			height: pxToRem(72);
			line-height: pxToRem(40);
			padding: pxToRem(14);
			border: 1px solid #d3d3d3;
			z-index: 0;
			width: 100%;
			position: relative;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
		}
		input+input{
			margin-top:pxToRem(20);
		}
		.tips{
			padding-left: 20px;
			line-height: 18px;
			margin-top: 6px;
			font-size: 12px;
			color: #a7a7a7;
			background: url(../../assets/images/tips_icon.png) no-repeat 0 1px;
			background-size: 16px 16px;
		}
	}
	.reset{
		margin:  pxToRem(20) pxToRem(20) 0 pxToRem(20);
		text-align:right;

		text-decoration: underline;
		font-size: 14px;
		a{
		color: $aLink;
		}
	}
	.subBtn{
		@include btn;
	}
}
</style>




