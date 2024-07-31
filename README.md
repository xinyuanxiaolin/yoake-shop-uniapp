## 项目简介

晨曦手机商城系统项目包含从首页浏览商品，商品详情，微信登录，加入购物车，提交订单，微信支付，订单管理等功能。

## 实现技术的重点

- 1.下拉刷新
- 2.单页分页加载和多标签页分页加载
- 3.ts的严格规范书写
- 4.加载是骨架屏的实现
- 5.封装组合式函数在composables中方便复用
- 6.在会员中心设置实现了分包和预下载(pagesMember中放着分包)
- 7.由于小程序tabar页没有返回上一级的选项,所以购物车需要分成一个tabar页和一个普通页去加载,这样实现详情页到购物车跳转能够返回上一级
- 8.在订单详情页实现uni的动画效果(导航栏动画效果,根据滚动位置而不断改变动画的进度。)
- 9.订单支付重点,生产环境获取支付参数Api,发起微信支付,跳转到支付结果页.开发环境模拟支付Api,后端直接修改为待发货,跳转支付结果页
- 10.通过uniapp对不同端不同平台进行一个编译打包处理,利用#ifdef #endif 这个注释来对不同端进行打包减少(比如属于微信的功能代码不会打包到h5端)
- 11.跨端兼容性问题

### 技术栈

- 前端框架：[uni-app](https://uniapp.dcloud.net.cn/) (Vue3 + TS + Setup)
- 状态管理：[pinia](https://pinia.vuejs.org/zh/)
- 组件库：[uni-ui](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html)

## 运行程序

1. 安装依赖

```shell
# npm 镜像下载
npm i --registry=https://registry.npmmirror.com

# pnpm 镜像下载
pnpm i --registry=https://registry.npmmirror.com
```

2. 运行程序

```shell
# 微信小程序端
npm run dev:mp-weixin

# H5端
npm run dev:h5

# App端
需 HbuilderX 工具，运行 - 运行到手机或模拟器
```

3. 微信开发者工具导入 `/dist/dev/mp-weixin` 目录

### 工程结构解析

```
├── .husky                     # Git Hooks
├── .vscode                    # VS Code 插件 + 设置
├── dist                       # 打包文件夹（可删除重新打包）
├── src                        # 源代码
│   ├── components             # 全局组件
│   ├── composables            # 组合式函数
│   ├── pages                  # 主包页面
│       ├── index               # 首页
│       ├── category            # 分类页
│       ├── cart                # 购物车
│       ├── my                  # 我的
│       └── login               # 登录页
│   ├── services               # 所有请求
│   ├── static                 # 存放应用引用的本地静态资源的目录
│       ├── images              # 普通图片
│       └── tabs                # tabBar 图片
│   ├── stores                 # 全局 pinia store
│       ├── modules             # 模块
│       └── index.ts            # store 入口
│   ├── styles                 # 全局样式
│       └── fonts.scss          # 字体图标
│   ├── types                  # 类型声明文件
│       └── component.d.ts      # 全局组件类型声明
│   ├── utils                  # 全局方法
│   ├── App.vue                # 入口页面
│   ├── main.ts                # Vue初始化入口文件
│   ├── pages.json             # 配置页面路由等页面类信息
│   ├── manifest.json          # 配置appid等打包信息
│   └── uni.scss               # uni-app 内置的常用样式变量
├── scripts
    └──dns-prefetch.js         # 打包时DNS解析配置优化 目前只配置了h5端打包优化
├── .editorconfig              # editorconfig 配置
├── .eslintrc.cjs              # eslint 配置
├── .prettierrc.json           # prettier 配置
├── .gitignore                 # git 忽略文件
├── index.html                 # H5 端首页
├── package.json               # package.json 依赖
├── tsconfig.json              # typescript 配置
└── vite.config.ts             # vite 配置
```
