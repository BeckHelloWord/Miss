<template>
	<div class="forget">
		<div class="tel">
			<i class="iconfont icon-phone"></i>
			<input type="tel" placeholder="请输入手机号码" v-model = 'tel'>
			<p v-show='isTelEmpty'>*此处不可为空</p>
			<p v-show='isNotTel'>*无效的手机号</p>
		</div>
		<div class="verification clearfix">
			<div>
				<input type="tel" placeholder="输入手机验证码" v-model = 'verificationCode'>
				<p v-show='isVerificationCodeEmpty'>*此处不可为空</p>
				<p v-show='isValid'>*无效的验证码</p>
			</div>
			<div>
				<input type="button" v-model="sendText" @click = 'sendRetrievePwdCode(false,$event)' >
				<input type="button" v-model="audioText" @click = 'sendRetrievePwdCode(true,$event)' >
				<!-- <input type="button" value="语言验证" @click = 'sendRetrievePwdCode(true)' > -->
			</div>
		</div>
		<div class="next">
			<input type="button" value="下一步" @click='next'>
		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	export default {

		data:function(){
			return {
				isNotTel:false,
				isTelEmpty:false,
				isVerificationCodeEmpty:false,
				isValid:false,
				tel:'',
				verificationCode:'',
				audioText:'语音验证码',
				sendText:'发送验证码',
				count:120
			}
		},
		watch:{
			tel:function(to){
				if(to != ''){
					this.isTelEmpty= false;
				}
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
				if(!myreg.test(to)) 
				{ 
				    this.isNotTel = true
				} else{
					this.isNotTel = false;
				}
			},
			verificationCode:function(to){
				if(to != ''){
					this.isVerificationCodeEmpty= false;
				}
			},
		},
		methods:{
			next(){
				if(this.tel == ''){
					this.isTelEmpty = true;
				}
				if(this.verificationCode == ''){
					this.isVerificationCodeEmpty = true;
				}
				if(this.isNotTel || this.isTelEmpty || this.isVerificationCodeEmpty){
					return false;
				}

				Public.API_GET({
	                url : 'validRetrievePwdCode',
	                data : { 
	                 		mobile:this.tel,
 							code:this.verificationCode
	                },
	                success :(result) =>{

	                	// console.log(result)
	                	if(!result.isSuccess){
	                		MessageBox('提示', result.message);
	                		return false;
	                	}
	                	this.$router.push({name:'resetPassword',params:{tel:this.tel,code:this.verificationCode}})
	                }
           		});

				
			},
			sendRetrievePwdCode(bool,$event){
				if(this.tel == ''){
					MessageBox('提示', '请先输入手机号');
					return false;
				}
				// console.log($event.srcElement)
				

				Public.API_GET({
	                url : 'sendRetrievePwdCode',
	                data : { 
	                 		mobile:this.tel,
 							voice:bool 
	                },
	                success :(result) =>{

	                	// console.log(result)
	                	if(!result.isSuccess){
	                		MessageBox('提示', result.message);
	                		return false;
	                	}else{
	                		// 倒计时
	                		$($event.srcElement).parent().children('input').attr('disabled', 'disabled');
							var text = $($event.srcElement).val()=='发送验证码'?true:false;
							var timer = setInterval(()=>{
								this.count--;
								if(text){
									this.sendText = this.count +'s后可重新发送'
								}else{
									this.audioText = this.count +'s后可重新发送'
								}
								if(this.count == 0){
									clearInterval(timer)
									this.audioText = '语言验证码'
									this.sendText = '发送验证码'
									$($event.srcElement).parent().children('input').removeAttr('disabled')
									this.count = 3;
								}
							},1000)
	                	}
	                
	                }
           		});
			}


		},
		mounted(){
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "重置登录密码", false, null, ' ', null)
			window.Hub.$emit('setFooter',false);

			$('body').css('background', 'white');
		},
		beforeRouteLeave(to,from,next){
			$('body').css('background', '#edf0f3');
			next();
		}
	}
</script>

<style lang="scss" type="text/css">
	@import "../../assets/skin";

	.forget{
		p{
			color:$red;
		}
		padding:pxToRem(50) pxToRem(30);
		input {
			box-sizing: border-box;
		    height:   pxToRem(36*2);
		    line-height:    pxToRem(20*2);
		    padding:   pxToRem( 8*2);
		    border:pxToRem( 1*2) solid #d3d3d3;
		    z-index: 0;
		    &[type='tel']{
		    	width:100%;
			    padding-left:    pxToRem(40*2);
		    	// background: url(../../assets/images/mobiel_icon_blue.png) no-repeat  pxToRem( 8*2) center;
			    // background-size:     pxToRem(16*2)     pxToRem(24*2);
		    }
		    &[disabled="disabled"]{
		    	background:white;
		    }
		}
		.tel{
			margin-bottom:    pxToRem(14*2);
  			position:relative;
  			i{
  				position:absolute;
  				top:pxToRem(5*2);
				left:0;
				// margin-left:pxToRem( -40*2);
				padding:0 pxToRem(10);
				font-size: pxToRem(24*2);
				color:$red;
  			}
		}
		.verification{
			margin-bottom:      pxToRem(14*2);
			div:first-child{
				float:left;
				width:48%;
				input{
					width:100%;
				}
			}
			div:last-child{
				width:48%;
				float:right;
					input{
						white-space:normal;
						line-height:normal;
						padding:0;
						width:48%;
						&:first-child{
							float:left;
						}
						&:last-child{
							float:right;
						}
					}
				
			}
		}
		.next{

			input[type='button']{
				@include btn;
				// background: #f90;
			 //    display: block;
			 //    height: 46px;
			 //    line-height: 46px;
			 //    font-size: 22px;
			 //    -webkit-border-radius: 5px;
			 //    -moz-border-radius: 5px;
			 //    -ms-border-radius: 5px;
			 //    -o-border-radius: 5px;
			 //    border-radius: 5px;
			 //    color: #fff;
			 //    border: 0;
			 //    text-align: center;
			    padding:0;
			    width:100%;
			}
		}
	}
</style>