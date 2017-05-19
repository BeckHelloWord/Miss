<template>
	<router-link :to="{ name: 'investDetail', params: { id: item.investId,status: status }}" tag='div' class='recordItem'>
		<div>
			<h3>{{item.borrowTitle}}<span class="transfer" v-show='!(item.alreadyInterest || item.shouldInterest)'>转</span></h3>
		</div>
		<ul class="clearfix">
			<li>
				<p>投资金额(元)</p>
				<p>{{item.amount | formatMoney}}</p>
			</li>
			<li v-show='item.alreadyInterest || item.shouldInterest'>
				<p>{{this.interest}}</p>
				<p>{{item.shouldInterest?item.shouldInterest:item.alreadyInterest | formatMoney}}</p>
			</li>
			<li v-show='!(item.alreadyInterest || item.shouldInterest)' class="transferred">
				<img src="../../assets/images/transferred.png" height="48" alt="已转让">
			</li>
		</ul>
		<div class="clearfix lastDiv" v-show='item.alreadyInterest || item.shouldInterest'>
			<span>{{item.totalPeriod}}期</span>
			<span>投资时间{{item.deadline}}</span>
		</div>
		<div class="transferred lastDiv" v-show='!(item.alreadyInterest || item.shouldInterest)'>
			<p>此笔投资已被债权转让</p>
		</div>
	</router-link>
	
</template>
<script>
	
	export default {
		data:function(){
			return {
				// 判定收益形容词
				interest:'预期收益(元)'
			}
		},
		props:['item','status'],
		methods:{
			
		},
		mounted:function(){
			
			if(this.status=='success'){
				this.interest = '待回收益(元)'
			}else if(this.status == 'done'){
				this.interest = '实收收益(元)'
			}else{
				this.interest = '预期收益(元)'
			}
		}
	}
</script>

<style lang="scss" scoped="" type="text/css">

@import '../../assets/skin';
	  .recordItem {
	  		.transfer{
	    		color:#8852D0;
	    		font-size:pxToRem(24);
	    		// display:inline-block;
	    		padding:pxToRem(8);
	    		// border:1px solid #999;
	    		background-color:#F9F6FD;
	    		// line-height:pxToRem(  30*2);
	    	}
	  		color:black;
	  		div {
	  			h3{
	  				 font-size:  pxToRem(  16*2);
	                font-weight: normal;
	                line-height:  pxToRem(  50*2);
	  			}
	  		}
                ul {
                    li {
                        float: left;
                        width: 50%;
                        p:first-child {
                            font-size:  pxToRem(  12*2);
                            color: #aaa;
                        }
                        p:last-child {
                            line-height:  pxToRem(  26*2);
                            font-size:  pxToRem(  18*2);
                        }
                        &:nth-child(2) {
                            color: $red;
                        }
                    }
                    margin-bottom:pxToRem(25);
                    
                }
                .lastDiv {
                    // line-height:  pxToRem(  50*2);
                    padding:pxToRem(25) 0;
                    color: #aaa;
                    span:first-child {
                        float: left;
                    }
                    span:last-child {
                        float: right;
                    }
                    border-top:1px solid $gary;
                }
            }
            .transferred{
               	text-align:center;
            }
</style>