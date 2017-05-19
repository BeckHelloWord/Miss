<template>
	<div style="backgroundColor:#efefef">
		<div class="track-box track">
			<mt-swipe :auto="4000">
				<mt-swipe-item>1</mt-swipe-item>
				<mt-swipe-item>2</mt-swipe-item>
				<mt-swipe-item>3</mt-swipe-item>
			</mt-swipe>
		</div>
		<p>ssssssssssssssssssssssssss</p>
		<p>ssssssssssssssssssssssssss</p>
		<p>ssssssssssssssssssssssssss</p>
		<p>ssssssssssssssssssssssssss</p>
		<p>ssssssssssssssssssssssssss</p>
		<p>ssssssssssssssssssssssssss</p>
		<p>ssssssssssssssssssssssssss</p>
		<p>ssssssssssssssssssssssssss</p>
		<p>ssssssssssssssssssssssssss</p>
		<p>ssssssssssssssssssssssssss</p>
		<p>ssssssssssssssssssssssssss</p>
		<p>ssssssssssssssssssssssssss</p>
		<p @click="test">ssssssssssssssssssssssssss</p>
		<router-link to="/index">index</router-link>
		<router-link to="/track">track</router-link>
		<router-link to="/hello">hello</router-link>
		<router-link to="/login">login</router-link>
	</div>
</template>

<script>
	// import PieChart from './pieChart.vue'
	// import MyChart from './myChart3.vue'
	import {
		Toast,
		Swipe,
		SwipeItem,
		MessageBox
	} from 'mint-ui';
	import Scroller from './public/Scroller.vue'
	export default {
		components: {
			Scroller: Scroller,
			mtSwipe: Swipe,
			mtSwipeItem: SwipeItem
			// pieChart:PieChart
		},
		data: function() {
			return {
	
			}
		},
		methods: {
			test() {
				console.log(222)
				window.Hub.$emit('setTitle', "干死xy222c");
				// this.$store.commit('setIndex',false)
				// this.$store.state.login=false
			},
			eve(callback) {
				console.log("刷新init方法")
				setTimeout(() => {
					callback()
				}, 1000)
			}
		},
		mounted: function() {
			// this.$parent.setTitle("干死xyc");
			// Public.setPageInit(this.initData)
			// Public.pageInit()
			window.Hub.$emit('refresh', this.eve); //Hub触发事件
			window.Hub.$emit('setTitle', "干死xyc36666", false, function() {
				console.log("设置left")
			}, "track", function() {
				console.log("设置right")
			});
			window.Hub.$emit('setFooter',true);
	
		},
		beforeMount: function() {
	
		}
	}
</script>