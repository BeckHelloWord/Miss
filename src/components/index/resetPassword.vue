<template>
	<div class="reset">
		<div>
			<i class="iconfont icon-password"></i>
			<input type="password" placeholder="新密码" v-model='password'>
			<p v-show='isPasswordEmpty'>*此处不能为空</p>
			<p v-show='isPasswordValid'>*最少6个字符</p>
		</div>
		<div>
			<i class="iconfont icon-password"></i>
			<input type="password" placeholder="确认密码" v-model='confirmPass'>
			<p v-show='isConfirmPassEmpty'>*此处不能为空</p>
			<p v-show='isSame'>*两次输入的密码不一致</p>
		</div>
		<div>
			<input type="button" value="确认" @click='confirm'>
		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	export default {
		data:function(){
			return{
				isPasswordEmpty:false,
				isPasswordValid:false,
				isConfirmPassEmpty:false,
				isSame:false,
				password:'',
				confirmPass:''
			}
		},
		watch:{
			password(to){
				if(to != ''){
					this.isPasswordEmpty= false;
					this.isPasswordValid = false
					this.isSame = false;
				}
			},
			confirmPass(to){
				if(to != ''){
					this.isConfirmPassEmpty= false;

					this.isSame = false;
				}
			}
		},
		methods:{
			confirm(){
				if(this.password == ''){
					this.isPasswordEmpty=true;
					return false;
				}
				if(this.password.length<6){
					this.isPasswordValid = true;
					return false;
				}
				if(this.confirmPass == ''){
					this.isConfirmPassEmpty = true;
					return false;
				}
				if(this.password != this.confirmPass){
					this.isSame = true;
					return false;
				}



				Public.API_GET({
	                url : 'doRetrievePwdReset',
	                data : { 
	                 		 mobile:this.$route.params.tel,
							 code:this.$route.params.code,
							 newPwd:this.password
	                },
	                success :(result) =>{

	                	// console.log(result)
	                	if(!result.isSuccess){
	                		MessageBox('提示', result.message);
	                		return false;
	                	}else{
	                		MessageBox('提示', '修改成功');
	                	}
	                	this.$router.push('/index/login')
	                }
           		});
			}
		},
		mounted(){
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "重置登录密码", false, null, ' ', null)
			window.Hub.$emit('setFooter',false);
			$('body').css('background', 'white');

			// console.log(this.$route.params)
		},

		beforeRouteLeave(to,from,next){
			$('body').css('background', '#edf0f3');
			next();
		}
	}
</script>

<style lang="scss" type="text/css">
	@import "../../assets/skin";
	.reset{
		p{
			color:$red;
		}
		height:100%;
		background:white;
		padding:pxToRem(50) pxToRem(30);
		div{
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
		
		input{
			height:    pxToRem(36*2);
		    line-height:    pxToRem(20*2);
		    padding:   pxToRem( 8*2);
		    border:   pxToRem( 1*2) solid #d3d3d3;
		    -webkit-box-sizing: border-box;
			box-sizing: border-box;
			width:100%;
			padding-left:    pxToRem(40*2);
			// background: url(../../assets/images/key_icon.png) no-repeat   pxToRem( 8*2) center;
		 //    background-size:   pxToRem(21*2)    pxToRem(24*2);
		}
		input[type="button"]{
			@include btn;
			padding:0;
			width:100%;
		}
	}
</style>