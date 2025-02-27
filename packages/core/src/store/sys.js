import { defineStore } from 'pinia';
import { configRegistry } from './configRegistry';
import app from './app';

// 注册sys模块的默认配置
configRegistry.register('sys', {
  theme: '', // 主题,
  mode: 'light', // 明亮模式、暗黑模式（暂未支持）
  modeAuto: false, // 跟随系统
  fontSize: 1, // 设置默认字号等级(0-4)
});

const sys = defineStore({
  id: 'sys',
  state: () => ({
    ...configRegistry.get('sys')
  }),
  getters: {},
  actions: {
    // 配置注入方法
    initConfig(config = {}) {
      configRegistry.update('sys', config);
      // 更新 state
      Object.assign(this.$state, configRegistry.get('sys'));
    },

    // 设置主题
    setTheme(theme = '') {
      if (theme === '') {
        this.theme = app().basic?.theme || 'orange';
      } else {
        this.theme = theme;
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'sys-store',
      },
    ],
  },
});

export default sys;
