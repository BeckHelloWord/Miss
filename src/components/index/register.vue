<template>
	<div class="register">
		<div class="tel">
			<div>
				<i class="iconfont icon-phone"></i>
				<input type="text" placeholder="输入手机号码" v-model='tel'>
			</div>
			<p v-show='isNotTel'>*无效的手机号码</p>
			<p v-show='isTelEmpty'>*此处不可空白</p>
		</div>
		<!-- <div class="password">
			<input type="text" placeholder="输入密码" v-model='password'>
			<p v-show='isPasswordEmpty'>*此处不可空白</p>
			<p v-show='isInvalidPass'>*最少6个字符</p>
		</div> -->
		<div class="clearfix">
			<div class="half">
				<input type="text" placeholder="手机验证码" class="verification" v-model='verification'>
				<p v-show='isVerificationEmpty'>*此处不可空白</p>
			</div>
			<div class="half">
				<input type="button" @click='sendVerification' value="发送验证码">
			</div>
		</div>
		<div class="recommend">
			<i class="iconfont icon-user"></i>
			<input type="text" placeholder="可输入 邀请码 或者 推荐人 手机号码" v-model='recommendCode'>
		</div>
		<div class="overBtn">
			<label for="agree">
				<input type="checkbox" id="agree" v-model = 'agree'><span class="red">同意</span>
			</label>
			<!-- <a href="" class="red underline">《宝象金融注册协议》</a> -->
			<router-link to='/index/protocol' class="red underline">《想念金服注册协议》</router-link>
		</div>
		<div class="btn">
			<input type="button" value="同意协议并注册" @click='register'>
		</div>
		<div>
			已经有账号，<router-link to='/index/login' class="red">立即登录</router-link>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default{
		data:function(){
			return {
				tel:'',
				// password:'',
				verification:'',
				recommendCode:'',
				agree:false,
				count:120,
				timer:null,
				isNotTel:false,
				isTelEmpty:false,
				// isInvalidPass:false,
				// isPasswordEmpty:false,
				isVerificationEmpty:false,
			}
		},
		watch:{
			tel:function(to,from){
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
				if(!myreg.test(to)) 
				{ 
				    this.isNotTel = true
				} else{
					this.isNotTel = false;
				}
				this.isTelEmpty = false;
			},
			// password:function(to,from){
			// 	this.isPasswordEmpty = false;
			// 	if(to.length<6){
			// 		this.isInvalidPass = true;
			// 	}else{
			// 		this.isInvalidPass = false;
			// 	}
			// },
			verification:function(to,from){
				this.isVerificationEmpty = false;
			},
			
			agree:function(to,from){
				// console.log(1)
				if(from){
					$('.btn input').css('backgroundColor', '#e0e0e0').attr('disabled', 'disabled');
				}else{
					$('.btn input').css('backgroundColor', '').removeAttr('disabled')
				}
			}
		},
		methods:{
			register(){
				// 手机号 密码 验证码 不能有空
				if(!this.tel){
					this.isTelEmpty = true;
				}
				// if(!this.password){
				// 	this.isPasswordEmpty = true;
				// }
				if(!this.verification){
					this.isVerificationEmpty = true;
				}
				if(!this.tel || !this.verification){
					return false;
				}
				// 手机为有效
				if(this.isNotTel){
					return false
				}
				// // 密码为有效的
				// if(this.isInvalidPass){
				// 	return false
				// }
				// console.log('注册')
				var data = {
					mobile  :this.tel,
					verifyNo  :this.verification,
					reqSource   : 'xn',
				}
				if(this.recommendCode){
					data.recommendCode = this.recommendCode
				}
				// console.log(data)
				Public.API_GET({
	                url : 'register',
	                data : data,
	                success :(result)=>{
	                	// console.log(result)
	                	if(result.isSuccess){
	                		Public.Auth.set(result.data);
	                    	this.$router.push('/index/index')
	                	}else{
	                		MessageBox('提示', result.message);
	                	}
	                	
	                }
           		});
			},
			changeBtn(){
				$('.half input[type="button"]').css({'backgroundColor':'#535553',color:'white'}).attr('disabled', 'disabled');
				this.timer = setInterval(()=>{
					this.count--;
					$('.half input[type="button"]').val(this.count+'秒后可重发')
					if(this.count<=0){
						$('.half input[type="button"]').css({'backgroundColor':'',color:''}).removeAttr('disabled')
						$('.half input[type="button"]').val('发送验证码')
						this.count=3;
						clearInterval(this.timer)
					}
				},1000)
			},
			sendVerification(){
				if(!this.tel){
					MessageBox('提示', '请先输入手机号');
					return false
				}
				if(this.isNotTel){
					MessageBox('提示', '请输入有效手机号');
					return false
				}
				
				Public.API_GET({
	                url : 'sendRetrievePwdCode',
	                data : { 
	                		mobile:this.tel,
 							voice:false
	                },
	                success : (result)=>{
	                	// console.log(result)
	                	if(!result.isSuccess){
	                		MessageBox('提示', result.message);
	                	}else{
	                		this.changeBtn();
	                	}
	                	
	                }
           		});
			}
		},
		mounted(){
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "注册", false, null, ' ', null)
			window.Hub.$emit('setFooter',false);
			$('body').css('background', 'white');
			$('.btn input').css('backgroundColor', '#e0e0e0').attr('disabled', 'disabled');
		},
		beforeRouteLeave(to,from,next){

			clearInterval(this.timer)
			$('body').css('background','#edf0f3')
			next()
		}
	}
</script>

<style lang="scss" type="text/css">
	@import "../../assets/skin";
	.register{
		height:100%;
		background:white;
		padding:pxToRem(50) pxToRem(30);
		>div{
			margin-bottom:    pxToRem(14*2);
			p{
				color:$red;
			}
		}
		.tel{
			&>div{
				position: relative;
				border:    pxToRem( 1*2) solid #d3d3d3;
				padding-left:     pxToRem(40*2);
				i{
					position: absolute;
					top:2px;
					left:0;
					padding:0 pxToRem(10);
					font-size: pxToRem(24*2);
					color:$red;
				}
				input{
					// padding-left:     pxToRem(40*2);
					// background: url(../../assets/images/mobiel_icon_blue.png) no-repeat     pxToRem( 8*2) center;
					// background-size:    pxToRem(21*2)     pxToRem(24*2);
					border:none;
				}
			}
		}
		.password{
			input{
				padding-left:     pxToRem(40*2);
				background: url(../../assets/images/key_icon.png) no-repeat    pxToRem( 8*2) center;
				background-size:    pxToRem(21*2)    pxToRem(24*2);
			}
		}
		.recommend{
			position: relative;
			padding-left:pxToRem( 80 );
			border:    pxToRem( 1*2) solid #d3d3d3;
			i{
				position: absolute;
				top:0;
				left:0;
				padding:0 pxToRem(10);
				font-size: pxToRem(24*2);
				color:$red;
			}
			input{
				border:none;
				// padding-left:      pxToRem(40*2);
				// background: url(../../assets/images/user_icon.png) no-repeat    pxToRem( 8*2) center;
				// background-size:     pxToRem(21*2)     pxToRem(24*2);
			}
		}
		input{
			    // height:    pxToRem(36*2);
			    line-height:    pxToRem(36*2);
			    // padding:   pxToRem( 8*2);
			    border:    pxToRem( 1*2) solid #d3d3d3;
			    -webkit-box-sizing: border-box;
    			box-sizing: border-box;
    			width:100%;
    			&[type='checkbox']{
	    			width:    pxToRem(16*2);
					height:    pxToRem(16*2);
					float: left;
					margin-right:   pxToRem( 5*2);
					padding: 0;
					
	    		}
	    		
    		}
    	.overBtn{
    		margin-bottom:      pxToRem(60*2);
    	}
    	.btn{
    		input{
    			@include btn;
    			padding:0;
    			width:100%;
    		}
    	}
    	.red{
    		color:$red;
    	}
    	.underline{
    		text-decoration:underline;
    	}
    	.half{
    		width:48%;
    		&:first-child{
				float:left;
    		}
    		&:last-child{
    			float:right;
    		}
    		.verification{
    			text-indent:1em;
    		}
    	}
	}
</style>