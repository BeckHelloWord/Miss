<template>
	<div class="moneyItem">
	
		<ul v-for='(k,v) in items'>
			<li>
				<h3><span>{{v | formatDate}}</span></h3>
				<ul>
                    <!-- <li :class="{item.affectMoney>0?'input':'output',item.typeName=='投资'?'award',''}" v-for='item in k'> -->
					<li :class="{'input':item.affectMoney>0?true:false,'output':item.affectMoney<0?true:false,'award':item.typeName=='奖励'?true:false}" v-for='item in k'>
						<div class="clearfix">
							<div>
								<p>{{item.typeName}}</p>							
								<p>{{item.dateCreated}}</p>							
							</div>
							<div>
								{{item.affectMoney>0?'+':'-'}}{{item.affectMoney | formatMoney}}
							</div>
						</div>
					</li>
					
				</ul>
			</li>
			
		</ul>
	</div>	
</template>

<script>

	export default{
		props:['items'],
		mounted(){
            
        }
	}
</script>

<style lang="scss" scoped="" type="text/css">

@import "../../assets/skin";
	  .moneyItem {
        padding:     pxToRem(10*2);
        &>ul {
            li {
                h3 {
                    height:     pxToRem(30*2);
                    display: table-cell;
                    vertical-align: middle;
                    span {
                        display: inline-block;
                        background-color: white;
                        color: $red;
                        padding-left:     pxToRem(20*2);
                        font-weight: normal;
                        position: relative;
                        &::before {
                            content: ' ';
                            display: inline-block;
                            position: absolute;
                            height:     pxToRem(18*2);
                            width:     pxToRem(20*2);
                            left:     pxToRem(-5*2);
                            background: url(../../assets/images/money01.jpg) no-repeat center;
                            background-size:     pxToRem(30*2)     pxToRem(19*2);
                        }
                    }
                }
                ul {
                    li {
                        padding-left:     pxToRem(10*2);
                        &>div {
                            background-color: white;
                            border-bottom:   pxToRem( 1*2) solid #F1F4F9;
                            div {
                                padding:    pxToRem(10*2);
                                &:first-child {
                                    float: left;
                                    line-height:    pxToRem(20*2);
                                    padding-left:    pxToRem(50*2);
                                    p {
                                        &:first-child {
                                            color: black;
                                            font-size:    pxToRem(14*2);
                                        }
                                        &:last-child {
                                            color: #b8b8b8;
                                            font-size:    pxToRem(12*2);
                                        }
                                    }
                                }
                                &:last-child {
                                    float: right;
                                    line-height:    pxToRem(35*2);
                                }
                            }
                        }
                        border-left:  pxToRem( 1*2) dashed #E6E9EC;
                        &.input {
                            &>div {
                                background: white url(../../assets/images/money03.jpg) no-repeat    pxToRem(18*2);
                                background-size:    pxToRem(20*2)    pxToRem(20*2);
                                div:last-child {
                                    color: $red;
                                }
                            }
                        }
                        &.output {
                            &>div {
                                background: white url(../../assets/images/money02.png) no-repeat    pxToRem(18*2);
                                background-size:    pxToRem(20*2)    pxToRem(20*2);
                                div:last-child {
                                    color: #84BB25;
                                    
                                }
                            }
                        }
                        &.award {
                            &>div {
                                background: white url(../../assets/images/money01.png) no-repeat    pxToRem(18*2);
                                background-size:    pxToRem(20*2)    pxToRem(20*2);
                                div:last-child {
                                    color: $red;
                                    
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>