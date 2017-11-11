title: 用hexo极速搭建博客
author: 夏茂盛
tags:
  - 教程| Hexo教程 | Hexo快速搭建
categories:
  - Hexo
date: 2017-11-10 21:04:00
---
hexo是一个非常轻量且快速的博客生成框架，可以使用markdown便捷的生成文章。

本文主要介绍windows下如何搭建hexo5.1.3+环境并发布至github。默认读者具有命令行使用经验和一定的web编程基础。

hexo搭建完成后只需要三步就可以完成博文的更新。

``` bash
  hexo n  # 新建
  hexo g  # 生成
  hexo d  # 发布

```

下面介绍windows下如何搭建hexo5.1.3环境并发布至github


### 环境准备

#### 安装node.js

到[node.js](https://nodejs.org/zh-cn/)官网下载node.js并安装。我使用的是win8.1x64下的8.9.1版。

#### 安装Git

git客户端很多，我使用的是git官方提供的工具，下载速度可能较慢。

#### 安装sublime（非必须）

作为一个小前端，sublime作为编辑器实在是不能再好用，不过这个只是文本编辑器使用，大家可以根据喜好自由选择工具，切记不要使用windows自带的记事本。

#### Github

我们使用Github官方提供的Github Pages这一服务作为静态博客的服务器。申请Github账户和与git通过ssh建立连接网上很多详细的教程，此处不再赘述。

[GitHub Help - Generating SSH Keys](https://help.github.com/articles/generating-an-ssh-key/)

### hexo安装

node.js和git安装好后，建议使用git提供的命令行窗口进行操作。

** windows自带的cmd会报错。**

执行如下命令可安装hexo：

``` bash  
  npm install -g hexo
```
### hexo初始化

执行init命令初始化hexo到你指定的目录。

``` bash
  hexo init <folder>  #folder为你指定的目录

```
或者cd到你的指定目录，执行** hexo init **

至此，hexo的安装工作已经完成。

#### hexo必备插件

``` bash
   $ npm install hexo-generator-index --save #索引生成器
   $ npm install hexo-generator-archive --save #归档生成器
   $ npm install hexo-generator-category --save #分类生成器
   $ npm install hexo-generator-tag --save #标签生成器
   $ npm install hexo-server --save #本地服务
   $ npm install hexo-deploy-git --save #hexo通过git发布（必装）
   $ npm install hexo-render-market@0.2.7 --save #渲染器
   $ npm install hexo-render-stylus@0.3.0 --save #渲染器
```

### 生成静态页面

cd至之前初始化的目录，执行如下命令，即可生成静态页面至public目录

``` bash
   $ hexo g
```

### 本地启动

执行如下命令，启动本地服务器，进行预览。
必须安装hexo-server插件，不然无法启动本地服务器。

``` bash
   $ hexo s
```

浏览器输入localhost：4000即可访问默认的hexo博客效果。

** 注意：** hosts文件中localhost是否被占用以及4000端口可能被福昕阅读器占用。

### 发布

编辑hexo根目录下的_config.yml文件，找到最下面的deploy，我使用的是hexo5.1.3为如下格式。

``` bash
    deploy:
     type: git
     repo: https://github.com/hanweizhe/hanweizhe.hithub.io.git #你的Github Pages的https链接
     branch: master
```

保存配置文件后，执行如下命令：

``` bash
    $ hexo d
```
** 注意： **  yml格式文件冒号后面必须加一个空格。

执行完毕后访问hanweizhe.github.io即可看到部署在Github上的默认博客，第一次发布可能会有10分钟的延迟。

至此，hexo已经成功帮助我们生成了一个博客，非常的方便。


### 附录

#### 常用命令：

``` bash
  $　hexo new "postName" #新建文章
  $  hexo new page "pageName" #新建页面
  $  hexo generate #根据source目录md文件生成静态页面至public目录
  $  hexo server #开启预览访问端口（默认端口4000，'ctrl+c'关闭server）
  $  hexo deploy #将.deploy目录部署到Github
  $  hexo help #查看帮助
  $  hexo vwesion #查看Hexo的版本
```
#### 简写：

``` bash
   hexo g == hexo generate
   hexo s == hexo server
   hexo d == hexo deploy
   hexo n == hexo new 
```

坑：

1. 有时会出现首页只有一篇文章的情况，这个时候需要hexo渲染两次，原因不明。
2. 标题中不能含有[]，否则无法编译。