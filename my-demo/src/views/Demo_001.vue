<template>
  <div>
    <h1>Demo_001</h1>
    <h2>文字无缝滚动 -- css动画</h2>
    <div class="text-container">
      <div class="inner-container">
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <p class="text" v-for="(text,index) in arr" :key=index>{{text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    props: [],
    data() {
      return {
        name: 'Demo_001',
        totalDuration: 2000,
        arr: [
          '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
          '2 现在雅阁这个状态像极了新A4L上市那段日子。',
          '3 低配太寒碜，各种需要加装，中配定价过高，又没啥特色',
          '4 然后各种机油门、经销商造反什么的幺蛾子。',
          '5 看五月销量，建议参考A4，打8折吧。',
          '1 不是被郭德纲发现的，也不是一开始就收为徒弟。',
        ],
        number: 0,
      };
    },
    computed: {
      text() {
        return {
          id: this.number,
          val: this.arr[this.number],
        };
      }
    },
    mounted() {
      this.startMove();
    },
    methods: {
      startMove() {
        let timer = setTimeout(() => {
          if (this.number === 5) {
            this.number = 0;
          } else {
            this.number += 1;
          }
          this.startMove();
        }, this.totalDuration);
      },
    },
  };
</script>
<style>
  /*文字无缝滚动*/
  @keyframes myMove {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-150px);
    }
  }
</style>
<style scoped lang="stylus">
  h2
    margin-top 20px 0

  .text-container
    width 100%
    height 30px
    line-height 30px
    margin 20px auto
    border 1px solid cornflowerblue
    overflow hidden
    .inner-container
      animation myMove 5s linear infinite
      animation-fill-mode forwards
      .text
        margin 0
        font-size 28px
</style>
