###  start to 2017.8.18 ###
#### applet recruitment web developing ####

- - -

##  小程序测试版本  ##
### 目录结构说明： ###

* common 目录

```javascript
    config/config.js   API配置文件
    config/login.js    当用户长时间未操作时，后台接口返回未登录时，调用该微信接口，后期还有待优化

    wxss/animate.wxss  全局动画样式（需要时引用）
    wxss/common.wxss   全局样式 （每个子样式文件都需引用）
    wxss/tabheader.wxss 页面头部切换按钮样式
```

* data

```javascript
    fonts/fonts.wxss   base64字体图标文件（使用说明：需要先将已做好的字体文件.ttf，通过在线字体转换网站（http://www.font2web.com），转成另外几种格式的字体文件，然后通过Gulp，生成base64字体文件，小程序中只需引用生成的这个base64文件即可）

```

* pages

```javascript
    小程序项目文件

```

* static

```javascript
    静态资源文件

```

* utils

```javascript
    自定义封装的模块，便于项目引用

```

* wxParse

```javascript
    微信小程序解析html富文本插件wxParse。（从后台UEditor编辑器发布的内容会自带html标签和样式，小程序wxml默认解析不了，需要引用该插件来解析）

```

* app.js  小程序入口文件

* app.json  小程序公共设置

* app.wxss  小程序公共样式表