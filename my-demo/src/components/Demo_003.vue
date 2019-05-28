<template>
  <!--@touchstart="touchstart"-->
  <!--@touchmove="touchmove"-->
  <div class="slide-show"
       @mouseover="clearInv"
       @mouseout="runInv">
    <div class="slide-img"
         id="slider"
         @touchstart="touchstart"
         @touchmove="touchmove"
         @touchend="touchend"
    >
      <!--<a v-if="slides.length !== 0" :href="slides[nowIndex].picHref">-->
      <a v-if="slides.length !== 0" >
        <transition name="slide-trans">
          <img @click="clickPic" v-if="isShow" :src="slides[nowIndex].pic"/>
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].pic"/>
        </transition>
      </a>
    </div>
    <!--<h2>{{slides[nowIndex].title}}</h2>-->
    <!--<h2></h2>-->
    <ul class="slide-pages">
      <!--<li @click="goto(prevIndex)">&lt;</li>-->
      <li v-for="(item,index) in slides.length" @click="gotoInstant(index)" :key=index>
        <!--<a :class="{'on':index===nowIndex}">{{index+1}}</a>-->
        <a :class="{'on':index===nowIndex}"></a>
      </li>
      <!--<li @click="goto(nextIndex)">&gt;</li>-->
    </ul>
  </div>
</template>

<script>
// import {activityInfo} from '../api/report';
import pic1 from '../images/slideShow/banner_01.png';
import pic2 from '../images/slideShow/banner_02.png';
import pic3 from '../images/slideShow/banner_03.png';
import pic4 from '../images/slideShow/banner_04.png';
import pic5 from '../images/slideShow/banner_05.png';
import pic6 from '../images/slideShow/banner_06.png';

export default {
  props: {
    // slides: {
    //   type: Array,
    //   required: true,
    // },
    inv: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      name: 'SlideShow',
      nowIndex: 0,
      isShow: true,
      slides: [],
      touch: {
        startX: 0,
        startY: 0,
      },
      startPointX: 0,
      changePointX: 0,
      showIndex: 0,
    };
  },
  computed: {
    prevIndex() {
      if (this.nowIndex === 0) {
        return this.slides.length - 1;
      }
      return this.nowIndex - 1;
    },
    nextIndex() {
      if (this.nowIndex === this.slides.length - 1) {
        return 0;
      }
      return this.nowIndex + 1;
    },
  },
  mounted() {
    console.log(this.slides);
    this.runInv();
    this.activityInfo();
  },
  created() {
    this.activityInfo();
  },
  methods: {
    show(index) {
      this.changePointX = this.startPointX;
      const slider = document.getElementById('slider');
      slider.style.marginLeft = `-${686 * index}px`;
    },
    touchstart(e) {
      const touch = e.changedTouches[0];
      this.startPointX = touch.pageX;
    },
    touchmove(e) {
      console.log('move');
      if (this.startPointX === this.changePointX) {
        return;
      }
      const currPointX = e.changedTouches[0].pageX;
      const leftSlide = this.startPointX - currPointX;
      if (leftSlide > 10 && this.nowIndex < this.slides.length - 1) {
        this.show(this.nowIndex += 1);
        // this.show(this.nextIndex);
        // this.nowIndex = this.nowIndex - 1;
      } else if (leftSlide < -10 && this.nowIndex > 0) {
        this.show(this.nowIndex -= 1);
        // this.show(this.prevIndex);
        // this.nowIndex = this.nowIndex + 1;
      }
    },
    touchend() {},
    goto(index) {
      this.isShow = false;
      setTimeout(() => {
        this.isShow = true;
        this.nowIndex = index;
        this.$emit('onChange', index);
      }, 800);
    },
    gotoInstant(index) {
      // this.isShow = false;
      // setTimeout(() => {
      //   this.isShow = true;
      this.nowIndex = index;
      //   this.$emit('onChange', index);
      // }, 800);
      this.runInv();
    },
    runInv() {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex);
      }, this.inv);
    },
    clearInv() {
      clearInterval(this.invId);
    },
    activityInfo() {
      // activityInfo().then((response) => {
      //   if (response && response.data) {
      //     for (let i = 0; i < response.data.images.length; i += 1) {
      //       const slide = {
      //         pic: '',
      //         picHref: '',
      //       };
      //       // eslint-disable-next-line
      //       slide.pic = Object.keys(response.data.images[i])[0];
      //       // eslint-disable-next-line
      //       slide.picHref = Object.values(response.data.images[i])[0];
      //       // this.slides.push(slide);
      //       this.$set(this.slides, i, slide);
      //     }
      //     // this.slideWords = response.data.usersInfo;
      //     // this.userVisits = response.data.userCount;
      //     console.log(`response.data.images: ${response.data.images}`);
      //     console.log(`response.data.images: ${JSON.stringify(this.slides)}`);
      //   }
      // });
      this.slides = [
        {
          pic: pic1,
          picHref: '',
        },
        {
          pic: pic2,
          picHref: '',
        },
        {
          pic: pic3,
          picHref: '',
        },
        {
          pic: pic4,
          picHref: '',
        },
        {
          pic: pic5,
          picHref: '',
        },
        {
          pic: pic6,
          picHref: '',
        },
      ];
    },
    clickPic() {
      // eslint-disable-next-line
        _hmt.push(['_trackEvent', 'click', 'click', `点击轮播图${this.nowIndex}`, 10]);
    },
  },
};
</script>

<style scoped lang="stylus">
  @import "../common/stylus/mixin.styl"

  img
    position absolute
    left 0
    top 0
    wh(686px, 116px)
  .slide-trans-enter-active
    transition all .8s
  .slide-trans-enter
    transform translateX(666px)
  .slide-trans-old-leave-active
    transition all .8s
    transform translateX(-686px)
  .slide-show
    position relative
    wh(686px, 160px)
    margin 0 auto
    margin-top 50px
    overflow hidden
    .slide-img
      wh(686px, 116px)
    h2
      position absolute
      wh(100%, 100%)
      line-height 100%
      color #fff
      background #000
      opacity .5
      bottom 0
      height 50px
    /*text-align left*/
    /*padding-left 15px*/
    .slide-pages
      /*position absolute*/
      /*bottom 7px*/
      /*left 295px*/
      margin-top 16px
      li
        display inline-block
        padding 0
        margin 0
        a
          margin 0
          padding 0
          display inline-block
          wh(14px, 14px)
          border 1px solid #DEDEDE
          background #DEDEDE
          border-radius 50%
          margin-right 14px
        a.on
          /*text-decoration underline*/
          display inline-block
          padding 0
          margin 0
          wh(14px, 14px)
          border 1px solid #FB9A2D
          border-radius 50%
          background #FB9A2D
          margin-right 14px
</style>
