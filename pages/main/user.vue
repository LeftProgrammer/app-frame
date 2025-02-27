<!-- 个人中心：支持装修 -->
<template>
  <s-layout title="我的" tabbar="/pages/main/user" :bgStyle="template.pageStyle" onShareAppMessage>
    <s-block v-for="(item, index) in template.components" :key="index" :styles="item.blockStyle">
      <s-block-item :type="item.id" :data="item.blockItemData" :styles="item.blockItemStyle" />
    </s-block>
  </s-layout>
</template>

<script setup>
  import { computed } from 'vue';
  import { onShow, onPageScroll, onPullDownRefresh } from '@dcloudio/uni-app';
  import sheep from '@/sheep';

  // 隐藏原生tabBar
  uni.hideTabBar();

  // const isLogin = computed(() => sheep.$store('user').isLogin);

  const template = {
    pageStyle: {
      backgroundColor: '#f5f5f5',
      backgroundImage:
        'https://file.sheepjs.com/storage/decorate/20221115/b530150a466c8cda0a4cd5b29e2c8d11.png',
    },
    components: [
      {
        id: 'UserCard',
        blockStyle: {
          bgType: 'img',
        },
        blockItemData: {
          showExtra: false,
        },
      },
      {
        id: 'MenuGrid',
        blockStyle: {
          bgType: 'color',
          bgColor: '#fff',
          margin: 8,
          marginTop: 8,
          marginBottom: 8,
          marginLeft: 8,
          marginRight: 8,
          padding: 8,
          paddingTop: 8,
          paddingRight: 8,
          paddingBottom: 8,
          paddingLeft: 8,
          borderRadius: 8,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
        },
        blockItemData: {
          column: 4,
          list: [
            {
              title: '设置',
              titleColor: '#333',
              subtitle: '',
              subtitleColor: '#bbb',
              badge: {
                show: false,
                textColor: '#fff',
                bgColor: '#FF6000',
              },
              url: '/pages/public/setting',
              iconUrl:
                'http://test.yudao.iocoder.cn/83852d802b3aab78ba9badf700079178d352d6a946f7c748ad8e1d3172f82032.png',
            },
          ],
        },
        blockItemStyle: {
          bgType: 'color',
          bgColor: '#fff',
          margin: 8,
          marginTop: 8,
          marginBottom: 8,
          marginLeft: 8,
          marginRight: 8,
          padding: 8,
          paddingTop: 8,
          paddingRight: 8,
          paddingBottom: 8,
          paddingLeft: 8,
          borderRadius: 8,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
        },
      },
    ],
  };

  onShow(() => {
    sheep.$store('user').updateUserData();
  });

  onPullDownRefresh(() => {
    sheep.$store('user').updateUserData();
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 800);
  });

  onPageScroll(() => {});
</script>

<style></style>
