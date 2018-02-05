title: redis的特点及安装(第一部分)
author: 夏茂盛
tags:
  - 教程| redis教程 | redis特点及安装
categories:
  - redis
date: 2018-02-05 10:45:54
---
#### 前言
2017年已经接近尾声，最近自己在慧与实习(原惠普)也没啥事，闲暇之余，想起自己已经好久没有写博客，决定把redis的博客稍微写一写，相当于做一份笔记，以后方便查阅。

#### redis是啥呢

[redis的官方站点](https://redis.io/)

Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs and geospatial indexes with radius queries.

redis是开源(BSD许可),内存数据结构存储.可以当作数据库，缓存和信息代理使用。它支持的数据结构服务，有字符串、哈希表、列表、集合、有序集合范围查询，位图，hyperloglogs和半径查询地理信息的索引。

#### redis和memcached的简单比较

redis和memcached相比,独特之处:

1. redis可以用来做存储(storge)和缓存(cache), 而memcached只可以用来做缓存(cache)。这个特点主要因为其有”持久化”的功能.
**持久化简单一句话就是内存里面数据可以同步到光盘或硬盘等长久可以存储的设备上面。**
  
2. 存储的数据有”结构”,对于memcached来说,存储的数据,只有1种类型--”字符串”,而redis则可以存储字符串,链表,哈希结构,集合,有序集合.

#### redis下载安装
 
1. 官方站点: **redis.io** 下载最新版或者最新stable版
2. 解压源码并进入目录
3. 不用configure(生成makefile)
4. 直接make 编译(如果是32位机器 make 32bit;时间问题见末尾)
5. 可选步骤: make test  测试编译情况
(可能出现: need tcl  >8.4这种情况, yum install tcl)
6. make install安装到指定的目录
~~~  bash
$ wget http://download.redis.io/releases/redis-4.0.8.tar.gz
$ tar xzf redis-4.0.8.tar.gz
$ cd redis-4.0.8
$ make
$ make  PREFIX=/home/centos/redis/anzhuang install 注: PREFIX要大写
~~~
7. make install之后,得到如下几个文件
~~~
redis-benchmark  性能测试工具
redis-check-aof  日志文件检测工具(比如断电造成日志损坏,可以检测并修复)
redis-check-dump  快照文件检测工具,效果类上
redis-cli  客户端
redis-server 服务端
~~~
8. 复制配置文件(从redis的源码目录中复制redis.conf到redis的安装目录)
~~~
cp /path/redis.conf /home/centos/redis/anzhuang
~~~
9. 服务端启动与客户端连接(默认redis端口号为6379，启动方式为前台启动，就是服务端启动打开一个界面，不能关闭，重新开一个客户端界面进行连接)  
~~~
cd  /home/centos/redis/anzhuang/bin/
./redis-server redis.conf  服务端启动
./redis-cli [-h localhost -p 6379 ] 客户端连接
~~~
10. 让redis以后台进程的形式运行  

 编辑conf配置文件,修改如下内容：
~~~ bash
daemonize yes
~~~
至此，redis已经安装完成，是不是很简单呢？？Enjoy
~~~ bash
ps aux|grep redis  查看redis运行进程
redis-cli shutdown  关闭redis服务
/etc/init.d/redis-server start  启动redis
/etc/init.d/redis-server stop  关闭redis
/etc/init.d/redis-server restart  重启redis
~~~

**注**:Make编译时易碰到的问题,时间错误.
原因: 源码是官方configure过的,但官方configure时,生成的文件有时间戳信息,** Make只能发生在configure之后**
如果你的虚拟机的时间不对,比官方configure时间早
解决:
~~~ bash
date -s ‘yyyy-mm-dd hh:mm:ss’ 重写系统时间
clock -w  把当前系统时间写入CMOS中
~~~
#### 了解系统时间与CMOS时间关系
~~~
系统时间由linux操作系统来维护，CMOS时间是CMOS芯片保存的时间。系统启动时，操作系统将从CMOS读出时间记录为系统时间，同时操作系统每隔一段时间自动将系统时间写入CMOS中，如果使用date命令修改完系统时间后立即重启电脑，操作系统还没有将系统时间写入CMOS中，这样开机后就还是修改前的时间，为了保险起见，建议手动使用命令clock将系统时间写入CMOS中。
~~~