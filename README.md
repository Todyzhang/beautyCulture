# app

> sn first app for vue and mui
## 模板文档
[使用文档](https://github.com/aOrz/vue-template-for-hbuilder/edit/master/README.md)
## Build Setup

``` bash
# install dependencies
npm install

# 自动编译结果到指定文件夹
npm run dev

# serve with hot reload at localhost:8080
npm run webdev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

HBuilder8.9 调试夜神安卓模拟器方法
1.安装 夜神安卓模拟器 下载地址：http://www.yeshen.com/
2.运行模拟器，打开模拟器安装目录，找到~/Nox/bin/debugReport.bat，双击运行，得到端口信息：62001
nox adb port:62001
adb server is out of date.  killing...
ADB server didn't ACK

3.运行HBuilder
4.打开cmd切到模拟器~/Nox/bin/，运行：nox_adb content 127.0.0.1:62001，设置模拟器端口连接
5.再在cmd里切到HBuilder安装目录，~/HBuilder/tools/adbs/,运行：adb content 127.0.0.1:62001,设置HBuilder端口连接
6.在HBuilder里按ctrl+r运行项目，就可直接在模拟器中看到app结果
# beautyCulture
