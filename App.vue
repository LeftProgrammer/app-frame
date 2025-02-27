<script setup>
  import { onLaunch, onShow, onError } from '@dcloudio/uni-app';
  import { ShoproInit } from './sheep';
  import sheep from './sheep';

  onLaunch(() => {
    // 加载Shopro底层依赖
    ShoproInit();
  });

  onShow((options) => {
    console.log('app-onShow-options===>', options);
    // 如果页面需要登录，但用户未登录
    if (!sheep.$store('user').isLogin) {
      console.log('页面需要登录，重定向到登录页');
      uni.redirectTo({
        url: import.meta.env.SHOPRO_LOGIN_PATH
      });
      return;
    }
    // #ifdef APP-PLUS
    // 获取urlSchemes参数
    const args = plus.runtime.arguments;
    if (args) {
    }

    // 获取剪贴板
    // uni.getClipboardData({
    //   success: (res) => {},
    // });
    // #endif

    // #ifdef MP-WEIXIN
    // 确认收货回调结果
    console.log(options, 'options');
    // #endif
  });
</script>

<style lang="scss">
  @import '@jinghe-sanjiaoroad-app/core/src/scss/index.scss';
</style>
