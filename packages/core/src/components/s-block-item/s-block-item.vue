<template>
  <view>
    <!-- 基础组件：搜索框 -->
    <s-search-block v-if="type === 'SearchBar'" :data="data" :styles="styles" :navbar="false" />
    <!-- 基础组件：公告栏 -->
    <s-notice-block v-if="type === 'NoticeBar'" :data="data" />
    <!-- 基础组件：菜单导航 -->
    <s-menu-button v-if="type === 'MenuSwiper'" :data="data" :styles="styles" />
    <!-- 基础组件：列表导航 -->
    <s-menu-list v-if="type === 'MenuList'" :data="data" />
    <!-- 基础组件：宫格导航 -->
    <s-menu-grid v-if="type === 'MenuGrid'" :data="data" :styles="styles" />
    <!-- 基础组件：弹窗广告 -->
    <s-popup-image v-if="type === 'Popover'" :data="data" />
    <!-- 基础组件：悬浮按钮 -->
    <s-float-menu v-if="type === 'FloatingActionButton'" :data="data" />

    <!-- 图文组件：图片展示 -->
    <s-image-block v-if="type === 'ImageBar'" :data="data" :styles="styles" />
    <!-- 图文组件：图片轮播 -->
    <s-image-banner v-if="type === 'Carousel'" :data="data" :styles="styles" />
    <!-- 基础组件：标题栏 -->
    <s-title-block v-if="type === 'TitleBar'" :data="data" :styles="styles" />
    <!-- 图文组件：广告魔方 -->
    <s-image-cube v-if="type === 'MagicCube'" :data="data" :styles="styles" />
    <!-- 图文组件：视频播放 -->
    <s-video-block v-if="type === 'VideoPlayer'" :data="data" :styles="styles" />
    <!-- 基础组件：分割线 -->
    <s-line-block v-if="type === 'Divider'" :data="data" />
    <!-- 图文组件：热区 -->
    <s-hotzone-block v-if="type === 'HotZone'" :data="data" :styles="styles" />

    <!-- 用户组件：用户卡片 -->
    <s-user-card v-if="type === 'UserCard'" v-bind="data" :styles="styles" />
  </view>
</template>

<script setup>
  /**
   * 装修组件 - 组件集
   */
  const props = defineProps({
    type: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default() {},
    },
    styles: {
      type: Object,
      default() {},
    },
  });
  function onSearch() {}
</script>

<style></style>
