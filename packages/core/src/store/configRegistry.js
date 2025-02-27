// 配置注册类
class ConfigRegistry {
    constructor() {
      this.configs = new Map();
    }
  
    // 注册模块配置
    register(moduleName, defaultConfig = {}) {
      if (!this.configs.has(moduleName)) {
        this.configs.set(moduleName, {
          default: defaultConfig,
          current: { ...defaultConfig }
        });
      }
      return this;
    }
  
    // 更新模块配置
    update(moduleName, config = {}) {
      const moduleConfig = this.configs.get(moduleName);
      if (moduleConfig) {
        moduleConfig.current = {
          ...moduleConfig.default,
          ...config
        };
      }
      return this;
    }
  
    // 获取模块配置
    get(moduleName) {
      return this.configs.get(moduleName)?.current;
    }
  }
  
  export const configRegistry = new ConfigRegistry();