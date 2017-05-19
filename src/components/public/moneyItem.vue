<template>
	<div class="all">
		<ul
	  v-infinite-scroll="loadMore"
	  infinite-scroll-disabled="loading"
	  infinite-scroll-distance="100">
	  
			<moneyDetail :items="items"></moneyDetail>
		</ul>
		<empty v-show='isShow' :showImg=true :padding='"120px"'></empty>
	</div>
</template>
<script>
	import moneyDetail from './moneyDetail'
	import { InfiniteScroll } from 'mint-ui';
	import empty from '../public/empty'

	export default{
		components:{
			InfiniteScroll,
			moneyDetail,
			empty
		},
		props:['type'],
		data:function(){
			return{
				items:{},
				typeName:'all',
				offset:0,
				max:20,
				size:20,
				loading:false,
				totalCount:0,
				preTotalCount:0,
				isShow:false
			}
		},
		methods:{
			
			loadMore(){
				if(this.totalCount!=this.preTotalCount){
					this.preTotalCount = this.totalCount;
					this.loading=true;
					this.loadMessage();
				}else{
					return false;
				}
			},
			loadMessage(){

				Public.API_GET({
					url : 'flowAmount',
					data:{
						type:this.type=='all'?null:this.type,
						offset:this.offset,
						max:this.max
					},
					success : (result) => {
						if(result.data.length == 0 && this.max==20){
							this.isShow = true
						}
						// 获取第一次totalcount
						this.totalCount = result.totalCount;
						// console.log(this.typeName)
						// console.log(result)
						var obj = {};
						result.data.forEach(v=>{
							// console.log(v.dateCreated.slice(0, 7));
							var str = v.dateCreated.slice(0, 8)
							
							if(typeof obj[str]== 'undefined'){
								obj[str]=[]
							}
							obj[str].push(v)
						})
						
						this.max+=this.size;
						this.items=obj;
						this.loading=false;
						// console.log(this.items)
					}
				});
			}
		},
		mounted:function(){
			this.loadMessage();
			
		},
		
		watch: {
		  type (to, from) {
		      // 跳转路由的时候清零
		      // console.log(111)
		      // window.scrollTo(0)
		      this.offset = 0;
		      this.max = 20;
		      this.isShow = false;
		      this.typeName=to;
		      this.loadMessage();


		  },
		}
	}
</script>