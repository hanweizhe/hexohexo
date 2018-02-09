title: redis主从切换(第十三部分)
author: 夏茂盛
tags:
  - 教程| redis教程 | redis主从切换
categories:
  - redis
date: 2018-02-09 14:52:09
---
redis主从复制可将主节点数据同步给从节点，一旦主节点宕机，某一从节点晋升为主节点，并且还需要把只读配置修改为可写，其余从节点重新指向新的主节点。那么该如何操作呢？？不着急！很简单！！哦哦哦！！
##### 人工干预
我的master是6379；slave是6380和6381；当6379宕机后，6380为主节点，6381为从节点。  
在6380客户端进行操作:**slave no one**,将6380设置为主节点，**config set slave-read-only no**将6380设置为可写。  
在6381客户端进行操作：**slaveof localhost 6380**将主节点设置为6380。  
经过上面3步操作即可完成主从切换，是不是很简单呢？  
思考一下，redis主机宕机属于随机，不确定，能不能自动监控进行主从切换呢？redis给出来解决方案，那就是**redis sentinel**。
##### redis sentinel
redis sentinel是一个分布式架构，包含若干个sentinel节点和redis数据节点，每个sentinel节点会对数据节点和其余的sentinel节点进行监控，当发现节点不可用时，会对相应的节点进行下线标识。  
如果被标识的节点为master，它会和其余的sentinel节点进行协商，当大部分的sentinel节点都认为master不可用时，他们按照slave优先级(可配置 slave-priority,默认为100)，选出一个sentinel节点来完成主从切换操作，同时将这个变化通知给redis应用方。
![redis主从切换](/image/redis3.png)
如果被标识的节点为slave，直接通知master去除该slave。  
**疑问**: sentinel与master通信,如果某次因为master IO操作频繁,导致超时,此时,认为master失效,很武断。  
解决: sentnel允许多个实例看守1个master, 当N台(N可设置)sentinel都认为master失效,才正式失效。  
**sentinel选项配置(sentinel.conf)**:  
port 26379 # 端口  
sentinel monitor mymaster 127.0.0.1 6379 2 #mymaster是master的别名，127.0.0.1 6379是当前sentinel节点监控的master，2代表判断master宕机至少需要2个sentinel节点同意。  
sentinel down-after-milliseconds mymaster 30000  #多少毫秒后连接不到master认为宕机。  
sentinel parallel-syncs mymaster 1  #一次性修改几个slave指向新的master，每次向新的master发起复制操作的slave个数。  
我的部署:

|role|IP|port|
|:----:|:----:|:----:|
|master|127.0.0.1|6379|
|slave|127.0.0.1|6380|
|slave|127.0.0.1|6381|
|sentinel1|127.0.0.1|26379|
|sentinel2|127.0.0.1|26380|
|sentinel3|127.0.0.1|26381|

**sentinel启动**:  
两种方法：
1. redis-sentinel sentinel.conf
2. redis-server sentinel.conf --sentinel
