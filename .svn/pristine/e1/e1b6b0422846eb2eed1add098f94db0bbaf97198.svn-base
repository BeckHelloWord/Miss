<template>
  <div class="myFooter" v-show='showFlag'>
    <ul>
      <router-link to="/index/index"><li><i class="iconfont icon-index"></i>&ensp;&ensp;首页</li></router-link>
      <router-link to="/invest"><li><i class="iconfont icon-invest"></i>&ensp;&ensp;投资</li></router-link>
      <router-link to="/home/index"><li><i class="iconfont icon-home"></i>&ensp;&ensp;我的</li></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showFlag: false
    }
  },
  beforeCreate:function(){
    //footer事件
    window.Hub.$on('setFooter', (flag) => { 
      this.showFlag = flag
    });
  }
}
</script>



 