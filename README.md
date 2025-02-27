# jinghe-sanjiaoroad-app

## 🐶 新手必读

* 演示地址：<https://doc.iocoder.cn/mall-preview/>
* 启动文档：<https://doc.iocoder.cn/quick-start/>
* 视频教程：<https://doc.iocoder.cn/video/>

## 🐯 框架简介

**jinghe-sanjiaoroad-app** 是一个基于 uni-app + Vue3 开发的多端应用开发框架，支持微信小程序、H5、App等多个平台。

### 支持平台

- 微信小程序
- H5移动端
- App（iOS/Android）
- 微信公众号

## 🚀 技术栈

- 核心框架：Vue 3 + uni-app
- 状态管理：Pinia + pinia-plugin-persist-uni
- 工具库：
  - dayjs（时间处理）
  - lodash（工具函数）
  - luch-request（请求库）
- 包管理：pnpm workspace

## 🔧 开发环境搭建

1. **环境要求**
   - Node.js 18+
   - pnpm 8+
   - HBuilderX

2. **安装依赖**
```bash
# 安装依赖
pnpm install

# 开发启动

## 微信小程序
pnpm dev:mp-weixin

## H5
pnpm dev:h5

## App
pnpm dev:app

# 构建部署
## 微信小程序
pnpm build:mp-weixin

## H5
pnpm build:h5

## App
pnpm build:app