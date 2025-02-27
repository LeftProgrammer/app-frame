import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist-uni';

// TODO：自动注入所有pinia模块

// 导入 store 模块
import app from './app';
import user from './user';
import sys from './sys';
import modal from './modal';

// store 模块映射
const modules = {
  app,
  user,
  sys,
  modal,
};

// 注册新的 store 模块
export const registerStore = (name, storeModule) => {
  if (modules[name]) {
    console.warn(`Store module [${name}] already exists, it will be overwritten`);
  }
  modules[name] = storeModule;
};

// 批量注册 store 模块
export const registerStores = (newModules) => {
  Object.entries(newModules).forEach(([name, module]) => {
    registerStore(name, module);
  });
};

export const setupPinia = (app) => {
  const pinia = createPinia();
  pinia.use(piniaPersist);
  app.use(pinia);
};

// 返回 store 实例
export default (name) => {
  if (!modules[name]) {
    console.warn(`Store module [${name}] not found`);
    return null;
  }
  return modules[name]();
};