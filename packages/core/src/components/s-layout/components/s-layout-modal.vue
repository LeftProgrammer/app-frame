<template>
    <view class="page-modal">
      <!-- 全局授权弹窗 -->
      <s-auth-modal v-if="showAuthModal" />
      
      <!-- 全局分享弹窗 -->
      <s-share-modal v-if="showShareModal" :shareInfo="shareInfo" />
      
      <!-- 全局快捷入口 -->
      <s-menu-tools v-if="showMenuTools" />
    </view>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import sheep from '../../index';
  import { isEmpty } from 'lodash-es';
  
  const props = defineProps({
    showAuthModal: { type: Boolean, default: true }, // 控制授权弹窗是否显示
    showShareModal: { type: Boolean, default: true }, // 控制分享弹窗是否显示
    showMenuTools: { type: Boolean, default: true }, // 控制快捷入口是否显示
    onShareAppMessage: { type: [Boolean, Object], default: true },
  });
  
  // 计算分享信息
  const shareInfo = computed(() => {
    if (props.onShareAppMessage === true) {
      return sheep.$platform.share.getShareInfo();
    } else if (!isEmpty(props.onShareAppMessage)) {
      sheep.$platform.share.updateShareInfo(props.onShareAppMessage);
      return props.onShareAppMessage;
    }
    return {};
  });
  </script>
  