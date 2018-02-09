title: redis持久化(第十部分)
author: 夏茂盛
tags:
  - 教程| redis教程 |  redis持久化
categories:
  - redis
date: 2018-02-07 15:58:35
---
所谓持久化就是把数据存储于断电后不会丢失的设备中，通常是硬盘。 
Redis的持久化有2种方式:  
1. rdb快照持久化：将数据库的快照以二进制的方式保存到磁盘中。  
2. aof日志持久化：将所有对数据库进行写入的命令(及其参数)记录到aof文件中，以达到记录数据库状态的目的。

##### rdb快照持久化 
rdb的工作原理：每隔**'N分钟N个关键字'**发生变化后，从内存dump数据形成rdb文件，**'压缩'**，放在**'备份目录'**。  
**注**：上面带引号的粗体都可以进行配置。   
rdb快照的配置选项：(redis.conf配置文件)  
save 60 10000  // 如果60秒内有10000个关键字发生变化,则产生快照。  
save 300 1000  // 如果300秒内有1000个关键字发生变化,则产生快照。  
save 900 1    //如果900秒内有1个关键字发生变化,则产生快照。   
(这3个选项都屏蔽,则rdb禁用)   
**小技巧**：redis-benchmark -n 10000 //利用redis的测试工具一次执行10000个命令。 
刷新快照到硬盘中，必须满足两者(时间，关键字发生变化的数量)要求才会触发。  
stop-writes-on-bgsave-error yes  // 后台备份进程出错时,主进程是否停止写入。  
rdbcompression yes    // 导出的rdb文件是否压缩。  
rdbchecksum yes     // 导入rbd恢复数据时,要不要检验rdb的完整性。  
dbfilename dump.rdb  //导出来的rdb文件名。  
dir ./  //rdb的放置路径目录  
**缺陷**：在两个保存点之间断电，刚修改的有些数据还没有达到备份时间，将会丢失1—N分钟的数据。  

##### aof日志持久化
aof (append only file)的配置
appendonly no # 是否打开aof日志功能。

appendfsync always # 每1个命令,都立即同步到aof. 安全,速度慢。
appendfsync everysec # 折衷方案,每秒写1次。  
appendfsync no # 写入工作交给操作系统,由操作系统判断缓冲区大小,统一写入到aof.同步频率低,速度快。  

no-appendfsync-on-rewrite yes: # 正在导出rdb快照的过程中,要不要停止同步aof。  
auto-aof-rewrite-percentage 100 #aof文件大小比起上次重写时的大小,增长率100%时,重写。  
auto-aof-rewrite-min-size 64mb #aof文件,至少超过64M时,重写。  
(上面这两个条件增长率及文件大小同时满足时触发自动的aof重写)   
**另外**: aof重写也可以由用户调用BGREWRITEAOF手动触发。  
**小技巧**：ll  -h  //查看文件夹下文件大小  
##### 问题

1. 在dump rdb过程中,aof如果停止同步,会不会丢失?  
答: 不会,所有的操作缓存在内存的队列里, dump完成后,统一操作。
2. aof重写是指什么?  
答: aof重写是指把内存中的数据逆化成命令,写入到aof日志里.以解决aof日志过大的问题。
3. 如果rdb文件,和aof文件都存在,优先用谁来恢复数据?  
答: aof。
4. 开始rdb文件有内容，开启aof选项，重启redis，为什么现在redis中没有数据啦？  
答:开启aof选项，产生一个空的aof文件，rdb和aof文件都有，优先用aof(空)文件来恢复数据。
5. 2种(rdb快照持久化与aof日志持久化)是否可以同时用?  
答: 可以,而且推荐这么做。
6. 恢复时rdb和aof哪个恢复的快？  
答: rdb快,因为其是数据的内存映射,直接载入到内存,而aof是命令,需要逐条执行。
7. 原来一个key值为1，对同一个key操作100次(假如每次增加1)，最后key的值为101，aof产生100行记录,aof文件会很大,怎么解决?恢复的时候一条一条执行慢，为什么不直接执行最后一条命令？  
答: aof重写就是为了把那些重复命令精简成几条命令进行重新写入aof文件。

##### 报错权限问题
chmod -R 777 bin
1. 添加aof功能后,可能redis服务启动不起来，把存放aof文件的权限修改一下就行.
2. redis在shutdown的时候,会进行save操作,而save操作需要dump.rdb文件,如果没有权限会报错误
    
