### zp-mall 微信小程序商城

> 基于 uni-app 框架开发的微信小程序项目基础模板。本项目使用 `vue-cli` 创建。

### 目录结构说明

```
src
│
├── config
│   ├── index.js                         配置对外暴露文件
│   └── api.js                           接口列表
│
├── common
│   ├── components                       自定义组件
│   ├── mixins                           局部或全局混入文件
│   └── utils                            工具函数
│
├── services
│   ├── common                           公用服务类
│   │   ├── addressService               地址服务类
│   │   ├── cartService                  购物车服务类
│   │   ├── goodsService                 商品服务类
│   │   ├── orderService                 订单服务类
│   │   ├── userService                  用户服务类
│   │   └── platformService              平台服务类
│   └── page                             用来存放页面的服务类，用来获取数据、转换数据、以及封装一些不涉及界面交互的逻辑。
│
├── static                               图片等静态资源
├── pages                                页面
├── store                                全局公共数据
├── main.js                              Vue初始化入口文件
├── App.vue                              应用配置，用来配置App全局样式以及监听
├── manifest.json                        配置应用名称、appid、logo、版本等打包信息
├── pages.json                           配置页面路由、导航条、选项卡等页面类信息
├── uni.scss                             uni-app内置的常用样式变量文件
├── .prettierrc.js                       prettier配置
└── jsconfig.json                        js语言特性配置
```

### 基础使用

```bash
# 克隆
git clone **

# 进入根目录
cd zp-mall-wechat

# 安装依赖
npm install

# 本地运行，编译完成后在dist目录下生成dev/mp-weixin目录，使用微信开发者工具打开该目录
npm run serve

# 生产打包，编译完成后在dist目录下生成build/mp-weixin目录，使用微信开发者工具打开该目录进行上传发布
npm run build

# 其他支持的运行命令参见package.json
```

> 如使用`HbuilderX`编辑器，可直接使用编辑器菜单进行运行或发布，详见[链接](https://uniapp.dcloud.io/quickstart-hx?id=%e8%bf%90%e8%a1%8cuni-app)

### `uni-ui`组件库使用

本项目中安装了 `uni-ui` 插件，并且在`pages.json`做了`easyCom`配置，需要使用`uni-ui`中的组件直接在各页面中使用即可：

```js
<template>
	<uni-icons type="contact" size="30"></uni-icons>
</template>
```

### `VS Code` 中 `Prettier` 自动格式化配置

1. 安装插件 `Prettier - Code fromatter` 并启用。
2. `VS Code` --> `File` --> `Preference` --> `Settings` ---> `Text Editors` --> `Formatting` 勾选 `Formate on Save|Paste|Type`。
3. `VS Code` --> `File` --> `Preference` --> `Settings` ---> `Extensions` --> `Prettier` --> `Use Editor Config` 移除勾选。
4. 如果上述配置结束，仍然无法在保存时自动进行代码格式化，在任一`vue`或`js`文件中右键选择`Format Document With...`，选择`Prettier`即可。

### `HbuilderX`自动格式化配置

需要通过 `eslint` 来实现，参考文章[链接](https://ask.dcloud.net.cn/article/37070)。本项目暂未配置。

### 项目截图

![image](https://github.com/Snail-Lu/imageGalleries/blob/main/images/image_20210715161503.png?raw=true)
![image](https://github.com/Snail-Lu/imageGalleries/blob/main/images/image_20210715162441.png?raw=true)

### 文档

[1. uniapp 文档](https://uniapp.dcloud.net.cn/)  
[2. 微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)  
[3. uni-ui 文档](https://ext.dcloud.net.cn/plugin?id=55)  
[4. 接口文档--暂无]()
