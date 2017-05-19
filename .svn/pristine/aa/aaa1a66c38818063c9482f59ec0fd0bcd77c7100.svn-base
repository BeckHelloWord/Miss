<template>
	<div class='wrapper'>
		
	</div>
</template>
<script>
	export default {
		data:function(){
			return {
				host:'http://10.0.1.33:8686/'
			}
		},
		methods:{
			initData(){
				console.log(this.host+this.$route.params.contractUrl)
				$.ajax({
					url: this.host+this.$route.params.contractUrl,	
					
				})
				.done(function(result) {
					
					var $css = $(result)[11]
					
					var wrapper = $(result)[43]		
					$('head').append($css)
					$('.wrapper').html(wrapper)

				});
				// Public.API_GET({
	   //              url : 'contract'+this.$route.params.contractUrl,
	               
	   //              success : function(result){
	   //              	// console.log(result)
	   //              	var $css = $(result)[11]
				// 		var wrapper = $(result)[43]		
				// 		$('head').append($css)
				// 		$('.wrapper').html(wrapper)
		  //           }
    //        		});
			}
		},
		mounted:function(){
			$('.mint-loadmore').css('background','white')

			window.Hub.$emit('setTitle', "查看合同", false, null, ' ', null)
			this.initData();

			// console.log(this.$route.params.investId)
		},
		
		beforeRouteLeave(to,from,next){
			$('.mint-loadmore').css('background','#edf0f3')
			$('head').find(':last-child').remove();
			next();
		}
	}
</script>
