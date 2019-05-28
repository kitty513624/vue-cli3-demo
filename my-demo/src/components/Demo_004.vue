<template>
    <div class="my-chart-wrapper" v-if="pageType === '2'">
      <div id="myChat"></div>
    </div>
</template>

<script>
const echarts = require('echarts/lib/echarts');
// require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/markPoint');
require('echarts/lib/component/title');
require('echarts/lib/component/axisPointer');
require('echarts/lib/component/visualMap');

export default {
  data() {
    return {
      name: 'Demo_004',
      dataArr: [],
      dataArrMax: 0,
      dataArrMin: 0,
      pageType: '2',
      info: {
        age: 28,
      },
    };
  },
  created() {
    this.init();
  },
  mounted() {
    if (this.pageType === '2') {
      this.drawLineInit();
    }
  },
  methods: {
    init() {
      this.dataArr = [23, 17, 23, 24, 24, 26, 25];
      this.dataArrMax = Math.max.apply(null, this.dataArr);
      this.dataArrMin = Math.min.apply(null, this.dataArr);
      // this.drawLineInit();
    },
    drawLineInit() {
      const that = this;
      this.myChat = echarts.init(document.getElementById('myChat'));
      this.myChat.setOption({
        // title: { text: '在Vue中使用echats' },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            axis: 'auto',
            lineStyle: {
              color: '#F78600',
              z: 0,
              symbolSize: 2,
            },
            label: {
              show: true,
              color: '#F78600',
              backgroundColor: '#FFFFFF',
              formatter() {
                return '';
              },
            },
          },
          borderColor: '#FFFFFF',
          formatter(params) {
            return `<div style="font-size: 12px">${params[0].seriesName} ${params[0].value}%<div/>`;
          },
          backgroundColor: '#F78600',
          showContent: true,
        },
        legend: {
          data: ['平均温度'],
        },
        grid: {
          top: 35,
          // x: 0,
          x2: 30,
          y2: 10,
        },
        calculable: true, // 提示框消失
        xAxis: {
          position: 'top',
          type: 'category',
          data: ['-5岁', `${this.info.age}岁`, '+5岁', '+10岁', '+15岁', '+20岁', '+25岁'],
          axisPointer: {
            type: 'line',
            snap: false,
            label: {
              color: '#F78600',
              backgroundColor: '#FFFFFF',
              shadowColor: '#FFFFFF',
              formatter(params) {
                return `${params.value}`;
              },
            },
            lineStyle: {
              type: 'solid',
            },
            triggerTooltip: true,
          },
          backgroundColor: '#F78600',
          boundaryGap: false,
          gridIndex: 0,
          // 坐标轴刻度标签的相关设置
          axisLabel: {
            color: '#9EA0AA',
            fontSize: 10,
            interval: 'auto',
          },
          // 坐标轴轴线相关设置
          axisLine: {
            show: false,
          },
          // 刻度线
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          // 网格线
          splitLine: {
            show: true,
            lineStyle: {
              // width: 1,
              type: 'dotted',
              color: '#EEEEEE',
            },
          },
        },
        yAxis: [
          {
            show: false, // 是否显示Y轴
            scale: true, // 只在数值轴中有效
            // position: 'right', // 坐标轴显示的位置
            type: 'value',
            name: '温度',
            min: that.dataArrMin - 10,
            max: that.dataArrMax + 10,
            interval: 1,
            axisLabel: {
              formatter: '{value}%',
            },
          },
        ],
        series: [
          {
            name: '现在',
            type: 'line',
            stack: '总量',
            smooth: true, // 曲线平滑true
            // symbol: 'circle',
            symbolSize: 4,
            // symbolOffset: [0, '50%'],
            showSymbol: false,
            hoverAnimation: false,
            z: 20,
            // color: ['#F78600'],
            markPoint: {
              z: 1000,
              symbol: 'path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z',
              showSymbol: true,
              itemStyle: {
                color: '#939393',
                opacity: 0.5,
                width: 74,
                height: 32.4,
                borderRadius: 50,
                z: 1000,
              },
              symbolSize: [25, 20], // 容器大小
              symbolOffset: [0, -10], // 位置偏移
              label: {
                position: 'insideTop',
                distance: 4,
                offset: [0, -2],
                color: '#ffffff',
                fontSize: 10,
                textBorderRadius: 10,
                formatter(params) {
                  return `${params.value}%`;
                },
              },
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  // 渐变色实现
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    // 变化度
                    // 三种由深及浅的颜色
                    [{
                      offset: 0,
                      color: '#FFE8BF',
                    },
                    //   {
                    //   offset: 0.5,
                    //   color: '#FFFFFF',
                    // },
                    {
                      offset: 1,
                      color: '#FFFFFF',
                    }]),
                },
                lineStyle: { // 线的颜色
                  width: 1,
                  type: 'solid',
                  color: '#F78600',
                },
                label: {
                  show: false,
                  position: 'top',
                  textStyle: {
                    color: '#F78600',
                  },
                },
                color: '#FFFFFF',
                borderColor: '#F78600',
                borderWidth: 1,
              },
            },
            areaStyle: {
            },
            data: that.dataArr,
          },
        ],
      });
      window.addEventListener('resize', this.myChat.resize);
      this.myChat.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: 1,
        z: 0,
      });
    },
  },
};
</script>

<style scoped lang="stylus">
  @import '../common/stylus/mixin.styl'
  .my-chart-wrapper
    #myChat
      wh(686px, 400px)
      padding 0
      margin 0
</style>
