<template>
  <view class="page-login">
    <uni-title type="h1" title="修改密码" align="center"></uni-title>
    <uni-forms
      ref="loginForm"
      validateTrigger="bind"
      :rules="rules"
      :modelValue="formData"
    >
      <uni-forms-item name="oldPassword">
        <uni-easyinput
          type="password"
          placeholder="请输入原始密码"
          v-model="formData.oldPassword"
          prefixIcon="locked"
        >
        </uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="newPassword">
        <uni-easyinput
          type="password"
          placeholder="请输入新密码"
          prefixIcon="locked"
          v-model="formData.newPassword"
        >
        </uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="confirmPassword">
        <uni-easyinput
          type="password"
          placeholder="请确认密码"
          v-model="formData.confirmPassword"
          prefixIcon="locked"
        >
        </uni-easyinput>
      </uni-forms-item>
    </uni-forms>
    <view @click="submit" class="loginBtn">确认</view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { $store, $api, $router, $platform, password } from "@jinghe-sanjiaoroad-app/core";
const rules = {
  oldPassword: {
    rules: [
      {
        required: true,
        errorMessage: "请输入原密码"
      }
    ]
  },
  newPassword: {
    rules: [
      {
        required: true,
        errorMessage: "请输入新密码"
      }
    ]
  },
  confirmPassword: {
    rules: [
      {
        required: true,
        errorMessage: "确认新密码"
      },
      {
        validateFunction: function (rule, value, data, callback) {
          if (value !== data.newPassword)
            callback("两次输入的密码不一致，请确保新密码和确认密码相同");
          return true;
        }
      }
    ]
  }
};
const formData = reactive({});
const loginForm = ref(null);
const emit = defineEmits(["handleOk"]);
const submit = () => {
  loginForm.value
    .validate()
    .then((res) => {
      emit("handleOk", "这是来自子组件的消息！");
    })
    .catch((err) => {
      console.log("表单错误信息：", err);
    });
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
