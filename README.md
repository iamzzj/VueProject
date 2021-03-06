# VueProject
vue

---

# BootCDN

https://www.bootcdn.cn/

---

# Vue-Cli

## 安装

npm install -g @vue/cli

## 版本

vue --version

## 创建

### 命令行创建

vue create hello-world

#### 第一步：

* default（默认）

* Manually select features（手动）

  空格选中，取消选中

  * Babel（常用）
  * TypeScript
  * Progressive Web APp（PWA）Support
  * Router （常用，路由）
  * Vuex （常用，状态控制）
  * Css Pre-processors （常用，CSS预编译）
  * Linter / Formatter （常用）
  * Unit Testing
  * E2E Testing

#### 第二步：

use history mode for roter？y

#### 第三步：

pirck a CSS pre-processor

* Sass/SCSS （常用）
* Less
* Stylus

#### 第四步：

Pick a linter / formater confine：(代码的规则，代码更优美)

* ESLint with error prevention only
* ESlint  + Airbnb config （常用 ✅）
* ESlint + Standard config （常用）
* ESlint + Prettier

#### 第五步：

Pick additional lint features：

* Lint on save （默认 保存做检查）
* Lint and fix on commit （更新做检查）

#### 第六步：

* In dedicated config files （默认的配置）
* In package.json 

#### 第七步：

Save this as a preset for future projects? (保存当前的这次配置文件) n

### 界面创建

vue ui

#### 第一步

 Starting GUI...

 Ready on http://localhost:8000/

在浏览器打开http://localhost:8000/

#### 第二步

Create -》 create a new project here

#### 第三步 详情 

项目文件夹 hello-ui

包管理器 npm

#### 第四步 预设

手动 手动配置项目

#### 第五步 功能

* Babel（常用）
* TypeScript
* Progressive Web APp（PWA）Support
* Router （常用，路由）
* Vuex （常用，状态控制）
* Css Pre-processors （常用，CSS预编译）
* Linter / Formatter （常用）
* Unit Testing
* E2E Testing
* 使用配置文件 （常用）

#### 第六步 配置

use history mode for router? 

Pick aCss pre-processor:Sass/SCSS

Pick a linter / formatter config: ESLinet + Standard config

Pick additional lint features:

Lint on save: y

Lint and fix on commit: n

#### 第七步 保存预设（是否保存为配置文件，让以后的项目直接使用）

vuex+router



## 运行

cd hello-world

npm run serve

---



# 组件化思想

## 什么事组件化？

* 独立的
* 复用的
* 整体化的

## 为什么要组件化？

* 实现功能模块的复用
* 高执行效率
* 开发单页面复杂应用

## 如何进行拆分？

* 300 行原则
* 复用原则
* 业务复杂性原则

## 组件化带来的问题：

* 组件状态管理（vuex）
* 多组件的混合使用，多页面，复杂业务（vue-router）
* 组件间的传递参数，消息，事件管理（props，emit/on， bus）



# Vue代码规范

## 风格指南

* 好习惯，少走坑
* 写出自己看得懂的代码
* 写出别人看得懂的代码



# Vue-router



# VueX

## 单向数据流的概念

Actions >> State >> View

## Vuex介绍

* 多个视图依赖于同一状态（例如：菜单导航）
* 来自不同视图的行为需要变更同一状态（例：评论弹幕）
* 为Vue.js开发的状态管理模式
* 组件状态集中管理
* 组件状态改变遵循统一的规则

