<template>
	<div class="index">		

		<banner :banner='bannerList' :height='"150px"'></banner>


		<div class="notice">
			
			<ul>
				 <!-- <transition name="fold"> -->
    				<!-- <p v-show="show">hello</p> -->
				<li v-for='item in noticeList'>
					<!-- <a href="" v-html='item.itemContent'></a> -->
					<router-link :to='{name:"notice",params:{id:item.itemId}}' v-html='item.itemContent'></router-link>
				</li>
				 <!-- </transition> -->
			</ul>
		</div>

		<div class="recommend">
			<ul class="clearfix">
				<li>
					<router-link to='/index/guide'>
						<b>新手</b>
						快速上手
					</router-link>
				</li>
				<li>
					<router-link to='/index/guarantee'>
						<b>安全保障</b>
						保驾护航
					</router-link>
				</li>
			</ul>
		</div>
	
		<div class="investList">
			<ul>
				<template v-for="item in investList">
					<investItem :item='item'></investItem>
				</template>
			</ul>
		</div>
		
	</div>
</template>

<script>
	import banner from '../public/banner'
	import investItem from '../public/investItem'
	import { Swipe, SwipeItem } from 'mint-ui';

	export default {
		components:{
			banner,
			investItem,
			Swipe,
			SwipeItem
		},
		data: function() {
			return {
				bannerList:[],
				noticeList:[],
				investList:[],


				currentCount:0,
				interval:null,
				timeout:null
			}
		},
		methods: {
			initData() {
				Public.API_GET({
					url : 'homePage',
					data:{
						distributionChannel:'xnjf',
					},
					success : (result) => {
						// console.log(result)
						

						this.bannerList=result.data.indexList;

						this.noticeList = result.data.noticeList;

						this.investList=result.data.borrowList;

						

						this.timeout = setTimeout(()=>{
							
							this.swipeNotice();
						},2000)
						
						
					}
				});
			},
			//transition
			//公告轮播
			swipeNotice(){

				var count = this.noticeList.length;
				if(count <=1){
					return false;
				}
				this.interval =	setInterval(()=>{			
					if(!$('.notice ul')[0]){
						// console.log(1)
						clearInterval(this.interval)
						return false;
					}
					this.currentCount++;

					$('.notice ul')[0].style.transition = 'all 1s';
					$('.notice ul')[0].style.transform = 'translateY('+(-this.currentCount*100/count)+'%)'

					if(this.currentCount==2){
						this.currentCount=0;
						$('.notice ul')[0].style.transition = 'none';
						$('.notice ul')[0].style.transform = 'translateY('+(-this.currentCount*100/count)+'%)'

						var li = $('.notice ul li:eq(0)')
						$('.notice ul').append(li)
					}
				},2000)
			}
		},
		mounted: function() {
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "想念金服", true, null, false, null)
			window.Hub.$emit('setFooter',true);
			this.initData();
			
		},
		destroyed:function(){
			// console.log('清除')
			clearTimeout(this.timeout)
			clearInterval(this.interval)
			
		}
		
    

	}
</script>

<style lang="scss" scoped="" type="text/css">
@import "../../assets/skin";


/*首页*/

.index {
	
    .notice {
        height:    pxToRem(  31*2);
        line-height:    pxToRem(  31*2);
        overflow:hidden;
        font-size:    pxToRem(  14*2);
        background-color: white;
        padding: 0    pxToRem(  14*2);
        ul {
            max-width: 92%;
            list-style: none;
            transition:all 1s;

            
            li{
              padding-left:    pxToRem(  30*2);
              background: url(../../assets/images/speaker.png) no-repeat   pxToRem(   0*2) center;
              background-size: 5%;
              a{
                color: $red;
              }
            }

        }
    }
    .recommend {
        margin:    pxToRem(  14*2) 0;
        background-color: white;
        ul {
            list-style: none;
            padding:    pxToRem(  14*2);
            li {
                float: left;
                width: 50%;
                color: #666;
                box-sizing: border-box;
                &:nth-child(1) {
                    padding-right: 4%;
                    &>a::after {
                        content: ' ';
                        display: block;
                        width:    pxToRem(  36*2);
                        height:    pxToRem(  36*2);
                        position: absolute;
                        top: 0;
                        right: 0;
                        background: url(../../assets/images/guide.png) no-repeat;
                        background-size: 100%;
                    }
                }
                &:nth-child(2) {
                    padding-left: 4%;
                    border-left:   pxToRem(   1*2) solid #dedede;
                    &>a::after {
                        content: ' ';
                        display: block;
                        width:    pxToRem(  36*2);
                        height:    pxToRem(  36*2);
                        position: absolute;
                        top: 0;
                        right: 0;
                        background: url(../../assets/images/safe.png) no-repeat;
                        background-size: 100%;
                    }
                }
                a {
                    display: block;
                    width: 100%;
                    font-size:    pxToRem(  12*2);
                    position: relative;
                    b {
                        color: #000;
                        display: block;
                        font-size:    pxToRem(  16*2);
                        font-weight: normal;
                    }
                }
            }
        }
    }
}

</style>