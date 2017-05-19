<template>
	<div class="transferRecord">
		<div class="title clearfix">
			<span>转让记录</span>
			<span>单位:元</span>
		</div>
		<div class="list">
			<ul>
				<router-link :to="{name:'contractCheck',params:{contractUrl:item.contractUrl}}" tag='li' v-for='item in this.detail' :key='item.dateCreatedTime'>
					<p class="clearfix">
						<span>{{item.dateCreated}}</span>
						<span>到账{{item.amount | formatMoney}}</span>
					</p>
					<p class="clearfix">
						<span>合同</span>
						<span>本金{{item.originalCapital | formatMoney}}</span>
					</p>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data:function(){
			return{
				detail:[]
			}
		},
		methods:{
			initData(){
				Public.API_GET({
					url : 'memberInvestDetailsReceiptBondList',
					data:{
						offset:0,
						max:1,
						investId :this.$route.params.id
					},
					success : (result) => {
						// console.log(result)
						
						this.detail=result.data;
						
					}
				});
			}
		},
		mounted(){
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "转让记录", false, null, ' ', null)
			window.Hub.$emit('setFooter',false);
			this.initData();
			// console.log(this.$route.params.id)
		}
	}
</script>

<style lang="scss" type="text/css">
	@import "../../../assets/skin";
	.transferRecord{
		padding:0 15px;
		color:$garyFont;
		.title{
			line-height:42px;
			span{
				&:first-child{
					float:left;
				}
				&:last-child{
					float:right;
				}
			}
		}
		.list{
			li{
				background:white url(../../../assets/images/gt.jpg) no-repeat 98% center;
				background-size:5px 10px;
				padding:10px;
				padding-left:15px;
				padding-right:30px;
				margin-bottom:5px;
				p{
					line-height:24px;
					&:first-child{
						color:black;
					}
					span{
						&:first-child{
							float:left;
						}
						&:last-child{
							float:right;
						}
					}
				}
			}
		}
	}
</style>
