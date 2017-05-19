<template>
	<div class="investList">
		<ul  v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="10">
			<template v-if="investList.length>0" v-for="item in investList">
				<invest-item :item="item"></invest-item>
			</template>	
		</ul>
		<div class="empty">
		<empty v-show='investList.length==0' :showImg='true' :padding='"120px"'></empty>
		</div>
	</div>
</template>

<script>
/*
标的列表
	接口：investList
	传参：
	max 		单页最大条数
	offset 		偏移值
 * @return Map
     *           title 标题
     *           yearRate 利率
     *           id 借款id
     *           cycleType 期限类型
     *           cycle 期限
     *           amount 借款金额
     *           surplusAmount 剩余金额
     *           schedule 定时发布时间
     *           subsidyRate 贴息利率
     *           rewardRate 奖励利率
     *           classify 标的类型
     *           isExclusiveApp 是否APP专享
     *           isLimitBeginner 是否新手投资
     *           isLimitRegularer 是否老客投资
     *           investProcess 投资进度
日期		作者		操作
5-8 	倪文斌		新建
*/
import { InfiniteScroll  } from 'mint-ui';
import investItem from '../public/investItem';
import empty from '../public/empty'
Vue.use(InfiniteScroll);
	export default {
		components:{
			investItem:investItem,
			empty
		},
		data: function() {
			return {
				investList:[
					{
						// id:522,
						// title:"测试1232大声道32131打碎打算1",
						// yearRate:7.8,
						// cycle:56,
						// cycleType:"day",
						// rewardRate:1,
						// isExclusiveApp:true,
						// isLimitBeginner:true,
						// isLimitRegularer:true,
						// investProcess:50,
						// surplusAmount:20000
					}
				],
				list:{},
				offset:0,
				max:10,
				hasNext:true,
				initLock:true
			}
		},
		methods: {
			loadMore() {
				if(this.initLock){
					return
				}
				if(!this.hasNext){
					return
				}
				this.loading = true;
				Public.API_GET({
					url : 'investList',
					data:{
						offset:this.offset,
						max:this.max
					},
					success : (result) => {
						for(var item in result.data){
							this.investList.push(result.data[item])
						}
						this.offset+=this.max;
						this.loading = false;
						if(result.data.length<this.max){
							this.hasNext = false
						}
					}
				});
			},
			initData(finishFun) {
				this.offset=0;
				this.max=10;
				this.hasNext=true;
				this.investList=[];
				Public.API_GET({
					url : 'investList',
					data:{
						offset:this.offset,
						max:this.max
					},
					success : (result) => {
						this.investList=result.data;
						this.offset+=this.max;
						if(result.data.length<this.max){
							this.hasNext = false
						}
						this.initLock=false
						if(typeof(finishFun)=="function"){
							finishFun()
						}
					}
				});
			}
		},
		mounted: function() {
			
			this.initData()
			window.Hub.$emit('refresh', this.initData);
			window.Hub.$emit('setTitle', "投资", true, null, false, null);
			window.Hub.$emit('setFooter',true);
		}
	}
</script>
<style lang="scss" scoped="" type="text/css">
@import "../../assets/skin";

.empty{
	margin-top:pxToRem(80)
}
</style>