<template>
	<div class="freezingAmount">
		<div>
			<div id="map" style="height:225px;">
				<IEcharts :option="pie" ></IEcharts>
			</div>

			<div class="content">
				<ul>
					<li>
						<div class="clearfix">
							<span class="relative"><i class="rhombus"></i>投资中金额(元)</span><span>{{investmentAmount | formatMoney}}</span>
						</div>
					</li>
					<li>
						<div class="clearfix">
							<span class="relative"><i class="rhombus"></i>提现中金额(元)</span><span>{{withdrawalsAmount | formatMoney}}</span>
						</div>
					</li>
					<li>
						<div class="clearfix">
							<span class="relative"><i class="rhombus"></i>保证金(元)</span><span>{{bondAmount | formatMoney}}</span>
						</div>
					</li>
					
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	// import echarts from 'echarts'
	import IEcharts from './charts/lite.vue';
	import 'echarts/lib/chart/bar';
	import 'echarts/lib/chart/pie';
	import 'echarts/lib/component/title';
	export default{
		components:{
			IEcharts
		},
		data(){
			return{
				freezingAmount     :0, //在途金额
				investmentAmount   :0, //投资中金额
				withdrawalsAmount  :0, //提现中金额
				bondAmount         :0, //借款保证金
				pie :{}
			}
		},
		methods:{
			
			initMap(){


				this.pie = {
					color:['#999','#c3c3c3','#d9d9d9'],
				  
				    title:{
				    	"text": '在途金额(元)',
				    	subtext:Vue.filter('formatMoney')(this.freezingAmount),
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
				            startAngle:45,
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
		
				                {value:this.investmentAmount},
				                {value:this.withdrawalsAmount},
				                {value:this.bondAmount},
				             
				            ]
				        }
				    ]
				};

			},
			initData(){
				Public.API_GET({
	                url : 'freezingAmount',
	                success : (result)=>{
	                	// console.log(result)
	                	this.freezingAmount     = result.data.freezingAmount
						this.investmentAmount   = result.data.investmentAmount
						this.withdrawalsAmount  = result.data.withdrawalsAmount
						this.bondAmount         = result.data.bondAmount

						this.initMap();
	                }
           		});
			}
		},
		mounted(){
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "在途资金", false, null, ' ', null)
			window.Hub.$emit('setFooter',false);
			this.initData();
			
		}
	}
</script>

<style lang="scss" type="text/css" scoped="">
	@import "../../assets/skin";
	.freezingAmount{
		padding:   pxToRem(10*2)    pxToRem(15*2);
		&>div{
			background-color:white;
		}
		.content{
			padding-bottom:   pxToRem(40*2);
		}
		.relative{
			position:relative;
		}
		.rhombus{
			display:inline-block;
			width:  pxToRem(10*2);
			height:   pxToRem(10*2);
			// background-color:red;
			transform:rotateZ(45deg);
			margin-right:    pxToRem(10*2);
			
		}
		.rightArr{
			padding-right:   pxToRem(20*2);
			background:url(../../assets/images/assets_right.png) no-repeat center right;
			background-size:  pxToRem( 5*2)    pxToRem(10*2);
		}
		li{
			padding:  pxToRem(0)  pxToRem(20*2);
			line-height:   pxToRem(30*2);
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
					background-color:#999999;
				}
			}
			&:nth-child(2){
				.rhombus{
					background-color:#C3C3C3;
				}
			}
			&:nth-child(3){
				.rhombus{
					background-color:#D9D9D9;
				}
			}
			
		}
	}
</style>