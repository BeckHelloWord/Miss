<template>
	<div class="datum">
		<div class="project project-title">
			<p>
				<em>借款金额</em><span>{{investItem.amount}}元</span>
			</p>
			<p>
				<em>还款方式</em><span>{{investItem.repayType}}</span>
			</p>
			<p>
				<em>计息方式</em><span>{{investItem.interestType}}</span>
			</p>
			<p>
				<em>保障方式</em><span><i class="iconfont icon-safe red"></i>多重保障</span>
			</p>
			<p class="last">
				<em>资金安全</em><span><img src="../../assets/images/h5-tree.png" alt="">太平财险承保</span>
			</p>
		</div>
		<div class="info project">
			<h2><i class="iconfont icon-info"></i>借款简介</h2>
			<p>{{datum.borrowBreif}}</p>
			<h2><i class="iconfont icon-yongtu"></i><span>资金用途</span></h2>
			<p>{{datum.borrowUse}}</p>
			<h2><i class="iconfont icon-huankuan"></i><span>还款来源</span></h2>
			<p>{{datum.borrowCapital}}</p>
			<h2><i class="iconfont icon-userInfo"></i><span>用户信息</span></h2>
			<div class="user-details">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <td width="25%">性别：</td>
                        <td width="25%">{{datum.sex}}</td>
                        <td width="25%">年龄：</td>
                        <td width="25%">{{datum.age}}岁</td>
                    </tr>
                    <tr>
                        <td>婚姻状况：</td>
                        <td>{{datum.marriage}}</td>
                        <td>职业：</td>
                        <td>{{datum.position}}</td>
                    </tr>
                    <tr>
                        <td>是否购车：</td>
                        <td>{{datum.isBuyCar?"是":"否"}}</td>
                        <td>住房条件：</td>
                        <td>{{datum.housing}}</td>
                    </tr>
                    <tr>
                        <td>信用报告：</td>
                        <td>{{datum.isCreditReport}}</td>
                        <td>居住城市：</td>
                        <td>{{datum.province}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
			<h2><i class="iconfont icon-ziliao"></i><span>相关材料</span></h2>
			<div class="material ">
				<template v-for="item in datum.borrowAuth">
				<div v-if="item.imgUrl" class="detail-img">
					{{item.item}}
					<img v-lazy="'//bxwd-img.oss-cn-hangzhou.aliyuncs.com/'+item.imgUrl" style="display: block;">
				</div>
				</template>
				<h2><i class="iconfont icon-info"></i><span>项目介绍</span></h2>
				<div class="richText" ><div v-html="content"></div></div>
			</div>
		</div>
	</div>
</template>

<script>
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload)
	export default {
		components: {
			Lazyload
		},
		data: function() {
			return {
				investItem:{
					amount: "-",
					repayType:"-",
					interestType:"-"
				},
				investId: this.$route.params.investId,
				datum: {},
				content:""
			}
		},
		methods: {
			initData: function() {
				Public.API_GET({
					url: 'investDatum',
					data: {
						id: this.investId,
						type: "invest"
					},
					success: (result) => {
						this.datum = result.data
						this.initRisk(result.data.classify)
					}
				});
			},
			initRisk:function(classify){
				Public.API_GET({
					url: 'investRisk',
					data: {
						typeCode:"ddd",
						code:classify+"_control_mobile"
					},
					success: (result) => {
						this.content = result.data.content
					}
				});
			}
		},
		mounted: function() {
			if(JSON.parse(localStorage.investItem)[this.investId]){
				this.investItem = JSON.parse(localStorage.investItem)[this.investId]
			}		
			this.initData()
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "标的详情", false, null, " ", null)
			window.Hub.$emit('setFooter', false);
		},
		beforeMount: function() {
	
		}
	}
</script>

<style lang="scss" scoped="" type="text/css">
@import "../../assets/skin";
.datum {
    .red{
        color:$red;
    }
    .project {
        background: #fff;
    }
    .info {
        margin-top: 10px;
        padding: 0 10px;
    }
    .project h2 {
        padding: 10px;
        color: $red;
        border-bottom: 1px solid #F0F0F0;
        font-size: 1.4rem;
        i{
            font-weight:normal;
            font-size:20px;
            margin-right:5px;
        }
    }
    .project h2 img {
        width: 6%;
        margin-right: 5px;
        vertical-align: text-bottom;
    }
    .project > p {
        padding: 15px 10px;
        font-size: 1.3rem;
        color: #666666;
        line-height: 20px;
        text-align: justify;
        line-height: 2rem;
    }
    .project-title > p {
        padding-top: 15px;
        padding-bottom: 0;
    }
    .project-title > p.last {
        padding-bottom: 15px;
    }
    .project > p.nopadding-top {
        padding-top: 0;
    }
    .project > p > em {
        color: #999;
    }
    .project > p > span {
        float: right;
    }
    .project > p img {
        width: 1.4rem;
        height: 1.5rem;
        margin-right: 5px;
        vertical-align: text-bottom;
    }
    .detail-img {
        margin-bottom: 20px;
    }
    .detail-img h2 {
        margin-bottom: 6px;
        height: 24px;
        line-height: 24px;
        font-weight: normal;
        color: #666666;
    }
    .detail-img h2 span {
        padding-left: 6px;
    }
    .detail-img img {
        max-width: 90%;
        display: block;
        margin: 15px auto 0;
        border: 1px solid #e5e8fa;
    }
    .material {
        padding-top: 15px
    }
    .user-details {
        padding: 15px 6px;
    }
    .user-details table {
        width: 100%;
    }
    .user-details table {
        border: 1px solid #e5e8fa;
        table-layout: fixed;
    }
    .user-details table tr:nth-child(2n - 1) {
        background-color: #f8f9ff;
    }
    .user-details table td {
        padding: 3% 2%;
        height: 20px;
        line-height: 20px;
        font-size: 1rem;
        color: #666;
    }
    .user-details table td:nth-child(2n + 1) {
        color: #a1a1a1;
    }
}
</style>