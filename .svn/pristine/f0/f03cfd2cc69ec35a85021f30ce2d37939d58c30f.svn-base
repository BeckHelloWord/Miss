<!-- 投资详情 -->

<template>
	<div class="recordDetail">
		<div class="content">
			<p>{{detail.borrowTitle}} <span class="transfer" v-show='!detail.shouldInterest'>转</span></p>
			<p>投资时间&nbsp;&nbsp;{{detail.dateCreated}}</p>
			<ul class="clearfix">
				<li><p>投资金额(元)</p><p>{{detail.amount | formatMoney}}</p></li>
				<li>
					<p v-show='detail.shouldInterest' @click='help'>{{bool?'预期收益(元)':'实收收益(元)'}}</p>
					<p v-show='detail.shouldInterest'>{{detail.shouldInterest | formatMoney}}</p>
					<img v-show='!detail.shouldInterest' src="../../../assets/images/transferred.png" height="48" alt="已转让">
				</li>
			</ul>
		</div>
		
		<div class="outer" v-show="process">

			<!-- 待回本息 -->
			<router-link :to="{ name: 'returnedDetail', params: { id: $route.params.id ,status:'success'}}" tag='div' class='principal clearfix' v-show='detail.shouldReturnAmount'>
				<p>
					<span>待回本息(元)</span>
					<span>{{detail.shouldReturnAmount | formatMoney}}</span>
				</p>
			</router-link>

			<!-- 已回本息 -->
			<router-link :to="{ name: 'returnedDetail', params: { id: $route.params.id ,status:'done'}}" tag='div' class='principal clearfix' v-show='detail.alreadyReturnAmount'>
				<p>
					<span>已回本息(元)</span>
					<span>{{detail.alreadyReturnAmount | formatMoney}}</span>
				</p>
			</router-link>

			<!-- 债权转出到账 -->
			<router-link :to="{ name: 'transferRecord', params: { id: $route.params.id ,status:'done'}}" tag='div' class='principal clearfix' v-show='detail.transferAmount'>
				<p>
					<span>债权转出到账(元)</span>
					<span>{{detail.transferAmount | formatMoney}}</span>
				</p>
			</router-link>

			

			<!-- 奖励收益 -->
			<div class="earnings clearfix" v-show='detail.totalRewardAmount'>
				<ul>
					<li>
						奖励收益(元)
					</li>
				</ul>
				<ul>
					<li>
						<span>总计</span><span>{{detail.totalRewardAmount | formatMoney}}</span>
					</li>
					<li>
						<span>已回</span><span>{{detail.rewardedAmount | formatMoney}}</span>
					</li>
					<li>
						<span>待回</span><span>{{detail.rewardAmount | formatMoney}}</span>
					</li>
				</ul>
			</div>
			
		</div>

		<div class="process" v-show='!process'>
				<p>标的募集中</p>
				<p>暂无回款计划</p>
		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	export default{
		data:function(){
			return {
				detail:{},
				bool:true,
				process:false,
				success:false,
				done:false,				

			}
		},
		methods:{
			help(){
				MessageBox({
				  title: '提示',
				  message: '预期收益=投资本金*项目年利率*持有到期期限/360,当前投资本金可在待回金额明细中查看。',
				  confirmButtonText: '好的'
				});	
			},
			initData(){
				Public.API_GET({
					url : 'investDetails',
					data:{
						investId :this.$route.params.id
					},
					success : (result) => {
						// console.log(result)
						
						this.detail=result.data;
						
					}
				});
			}
		},
		
		mounted:function(){
			var status = this.$route.params.status;

			if(status=='process'){
				window.Hub.$emit('setTitle', "详情", false, null,' ', null)	
			}else{
				// 查看合同 跳转
				var _this = this
				// console.log(this)
				window.Hub.$emit('setTitle', "详情", false, null,'查看合同', ()=>{

					_this.$router.push({name:'contractCheck',params:{contractUrl:this.detail.contractUrl}})
					// _this.$router.push('/contractCheck')
				})
			}

			// 判断状态

			if(status == "success"){
				this.process = true;
				this.success = true;
			}else if(status == 'done'){
				this.process = true;
				this.done = true;
				this.bool = false
			}

			// this.bool = this.$route.params.status!='done';

			this.initData();

		}
	}
</script>
<style lang="scss" type="text/css">

@import "../../../assets/skin";




	
/*记录详情*/

.recordDetail {
	.outer{
		background-color:#edf0f3;
	}
    div {
        background-color: white;
        margin-bottom:   pxToRem(  10*2);
    }
    .content {
    	.transfer{
    		color:#8852D0;
    		font-size:pxToRem(24);
    		// display:inline-block;
    		padding:pxToRem(2);
    		border:1px solid #999;
    		background-color:#F9F6FD;
    		// line-height:pxToRem(  30*2);
    	}
        text-align: center;
        padding:   pxToRem(  10*2) 0;
        &>p {
            &:first-child {
                font-size:   pxToRem(  15*2);
                line-height:   pxToRem(  30*2);
            }
            &:nth-child(2) {
                color: #aaa;
            }
        }
        ul {
            margin:   pxToRem(  12*2) 0;
            li {
                float: left;
                box-sizing: border-box;
                width: 50%;
                p {
                    &:first-child {
                        color: #aaa;
                    }
                    &:last-child {
                        font-size:   pxToRem(  16*2);
                    }
                }
                &:last-child {
                    p:last-child {
                        color: $red;

                    }
                    p:first-child{
                            background:url(../../../assets/images/question_mark.jpg) no-repeat 80% center;
                            background-size:  pxToRem(  11*2)   pxToRem(  11*2);
                    }
                }
            }
        }
    }
    .principal {
        p {
            font-size:   pxToRem(  14*2);
            padding: 0   pxToRem(  15*2);
            line-height:   pxToRem(  55*2);
            span:first-child {
                float: left;
            }
            span:last-child {
                float: right;
                padding-right:   pxToRem(  20*2);
                background: url(../../../assets/images/gt.jpg) no-repeat center right;
                background-size:  pxToRem(   5*2);
            }
        }
        
    }
    .earnings {
        padding: 0  pxToRem(  15*2)  pxToRem(  20*2);
        font-size:  pxToRem(  14*2);
        ul {
            line-height:  pxToRem(  55*2);
            &:first-child {
                float: left;
            }
            &:last-child {
                float: right;
                li {
                    span:nth-child(2n) {
                        float: right;
                        text-indent: 1em;
                    }
                }
                li:nth-child(n+2) {
                    line-height:  pxToRem(  20*2);
                }
            }
        }
    }
    .process{
    	padding-top:pxToRem(120);
    	text-align:center;
    	background-color:#edf0f3;
    	color:#9A9A9A;
    	font-size:pxToRem( 30);
    }
    .noBg{
    	background:none !important;
    }
}
</style>