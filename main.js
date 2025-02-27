import App from './App';
import { createSSRApp } from 'vue';
import { setupPinia } from '@jinghe-sanjiaoroad-app/core/src/store/index';

export function createApp() {
  const app = createSSRApp(App);
  
  setupPinia(app);

  return {
    app,
  };
}
