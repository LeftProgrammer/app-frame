import { defineStore } from 'pinia';
import { $platform, $router } from '../index';
import { configRegistry } from './configRegistry';
import user from './user';
import sys from './sys';

// 注册app模块的默认配置
configRegistry.register('app', {
  info: {
    // 应用信息
    name: '', // 商城名称
    logo: '', // logo
    version: '', // 版本号
    appCode: '', // 应用编码 app
    cdnurl: '', // 云存储域名
    filesystem: '', // 云存储平台
  },
  platform: {
    share: {
      methods: [], // 支持的分享方式
      forwardInfo: {}, // 默认转发信息
      posterInfo: {}, // 海报信息
      linkAddress: '', // 复制链接地址
    },
    bind_mobile: 0, // 登陆后绑定手机号提醒 (弱提醒，可手动关闭)
  },
  basic: {
    theme: '',
    tabbar: [],
  },
  shareInfo: {}, // 全局分享信息
  has_wechat_trade_managed: 0, // 小程序发货信息管理  0 没有 || 1 有
});

const app = defineStore({
  id: 'app',
  state: () => ({
    ...configRegistry.get('app')
  }),
  actions: {
    // 配置注入方法
    initConfig(config = {}) {
      configRegistry.update('app', config);
      // 更新 state
      Object.assign(this.$state, configRegistry.get('app'));
    },
    // 获取Shopro应用配置和模板
    async init() {
      // 检查网络
      const networkStatus = await $platform.checkNetwork();
      if (!networkStatus) {
        $router.error('NetworkError');
      }

      // App初始化
      // await initApp(this.basic);


      // 加载主题
      const sysStore = sys();
      sysStore.setTheme();

      // 模拟用户登录
      const userStore = user();
      if (userStore.isLogin) {
        userStore.loginAfter();
      }
      return Promise.resolve(true);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'app-store',
      },
    ],
  },
});

export default app;
