<template>
    <div></div>
</template>

<script>
import { consumerOrObtainUserCredit } from '../api/insurance';

export default {
  data() {
    return {
      name: 'Demo_007',
    };
  },
  created() {
    const that = this;
    window.onscroll = function winOnscroll() {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // 变量windowHeight是可视区的高度
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // 变量scrollHeight是滚动条的总高度
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // 滚动条到底部的条件
      if (scrollTop + windowHeight === scrollHeight) {
        // 后台加载数据的函数
        consumerOrObtainUserCredit({
          type: 3,
          interfaceType: 1,
          // unionId: '',
          // roleId: '',
        }).then((response) => {
          console.log(`response.data: ${JSON.stringify(response.data)}`);
          // alert(`response.data: ${JSON.stringify(response.data)}`);
          that.$createToast({
            txt: `赠送${JSON.stringify(response.data)}积分`,
            type: 'txt',
            time: 2000,
          }).show();
        }).catch((err) => {
          console.log(`err: ${JSON.stringify(err)}`);
        });
      }
    };
  },
  methods: {},
};
</script>

<style scoped lang="stylus">
 @import '../common/stylus/mixin.styl';
</style>
