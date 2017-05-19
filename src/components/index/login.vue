<template>
	<div class="login">
		<div class="userName">
			<div>
				<i class="iconfont icon-user"></i>
				<input type="text" placeholder="请输入用户名/认证手机号" v-model='username' @keydown='showDel_name()'>
			</div>
			<div class="del" v-show='del_username' @click='delUsername'></div>
			<p v-show='bool_username'>*此处不可空白</p>
			<p v-show='bool_message'> {{'*'+message_username}}</p>
		</div>
		<div class="password">
			<div>
				<i class="iconfont icon-password"></i>
				<input type="password" placeholder="请输入密码" v-model='password' @keydown='showDel_pass()'>
			</div>
			<div class="del" v-show='del_password' @click='delPassword'></div>
			<p v-show='bool_password'>*此处不可空白</p>
			<p v-show='bool_password_length'>*最少6个字符</p>
			<p v-show='bool_nameOrpassword_error'>*账号或密码错误</p>
		</div>
		<div class="remember">
			<label for="remeberUser">
				<input type="checkbox" id="remeberUser" v-model ='isCheck'><span>记住用户名</span>
			</label>
		</div>
		<div class="loginBtn">
			<input type="button" value="登录" @click='login'>
		</div>
		<div class="other clearfix">
			<span>
				<!-- <a href="">忘记密码?</a> -->
				<router-link to='/index/forget'>忘记密码?</router-link>
			</span>
			<span>
				<router-link to='/index/register'>立即注册</router-link>
			</span>
		</div>
		<div class="weixin" v-show='isWeiXin' @click='loginByWeixin'>
			<div class="contain">
				<img src="../../assets/images/wx_login.png" alt="">
				<span>{{weixinLogin}}</span>
			</div>
		</div>
	</div>

	<!-- <div>
		用户名<input type="text" ref="username">
		<br>
		密码<input type="password" ref="password">
		<button @click="login">登录</button>
    <router-link to="/bindCard">充值</router-link>
	</div> -->
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		data: function() {
			return {

				username:'',
				password:'',

				message_username:'',
				bool_message:false,
				bool_username:false,
				bool_password:false,
				bool_password_length:false,
				bool_nameOrpassword_error:false,
				del_username:false,
				del_password:false,
				isCheck:false,
				isWeiXin:true,
				weixinLogin:'微信登录'
			}
		},
		watch:{
			isCheck(to,from){
				if(to){
					this.saveUsername();
				}else{
					this.removeUsername();
				}
			}
		},
		methods: {
			loginByWeixin(){
				/*微信登录*/
            
                var url=encodeURIComponent("/index");
                
                //线上地址
                var wx_url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbfd7c3d589090b70&redirect_uri=http%3A%2F%2Fm.bxjr.com%2Flogin%2Findex.html?redirect="+url+"&response_type=code&scope=snsapi_userinfo&state=wechat";
                //本地测试地址
//                wx_url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx524534af04a5662c&redirect_uri=http%3A%2F%2Fhzh.test.bawsun.com%2Flogin%2Findex.html?redirect="+url+"&response_type=code&scope=snsapi_userinfo&state=wechat";
                this.weixinLogin = '正在登录'
                
                clearTimeout(timer);
                var timer=setTimeout(function(){
                    location.href=wx_url;
                },1000)
            
			},
			is_weixin(){
			    var ua = navigator.userAgent.toLowerCase();
			    if(ua.match(/MicroMessenger/i)=="micromessenger") {
			        return true;
			    } else {
			        return false;
			    }
			},
			saveUsername(timeout) {  
				// 保存用户名 7天
				timeout = timeout || 7;
				var d = new Date();  
				d.setTime(d.getTime() + 3600*24*1000*timeout);  
				// console.log(d)
				document.cookie = 'username =' + this.username + ';expires=' + d;  
			},
			getUsername(){
				var arr = document.cookie.split('; ');  
				for ( var i = 0; i < arr.length; i++) {  
					var arr2 = arr[i].split('='); 
					if (arr2[0] == 'username') {  
						return arr2[1];  
						// console.log(arr2[1]);  
					}  
				}  
				return '';  
			},
			removeUsername(){
				this.saveUsername(-1)
			},
			showDel_name(){
				if(this.username){
					this.del_username=true;
					this.bool_username = false;
					this.bool_message = false;
				}else{
					this.del_username=false;
				}
			},
			showDel_pass(){
				
				if(this.password){
					this.del_password=true;
					this.bool_password = false;
					this.bool_password_length = false;
				}else{
					this.del_password=false;
				}
			},
			delUsername(){
				this.username=''
				this.showDel_name()
			},
			delPassword(){
				this.password=''
				this.showDel_pass()
			},
			login() {
				// console.log(this.username)
				// console.log(this.password)

				// 判断是否为空
				if(this.username==''){
					this.bool_username = true;
					return false;
				}
				if(this.password==''){
					this.bool_password = true;
					return false;
				}else if(this.password.length < 6){
					this.bool_password_length = true;

					return false;
				}


				Public.API_GET({
	                url : 'loginOn',
	                data : { username : this.username, password : this.password },
	                success : (result)=>{
	                	// console.log(result)
	                	if(result.message=="账号不存在"){
		                	this.message_username = result.message;
	                		this.bool_message = true;
	                	}else if(result.message != ''){
	                		this.message_username = result.message;
	                		this.bool_nameOrpassword_error = true;
	                	}
	                	
	                    if (result.isSuccess) {
	                        Public.Auth.set(result.data);
	                    	this.$router.push('/index/index')
	                    }else{
	                        // alert(result.message);
	                        MessageBox('提示', result.message);
	                    }
	                }
           		});
			}
		},
		mounted: function() {
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "登录", false, null, ' ', null)
			window.Hub.$emit('setFooter',false);
			this.showDel_name();
			this.showDel_pass();

			// 判断是否微信
			this.isWeiXin = this.is_weixin()

			// 获取用户名
			// console.log(this.getUsername());
			
			this.username = this.getUsername()

			
			
			$('body').css('background', 'white');
		},
		beforeRouteLeave(to,from,next){
			$('body').css('background','#edf0f3')
			next()
		}
	}
</script>
<style lang="scss" type="text/css">
	@import "../../assets/skin";

	.login{
		height:100%;
		background:white;
		padding:pxToRem(50) pxToRem(30);
		p{
			color:$red;
		}
		input{
			    // height:  pxToRem(  36*2);
			    line-height:  pxToRem(  36*2);
			    // padding:pxToRem(   8*2);
			    border:none;
			    outline:none;

			    -webkit-box-sizing: border-box;
    			box-sizing: border-box;
    			// width:100%;
    		&[type='checkbox']{
    			width:  pxToRem(  16*2);
				height:   pxToRem(  16*2);
				float: left;
				margin-right: pxToRem(   5*2);
				padding: 0;
				margin-top: pxToRem(   9*2);
    		}
    		// &[type='text']{

    		// 	    padding-left:  pxToRem(  40*2);
				  //   background: url(../../assets/images/user_icon.png) no-repeat pxToRem(   8*2) center;
				  //   background-size:  pxToRem(  21*2)  pxToRem(  24*2);
    		// }
    		// &[type='password']{
    		// 	    padding-left:  pxToRem(  40*2);
				  //   background: url(../../assets/images/key_icon.png) no-repeat pxToRem(   8*2) center;
				  //   background-size: pxToRem(  20*2)  pxToRem(  24*2);
    		// }
		}
		.userName{
			
			&>div:first-child{
				padding-left: pxToRem(  40*2);
				
				i{
					position:absolute;
					top:pxToRem(5);
					left:pxToRem(3);
					// margin-left:pxToRem( -40*2);
					padding:0 pxToRem(10);
					font-size: pxToRem(24*2);
					color:$red;
					
				}
				input{
					// border-bottom:pxToRem(   1*2) solid #d3d3d3;
					width:100%;
					font-size:pxToRem(30);
					
				}
			}
		}
		.password{
			
			&>div:first-child{
				padding-left: pxToRem(  40*2);
				
				i{
					position:absolute;
					top:pxToRem(5*2);
					left:0;
					// margin-left:pxToRem( -40*2);
					padding:0 pxToRem(10);
					font-size: pxToRem(24*2);
					color:$red;
				}
				input{
					// border-bottom:pxToRem(   1*2) solid #d3d3d3;
					width:100%;
					font-size:pxToRem(30);
					
				}
			}
		}
		.del{
			display:block;
		
			-webkit-tap-highlight-color: rgba(255, 255, 255, 0); 

			width: 10%;
		    height:   pxToRem(  36*2);
		    text-align: center;
		    top: 0;
		    right: 0;
		    position: absolute;
		    z-index: 100;
		    cursor: pointer;
		    
		    background:url(../../assets/images/del.jpg) no-repeat center
		}
		.userName, .password{
			position:relative;
			margin-bottom:   pxToRem(14*2);
			// border:  pxToRem(   1*2) solid #d3d3d3;
			&>div:first-child{
				border:  pxToRem(   1*2) solid #d3d3d3;
			}
		}
		
		.remember {
			label{
				display: block;
			    overflow: hidden;
			    line-height:  pxToRem(  36*2);
			    font-size:    pxToRem(  16*2);
			    color: #666;
			}
		}
		.loginBtn {
			margin-top:  pxToRem(  20*2);
			input[type='button']{
				@include btn;
					padding:0;
					width:100%;
				 //    background: #f90;
				 //    display: block;
				 //    heightpxToRem(: 46*2);
				    // line-heightpxToRem(: 46*2);
				 //    font-sizepxToRem(: 22*2);
				 //    -webkit-border-radiupxToRem(s: 5*2);
				 //    -moz-border-radiupxToRem(s: 5*2);
				 //    -ms-border-radiupxToRem(s: 5*2);
				 //    -o-border-radiupxToRem(s: 5*2);
				 //    border-radiupxToRem(s: 5*2);
				 //    color: #fff;
				 //    border: 0;
				 //    text-align: center;
			}
		}
		.other{
			margin-top:  pxToRem(  20*2);
			span{
				&:first-child{
					float:left;
				}
				&:last-child{
					float:right;
				}
				a{
					color: $red;
				    text-decoration: underline;
				    font-size:  pxToRem(  14*2);
				}
			}
		}
		.weixin {
		    position: relative;
		    width:   pxToRem(  86*2);
		    height:  pxToRem(  86*2);
		    margin: 0 auto;
		    box-sizing:border-box;
		    border-radius:50%;
		    padding: pxToRem(   5*2);
		    // line-heightpxToRem(:130*2);
			text-align:center;
		    border:  pxToRem(   1*2) solid #ddd;
			// background:url(../../assets/images/wx_login.png) no-repeat center 15%;
			// background-size:70%;
		
			img{
				width:70%;
				display:block;
				margin:0 auto;
			}
			.contain{
				background:white;
				border-radius:50%;
			}
		}
	}

</style>