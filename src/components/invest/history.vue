<template>
	<div class="investHistory">
		<!--加入记录 start-->
            <div class="record" v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="10">
                <div class="top-list compd">
                    <ul class="cc">
                        <li>
                            <div class="rankingImg">
                                <i></i>
                            </div>
                            <p>{{second.username}}</p>
                            <p>{{second.amount|formatMoney}}</p>
                        </li>
                        <li class="list-middle">
                            <div class="rankingImg first">
                                <i></i>
                            </div>
                            <p>{{first.username}}</p>
                            <p>{{first.amount|formatMoney}}</p>
                        </li>
                        <li>
                            <div class="rankingImg">
                                <i></i>
                            </div>
                            <p>{{third.username}}</p>
                            <p>{{third.amount|formatMoney}}</p>
                        </li>
                    </ul>
                </div>
				
                <p class="invest-list compd cc"><span>投资人<strong>(共{{totalCount}}人)</strong></span><span class="fr">投资金额(元)</span>
                </p>
                <template v-if="jion.length > 0">
                        <div class="record-list compd">
                            <table>
                                <tbody >
                                <tr v-for="item in jion">
                                    <td width="21%">
                                        <i v-if="item.userFace"  class="headimg"
                                           v-bind:style="'background-image:url(https://bxwd-img.oss-cn-hangzhou.aliyuncs.com/'+encodeURIComponent(item.userFace)+');'"></i>
                                        <i v-else class="defaultHead"></i>
                                    </td>
                                    <td width="40%">{{item.username}}</td>
                                    <td class="list-right">
                                        <span class="g333">{{item.amount|formatInvest}}</span>
                                        <p class="g999">{{item.dateCreated}}</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </template>
                <template v-else>
                    <div class="empty">
                        <empty></empty>
                    </div>
                </template>
            </div>
            <!--加入记录 end-->
	</div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import empty from '../public/empty'
	export default {
		components:{
			InfiniteScroll:InfiniteScroll,
            empty
		},
		data: function() {
			return {
				jion:[],
				first:{
					username:"暂无",amount:0
				},
				second:{
					username:"暂无",amount:0
				},
				third:{
					username:"暂无",amount:0
				},
				totalCount:0,
				offset:0,
				max:10,
				hasNext:true,
				initLock:true
			}
		},
		methods: {
			initData: function(finishFun) {
				this.hasNext = true;
				this.offset = 0;
				this.jion=[]
				Public.API_GET({
					url: 'investHistoryRank',
					data: {
						id: this.$route.params.investId,
						type:"invest",
						offset:this.offset,
						max:this.max
					},
					success: (result) => {
						var jionNum=result.data.length
						if(jionNum==1){
							this.first=result.data[0];
							this.second={username:"暂无",amount:0};
							this.third={username:"暂无",amount:0};
						}else if(jionNum==2){
							this.first=result.data[0];
							this.second=result.data[1];
							this.third={username:"暂无",amount:0};
						}else if(jionNum==3){
							this.first=result.data[0];
							this.second=result.data[1];
							this.third=result.data[2];
						}			
						if(typeof(finishFun)=="function"){
							finishFun()
						}
						this.initLock=false
						this.loadMore()
					}
				});
			},
			loadMore() {
				if(this.initLock){
					return
				}
				if(!this.hasNext){
					return
				}
				this.loading = true;
				Public.API_GET({
					url: 'investHistory',
					data: {
						id: this.$route.params.investId,
						type:"invest",
						offset:this.offset,
						max:this.max
					},
					success : (result) => {
						for(var item in result.data){
							this.jion.push(result.data[item])
						}
						this.offset+=this.max;
						this.loading = false;
						this.totalCount = result.totalCount
						if(this.offset>result.totalCount){
							this.hasNext = false
						}
					}
				});
			},
		},
		mounted: function() {
			this.initData()
			window.Hub.$emit('refresh', this.initData);
			window.Hub.$emit('setTitle', "投资记录", false, null, " ", null)
			window.Hub.$emit('setFooter', false);
		},
		filters:{
			formatMoney(value){
				if (value) {
					var val = value * 1;
					if (val < 10000) {
						return val.toFixed(2);
					} else {
						return (val / 10000).toFixed(2) + "万";
					}
				} else {
					return "0.00";
				}
			},
			formatInvest(value){
				 return Number(value).toFixed(2);
			}
		}
	}
</script>
<style lang="scss" scoped="" type="text/css">
@import "../../assets/skin";
/* 加入记录 */

.investHistory {
    .empty{
        margin-top:pxToRem(80)
    }
    .top-list {
        font-size: 1.2rem;
        padding-top: 7.6%;
        padding-bottom: 3.46%;
    }
    .top-list .rankingImg {
        height: 1rem;
        margin-bottom: 5rem;
        vertical-align: text-bottom;
    }
    .top-list ul li {
        float: left;
        width: 33.33%;
        text-align: center;
    }
    .top-list ul li i {
        display: block;
        width: 3.5rem;
        height: 5rem;
        margin: 0 auto;
        background: url('../../assets/images/h5-ranking2.png') no-repeat center;
        background-size: 100% 100%;
    }
    .top-list ul li:last-child i {
        display: block;
        width: 3.5rem;
        height: 5rem;
        margin: 0 auto;
        background: url('../../assets/images/h5-ranking3.png') no-repeat center;
        background-size: 100% 100%;
    }
    .top-list ul li .first {
        position: relative;
        top: -10px;
    }
    .top-list ul li .first i {
        display: block;
        width: 4.2rem;
        height: 5.7rem;
        margin: 0 auto;
        background: url('../../assets/images/h5-ranking1.png') no-repeat center;
        background-size: 100% 100%;
    }
    .top-list ul li i {
        display: block;
        width: 3.5rem;
        height: 5rem;
        margin: 0 auto;
    }
    .top-list ul li img {
        display: inline-block;
        width: 30%;
        margin-bottom: 10px;
    }
    .top-list ul li:nth-child(2) img {
        width: 36%;
        margin-top: -10px;
    }
    .top-list ul li p:last-child {
        font-size: 1.6rem;
        line-height: 2;
        color: $red;
    }
    .user-record {
        font-size: .9rem;
        margin-top: 1rem;
        padding: 14px 20px;
    }
    .user-record i {
        color: #2d449f;
    }
    .record-list {
        background-color: #fff;
        padding-right: 20px;
    }
    .invest-list {
        font-size: 1.2rem;
        padding-top: 3.7333%;
        padding-bottom: 3.7333%;
        padding: 3.7333% 20px;
        color: #666;
        clear: both
    }
    .invest-list strong {
        font-weight: normal;
        color: #2d449f;
    }
    .record-list table {
        font-size: 1.4rem;
        line-height: 2;
        border-collapse: collapse;
        color: #555;
        background-color: #fff;
    }
    .record-list table tr th {
        background: #edf0f3;
    }
    .record-list table tr th:first-child {
        padding: 13px 14px;
        text-align: left;
    }
    .record-list table tr th:last-child {
        text-align: right;
        color: #333;
    }
    .record-list table tr th span {
        color: #2d449f;
    }
    .record-list table tbody tr td {
        padding: 5px 0;
        border-bottom: 1px solid #ececec;
    }
    .record-list table tbody tr td:first-child {
        border: 0;
    }
    .record-list table tbody tr td:nth-child(2) {
        text-indent: 1em;
    }
    .record-list table tr:last-child td {
        border: none;
    }
    .record-list .list-right {
        text-align: right;
    }
    .record-list .list-right span {
        font-size: 1.4rem;
        color: $red;
    }
    .record-list .list-right p {
        font-size: 1.2rem;
    }
    .record-list table i {
        display: block;
        width: 4rem;
        height: 4rem;
        margin: 0 auto;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
    }
}
</style >