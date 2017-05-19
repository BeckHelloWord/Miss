<template>
	<div class="returning">
		<ul v-infinite-scroll="loadMore"
  			infinite-scroll-disabled="loading"
  			infinite-scroll-distance="10">
			<li v-for='item in itemList'>
				<recordItem :item='item' :status='status'></recordItem>		
			</li>
		</ul>
	</div>
</template>
<script>
	import recordItem from '../../public/recordItem'
	export default{
		data:function(){
			return {
				itemList:[],
				offset:0,
				max:10,
				loading:true,
				bool:true,

				// 保存访问什么数据
				status:'process'
			}
		},
		components:{
			recordItem
		},
		methods:{
			loadMore(){
				if(this.bool){
					this.loading=true
					this.initData()
				}else{
					return false
				}
			},
			initData(){
				Public.API_GET({
					url : this.$route.params.param,
					data:{
						offset:this.offset,
						max:this.max
					},
					success : (result) => {
						// console.log(result)
						if(result.data.length == 0){
							this.bool=false;
						}
						result.data.forEach(v=>{
							this.itemList.push(v)
						})

						this.offset+=this.max;

						this.loading=false;
					}
				});
			}
		},
		mounted:function(){
			this.initData();
			this.status = this.$route.params.param
		},
		watch:{
			'$route.params.param':function(to,from){
			
				this.itemList=[]
				this.offset=0
				this.max=10
				this.loading=true
				this.bool=true

				this.initData()

				this.status= to;
			}
		}
	}
</script>

<style lang="scss" scoped="" type="text/css">

	/*投资记录*/


@import "../../../assets/skin";
.returning{
	
 ul{
 	li{
            background-color:white !important;
	        padding: 0 pxToRem(20*2);
	        margin-bottom:pxToRem(10*2);
 	}
 }
}
</style>

