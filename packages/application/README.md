# @jinghe-sanjiaoroad-app/application

jinghe-sanjiaoroad-app/application 是基于 @jinghe-sanjiaoroad-app/core 的应用层封装，提供了业务相关的组件和功能。

## 特性

- 🔗 与核心库无缝集成
- 📦 业务组件封装

## 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Vue 3.x
- uni-app
- @jinghe-sanjiaoroad-app/core
``

## 安装

```bash
# 使用 pnpm 安装（推荐）
pnpm add @jinghe-sanjiaoroad-app/application --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe
```

## 项目结构

src/
├── components/         # 业务组件
│   ├── business-a/    # 业务组件 A
│   ├── business-b/    # 业务组件 B
│   └── ...
└── index.js          # 入口文件

## @jinghe-sanjiaoroad-app/core 包发布
...
# 1. 构建
pnpm run build

# 2. 发布到私有仓库
npm login --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe/
npm publish --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe/

# 删除已发布的包
npm unpublish @jinghe-sanjiaoroad-app/application@<version> --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe/ --force

# 包使用
pnpm install @jinghe-sanjiaoroad-app/application --filter your-project --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe
...