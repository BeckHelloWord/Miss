<template>
	<div class="protocol">
		
	</div>
</template>
<script>
	export default{
		mounted(){
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "注册协议", false, null, ' ', null)
			window.Hub.$emit('setFooter',false);
			$.ajax({
				url: 'http://10.0.1.33:8686/agreement/xnService.html',
				
			})
			.done(function(result) {
				// console.log(result);
				var div = document.createElement('div')
				div.style.padding = '0 10px'
				div.style.background = 'white'
				// console.log($(result)[45])
				var content = $(result)[45].children[0]
				// 把里面内容宝象金融-》想念金服
				div.innerHTML = content.innerHTML.replace(/宝象金融/g,'想念金服')
				$('.protocol').append(div)
			})
			.fail(function() {
				// console.log("error");
			})
			.always(function() {
				// console.log("complete");
			});
			 
		}
	}
</script>