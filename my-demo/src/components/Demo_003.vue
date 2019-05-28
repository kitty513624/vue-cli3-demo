<template>
  <div class="slider">
    <div class="window" @mouseover="stop" @mouseleave="play">
      <ul class="container" :style="containerStyle">
        <li class="slider-li">
          <img class="slider-img" :src="sliders[sliders.length - 1].img"/>
        </li>
        <li class="slider-li" v-for="(item,index) in sliders" :key='index'>
          <img class="slider-img" :src="item.img"/>
        </li>
        <li class="slider-li">
          <img class="slider-img" :src="sliders[0].img"/>
        </li>
      </ul>
      <!--<ul class="direction">-->
        <!--<li class="left" @click="move(750, 1, speed)">-->
          <!--<svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">-->
            <!--<path fill="#ffffff" d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z"  />-->
          <!--</svg>-->
        <!--</li>-->
        <!--<li class="right" @click="move(750, -1, speed)">-->
          <!--<svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">-->
            <!--<path fill="#ffffff" d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"  />-->
          <!--</svg>-->
        <!--</li>-->
      <!--</ul>-->
      <ul class="dots">
        <li v-for="(dot, i) in sliders" :key="i" :class="{dotted: i === (currentIndex - 1)}"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      initialSpeed: {
        type: Number,
        default: 30,
      },
      initialInterval: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        name: "Demo_003",
        sliders: [
          {
            img: "https://cm.xinduncredit.com/mp/images/banner/gzh_banner01.png",
          },
          {
            img: "https://cm.xinduncredit.com/mp/images/banner/gzh_banner02.png",
          },
          {
            img: "https://cm.xinduncredit.com/mp/images/banner/gzh_banner03.png",
          },
          {
            img: "https://cm.xinduncredit.com/mp/images/banner/gzh_banner04.png",
          },
        ],
        currentIndex: 1,
        transitionEnd: true,
        distance: -(window.innerWidth),
        timer: null,
        speed: this.initialSpeed,
      };
    },
    computed: {
      containerStyle() {
        return {
          transform:`translate3d(${this.distance}px, 0, 0)`,
        };
      },
      interval() {
        return this.initialInterval * 1000;
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.play();
        // window.onblur = function () {
        //   this.stop();
        // }.bind(this);
        // window.onfocus = function () {
        //   this.play();
        // }.bind(this);
      },
      stop() {
        // window.clearInterval(this.timer);
        this.timer = null;
      },
      play() {
        if(this.timer) {
          // window.clearInterval(this.timer);
          this.timer = null;
        }
        this.timer = window.setInterval(() => {
          this.move(this.distance, -1, this.speed)
        }, this.interval);
      },
      move(offset, direction, speed) {
        console.log('this');
        if(!this.transitionEnd) return;
        this.transitionEnd = false;
        direction === -1 ? this.currentIndex += offset/this.distance : this.currentIndex -= offset/this.distance;
        if(this.currentIndex > 4) {
          this.currentIndex = 1;
        }
        if(this.currentIndex < 1) {
          this.currentIndex = 4;
        }
        const destination = this.distance + offset * direction;

        this.distance = destination;
        // this.animate(destination, direction, speed);
      },
      animate(des, direc, speed) {
        if (this.temp) {
          window.clearInterval(this.temp)
          this.temp = null
        }
        this.temp = window.setInterval(() => {
          if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
            this.distance += speed * direc;
          } else {
            this.transitionEnd = true;
            window.clearInterval(this.temp);
            this.distance = des;
            if (des < -3000) this.distance = -(this.distance);
            if (des > -(this.distance)) this.distance = -3000;
          }
        }, 20);
      },
      // animate(des, direc, speed) {
      //   if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
      //     this.distance += speed * direc;
      //     window.setTimeout(() => {
      //       this.animate(des, direc, speed);
      //     }, 20)
      //   } else {
      //     this.distance = des;
      //     if (des < -3000) this.distance = -750
      //     if (des > -750) this.distance = -3000
      //   }
      // },
    },
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
    margin:0;
    padding:0;
  }
  ol,ul{
    list-style: none;
  }
  #slider{
    text-align: center;
  }
  .window{
    position:relative;
    width:750px;
    height:560px;
    margin:0 auto;
    overflow:hidden;
  }
  .container{
    /*display:flex;*/
    position:absolute;
    height: 100%;
    overflow: hidden;
  }
  .slider-img{
    width:100%;
    height:560px;
  }
  .left, .right{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    width:50px;
    height:50px;
    background-color:rgba(0,0,0,.3);
    border-radius:50%;
    cursor:pointer;
  }
  .left{
    left:3%;
    padding-left:12px;
    padding-top:10px;
  }
  .right{
    right:3%;
    padding-right:12px;
    padding-top:10px;
  }
  img{
    user-select: none;
  }
  .dots{
    position:absolute;
    bottom:10px;
    left:50%;
    transform:translateX(-50%);
  }
  .dots li{
    display:inline-block;
    width:15px;
    height:15px;
    margin:0 3px;
    border:1px solid white;
    border-radius:50%;
    background-color:#333;
    cursor:pointer;
  }
  .dots .dotted{
    background-color:orange;
  }
</style>
