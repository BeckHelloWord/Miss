<template>
	<div class="returning">
		<ul v-infinite-scroll="loadMore"
  			infinite-scroll-disabled="loading"
  			infinite-scroll-distance="10">
			<li v-for='item in itemList'>
				<recordItem :item='item' :status='status'></recordItem>		
			</li>
		</ul>
		<empty v-show='isShow' :showImg = 'true'></empty>
	</div>
</template>
<script>
	import recordItem from '../../public/recordItem'
	import empty from '../../public/empty'
	export default{
		data:function(){
			return {
				itemList:[],
				offset:0,
				max:10,
				loading:true,
				bool:true,
				isShow:false,
				// 保存访问什么数据
				status:'process'
			}
		},
		components:{
			recordItem,
			empty
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
						if(result.data.length == 0 && this.offset == 0){
							this.isShow = true;
							return false;
						}
						// console.log(result)
						if(result.data.length == 0 || result.data.length<this.max){
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
				// console.log(this.status)
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

