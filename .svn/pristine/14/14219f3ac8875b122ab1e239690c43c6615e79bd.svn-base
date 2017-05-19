<template>
	<div class="assets">
		<div>
			
			<div id="map" style="height:225px;">
				<IEcharts :option="pie" ></IEcharts>
			</div>

			<div class="content">
				<ul>
					<li>
						<div class="clearfix">
							<span class="relative"><i class="rhombus"></i>可用余额(元)</span><span>{{availableBalance | formatMoney}}</span>
						</div>
					</li>
					<li v-show='briskAvailable'>
						<div class="clearfix">
							<span class="relative"><i class="rhombus"></i>添添金(元)</span><span>{{briskAvailable | formatMoney}}</span>
						</div>
					</li>
					<li v-show='finaAmount'>
						<div class="clearfix">
							<span class="relative"><i class="rhombus"></i>月月丰(元)</span><span>{{finaAmount | formatMoney}}</span>
						</div>
					</li>
					<li>
						<div class="clearfix">
							<span class="relative"><i class="rhombus"></i>散标(元)</span><span>{{flowAmount | formatMoney}}</span>
						</div>
					</li>
					<li @click='toFreezingAmount'>
						<div class="clearfix">
							<span class="relative"><i class="rhombus"></i>在途金额(元)</span><span >{{freezingAmount | formatMoney}}<i class="rightArr" v-show='freezingAmount'></i></span>
						</div>
					</li>

				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	// import echarts from 'echarts'
	// import line from '../public/doughnut'
	import IEcharts from './charts/lite.vue';
	import 'echarts/lib/chart/pie';
	import 'echarts/lib/component/title';
	export default{
		components:{
			IEcharts
		},
		data: () => ({
			// 总资金
			totalAsset:0,
			// 添添金
			briskAvailable:0,
			// 月月丰
			finaAmount:0,
			// 可用余额
			availableBalance:0,
			// 散标
			flowAmount:0,
			// 在途金额
			freezingAmount:0,

			pie :{}
		}),
		methods:{
			onReady(instance) {
		        console.log(instance);
		    },

			toFreezingAmount(){
				if(!this.freezingAmount){
					return false;
				}
				this.$router.push('/home/freezingAmount')
			},
			initMap(){
	
				this.pie = {
					color:['#b91a30','#f5bf1c','#ff811b','#6da9de','#c3c3c3'],
				  
				    title:{
				    	"text": '总资产(元)',
				    	subtext:Vue.filter('formatMoney')(this.totalAsset),
				        "x": '50%',
				        "y": '40%',
				        textAlign: "center",
				        "textStyle": {
				            "fontWeight": 'normal',
				            "fontSize": 12,
				            color:'#999'

				        },
				        "subtextStyle": {
				            "fontWeight": 'normal',
				            "fontSize": 16,
				            "color": '#333'
				        }
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['60%', '70%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center',
				                   
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '30',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            itemStyle: {
					            normal: {
					                borderWidth: '2',
					                borderColor: '#ffffff',
					            },
					            
					        },
				            labelLine: {
				                normal: {
				                    show: false,
				                    
				                }
				            },
				            data:[
		
				                {value:this.briskAvailable},
				                {value:this.finaAmount},
				                {value:this.availableBalance},
				                {value:this.flowAmount},
				                {value:this.freezingAmount}
				            ]
				        }
				    ]
				};
				

			},
			initData(){
				Public.API_GET({
	                url : 'memberAsset',
	                success : (result)=>{
	                	// console.log(result)
	                	// 总资金
						this.totalAsset=result.data.totalAsset
						// 添添金
						this.briskAvailable=result.data.briskAvailable
						// 月月丰
						this.finaAmount=result.data.finaAmount
						// 可用余额
						this.availableBalance=result.data.availableBalance
						// 散标
						this.flowAmount=result.data.flowAmount
						// 在途金额
						this.freezingAmount=result.data.freezingAmount

						this.initMap();
	                }
           		});
			}
		},
		mounted(){
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "总资产", false, null, ' ', null)
			window.Hub.$emit('setFooter',false);
			this.initData();
			
		}
	}
</script>

<style lang="scss" type="text/css" scoped="">
	@import "../../assets/skin";
	.assets{
		padding:pxToRem(  10*2) pxToRem(  15*2);
		&>div{
			background-color:white;
		}
		.content{
			padding-bottom:pxToRem(  40*2);
		}
		.relative{
			position:relative;
		}
		.rhombus{
			display:inline-block;
			width:  pxToRem(  10*2);
			height:  pxToRem(  10*2);
			// background-color:red;
			transform:rotateZ(45deg);
			margin-right: pxToRem(  10*2);
			
		}
		.rightArr{
			padding-right:  pxToRem(  20);
			background:url(../../assets/images/assets_right.png) no-repeat center right;
			background-size: pxToRem(   5*2)  pxToRem(  10*2);
		}
		li{
			padding:  0  pxToRem(  20*2);
			line-height:  pxToRem(  30*2);
			span{
				&:first-child{
					float:left;
				}
				&:last-child{
					float:right;
				}
			}
			&:nth-child(1){
				.rhombus{
					background-color:#b91a30;
				}
			}
			&:nth-child(2){
				.rhombus{
					background-color:#f5bf1c;
				}
			}
			&:nth-child(3){
				.rhombus{
					background-color:#ff811b;
				}
			}
			&:nth-child(4){
				.rhombus{
					background-color:#6da9de;
				}
			}
			&:nth-child(5){
				.rhombus{
					background-color:#c3c3c3;
				}
			}
		}
	}
</style>