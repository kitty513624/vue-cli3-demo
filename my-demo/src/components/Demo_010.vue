<template>
  <div class="process-line-swapper">
    <div class="color-progress-percentage-content">
      <div class="color-progress-percentage">
        <div class="processLine"
             :style="{width: `${width}%`, transition: 'width 1.5s ease-out'}">
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
          <div class="road"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'Demo_009',
        width: 0,
      };
    },
    created() {
      setTimeout(() => {
        this.width = 90;
      });
    },
  };
</script>

<style scoped lang="stylus">
  @import '../common/stylus/mixin.styl'
  @import '../common/stylus/variable.styl'
  vendors = official
  @keyframes loader {
    0% {
      transform rotate(30deg) translateY(-30px) translateX(0px);
    }
    50% {

    }
    100% {
      transform rotate(30deg) translateY(-30px) translateX(32px);
    }
  }
  .process-line-swapper
    .color-progress-percentage-content
      wh(622px, 64px)
      background rgba(255, 250, 243, 1)
      box-shadow inset 0px 0px 8px 0px rgba(255, 179, 148, 1)
      border-radius 32px
      margin 42px 32px 0px 32px
      .color-progress-percentage
        margin 16px 16px 0 16px
        wh(580px, 32px)
        background #E0E0E3
        border-radius 16px
        position relative
        top 16px
        .processLine
          width 0px
          height 100%
          background-color transparent
          background -webkit-linear-gradient(left,
          #46F1A7 0,
          #F6A704 50%,
          #FF2301 100%)
          background-repeat no-repeat
          border-radius 16px
          position relative
          .road
            display inline-block
            wh(15px, 60px)
            margin-right 20px
            background rgba(255, 255, 255, 0.1)
            animation loader 600ms linear infinite
            float left
        .processLine:after
          content ''
          background url("../images/processLine/color_state_hight.png") no-repeat
          background-size 48px 48px
          position absolute
          right -10px
          top -12px
          wh(48px, 48px)
</style>
