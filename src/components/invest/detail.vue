<template>
	<div class="investDetail">
		<div class="mainBox">
			<p class="rate">{{investData.loanRate|formatMoney}}<font class="subsidyRate" v-if="investData.subsidyRate>0">+{{investData.subsidyRate|formatMoney}}</font><span>%</span></p>
			<p class="rateTitle">借款年利率</p>
			<div class="rateTag">
				<div class="tagBox">
					<font v-if="investData.rewardRate>0" class="exclusive rewardRate">返现{{investData.rewardRate}}%</font>
					<font v-if="investData.isLimitBeginner" class="exclusive newbee">新手专享</font>
					<font v-if="investData.isLimitRegularer" class="exclusive oldCustomer">老客专享</font>
					<font v-if="investData.isExclusiveApp" class="exclusive oldCustomer">APP专享</font>
				</div>
				<div class="rateCycle">
					投资期限：{{investData.cycle}}{{investData.cycleType}}
				</div>
			</div>
		</div>
		<div class="info">
			<div class="parts">
				<router-link :to="{ path: '/invest/datum/'+investId, params: { investId: investId }}">
					<span class="fl"><i class="iconfont icon-info"></i>项目详情</span>
					<span class="fr">完善的信息披露</span>
				</router-link>
				<router-link to="/index/guarantee">
					<span class="fl"><i class="iconfont icon-safe"></i>安全保障</span>
					<span class="fr">10大安全保障</span>
				</router-link>
				<router-link :to="{ path: '/invest/history/'+investId, params: { investId: investId }}">
					<span class="fl"><i class="iconfont icon-record"></i>投资记录</span>
					<span class="fr">{{investData.investorCount}}人已投资</span>
				</router-link>
			</div>
		</div>
		<div :class="detailMain">
			<ul>
				<li class="canVote clearfix">
					<div class="fl">
						<span>可投金额(元)</span>
						<p class="fontRed">{{investData.borrowLast|formatMoney }}</p>
					</div>
					<div class="gain fr">
						<span>预计收益(元)</span>
						<p class="yqsy fontRed">{{income}}</p>
					</div>
				</li>
				<li class="clearfix amountCont">
					<input type="number" name="amount" id="amount" align="center" v-model="investMoney" :placeholder="'起投金额'+investData.borrowMin+'元'">
				</li>
				<li class="redSelect clearfix" @click="selectVoucher">
					<div class="clearfix">
						<p>{{voucherText}}</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="investBtn" @click="creatOrder">
			立即投资
		</div>
		<div id="voucherBox" style="display:none">
			<ul class="voucherUl">
				<li class='voucherNone voucher' data-index="-1">不使用红包</li>
				<template v-for="(item,index) in voucherList">
						<li class='voucher' :data-index="index">
						<div><p>{{item.amountContent}}</p><p>{{item.conditionContent}}</p></div></li>
				</template>
			</ul>
		</div>
	</div>
</template>


<script>
import layer from '../../../static/layer.js'
import {Toast } from 'mint-ui';
	export default {
		components: {
	
		},
		data: function() {
			return {
				voucher: {},
				voucherText: "-",
				investMoney: "",
				investId: this.$route.params.investId,
				investData: {
					"lastTime": "",
					"classify": "",
					"isAllowBond": false,
					"overTime": "",
					"interestType": "",
					"title": "",
					"cycle": 0,
					"repayType": "",
					"number": 0,
					"min": 0,
					"isCanWorth": false,
					"dateCreated": "",
					"price": 0.00,
					"isFullExamine": false,
					"borrowMax": 0.00,
					"alreadyNumber": 0,
					"id": 522,
					"borrowLast": 0.00,
					"nowDate": "",
					"publishTime": "",
					"amount": 0.00,
					"subsidyRate": 0.00,
					"borrowBreif": "",
					"rewardRate": 0,
					"ensure": "",
					"address": "",
					"isLimitBeginner": false,
					"max": 0,
					"borrowUse": "",
					"borrower": "",
					"investorCount": 0,
					"borrowMin": 0,
					"alreadyAmount": 0.00,
					"cycleType": "",
					"isExclusiveApp": false,
					"borrowId": 522,
					"loanRate": 0,
					"status": "failure"
				},
				voucherList: [],
				income: "0.00",
				detailMain:"detailMain"
			}
		},
		watch: {
			investMoney: function() {
				this.calMoney()
			}
		},
		methods: {
			onYearChange(picker, values) {
				this.year = values[0];
			},
			selectVoucher() {
				var _this = this
				if (this.voucherList.length == 0) {
					Toast({
						message:"无可用红包",
						position: 'bottom',
						duration: 2000
					})
					return
				}
				layer.dialog({
					// title: ['这是标题', 'background:red;'], // 第一个是标题内容  第二个是标题栏的style(可以为空)
					content: $("#voucherBox").html(),
					contentClass: "voucherList",
					// btn: ['确定'],
					time: 2000000,
					bindFun: () => {
						var voucherHeight = (this.voucherList.length + 1) * 45,
							showHeight;
						showHeight = voucherHeight > window.innerHeight / 2 ? window.innerHeight / 2 : voucherHeight
						$(".voucherList").css("height", showHeight)
						$(".voucher").on("click", function(e) {
							_this.setVoucher(e.currentTarget.dataset.index)
							layer.instanceList[0].close()
						})
					}
				})
			},
			//最优红包加载
			bestVoucher: function() {
				var bestAmount=0,bestVoucher = -1;
				for(var item in this.voucherList){
					var tempVoucher=this.voucherList[item],redDeployAmount,tempAmount;
					if (tempVoucher.voucherType == "cash") {
						if(tempVoucher.useLimitMoney>this.investMoney){
							tempAmount = 0;
						}else if(tempVoucher.useLimitMoney>this.investData.borrowLast){
							tempAmount = 0;
						}else{
							tempAmount = tempVoucher.amount;
							if (tempVoucher.voucherAmountDeploy > 0) {
								redDeployAmount = tempVoucher.voucherAmountDeploy * this.investMoney / 100
								if (tempVoucher.amount > redDeployAmount) {
									tempAmount = redDeployAmount
								}
							}	
						}
					} else {
						if(tempVoucher.useLimitMoney>this.investMoney){
							tempAmount = 0;
						}else if(tempVoucher.useLimitMoney>this.investData.borrowLast){
							tempAmount = 0;
						}else{
							var effectiveMoney, effectiveDay, dayRate;
							if(tempVoucher.interestRate>0){
								dayRate=tempVoucher.interestRate/36000
							}
							if (tempVoucher.effectiveMaxMoney > 0 && tempVoucher.effectiveMaxMoney <= this.investData.borrowLast) {
								effectiveMoney = tempVoucher.effectiveMaxMoney
							} else {
								effectiveMoney = this.investMoney
							}
							if (tempVoucher.interestDay > 0) {
								effectiveDay = tempVoucher.interestDay
							} else {
								effectiveDay = this.investData.cycle * (investData.cycleType == "day" ? 1 : 30)
							}
							tempAmount =effectiveMoney*effectiveDay*dayRate
						}
					}
					// console.log(item+"金额"+tempAmount)
					// console.log(tempAmount>bestAmount)
					if(tempAmount>bestAmount){
						bestAmount=tempAmount;
						bestVoucher=item;
					}
				}
				this.setVoucher(bestVoucher)
			},
			setVoucher: function(num) {
				if (num > -1) {
					this.voucher = this.voucherList[num]
					this.voucherText = this.voucher.amountContent + "(" + this.voucher.conditionContent + ")"
				} else {
					this.voucher = {
						amount: 0,
						amountContent: "不使用红包",
						conditionContent: "",
						dueTime: "",
						effectiveMaxMoney: null,
						interestDay: 0,
						interestRate: 0,
						name: "",
						sid: 0,
						startTime: "",
						status: "",
						useLimitMoney: 0,
						useLimitMonth: "",
						useTime: null,
						voucherAmountDeploy: 0,
						voucherType: ""
					}
					this.voucherText = "不使用红包"
				}
			},
			investCheck: function() {
				if(this.investMoney==""){
					Toast({
						message:"请填写投资金额",
						position: 'bottom',
						duration: 2000
					})
					return false
				}
				if(this.investMoney<(this.investData.borrowMin>this.investData.borrowLast?this.investData.borrowLast:this.investData.borrowMin)){
					Toast({
						message:"投资金额小于"+this.investData.borrowMin,
						position: 'bottom',
						duration: 2000
					})
					return false
				}
				return true
			},
			calMoney: function() {
				if (this.investMoney == "" || this.investMoney == 0) {
					this.income = "0.00"
					return
				}
				if (this.investMoney > this.investData.borrowLast) {
					this.investMoney = this.investData.borrowLast
				}
				this.bestVoucher()
				var sendData = {
					borrowId: this.investId,
					investMoney: this.investMoney
				}
				if (this.voucher.sid != 0) {
					sendData.voucherId = this.voucher.sid
				}
				Public.API_GET({
					url: 'investIncome',
					data: sendData,
					success: (result) => {
						this.income = Number(result.data.totalIncome).toFixed(2)
					}
				});
			},
			creatOrder:function(){
				if(!this.investCheck()){
					return
				}
				var sendOrderData={
					objectKey : this.investId,
					type : "invest",
					amount :this.investMoney
				}
				if (this.voucher.sid != 0) {
					sendOrderData.voucherId  = this.voucher.sid
				}
				Public.API_GET({
					url: 'investOrder',
					data: sendOrderData,
					success: (result) => {	
						if(result.data&&result.isSuccess){
							if(result.data.truthAmt){
							//实名、绑卡跳转至收银台确认信息页面
								if(result.data.realName&&result.data.idCard &&result.data.bankAccount ){
									sessionStorage.setItem("payData",JSON.stringify(result.data))
									this.$router.push({ path: '/invest/pay'})
								}else{
									//未实名、未绑卡跳转至绑卡页面
									this.$router.push({ path: '/home/bank/bindCard', query: { "amount": result.data.truthAmt , "tradeNo": result.data.tradeNo}})
								}					
							}else{					
								this.$router.push({ path: '/invest/paySuccess', query: { "tradeNo": result.data.tradeNo }})
							}
						}else{
							Toast({
								message:result.message,
								position: 'bottom',
								duration: 2000
							})
						}
					}
				});
			},
			initData: function(finishFun) {
				Public.API_GET({
					url: 'investDetail',
					data: {
						id: this.investId,
						type: "invest"
					},
					success: (result) => {
						if(!result.isSuccess){
							if(result.status=="201"){
								Toast({
									message:"无法找到标的",
									position: 'bottom',
  									duration: 2000
								})
							}
							return
						}
									
						if(!Public.Auth.get()){
							this.detailMain="detailMain showDetail"
						}
						this.investData = result.data;
						var investItem;
						var investItem = {};
						if (localStorage.investItem) {
							investItem = JSON.parse(localStorage.investItem)
						}
						investItem[this.investId] = {
							amount: result.data.amount,
							repayType: result.data.repayType,
							interestType: result.data.interestType
						};
						localStorage.investItem = JSON.stringify(investItem)
		
						if(Public.Auth.get()){
							this.getVoucher()
						}else{
							this.voucherText = "不使用红包"
						}

						window.Hub.$emit('setTitle', result.data.title?result.data.title:"标的详情 ", false, null, " ", null)
						if (typeof(finishFun) == "function") {
							finishFun()
						}
					}
				});
			},
			getVoucher: function() {
				Public.API_GET({
					url: 'investVoucher',
					data: {
						id: this.investId,
						type: "invest"
					},
					success: (result) => {
						if (result.data.voucherList) {
							// this.voucherList.push(result.data.voucherList[0])
							this.voucherList = result.data.voucherList
							this.voucherText = "您有" + result.data.voucherList.length + "个红包可以使用"
						}else{
							this.voucherText = "不使用红包"
						}

					}
				});
			}
		},
		mounted: function() {
			this.initData()
			window.Hub.$emit('refresh', this.initData);
			window.Hub.$emit('setTitle', "标的详情", false, null, " ", null)
			window.Hub.$emit('setFooter', false);

		},
		beforeMount: function() {
	
		},
		filters: {  
			formatLoanRate: function (value) {  
				return Number(value).toFixed(2)
			}
		}  

		
	}
</script>

<style lang="scss" scoped="" type="text/css">
	@import "../../assets/skin";
	//标的详情
	.investDetail {
		.mainBox {
			background: #fff;
			text-align: center;
			padding: 30px 10px 5px 10px;
			margin-bottom: 10px;
			.rate {
				font-size: pxToRem(80);
				color: $red;
				height: pxToRem(80);
				line-height: pxToRem(80);
				span {
					font-size: pxToRem(40);
				}
				
			}
			.subsidyRate{
				font-size: pxToRem(40);
			}
			.rateTitle {
				font-size: pxToRem(30);
			}
			.rateTag {
				display: inline-block;
				width: 100%;
				.tagBox {
					margin-top: 15px;
					width: 65%
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
				.newbee {
					background: #f2f8e9;
					color: #84bb25;
				}
				.rewardRate {
					background: #fde8e7;
					color: #fd7e80;
				}
				.oldCustomer {
					color: #2d449f;
					background: #eaecf5;
				}
				.rateCycle {
					float: right;
					height: 20px;
					line-height: 20px;
					display: inline-block;
					width: 35%;
					text-align: right;
					margin: 5px 0;
					font-size: 1rem;
				}
			}
		}
		.info {
			background: #fff;
			position: relative;
			overflow: hidden;
			margin-bottom: 10px;
			.parts {
				a {
					height: 32px;
					line-height: 32px;
					padding: 9px 5% 8px 0;
					margin: 0 10px;
					border-bottom: 1px solid #dedede;
					position: relative;
					display: block;
					font-size: 1.2rem;
					background: url(../../assets/images/gt.jpg) no-repeat right center;
					background-size: 8px 14px;
					color: #1b2b3f;
					i {
						font-size: 20px;
						margin: 5px;
						color:$red;
					}
				}
				a:last-child {
					border-bottom: none;
				}
			}
		}
		.showDetail{
			height:204px!important;
		}
		.detailMain {
			transition:all 2s;
			-webkit-transition:all 2s;
			height:0;
			overflow:hidden;
			ul{
				padding: 14px;
			}
			
			background: #fff;
			li.canVote {
				div {
					width: 50%;
					.fontRed {
						color: #e71c18;
						font-size: 1.6rem;
						line-height: 1.6;
					}
				}
				.fr {
					text-align: right;
				}
			}
			.amountCont {
				border: 1px solid #d2d2d2;
				height: 48px;
				line-height: 48px;
				margin-bottom: 20px;
				margin-top: 10px;
				input {
					width: 100%;
					line-height: 30px;
					padding: 9px 0;
					border: 0;
					text-align: center;
					float: left;
					font-size: 1.3rem;
				}
			}
			.redSelect {
				width: 100%;
				height: 48px;
				line-height: 48px;
				text-align: center;
				font-size: 1.2rem;
				border: 1px solid #d2d2d2;
				p {
					max-width: 80%;
					margin-left: 10%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					display: block;
					text-align: center;
				}
			}
		}
		.investBtn {
			margin: 10px;
			background: $red;
			color: #fff;
			height: 46px;
			line-height: 46px;
			font-size: 22px;
			border: 0;
			text-align: center;
		}
	}
</style>