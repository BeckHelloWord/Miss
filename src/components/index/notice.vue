<template>
	<div class="notice">
		
	</div>
</template>

<script>
	export default{
		data:function(){
			return{
				host:'http://10.0.1.33:8686/'
			}
		},
		methods:{
			initData(){
				$.ajax({
					url: this.host+'about/content/'+this.$route.params.id+'.html',
				
				})
				.done(function(result) {
					console.log(result)
					$('.notice').append($(result)[49])
					
					console.log($(result));
				})
			
			}
		},
		mounted(){
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "日常公告", false, null, ' ', null)
			window.Hub.$emit('setFooter',false);

			$('.mint-loadmore').css('background', 'white');
			this.initData();
		},
		beforeRouteLeave(to,from,next){
			$('.mint-loadmore').css('background','#edf0f3')
			next();
		}
	}
</script>

<style lang="scss" type="text/css">
	.notice {
		h2{
			text-align:center;
			line-height:100px;
		}
		#noticeText{
			padding:0 20px;
		}
		p.mt20{
			padding:0 20px;
		}
	}
</style>