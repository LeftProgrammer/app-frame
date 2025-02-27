# @jinghe-sanjiaoroad-app/core

jinghe-sanjiaoroad-app/core uniapp 基础框架，提供了完整的商城基础功能组件和工具函数。

## 特性

- 🚀 基于 Vue 3 和 uni-app
- 📦 丰富的基础组件库
- 🛠️ 完善的工具函数集
- 🔄 Pinia 状态管理
- 📱 多端适配（H5、小程序、App）
- 🎨 SCSS 主题定制
- 🔒 统一的权限控制
- 🌐 规范的请求封装

## 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Vue 3.x
- uni-app

## 安装

```bash
# 使用 pnpm 安装（推荐）
pnpm add @jinghe-sanjiaoroad-app/core --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe

## 核心功能

### 路由管理 ($router)
```javascript
import { $router } from '@jinghe-sanjiaoroad-app/core'

// 页面导航
$router.go('/pages/index/index')
$router.goBack()

// 带参数跳转
$router.go('/pages/detail/index', { id: 1 })
```

### 请求处理 ($url)
```javascript
import { $api } from '@jinghe-sanjiaoroad-app/core'

// RESTful API 调用
await $api.member.user.getUserInfo()
```

### 状态管理
```javascript
import { $store } from '@jinghe-sanjiaoroad-app/core'

// 获取状态
const userStore = $store('user')
const { userInfo } = userStore

// 修改状态
userStore.$patch((state) => {
  state.userInfo = newUserInfo
})
```

### 工具函数 ($helper)
```javascript
import { $helper } from '@jinghe-sanjiaoroad-app/core'

// 常用工具函数
$helper.toast('操作成功')
$helper.formatPrice(100)
$helper.copyText('文本内容')
```

### 平台适配 ($platform)
```javascript
import { $platform } from '@jinghe-sanjiaoroad-app/core'

if ($platform.isH5) {
  // H5 平台特定逻辑
} else if ($platform.isMpWeixin) {
  // 微信小程序特定逻辑
}
```

## 组件

框架提供了丰富的组件，包括：

- 

## 发布流程

...
# 1. 构建
pnpm run build

# 2. 发布到私有仓库
npm login --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe/
npm publish --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe/

# 删除已发布的包
npm unpublish @jinghe-sanjiaoroad-app/core@<version> --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe/ --force

# 包使用
pnpm install @jinghe-sanjiaoroad-app/core --filter jinghe-lanhai-template --registry=http://192.168.10.110:8081/repository/npm-hosted-jinghe
...