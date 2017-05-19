<template>
	<div class="setPassword">
		<input placeholder="请输入您的手机号" v-model="mobile" type="text"/>
		<input placeholder="手机验证码" v-model="code" type="text" class="verify"/>
		<button class="verifyBtn" @click="verifyBtn">{{verifyText}}</button>
		<p class="tips">请查收手机短信获取验证码</p>
		<input placeholder="新交易密码" v-model="newOutPassword" type="password"/>
		<input placeholder="确认交易密码" v-model="newOutPassword2" type="password"/>


		<button class="subBtn" @click="sub" id="subBtn">确定</button>
	</div>
</template>

<script>

import {Toast} from 'mint-ui';
	export default {
		data: function() {
			return {
				code:"",
				newOutPassword:"",
				newOutPassword2:"",
				countTime:120,
				verifyText:"发送验证码",
				verifyBox:{},
				mobile:""

			}
		},
		methods: {
			verifyBtn(){
				if(this.mobile.length<11){
					 Toast({
						message:"请输入正确的手机号码",
						position: 'bottom',
						duration: 2000
					})
					return
				}
				if(this.countTime<120){
					return
				}else{
					Public.API_GET({
						url: 'sendRestOutPassword',
						data: {mobile:this.mobile},
						success: (result) => {
							if(result.isSuccess){
								this.verifyBox = window.setInterval(()=>{
									this.countTime--
									this.verifyText=this.countTime+"s重新获取"
									if(this.countTime<=0){
										this.countTime=120
										this.verifyText="发送验证码"
										window.clearInterval(this.verifyBox)
									}
								},1000)
							}else{
								Toast({
									message:result.message,
									position: 'bottom',
									duration: 2000
								})
							}
						}
					});
				}			
			},
			check(){
				if(this.newOutPassword==""||this.newOutPassword2==""){
					Toast("请输入密码")
					return true
				}
				if(this.code==""){
					Toast("请输入验证码")
					return true
				}
				if(this.newOutPassword!=this.newOutPassword2){
					Toast("两次密码不一致")
					return true
				}
				if(this.newOutPassword.length<6||this.newOutPassword2.length<6){
					Toast("最少6个字符")
					return true
				}
				return false
			},
			sub() {
				if(this.check()){
					return
				}
				var sendData={
					code:this.code,
					newOutPassword:this.newOutPassword
				}
				Public.API_GET({
					url: 'resetOutPassword',
					data: sendData,
					success: (result) => {
						if(result.isSuccess){
							Toast("交易密码修改成功")
						}else{
							Toast(result.message)
						}
					}
				});
				
			}
		},
		mounted: function() {
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "交易密码重置", false, null, " ", null)
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
	.subBtn{
		display: block;
		height: pxToRem(90);
		line-height: pxToRem(90);
		font-size: pxToRem(44);
		border-radius: 5px;
		color: #fff;
		background:$red;
		margin-top: pxToRem(40);
		border: 0;
		text-align: center;
		width:100%
	}
	.reset{
		margin-top: pxToRem(20);
		text-align:right;
		color: $aLink;
		text-decoration: underline;
		font-size: 14px;
	}
	.verify{
		width:48%
	}
	.verifyBtn{
		width:48%;
		height: pxToRem(72);
		font-size: 12px;
		background: #f6f6f6;
		border: 1px solid #c2c2c2;
		line-height: pxToRem(40);
		float:right;
		margin-top: pxToRem(20);
		color: #666666;
		-webkit-box-sizing: border-box;
    	box-sizing: border-box;
	}
}
</style>