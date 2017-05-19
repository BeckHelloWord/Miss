<template>
	<div>
		用户名<input type="text" ref="username">
		<br>
		密码<input type="password" ref="password">
		<button @click="login">登录</button>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
	
			}
		},
		methods: {
			
			login() {
				console.log(this.$refs.username.value)
				console.log(this.$refs.password.value)
				Public.API_GET({
                url : 'loginOn',
                data : { username : this.$refs.username.value, password : this.$refs.password.value },
                success : function(result){
                    if (result.isSuccess) {
                        Public.Auth.set(result.data);
                    }else{
                        alert(result.message);
                    }
                }
            });
			}
		},
		mounted: function() {
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "login", false, null, false, null)
			window.Hub.$emit('setFooter',false);
		},
		beforeMount: function() {
	
		}
	}
</script>