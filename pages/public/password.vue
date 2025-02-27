<template>
  <s-layout title="登录" navbar="custom">
    <app-change-password @handleOk="handleOk"></app-change-password>
  </s-layout>
</template>

<script setup>
  import { onLoad } from '@dcloudio/uni-app';
  import AppChangePassword from '@jinghe-sanjiaoroad-app/application/src/components/app-change-password/app-change-password.vue';

  onLoad(() => {});
  const handleOk = (msg) => {
    console.log(msg, 'msg');
  };
</script>

<style>
  .container {
    padding: 20px;
  }
</style>
