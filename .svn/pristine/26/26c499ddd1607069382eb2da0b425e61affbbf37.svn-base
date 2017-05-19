<template>
	<li>
		<router-link :to="{ path: '/invest/detail/'+item.id, params: { investId: item.id }}">
			<div class="listTable">
			<div class="clearfix">
			<s>{{item.title}}</s>
			<font v-if="item.rewardRate>0" class="exclusive rewardRate">返现{{item.rewardRate}}%</font>
			<font v-if="item.isLimitBeginner"class="exclusive newbee">新手专享</font>
			<font v-if="item.isLimitRegularer"class="exclusive oldCustomer">老客专享</font>
			<font v-if="item.isExclusiveApp"class="exclusive oldCustomer">APP专享</font>
			</div>			
				<table>
					<tbody>
					<tr>
						<td width="46%" class="p-interest">
							<p class="red">{{item.yearRate|formatMoney}}<font class="subsidyRate" v-if="item.subsidyRate>0">+{{item.subsidyRate|formatMoney}}</font><span>%</span>
							</p>
						</td>
						<td width="30%" class="p-date">
							<p>{{item.cycle}}<span>{{item.cycleType|filterFun}}</span>
							</p>
						</td>
						<td class="indexBtn">
							<div v-if="formatSchedule(item.schedule) " class="panic-grab"><p>{{item.schedule|showDay}} <br/>{{item.schedule|showTime}}开抢</p></div>
							<div v-else-if="item.status=='process'" class="panic-buying">抢购</div>		
							<div v-else-if="item.status=='failure'" class="panic-buying">失败</div>
							<div v-else class="panic-fullScale"></div>
						</td>
					</tr>
					</tbody>
				</table>
				<!-- <div class="schedule"><i :width="item.investProcess+'%'"></i></div> -->
				<div class="schedule"><i :style="{width:item.investProcess+'%'}"></i></div>
				<div class="repayment">
					<div>{{item.investMin|formatMoney}}元起投</div>
					<div>
						可投金额{{item.surplusAmount|formatMoney}}元
					</div>
				</div>
			</div>
		</router-link>
	</li>
</template>

<script>

	export default {
		props:['item'],
		methods: {
			formatSchedule(schedule){
                if(schedule && new Date(schedule.replace("-","/")).getTime()> new Date().getTime()){
                    return true
                }else{
                    return false
                }   
            }
		},
		mounted: function() {
			
		},
		beforeMount: function() {
	
		},
		filters: {  
			filterFun: function (value) {  
				if(value=="day"){
					return "天"  
				}else if(value=="month"){
					return "月"  
				}	
			},
			showDay:function(value){
				var month=value.split(" ")[0].split("-")[1];
				var day=value.split(" ")[0].split("-")[2];
				return month+"月"+day+"日"
			},
			showTime:function(value){
				return value.split(" ")[1].substring(0,5)
			}
		}  
	}
</script>

<style lang="scss"  type="text/css">
@import "../../assets/skin";


.investList{
    padding-bottom: 40px;
    ul{
        li{
            list-style: none;
            padding: 14px;
            border: 0;
            margin-bottom: 14px;
            box-sizing: border-box;
            background: #fff;
            s{
                color: #666666;
                display: block;
                max-width: 64%;
                margin-right: 1%;
                font-size: 18px;
                line-height: 30px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-decoration: none;
                float: left;
            }
            .clearfix{
              clear: both;
            }
            .exclusive {
                height: 20px;
                line-height: 20px;
                padding: 0 6px;
                font-weight: normal;
                font-size: 0.8rem;
                display: inline-block;
                float: left;
                margin: 5px; 
            }
            .newbee{
              background: #f2f8e9;
              color: #84bb25;
            }
            .rewardRate{
              background: #fde8e7;
              color: #fd7e80;
            }
            .oldCustomer{
              color: #2d449f;
              background: #eaecf5;
            }
           
            .listTable{
                table{
                    width: 100%;
                    margin: 10px 0 8px 0;
                    td{
                        padding: 0 4px;
                         .red{
                          color: $red;
                          .subsidyRate{
                              font-size:pxToRem(32)
                          }
                        }
                        p{
                            font-size: 24px;
                            color: #333;
                            span{
                                font-size:pxToRem(32)
                            }
                        }
                    }
                    .panic-buying{
                        width: 100%;
                        height: 33px;
                        line-height: 33px;
                        border: 0;
                        color: #fff;
                        background: $red;
                        display: inline-block;
                        border-radius: 0;
                        overflow: hidden;
                        font-size: 14px;
                        text-align: center;
                        box-sizing: border-box;
                    }
                    .panic-fullScale{
                        width: 100%;
                        height: 5rem;
                        background: url(../../assets/images/fullScale.png) no-repeat right;
                        background-size:80%;
                        bottom: 0;
                        left: 0;
                    }
                    .panic-grab {
                        height: 3rem;
                        transform: rotate(-6deg);
                        -webkit-transform: rotate(-6deg);
                        background: url(../../assets/images/grab.png) no-repeat;
                        background-size: 100% 100%;
                        position: relative;
                        p {
                            width: 100%;
                            font-size: 0.8rem;
                            box-sizing: border-box;
                            line-height: 1.2rem;
                            padding-top: 0.3rem;
                            text-align: center;
                            color:$red
                        }
                    }
                }
                 .schedule{
                    height: 1px;
                    background-color: #dedede;
                    i{
                      background: $red;
                      height:1px;
                      display:block;
                    }
                }
                .repayment {
                    padding: 5px 0 0;
                    height: 20px;
                    line-height: 20px;
                    margin-top: 7px;
                    font-size: 12px;
                    color: #a7a7a7;
                    div{
                        display: inline-block!important;
                        width: 49%
                    }
                    div:last-child{
                        text-align: right
                    }
                }
            }
        }
    }
}
</style>