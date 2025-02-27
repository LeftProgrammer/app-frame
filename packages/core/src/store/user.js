import { defineStore } from 'pinia';
import { $url, $router, $api } from '../index';
import share from '../platform/share';
import { showAuthModal } from '../hooks/useModal';
import { clone, cloneDeep } from 'lodash-es';
import app from './app';

// 默认用户信息
const defaultUserInfo = {
  id: 0, // 用户编号
  username: '', // 用户名
  nickname: '', // 昵称
  avatar: '', // 头像
  roles: [],
  permissions: [],
  menus: [],
};

const user = defineStore({
  id: 'user',
  state: () => ({
    userInfo: clone(defaultUserInfo), // 用户信息
    isLogin: !!uni.getStorageSync('token'), // 登录状态
    lastUpdateTime: 0, // 上次更新时间
  }),

  actions: {
    // 获取用户信息
    async getInfo() {
      const { appCode } = app().info || {};
      const { code, data = {} } = await $api?.system?.sUserApi?.getUserInfo({ appCode });
      if (code !== 0) {
        return;
      }

      this.userInfo = data;
      this.userInfo.avatar = (data.user && data.user.avatar) ? data.user.avatar : $url.static('/static/images/avatar.png');
      this.userInfo.roles = (data.roles && data.roles.length > 0) ? data.roles : [];
      this.userInfo.permissions = (data.permissions && data.permissions.length > 0) ? data.permissions : [];
      this.userInfo.menus = (data.menus && data.menus.length > 0) ? data.permissions : [];
      return Promise.resolve(data);
    },

    // 设置 token
    setToken(token = '', refreshToken = '') {
      if (token === '') {
        this.isLogin = false;
        uni.removeStorageSync('token');
        uni.removeStorageSync('refresh-token');
      } else {
        this.isLogin = true;
        uni.setStorageSync('token', token);
        uni.setStorageSync('refresh-token', refreshToken);
        this.loginAfter();
      }
      return this.isLogin;
    },

    // 更新用户相关信息 (手动限流，5 秒之内不刷新)
    async updateUserData() {
      if (!this.isLogin) {
        this.resetUserData();
        return;
      }
      // 防抖，5 秒之内不刷新
      const nowTime = new Date().getTime();
      if (this.lastUpdateTime + 5000 > nowTime) {
        return;
      }
      this.lastUpdateTime = nowTime;

      // 获取最新信息
      await this.getInfo();
      // this.getWallet();
      // this.getNumData();
      return this.userInfo;
    },

    // 重置用户默认数据
    resetUserData() {
      // 清空 token
      this.setToken();
      // 清空用户相关的缓存
      this.userInfo = clone(defaultUserInfo);
    },

    // 登录后，加载各种信息
    // TODO：整理下；
    async loginAfter() {
      await this.updateUserData();

      // 登录后设置全局分享参数
      share.getShareInfo();

      // 提醒绑定手机号
      if (app().platform.bind_mobile && !this.userInfo.mobile) {
        showAuthModal('changeMobile');
      }
    },

    // 登出系统
    async logout() {
      this.resetUserData();
      return !this.isLogin;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user-store',
      },
    ],
  },
});

export default user;
