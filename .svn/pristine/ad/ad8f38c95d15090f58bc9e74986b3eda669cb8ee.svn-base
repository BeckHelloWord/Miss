<!-- 待回款 -->
<template>
	<div class="returnedDetail">
		<ul>
			<li v-for='(item,k) in receiptWaitList'>

				<div>
					<p class="clearfix">
						<span>{{item.period}}</span><span>单位：元</span>
					</p>
				</div>
				<div>
					<div @click='open(k)'>
						<p>
							<span>{{item.deadline}}</span>
							<span>
								{{item.alreadyAllAmount ? item.alreadyAllAmount : item.shouldAllAmount | formatMoney}}
								<i :class="{'more':bool[k]}"></i>
							</span>
							</p>
						<p>
							<span>{{this.status?"待回":"已回"}}</span>
							<span>利息 +{{item.alreadyInterest ? item.alreadyInterest : item.shouldInterest | formatMoney}}</span>
						</p>
						<p v-show='bool[k]' class="clearfix">
							<span></span>
							<span>本金 +{{item.alreadyCapital ? item.alreadyCapital : item.shouldCapital | formatMoney}}</span>
						</p>
					</div>
				</div>	
			</li>

			
		</ul>
		<empty v-show='!receiptWaitList.length' :showImg='true' :padding='"120px"'></empty>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	import empty from '../../public/empty'
	export default{
		components:{
			empty,
		},
		data:function(){
			return {
				receiptWaitList:[],
				bool:[],
				
				offset:0,
				max:10,
				
				// 判断 待会款还是已回款
				status:null
			}
		},
		methods:{
			open:function(k){
				if(this.bool[k]){
					this.toFalse();
				}else{
					this.toFalse();
					this.bool.splice(k,1,true)
				}
			},
			toFalse:function(){
				this.receiptWaitList.forEach(i=>{
					this.bool=[]
					this.bool.push(false)
				})
			},
			more:function(){
				this.bool=!this.bool;
				this.rotate=this.rotate.length==0?['more']:[];
			},
			initData(){
				// console.log(this.$route.params.id)
				Public.API_GET({
					url : this.status?'receiptWaitList':'receiptDoneList',
					// url : 'receiptDoneList',
					data:{
						investId :1208
					},
					success:(result) => {
						
						if(!result.data.length){
							MessageBox('提示', '暂无数据');
						}
						// console.log(1,result)

						this.receiptWaitList = result.data
						

					}
				})
			}
		},

		mounted:function(){
			// console.log(this.$route.params.status)
			this.status = this.$route.params.status=='success'?true:false;

			window.Hub.$emit('setTitle', this.status?"待回款":"已回款", false, null,' ', null)

			this.initData();
			
		}
	}
</script>

<style lang="scss"  type="text/css">
@import "../../../assets/skin";


	// .mint-msgbox-message{
	// 	color:black;
	// 	line-height:pxToRem(22*2);
	// }
	// .mint-msgbox{
	// 	border-radius:pxToRem(20*2) !important;
	// }

/*待回款详情*/

.returnedDetail {
    ul {
        padding: 0  pxToRem( 10*2)  pxToRem( 10*2)  pxToRem( 10*2);
        color: black;
        li >div{
            
            border-left: pxToRem(  1*2) dashed #DBDBDB;
            padding-left:   pxToRem( 10*2);
            &:nth-child(2n+1) {
                padding-top:   pxToRem( 10*2);
                padding-bottom:   pxToRem( 10*2);
                span:first-child {
                    display: inline-block;
                    width:   pxToRem( 70*2);
                    text-align: center;
                    line-height:   pxToRem( 20*2);
                    background-color: white;
                    color: $red;
                    position: relative;
                    &::before {
                        content: ' ';
                        display: inline-block;
                        width:   pxToRem( 30*2);
                        height:   pxToRem( 20*2);
                        top: pxToRem(  0*2);
                        left:   pxToRem(-23*2);
                        position: absolute;
                        background: url(../../../assets/images/returnedDetail.png);
                        background-size: cover;
                    }
                }
                span:last-child {
                    float: right;
                    padding-right:   pxToRem( 10*2);
                }
            }
            &:nth-child(2) {
                div {
                    background-color: white;
                    padding:   pxToRem( 10*2);
                    padding-right:   pxToRem( 30*2);
                }
            }
            p {
                font-size:   pxToRem( 14*2);
                span:last-child {
                    float: right;
                    position: relative;
                    i {
                        display: inline-block;
                        width:  pxToRem(  0*2);
                        height:  pxToRem(  0*2);
                        border-bottom: pxToRem(  5*2) solid $red;
                        border-top: pxToRem(  5*2) solid transparent;
                        border-left: pxToRem(  5*2) solid transparent;
                        border-right: pxToRem(  5*2) solid transparent;
                        position: absolute;
                        top: pxToRem(  0*2);
                        right:   pxToRem(-18*2);
                        // transition: all 1s;
                        transform-origin: center bottom;
                        &.more {
                            transform: rotateZ(180deg);
                        }
                    }
                }
                &:nth-child(2) {
                    span:first-child {
                        color: #aaa;
                    }
                }
            }
        }
    }
}
</style>