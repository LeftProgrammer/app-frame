<template>
  <view class="page-login">
    <uni-title type="h1" title="登录" align="center"></uni-title>
    <uni-forms
      ref="loginForm"
      validateTrigger="bind"
      :rules="rules"
      :modelValue="formData"
    >
      <uni-forms-item name="username">
        <uni-easyinput
          placeholder="请输入账号"
          v-model="formData.username"
          prefixIcon="person"
        >
        </uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="password">
        <uni-easyinput
          type="password"
          placeholder="请输入密码"
          prefixIcon="locked"
          v-model="formData.password"
        >
        </uni-easyinput>
      </uni-forms-item>
      <!-- <uni-forms-item name="verification">
        <uni-easyinput
          placeholder="请输入验证码"
          v-model="formData.verification"
          prefixIcon="email"
        >
        </uni-easyinput>
      </uni-forms-item> -->
    </uni-forms>
    <view @click="login" class="loginBtn">登录</view>
    <su-popup :show="showVerify" type="center" round="20">
      <Verify
        ref="verify"
        :captchaType="captchaType"
        :imgSize="{ width: '300px', height: '200px' }"
        :mode="mode"
        @success="handleRegister"
      />
    </su-popup>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { $store, $api, $router, $platform, password } from "@jinghe-sanjiaoroad-app/core";
import Verify from "../app-verifition/app-verifition.vue";
const rules = {
  username: {
    rules: [
      {
        required: true,
        errorMessage: "请输入账号"
      }
    ]
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: "请输入密码"
      }
    ]
  },
  // verification: {
  //   rules: [
  //     {
  //       required: false,
  //       errorMessage: "请输入验证码"
  //     }
  //   ]
  // }
};
const formData = reactive({});
const loginForm = ref(null);
const emit = defineEmits(["login"]);
/**
 * @description 验证成功
 * @param params
 */
const handleRegister = async (params) => {
  showVerify.value = false;
  mode.value = "pop";
  loginForm.value.validate().then((res) => {
    $api?.system?.sAuthApi?.login(formData).then((res) => {
      emit("login", res);
    });
  });
};
const captchaType = ref("blockPuzzle"); // blockPuzzle 滑块 clickWord 点击文字
const showVerify = ref(false);
const mode = ref("pop");
const verify = ref(null);
/**
 * @description 唤起验证码
 */
const login = () => {
  showVerify.value = true;
  mode.value = "mask";
};
</script>

<style lang="scss" scoped>
.page-login {
  min-height: 100vh;
  background-color: #f5f7f9;
  padding: 60rpx;
  .uni-title__box {
    margin-bottom: 30rpx;
  }
  .loginBtn {
    text-align: center;
    background: #007fff;
    color: #fff;
    height: 64rpx;
    line-height: 64rpx;
    border-radius: 16rpx;
  }
  ::v-deep .uni-forms {
    margin-bottom: 30rpx;
    .uni-easyinput {
      .uni-easyinput__content {
        background: #f4f5f5;
        border-radius: 20rpx;
        .uni-icons {
          font-size: 20rpx;
          padding: 0 10rpx;
        }
      }
    }
  }
}
</style>
