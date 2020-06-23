# Node 综合 Web 案例

a node project to blog

## 依赖库及中间件

```
node              后台技术
express           服务器框架
mongodb           非关系型数据库
mongoose          数据库操作插件
art-template      模板引擎
body-parser       post 请求中间件
express-session   session 中间件
blueimp-md5       加密技术中间件

```

## 目录结构

```
.
|-- app.js                项目的入口文件
|-- controllers
|-- models                存储使用 mongoose 设计的数据模型
|-- node_modules
|-- public                公共的静态资源
|-- routes                如果业务复杂，代码量大，最好把路由按照业务分类放到此目录
|-- router                简单业务把所有的路由都放到此文件
|-- views                 存储视图目录
|-- package-lock.json
|-- package.json
|-- README.md
```

## 路由设计

| 路径      | 方法 | get 参数 | post 参数               | 是否需要登录 | 备注         |
| --------- | ---- | -------- | ----------------------- | ------------ | ------------ |
| /         | get  |          |                         |              | 渲染首页     |
| /register | get  |          |                         |              | 渲染注册页面 |
| /register | post |          | email,nickname,password |              | 处理注册请求 |
| /login    | get  |          |                         |              | 渲染登录页面 |
| /login    | post |          | email,password          |              | 处理登录请求 |
| /logout   | get  |          |                         |              | 用户退出     |
