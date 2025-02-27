/**
 * Request Module
 * @description 请求模块封装，支持：
 * 1. 全局配置：baseConfig/responseConfig/requestOptions/statusConfig
 * 2. 拦截器扩展：支持添加自定义请求/响应处理
 * 3. 处理器机制：支持特定接口的自定义处理
 */

import Request from 'luch-request';
import { $store, $platform, $router, $api } from '../index';
import { apiPath, baseUrl, tenantId, loginPath } from '../config/index';
import { getTerminal } from '../util/const';

// 全局配置
const globalConfig = {
  // 基础配置
  baseConfig: {
    baseURL: baseUrl + apiPath,
    timeout: 8000,
    method: 'GET',
    header: {
      Accept: 'text/json',
      'Content-Type': 'application/json;charset=UTF-8',
      platform: $platform.name,
    },
    // #ifdef APP-PLUS
    sslVerify: false,
    // #endif
    // #ifdef H5
    withCredentials: false,
    // #endif
  },

  // 响应结构配置
  responseConfig: {
    successCode: 0,           // 成功的状态码
    dataField: 'data',        // 数据字段名
    codeField: 'code',        // 状态码字段名
    messageField: 'msg',      // 消息字段名
  },

  // 请求选项配置
  requestOptions: {
    showSuccess: false,       // 显示成功提示
    successMsg: '',          // 成功提示消息
    showError: true,         // 显示错误提示
    errorMsg: '',           // 错误提示消息
    showLoading: true,      // 显示加载提示
    loadingMsg: '加载中',    // 加载提示消息
    auth: false,            // 是否需要认证
  },

  // 状态码配置
  statusConfig: {
    401: {
      message: (isLogin) => isLogin ? '您的登录已过期' : '请先登录',
      handler: (error) => refreshToken(error.config)
    },
    400: { message: '请求错误' },
    403: { message: '拒绝访问' },
    404: { message: '请求出错' },
    408: { message: '请求超时' },
    429: { message: '请求频繁, 请稍后再访问' },
    500: { message: '服务器开小差啦,请稍后再试~' },
    501: { message: '服务未实现' },
    502: { message: '网络错误' },
    503: { message: '服务不可用' },
    504: { message: '网络超时' },
    505: { message: 'HTTP版本不受支持' }
  },

  // 拦截器配置
  interceptors: {
    request: {
      onFulfilled: async (config) => {
        // 授权检查
        if (config.custom.auth && !$store('user').isLogin) {
          // 1.弹窗形式登录
          // showAuthModal();
          // 2.页面形式登录
          // TODO：保存当前页面路径，用于登录后跳回
          // 跳转到登录页
          $router.go(loginPath);
          return Promise.reject('需要登录');
        }

        // loading处理
        if (config.custom.showLoading) {
          LoadingInstance.count++;
          LoadingInstance.count === 1 &&
            uni.showLoading({
              title: config.custom.loadingMsg,
              mask: true,
              fail: () => {
                uni.hideLoading();
              },
            });
        }

        // 请求头处理
        const token = getAccessToken();
        if (token) {
          config.header['Authorization'] = token;
        }
        config.header['terminal'] = getTerminal();
        config.header['Accept'] = '*/*';
        config.header['tenant-id'] = tenantId;

        return config;
      },
      onRejected: (error) => Promise.reject(error)
    },
    response: {
      onFulfilled: async (response) => {
        response.config.custom.showLoading && closeLoading();

        // 如果是自定义响应处理的请求
        if (response.config.custom.customResponse) {
          return response.data;  // 直接返回原始响应数据
        }

        const { data } = response;
        const code = data[globalConfig.responseConfig.codeField];
        const msg = data[globalConfig.responseConfig.messageField];
        const result = data[globalConfig.responseConfig.dataField];

        // 处理登录相关接口
        if (response.config.url.indexOf('/auth/') >= 0 && result?.accessToken) {
          $store('user').setToken(result.accessToken, result.refreshToken);
          uni.switchTab({
            url: '/',
          });
        }

        if (code !== globalConfig.responseConfig.successCode) {
          // 状态码处理
          const statusHandler = globalConfig.statusConfig[code];
          if (statusHandler?.handler) {
            return statusHandler.handler(response);
          }
          console.log('code===>', code);
          if (response.config.custom.showError) {
            uni.showToast({
              title: msg || '服务器开小差啦,请稍后再试~',
              icon: 'none',
              mask: true,
            });
          }

          return Promise.reject({ code, msg, data: result });
        }

        // 成功提示
        if (
          response.config.custom.showSuccess &&
          response.config.custom.successMsg
        ) {
          uni.showToast({
            title: response.config.custom.successMsg,
            icon: 'none',
          });
        }

        return { code, data: result, msg };
      },
      onRejected: async (error) => {
        error.config?.custom?.showLoading && closeLoading();

        // 获取错误信息
        let errorMessage = '网络请求出错';
        if (error !== undefined) {
          const statusHandler = globalConfig.statusConfig[error.statusCode];
          if (statusHandler) {
            errorMessage = typeof statusHandler.message === 'function' 
              ? statusHandler.message($store('user').isLogin)
              : statusHandler.message;
          }

          if (error.errMsg?.includes('timeout')) errorMessage = '请求超时';
          // #ifdef H5
          if (error.errMsg?.includes('Network'))
            errorMessage = window.navigator.onLine ? '服务器异常' : '请检查您的网络连接';
          // #endif
        }

        if (error.config?.custom?.showError !== false) {
          uni.showToast({
            title: errorMessage,
            icon: 'none',
          });
        }

        return Promise.reject({
          code: error.statusCode || -1,
          msg: errorMessage,
          error
        });
      }
    }
  }
};

// Loading全局实例
let LoadingInstance = {
  target: null,
  count: 0,
};

// 处理器集合
const handlers = {
  request: {},
  response: {}
};

/**
 * 关闭loading
 */
function closeLoading() {
  if (LoadingInstance.count > 0) LoadingInstance.count--;
  if (LoadingInstance.count === 0) uni.hideLoading();
}

/**
 * 获取访问令牌
 */
export function getAccessToken() {
  return uni.getStorageSync('token');
}

/**
 * 获取刷新令牌
 */
export function getRefreshToken() {
  return uni.getStorageSync('refresh-token');
}

/**
 * 刷新令牌
 */
async function refreshToken(config) {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    handleAuthorized();
    return Promise.reject({ code: 401, msg: '请先登录' });
  }

  try {
    const res = await $api.system.sAuthApi.refreshToken(refreshToken);
    $store('user').setToken(res.data.accessToken, res.data.refreshToken);
    
    // 重试原请求
    config.header['Authorization'] = res.data.accessToken;
    return http.request(config);
  } catch (error) {
    handleAuthorized();
    return Promise.reject(error);
  }
}

/**
 * 处理未授权
 */
function handleAuthorized() {
  $store('user').logout();
  // showAuthModal();
  // TODO：保存当前页面路径，用于登录后跳回
  // 跳转到登录页
  $router.go(loginPath);
}

// 创建请求实例
const http = new Request({
  ...globalConfig.baseConfig,
  custom: globalConfig.requestOptions
});

// 配置拦截器
http.interceptors.request.use(
  async (config) => {
    // 执行自定义请求处理器
    const handler = config.custom?.handler;
    if (handler && handlers.request[handler]) {
      config = await handlers.request[handler](config);
    }
    
    // 执行全局请求拦截器
    return globalConfig.interceptors.request.onFulfilled(config);
  },
  error => globalConfig.interceptors.request.onRejected(error)
);

http.interceptors.response.use(
  async (response) => {
    // 执行自定义响应处理器
    const handler = response.config.custom?.handler;
    if (handler && handlers.response[handler]) {
      return handlers.response[handler].success(response);
    }
    
    // 执行全局响应拦截器
    return globalConfig.interceptors.response.onFulfilled(response);
  },
  async (error) => {
    // 执行自定义错误处理器
    const handler = error.config?.custom?.handler;
    if (handler && handlers.response[handler]) {
      return handlers.response[handler].error(error);
    }
    
    // 执行全局错误拦截器
    return globalConfig.interceptors.response.onRejected(error);
  }
);

/**
 * 修改全局配置
 */
export function setGlobalConfig(config, type = 'baseConfig') {
  if (!globalConfig[type]) {
    console.warn(`Invalid config type: ${type}`);
    return;
  }

  if (type === 'interceptors') {
    // 拦截器配置需要特殊处理
    const { request, response } = config;
    if (request) {
      const { onFulfilled, onRejected } = request;
      if (onFulfilled) {
        const originalFulfilled = globalConfig.interceptors.request.onFulfilled;
        globalConfig.interceptors.request.onFulfilled = async (config) => {
          config = await originalFulfilled(config);
          return onFulfilled(config);
        };
      }
      if (onRejected) {
        const originalRejected = globalConfig.interceptors.request.onRejected;
        globalConfig.interceptors.request.onRejected = async (error) => {
          error = await originalRejected(error);
          return onRejected(error);
        };
      }
    }
    if (response) {
      const { onFulfilled, onRejected } = response;
      if (onFulfilled) {
        const originalFulfilled = globalConfig.interceptors.response.onFulfilled;
        globalConfig.interceptors.response.onFulfilled = async (response) => {
          response = await originalFulfilled(response);
          return onFulfilled(response);
        };
      }
      if (onRejected) {
        const originalRejected = globalConfig.interceptors.response.onRejected;
        globalConfig.interceptors.response.onRejected = async (error) => {
          error = await originalRejected(error);
          return onRejected(error);
        };
      }
    }
  } else {
    // 其他配置直接合并
    Object.assign(globalConfig[type], config);
  }

  // 更新请求实例配置
  if (type === 'baseConfig') {
    Object.assign(http.config, config);
  }
}

/**
 * 注册请求处理器
 */
export function registerRequestHandler(name, handler) {
  handlers.request[name] = handler;
}

/**
 * 注册响应处理器
 */
export function registerResponseHandler(name, handler) {
  handlers.response[name] = handler;
}

/**
 * 合并配置
 */
const mergeConfig = (defaultConfig, customConfig) => {
  return {
    ...defaultConfig,
    ...customConfig,
    custom: {
      ...defaultConfig.custom,
      ...customConfig?.custom
    },
    header: {
      ...defaultConfig.header,
      ...customConfig?.header
    }
  };
};

/**
 * 请求函数
 */
const request = (config) => {
  const mergedConfig = mergeConfig({
    ...globalConfig.baseConfig,
    custom: globalConfig.requestOptions
  }, config);
  return http.middleware(mergedConfig);
};

// 导出请求实例
export default request;