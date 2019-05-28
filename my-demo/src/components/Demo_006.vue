<template>
  <div class="test">
    <div id="slide-swapper">
      <div class="slide-content1"><img src="../images/sliders/boy.png"/></div>
      <div class="slide-content1"><img src="../images/sliders/female_host.png"/></div>
      <div class="slide-content1"><img src="../images/sliders/girl.png"/></div>
      <div class="slide-content1"><img src="../images/sliders/male_host.png"/></div>
      <div class="slide-content1"><img src="../images/sliders/the_mother_boy.png"/></div>
      <div class="slide-content1"><img src="../images/sliders/the_mother_girl.png"/></div>
      <div class="slide-content1"><img src="../images/sliders/the_father_boy.png"/></div>
      <div class="slide-content1"><img src="../images/sliders/the_father_girl.png"/></div>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';

export default {
  data() {
    return {
      name: 'Test',
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      wx.miniProgram.getEnv((res) => {
        console.log(res.miniprogram); // true
        if (res.miniprogram) {
          // 小程序环境
          wx.miniProgram.navigateTo({
            url: '',
          });
        } else {
          // 非小程序环境
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
  .test
    overflow hidden
    #slide-swapper
      width 750px
      height 400px
      margin-top 200px
      display -webkit-box
      box-sizing border-box
      overflow-x scroll
      overflow-y hidden
      -webkit-overflow-scrolling touch
      -ms-overflow-style none
      overflow -moz-scrollbars-none
      padding-bottom 20px
      margin-bottom -20px
      /*background #01a605*/
      border 1px solid #eee
      .slide-content1
        width 200px
        height 200px
        color #000000
        line-height 200px
        text-align center
        margin-top 100px
        margin-left 20px
        /*background #ff0000*/
        img
          margin-left 20px
    #slide-swapper::-webkit-scrollbar
      background-color transparent
      display none
</style>
