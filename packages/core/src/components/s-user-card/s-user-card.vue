<template>
  <view class="ss-user-info-wrap ss-p-t-50" :class="customClass" :style="styles">
    <view class="ss-flex ss-col-center ss-row-between ss-m-b-20">
      <!-- **左侧：头像 (支持插槽) ** -->
      <view class="left-box ss-flex ss-col-center ss-m-l-36">
        <slot name="avatar">
          <view class="avatar-box ss-m-r-24" @tap="avatarClick">
            <image class="avatar-img" :src="avatarUrl" mode="aspectFill"></image>
          </view>
        </slot>

        <!-- **中间信息 (支持插槽) ** -->
        <slot name="info">
          <view class="nickname-box ss-flex ss-col-center">
            <view class="nick-name ss-m-r-20">{{ userInfo?.user?.nickname || nickname }}</view>
          </view>
        </slot>
      </view>

      <!-- **右侧操作 (支持插槽) ** -->
      <slot name="right-action">
        <view class="right-box ss-m-r-52">
          <button class="ss-reset-button" @tap="rightClick">
            <text class="sicon-qrcode"></text>
          </button>
        </view>
      </slot>
    </view>

    <!-- **绑定手机号 (支持插槽) ** -->
    <slot name="extra" v-if="showExtra">
      <view class="bind-mobile-box ss-flex ss-row-between ss-col-center" v-if="showBindMobile">
        <view class="ss-flex">
          <text class="cicon-mobile-o" />
          <view class="mobile-title ss-m-l-20">点击绑定手机号确保账户安全</view>
        </view>
        <button class="ss-reset-button bind-btn" @tap="bindMobile">去绑定</button>
      </view>
    </slot>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import sheep from '../../index';

// **Props**
const props = defineProps({
   // 基础属性
   showExtra: {
     type: Boolean,
     default: true
   },
   defaultAvatar: {
     type: String,
     default: '/static/avatar.png'
   },
   nickname: {
     type: String,
     default: ''
   },
   // 自定义类
   customClass: {
     type: String,
     default: '',
   },
   // 装修样式
   styles: {
     type: Object,
     default: () => ({}),
   },
   // 事件处理方法，直接作为props传入
   avatarClick: { type: Function, default: () => {} },
   rightClick: { type: Function, default: () => {} },
   bindMobile:  { type: Function, default: () => {} },
});
// 是否登录
const isLogin = computed(() => sheep.$store('user').isLogin);
// 用户信息
const userInfo = computed(() => sheep.$store('user').userInfo);

const avatarUrl = computed(() => isLogin.value ? sheep.$url.cdn(userInfo.value.avatar) : sheep.$url.static(props.defaultAvatar));

// **是否显示绑定手机号提示**
const showBindMobile = computed(() => isLogin.value && !userInfo.value.mobile);
</script>

<style lang="scss" scoped>
.ss-user-info-wrap {
  box-sizing: border-box;

  .avatar-box {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    overflow: hidden;
    .avatar-img {
      width: 100%;
      height: 100%;
    }
  }

  .nick-name {
    font-size: 34rpx;
    font-weight: 400;
    color: #333333;
  }

  .sicon-qrcode {
    font-size: 40rpx;
  }
}

/* **未绑定手机号样式** */
.bind-mobile-box {
  width: 100%;
  height: 84rpx;
  padding: 0 34rpx 0 44rpx;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px -8rpx 9rpx 0px rgba(#e0e0e0, 0.3);

  .cicon-mobile-o {
    font-size: 30rpx;
    color: #ff690d;
  }

  .mobile-title {
    font-size: 24rpx;
    font-weight: 500;
    color: #ff690d;
  }

  .bind-btn {
    width: 100rpx;
    height: 50rpx;
    background: #ff6100;
    border-radius: 25rpx;
    font-size: 24rpx;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
