<template>
  <view class="page-app" :class="['theme-' + sys?.mode, 'main-' + sys?.theme, 'font-' + sys?.fontSize]">
    <view class="page-main" :style="[bgMain]">
      <!-- 统一使用 s-layout-navbar 处理导航栏 -->
      <s-layout-navbar 
        :navbar="navbar"
        :navbarStyle="navbarStyle"
        :title="title"
        :color="color"
        :tools="tools"
        :opacityBgUi="opacityBgUi"
        :showLeftButton="showLeftButton"
        @search="emits('search', $event)"
      />

      <view class="page-body" :style="[bgBody]">
        <slot />
        <!-- 底部导航 -->
        <s-tabbar v-if="tabbar" :path="tabbar" />
      </view>
    </view>

    <!-- 全局弹窗组件，增加模块控制 -->
    <s-layout-modal 
      :showAuthModal="showAuthModal"
      :showShareModal="showShareModal"
      :showMenuTools="showMenuTools"
      :onShareAppMessage="onShareAppMessage"
    />
  </view>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import sheep from '../../index';
import { isEmpty } from 'lodash-es';
import sLayoutNavbar from './s-layout-navbar.vue';
import sLayoutModal from './s-layout-modal.vue';

const props = defineProps({
  title: { type: String, default: '' },
  navbar: { type: String, default: 'normal' },
  opacityBgUi: { type: String, default: 'bg-white' },
  color: { type: String, default: '' },
  tools: { type: String, default: 'title' },
  navbarStyle: { type: Object, default: () => ({}) },
  bgStyle: { type: Object, default: () => ({ color: 'var(--ui-BG-1)' }) },
  tabbar: { type: [String, Boolean], default: '' },
  onShareAppMessage: { type: [Boolean, Object], default: true },
  showLeftButton: { type: Boolean, default: false },

  // 新增控制参数
  showAuthModal: { type: Boolean, default: true },
  showShareModal: { type: Boolean, default: true },
  showMenuTools: { type: Boolean, default: true },
});
const emits = defineEmits(['search']);

const sysStore = sheep.$store('sys');
const sys = computed(() => sysStore);

// 计算背景
const bgMain = computed(() => ({
  background: `${props.bgStyle.backgroundColor || props.bgStyle.color} url(${sheep.$url.cdn(
    props.bgStyle.backgroundImage
  )}) no-repeat top center / 100% auto`,
}));

const bgBody = computed(() => bgMain.value);

onMounted(() => {
  if (!isEmpty(props.onShareAppMessage)) {
    sheep.$platform.share.updateShareInfo(props.onShareAppMessage);
  }
});
</script>

<style lang="scss" scoped>
.page-app {
  position: relative;
  color: var(--ui-TC);
  background-color: var(--ui-BG-1) !important;
  z-index: 2;
  display: flex;
  width: 100%;
  height: 100vh;

  .page-main {
    position: absolute;
    z-index: 1;
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;

    .page-body {
      width: 100%;
      position: relative;
      z-index: 1;
      flex: 1;
    }
  }
}
</style>
