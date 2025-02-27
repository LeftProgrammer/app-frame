<template>
    <view>
      <!-- 默认通用顶部导航栏 -->
      <su-navbar
        v-if="navbar === 'normal'"
        :title="title"
        statusBar
        :color="color"
        :tools="tools"
        :opacityBgUi="opacityBgUi"
        @search="emits('search', $event)"
        :defaultSearch="defaultSearch"
      />
  
      <!-- 自定义装修组件导航栏（标准模式） -->
      <s-custom-navbar
        v-else-if="navbar === 'custom' && navbarMode === 'normal'"
        :data="navbarStyle"
        :showLeftButton="showLeftButton"
      />
  
      <!-- 沉浸式导航栏 -->
      <view v-if="navbar === 'inner'">
        <su-inner-navbar :title="title" />
        <view :style="{ paddingTop: sheep?.$platform?.navbar + 'px' }"></view>
      </view>
  
      <!-- 自定义装修组件导航栏（沉浸式模式） -->
      <s-custom-navbar
        v-if="navbar === 'custom' && navbarMode === 'inner'"
        :data="navbarStyle"
        :showLeftButton="showLeftButton"
      />
    </view>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import sheep from '../../index';
  
  const props = defineProps({
    navbar: { type: String, default: 'normal' },
    navbarStyle: { type: Object, default: () => ({}) },
    title: { type: String, default: '' },
    color: { type: String, default: '' },
    tools: { type: String, default: 'title' },
    opacityBgUi: { type: String, default: 'bg-white' },
    showLeftButton: { type: Boolean, default: false },
    defaultSearch: { type: String, default: '' },
  });
  const emits = defineEmits(['search']);
  
  // 计算导航栏模式
  const navbarMode = computed(() => (props.navbarStyle.styleType === 'normal' ? 'normal' : 'inner'));
  </script>
  