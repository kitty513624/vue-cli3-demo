<template>
  <div>
    <!--<SlidePic></SlidePic>-->
    <DemoEcharts1></DemoEcharts1>
    <!--<DemoEcharts></DemoEcharts>-->
  </div>
</template>

<script>
// import SlidePic from '../components/Demo_003.vue';
import DemoEcharts1 from '../components/Demo_004.vue';
// import DemoEcharts from '../components/Demo_005.vue';

export default {
  data() {
    return {
      name: 'Demo',
      isShowDemo_005: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.isShowDemo_005 = true;
    },
  },
  components: {
    // SlidePic,
    DemoEcharts1,
    // DemoEcharts,
  },
};
</script>

<style scoped lang="stylus">

</style>
