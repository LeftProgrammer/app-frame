# Request Module

## 模块介绍

基于 luch-request 封装的请求模块，提供统一的接口请求、响应处理、错误处理等功能。支持全局配置、自定义扩展，使用简单，易于维护。

## 主要特性

- **全局配置**
  - 基础配置（超时、请求头等）
  - 响应结构（状态码、数据字段等）
  - 请求选项（加载提示、成功提示等）
  - 状态码处理

- **请求处理**
  - 统一的请求封装
  - 支持 GET、POST、PUT、DELETE 等方法
  - 文件上传/下载
  - 并发请求处理

- **响应处理**
  - 统一的数据格式
  - 自动错误处理
  - 自定义成功/失败提示
  - Token 自动刷新

- **扩展机制**
  - 请求拦截器
  - 响应拦截器
  - 自定义处理器
  - 全局错误处理

## 使用示例

### 1. 基础请求

```javascript
import http from '@/packages/core/request';

// GET 请求
http.get('/api/user/info', {
  custom: {
    showLoading: true,
    loadingMsg: '加载中'
  }
});

// POST 请求
http.post('/api/user/update', {
  name: 'test',
  age: 18
}, {
  custom: {
    showSuccess: true,
    successMsg: '更新成功'
  }
});

```

### 2. 修改全局配置

```javascript
import { setGlobalConfig } from '@/packages/core/request';

// 修改基础配置
setGlobalConfig({
  timeout: 15000,
  header: {
    'x-custom-header': 'value'
  }
}, 'baseConfig');

// 修改响应结构
setGlobalConfig({
  successCode: 200,
  dataField: 'result'
}, 'responseConfig');

// 修改请求选项
setGlobalConfig({
  showError: true,
  showLoading: true,
  loadingMsg: '请稍候...',
  auth: true
}, 'requestOptions');

// 修改状态码
setGlobalConfig({
  401: {
    message: '请重新登录',
    handler: async (error) => {
      await logout();
      uni.navigateTo({ url: '/pages/mian/login' });
    }
  }
}, 'statusConfig');

```

### 2. 自定义处理器

```javascript
import { registerRequestHandler, registerResponseHandler } from '@/packages/core/request';

// 注册请求处理器
registerRequestHandler('payment', async (config) => {
  config.header['Payment-Version'] = '2.0';
  return config;
});

// 注册响应处理器
registerResponseHandler('payment', {
  success: async (response) => {
    // 自定义成功处理
    return response;
  },
  error: async (error) => {
    // 自定义错误处理
    return Promise.reject(error);
  }
});

// 使用处理器
http.post('/api/payment', data, {
  custom: {
    handler: 'payment'
  }
});

```

## API 参考
### 请求方法

http.request(config)
http.get(url[, config])
http.post(url[, data[, config]])
http.put(url[, data[, config]])
http.delete(url[, config])
http.upload(url[, config])
http.download(url[, config])


### 配置选项
```javascript
{
  custom: {
    showSuccess: false,    // 显示成功提示
    successMsg: '',        // 成功提示消息
    showError: true,       // 显示错误提示
    errorMsg: '',         // 错误提示消息
    showLoading: true,    // 显示加载提示
    loadingMsg: '加载中',  // 加载提示消息
    auth: false,          // 是否需要认证
    handler: ''           // 自定义处理器名称
  }
}
```

## 工具函数
setGlobalConfig(config, type): 修改全局配置
registerRequestHandler(name, handler): 注册请求处理器
registerResponseHandler(name, handler): 注册响应处理器
getAccessToken(): 获取访问令牌
getRefreshToken(): 获取刷新令牌


## 注意事项
所有请求默认返回 Promise
请求失败时会自动处理错误提示
认证失败时会自动处理token刷新
Loading状态会自动管理
支持自定义扩展和处理
