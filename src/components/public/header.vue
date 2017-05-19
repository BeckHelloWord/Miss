<template>
    <section class="top clearfix">
      <div class="logo" v-show="leftIcon" ><router-link to="/index"><img class="logoImg" src="../../assets/images/logo.png"></router-link></div>
      <div v-show="!leftIcon" class="icon-caretLeft" @click="leftFun"></div>
      <div v-show="!leftIcon" class="main-title">{{title}}</div>
      <template v-if="rightIcon">
        <div class="right-icon" v-show='rightIcon' @click="rightFun" v-html='rightIcon'></div>
      </template>
      <template v-else>
        <div class="right-icon" v-show='!isLogin'><router-link to="/index/login">登&nbsp;录</router-link></div>
        <div class="right-icon " v-show='isLogin'><router-link to="/home/index"><img class="loginImg" src="../../assets/images/login.jpg"></router-link></div>
      </template>    
    </section>
</template>

<script>
export default {
 props: ['title',"leftIcon","rightIcon"],
  data () {
    return {
      isLogin:false
    }
  },
  watch:{
    $route:function(){
      if(Public.Auth.get()){
        this.isLogin=true
      }else{
        this.isLogin=false
      }
    }
  },
   methods:{
		leftFun(){},
		rightFun(){}
  },
  beforeCreate:function(){
    window.Hub.$on('setHeader', (leftFun,rightFun) => { 
      if(typeof(leftFun)=="function"){
        this.leftFun=leftFun
      }
      if(typeof(rightFun)=="function"){
        this.rightFun=rightFun
      }
    });
  },
  mounted:function(){
    
  }
}
</script>