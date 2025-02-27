import { ServiceNames } from './contracts';

// 使用全局对象确保单例
const getRegistry = () => {
  const globalObj = typeof window !== 'undefined' ? window : 
                   typeof global !== 'undefined' ? global :
                   typeof uni !== 'undefined' ? uni : {};
                   
  const KEY = '__SERVICE_REGISTRY__';
  
  if (!globalObj[KEY]) {
    globalObj[KEY] = {
      services: new Map(),
      modules: new Map()
    };
  }
  
  return globalObj[KEY];
};

// 获取注册表实例
const registry = getRegistry();

// 验证服务是否在contracts中定义
function isValidService(moduleName, serviceName) {
  const moduleServices = ServiceNames[moduleName];
  if (!moduleServices) {
    console.warn(`[API] Module not allowed: ${moduleName}`);
    return false;
  }

  const expectedServiceName = moduleServices[serviceName];
  if (!expectedServiceName) {
    console.warn(`[API] Service not allowed: ${moduleName}.${serviceName}`);
    return false;
  }

  return true;
}

// 创建服务代理
const createServiceProxy = (service) => {
  if (!service) return undefined;
  
  return new Proxy(service, {
    get(target, property) {
      if (typeof target[property] === 'function') {
        return target[property].bind(target);
      }
      return target[property];
    }
  });
};

// 创建模块代理
const createModuleProxy = (moduleName) => {
  return new Proxy({}, {
    get(target, serviceName) {
      // 尝试获取服务
      const moduleMap = registry.modules.get(moduleName);
      if (!moduleMap) return undefined;

      // 尝试直接获取，如果失败则尝试首字母大写的形式
      let fullServiceName = moduleMap.get(serviceName);
      if (!fullServiceName) {
        const upperName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
        fullServiceName = moduleMap.get(upperName);
      }

      const service = registry.services.get(fullServiceName);
      return createServiceProxy(service);
    }
  });
};

// 创建统一的API代理
const $api = new Proxy({}, {
  get(target, prop) {
    // 注册方法
    if (prop === 'registerServices') {
      return (services, options = {}) => {
        if (!services || typeof services !== 'object') {
          console.warn('[API] Invalid services object');
          return false;
        }

        let success = true;
        for (const [moduleName, moduleServices] of Object.entries(services)) {
          // 确保模块映射存在
          if (!registry.modules.has(moduleName)) {
            registry.modules.set(moduleName, new Map());
          }

          const moduleMap = registry.modules.get(moduleName);
          
          // 注册模块中的每个服务
          for (const [serviceName, implementation] of Object.entries(moduleServices)) {
            if (!isValidService(moduleName, serviceName)) {
              success = false;
              continue;
            }

            const fullServiceName = `${moduleName}.${serviceName}`;
            registry.services.set(fullServiceName, implementation);
            moduleMap.set(serviceName, fullServiceName);
          }
        }

        return success;
      };
    }

    // 尝试获取顶层服务
    const service = registry.services.get(prop);
    if (service) {
      return createServiceProxy(service);
    }

    // 返回模块代理（只允许访问contracts中定义的模块）
    if (ServiceNames[prop]) {
      return createModuleProxy(prop);
    }

    console.warn(`[API] Module not found: ${prop}`);
    return undefined;
  }
});

export default $api;