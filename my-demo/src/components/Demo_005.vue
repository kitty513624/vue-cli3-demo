<template>
  <div class="my-chart-wrapper" v-if="pageType === '2'">
    <div id="myChat"></div>
  </div>
</template>

<script>
// import { getSingleReportResult } from '../api/insurance';

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
      name: 'Demo_005',
      dataArr: [],
      dataArrMax: 0,
      dataArrMin: 0,
      pageType: '2',
      reportType: 2,
      resultId: '2019052310304137425',
      serialNo: 'f1c26ef562d72a881e4c03ca419ff2f9',
      info: {
        age: 28,
      },
    };
  },
  created() {
    console.log('created start');
    this.init();
    // this.drawLine();
    console.log('created end');
  },
  mounted() {
    console.log('mounted start');
    if (this.pageType === '2') {
      this.drawLine();
    }
    console.log('mounted end');
  },
  methods: {
    init() {
      // getSingleReportResult({
      //   reportType: this.reportType,
      //   resultId: this.resultId,
      //   serialNo: this.serialNo,
      // }).then((response) => {
      //   console.log(`response: ${response.data}`);
      //   console.log(`response: ${JSON.stringify(response.data)}`);
      // }).catch(() => {
      //   this.dataArr = [23, 17, 23, 24, 24, 26, 25];
      //   // this.drawLine();
      // });
      this.dataArr = [23, 17, 23, 24, 24, 26, 25];
      this.dataArrMax = Math.max.apply(null, this.dataArr);
      this.dataArrMin = Math.min.apply(null, this.dataArr);
      // this.drawLine();
    },
    drawLine() {
      const that = this;
      this.myChat = echarts.init(document.getElementById('myChat'));
      const option = {
        tooltip: {
          show: true,
          trigger: 'axis',
          extraCssText: 'width:60px;min-height:10px;text-align:left',
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
            if (params[0].seriesName && params[0].value) {
              return `<div style="font-size: 12px">${params[0].seriesName} ${params[0].value}%<div/>`;
            }
            return '<div style="font-size: 12px">因50岁以上</br>可购买产品</br>骤减，本段</br>不具参考性<div/>';
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
            // scale: true, // 只在数值轴中有效
            // position: 'right', // 坐标轴显示的位置
            type: 'value',
            name: '百分比',
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
            stack: '保险需求度50岁以前',
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
                // {type: 'max', name: '最大值'},
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
              },
            },
            // areaStyle: {},
            // color: {
            //   type: 'linear',
            //   x: 0,
            //   y: 0,
            //   x2: 0,
            //   y2: 1,
            //   colorStops: [{
            //     offset: 0,
            //     color: '#FFE8BF',
            //   },{
            //     offset: 1,
            //     color: '#FFFFFF',
            //   }],
            //   global: false,
            // },
            data: [],
          },
          {
            name: '现在',
            type: 'line',
            stack: '保险需求度50岁以后',
            smooth: true, // 曲线平滑true
            // symbol: 'circle',
            symbolSize: 4,
            // symbolOffset: [0, '50%'],
            showSymbol: false,
            hoverAnimation: false,
            // z: 20,
            // color: ['#F78600'],
            markPoint: {
              // z: 1000,
              symbol: 'path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z',
              showSymbol: true,
              itemStyle: {
                color: '#939393',
                opacity: 0.5,
                width: 74,
                height: 32.4,
                borderRadius: 50,
                // z: 1000,
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
                // {type: 'max', name: '最大值'},
                // {type: 'min', name: '最小值'},
              ],
            },
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  // 渐变色实现
                  color: '#eeeeee',
                },
                lineStyle: { // 线的颜色
                  width: 1,
                  type: 'solid',
                  color: '#eeeeee',
                },
              },
            },
            // color: ['#eeeeee'],
            // areaStyle: {},
            data: [],
          },
        ],
      };
      if (this.info.age <= 25) {
        option.series[0].data = this.dataArr;
        option.series[1].data = [null, null, null, null, null, null, null];
      } if (this.info.age >= 50 && this.info.age - 5 < 50) {
        option.series[0].data.push(this.dataArr[0]);
        option.series[0].data.push(this.dataArr[1]);
        option.series[0].data.push(null);
        option.series[0].data.push(null);
        option.series[0].data.push(null);
        option.series[0].data.push(null);
        option.series[0].data.push(null);
        option.series[1].data.push(null);
        option.series[1].data.push(this.dataArr[1]);
        option.series[1].data.push(this.dataArr[2]);
        option.series[1].data.push(this.dataArr[3]);
        option.series[1].data.push(this.dataArr[4]);
        option.series[1].data.push(this.dataArr[5]);
        option.series[1].data.push(this.dataArr[6]);
      } if (this.info.age >= 50 && this.info.age - 5 >= 50) {
        option.series[0].data.push(null);
        option.series[0].data.push(null);
        option.series[0].data.push(null);
        option.series[0].data.push(null);
        option.series[0].data.push(null);
        option.series[0].data.push(null);
        option.series[0].data.push(null);
        option.series[1].data.push(this.dataArr[0]);
        option.series[1].data.push(this.dataArr[1]);
        option.series[1].data.push(this.dataArr[2]);
        option.series[1].data.push(this.dataArr[3]);
        option.series[1].data.push(this.dataArr[4]);
        option.series[1].data.push(this.dataArr[5]);
        option.series[1].data.push(this.dataArr[6]);
        option.tooltip.formatter = function reFormatter() {
          return '<div style="font-size: 12px">因50岁以上</br>可购买产品</br>骤减，本段</br>不具参考性<div/>';
        };
      } else if (this.info.age > 25 && this.info.age < 50) {
        for (let i = 0; i < parseInt((50 - this.info.age) / 5, 10) + 2; i += 1) {
          option.series[0].data.push(this.dataArr[i]);
          option.series[1].data.push(null);
        }
        console.log(`option.series[0].data 111: ${option.series[0].data}`);
        console.log(`option.series[1].data 111: ${option.series[1].data}`);
        console.log(7 - option.series[0].data.length);
        const leng = 7 - option.series[0].data.length;
        for (let j = 0; j < leng; j += 1) {
          option.series[0].data.push(null);
        }
        console.log(option.series[0].data);
        option.series[1].data.pop();
        console.log(parseInt((50 - this.info.age) / 5, 10));
        for (let i = parseInt((50 - this.info.age) / 5, 10) + 1;
          i < this.dataArr.length; i += 1) {
          option.series[1].data.push(this.dataArr[i]);
        }
      }
      console.log(`option.series[0].data: ${option.series[0].data}`);
      console.log(`option.series[1].data: ${option.series[1].data}`);
      this.myChat.setOption(option);
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
