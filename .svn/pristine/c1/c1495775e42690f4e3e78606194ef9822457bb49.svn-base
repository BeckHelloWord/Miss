<template>
	<div id="app">
		hello
		<router-link to="/index">index</router-link>
		<router-link to="/track">track</router-link>
		<router-link to="/hello">hello</router-link>
		<router-link to="/login">login</router-link>
	</div>
</template>

<script>
	export default {
	
		data: function() {
			return {
	
			}
		},
	
		mounted: function() {
			window.Hub.$emit('setTitle', "干死xyc222"); //Hub触发事件
			window.Hub.$emit('refresh', null); //Hub触发事件
			window.Hub.$emit('setFooter',true);
		},
		beforeMount: function() {
	
		}
	}
</script>