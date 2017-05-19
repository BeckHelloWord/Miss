<template>
	<div class="banner">
		
		<swipe :auto="4000" class="swipe" :style={height:height}>
	  			<swipe-item v-for='item in banner' :key="item.id">
	  				<a :href="item.link">
	  					<img :src='"https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/"+item.imgUrl' :title='item.title'>
	  				</a>	  				
	  			</swipe-item>				
		</swipe>
	</div>
</template>

<script>
	import { Swipe, SwipeItem } from 'mint-ui';
	
	export default{
		components:{
			Swipe,
			SwipeItem
		},
		props:['banner','height'],
		data(){
			return {
			}
		},
		methods:{
			
		}
		
		
	}
</script>
<style lang="scss" scoped="" type="text/css">
@import '../../assets/skin';

    .banner {
        .swipe {
            // height: pxToRem(150*2) !important;
        	a{
        		display:block;
        		width:100%;
        		height:100%;
        		img{
        			width:100%;
        			height:100%;
        		}
        	}
        }
    }

</style>