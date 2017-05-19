<template>
	<div class="record">
		<div class="header">
			
			<div class="content">
				<p>投资金额(元)</p>
				<p>{{this.waitingReceiptCapital | formatMoney}}</p>
				<p>待回收益(元)</p>
				<p>{{this.waitingReceiptIncome | formatMoney}}</p>
			</div>
		</div>
		<div class="tab">
			<ul class="clearfix" id="nav">
				<li><router-link to='/home/record/process' replace>募集中</router-link></li>
				<li><router-link to='/home/record/success' replace>待回款</router-link></li>
				<li><router-link to='/home/record/done' replace>已回款</router-link></li>
			</ul>
			
			
			
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	export default{
		data:function(){
			return {
				waitingReceiptCapital:0, //投资金额
     			waitingReceiptIncome:0 //待回收益(含逾期费用)
			}
		},
		methods:{
			navTop(){
				window.onscroll = (function(event) {
					/* Act on the event */
					// var top = $('body').scrollTop()
					var nav = document.getElementById('nav')
					if($('body').scrollTop()>160){
						// $('#nav')
						document.body.appendChild($(nav).addClass('recordNav')[0])
					}else{
						$('#nav').removeClass('recordNav').insertBefore('.returning')
					}
				});
			},
			back:function(){
				history.back();
			},
			initData:function(){
				Public.API_GET({
					url : 'investMine',
					data:{
						
					},
					success : (result) => {
						// console.log(result)
						this.waitingReceiptCapital=result.data.waitingReceiptCapital;
						this.waitingReceiptIncome=result.data.waitingReceiptIncome;
					}
				});
			}
		},
		mounted:function(){
			window.Hub.$emit('refresh', null);
			window.Hub.$emit('setTitle', "投资记录", false, null, ' ', null)
			window.Hub.$emit('setFooter',false);
			this.initData();

			// 导航浮动
			this.navTop();
			// console.log($('ul#nav').clone(true)[0])
			// 
			// var nav = $('ul#nav').clone(true).addClass('recordNav display')
			// document.body.appendChild(nav[0])
		},
		destroyed(){
			window.onscroll = null;
		}

	}
</script>
<style lang="scss"  type="text/css">

	/*投资记录*/

@import "../../../assets/skin";
		.recordNav{
			
		    top: 100px;
		    z-index: 100;
		    
		}
		.display{
			display:none;
		}
		ul#nav {
			margin-top:-50px;
		  	position:fixed;
		  	width:100%;
            list-style: none;
            background-color: white;
            margin-bottom:   pxToRem(  10*2);
            li {
                float: left;
                width: 33.33%;
                text-align: center;
                line-height:   pxToRem(  40*2);
                a {
                    display: inline-block;
                    width: 100%;
                    font-size:   pxToRem(  16*2);
                    &.router-link-active {
                        color: $red;
                        border-bottom:     2px solid $navBorderBottom;
                    }
                }
            }
        }
		
.record {
    .header {
        height:   160px;
        background-color: $red;
        color: white;

        .content {
            text-align: center;
            p {
                &:nth-child(1){

                }
                &:nth-child(2) {
                    font-size:  pxToRem(  34*2);
                    padding-bottom:  pxToRem(  12*2);
                }
                &:nth-child(3) {
                    font-size:  pxToRem(  16*2);
                    line-height:  pxToRem(  20*2);
                }
                &:nth-child(4) {
                    font-size:  pxToRem(  20*2);
                    line-height:  pxToRem(  30*2);
                }
            }
        }
    }

    .tab{
    	padding-top:50px;
    }

  

 
        
        
    
}
</style>