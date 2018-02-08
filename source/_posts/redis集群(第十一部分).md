title: redis集群(第十一部分)
author: 夏茂盛
tags:
  - 教程| redis教程 |  redis集群
categories:
  - redis
date: 2018-02-08 11:42:32
---
##### redis集群 

1. 主从备份(防止主机宕机)
2. 读写分离(主机写，从机读，分担master的任务)
3. 任务分离(服务器分别分担备份工作与计算工作)

##### redis主从备份原理及通信过程
**主从备份原理图**

![redis主从备份原理图](/image/redis1.png)
 
第2种方式的好处:  
master宕机后,可以直接切换到slave1，不需要slave2重新指向slave1.

**主从通信过程**：

![redis主从通信过程](/image/redis2.png)

##### redis主从集群配置：

**Master配置**:
1. 关闭rdb快照(备份工作交给slave)。
2. 可以开启aof。

**slave配置**:
1. 声明slave-of。
2. 配置密码[如果master有密码]。
3. [某1个]slave打开 rdb快照功能。
4. 配置是否只读[slave-read-only]。
5. 改变端口。

我的是 6379端口作为master；6380，6381作为slave.  
     6379关闭rdb持久化，开启aof持久化  
     6380开启rdb持久化，关闭aof持久化  
     6381关闭rdb持久化，开启aof持久化  
**运行结果**：(没有设置密码)  
~~~
[centos@localhost bin]$ ./redis-cli -p 6379
127.0.0.1:6379> set aa 123
OK
127.0.0.1:6379> get aa
"123"
~~~
~~~
[centos@localhost bin]$ ./redis-cli -p 6380
127.0.0.1:6380> get aa
"123"
127.0.0.1:6380> set aa
(error) ERR wrong number of arguments for 'set' command
~~~
~~~
[centos@localhost bin]$ ./redis-cli -p 6381
127.0.0.1:6381> get aa
"123"
127.0.0.1:6381> set aa
(error) ERR wrong number of arguments for 'set' command
~~~
那么该如何**设置密码**呢？  
master：requirepass 123  
slave： masterauth 123  
      requireauth 123  
如果主从服务器密码不一致，从服务器无法获得主服务器数据。  
~~~
[centos@localhost bin]$ ./redis-cli -p 6379
127.0.0.1:6379> set cc 123
(error) NOAUTH Authentication required.
127.0.0.1:6379> auth 123
OK
127.0.0.1:6379> set cc 123
OK
~~~
~~~
[centos@localhost bin]$ ./redis-cli -p 6380
127.0.0.1:6380> get cc
(error) NOAUTH Authentication required.
127.0.0.1:6380> auth 123
OK
127.0.0.1:6380> get cc
"123"
~~~
**redis主从复制的缺陷**：  
每次slave断开后(无论是主动断开,还是网络故障)，再连接master，都要master全部dump出来rdb,再aof,即同步的过程都要重新执行1遍.
所以要**记住**---多台slave不要一下都启动起来,否则master可能IO剧增。
 