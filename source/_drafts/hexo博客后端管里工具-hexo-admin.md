title: hexo博客后端管里工具---hexo-admin
author: 夏茂盛
tags:
  - 教程| Hexo教程 | Hexo博客后端管里工具
categories:
  - Hexo
date: 2017-12-15 11:15:00
---
#### 前言

最近又重新折腾和整理啦一下自己的博客，发现每次写博客都会进入`修改->启动hexo server->修改`的回圈，进入一个非常麻烦的过程，有没有好的解决方案呢？？？困惑？肯定有呀！！也就是我接下来要介绍的[hexo-admin](https://jaredforsyth.com/hexo-admin/)

![“hexo-admin”](/image/hexo.jpg) 

#### 安装插件
hexo-admin 这款插件的安装也非常简单，通过简单的npm就可以一键安装啦。进入搭建好的博客目录，执行安装指令，启动hexo的server，在本地就可以进行文章的管理与发布啦。

```bash
cd hexohexo
npm install -save hexo-admin
hexo server -d
open http://localhost:4000/admin/

```
#### 功能

其实我是边写这篇博客，边了解这个插件功能的，发现很多优点：

- **即时保存** 
  在网页上直接写博客，不用进行额外的保存。这款插件会每隔几秒钟就会自动保存一次，再也不怕忘记保存啦。但是习惯了常常默认按ctrl+s来保存，变成了保存网页，哈哈。
我们可以发现目录架构中增加了两个文件夹，hexo-admin在原来hexo的基础上加入了draft和discarded来保存我们的草稿和删除的markdown。不用怕误删，也不用怕自己没写好的草稿，不小心就发布出去啦。

- **即时渲染**
会发现如果你是在修改当前页面的markdown文件，server上也会动态发生效果，就可以发现效果已经变啦。

#### 总结
2017年已经接近尾端，一个晴朗的白天，放下作业，整理一下自己的思绪，写写总结。无意中间发现这么一款管理博客的神器，也是蛮开心的！以后自己写东西也会方便很多！