<template>
  <s-layout title="登录" navbar="custom">
    <app-login @login="handleLogin"></app-login>
  </s-layout>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import AppLogin from '@jinghe-sanjiaoroad-app/application/src/components/app-login/app-login.vue';

  onLoad(() => {
    // #ifdef H5
    // 检测 H5 登录回调
    if (sheep.$store('user').isLogin) {
      let returnUrl = uni.getStorageSync('returnUrl');
      if (returnUrl) {
        uni.removeStorage({ key: 'returnUrl' });
        location.replace(returnUrl);
      } else {
        uni.switchTab({
          url: '/',
        });
      }
    }
    // #endif
  });
  const handleLogin = (res) => {
    console.log('handleLogin-res===>', res);
  };
</script>

<style>
  .container {
    padding: 20px;
  }
</style>
