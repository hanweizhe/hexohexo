title: redis运维命令(第十二部分)
author: 夏茂盛
tags:
  - 教程| redis教程 | redis运维命令
categories:
  - redis
date: 2018-02-09 10:20:52
---
redis的一些运维命令：
~~~
redis 127.0.0.1:6380> time  //显示服务器时间
1) "1375270361" //时间戳(秒)
2) "504511"   //时间戳(微秒数)
~~~
~~~
redis 127.0.0.1:6380> dbsize  // 查看当前数据库的key的数量
(integer) 2
redis 127.0.0.1:6380> select 2
OK
redis 127.0.0.1:6380[2]> dbsize
(integer) 0
~~~
~~~
bgrewriteaof  后台进程重写AOF
bgsave       后台保存rdb快照
save         保存rdb快照
lastsave     上次保存时间
slaveof master-host port  把当前实例设为master的slave
slaveof no one  把当前实例slave变为mater，关闭复制功能，原来同步数据不会丢失(上面两个命令一般一起使用:主机宕机)
flushall  清空所有库所有键 
flushdb   清空当前库所有键
shutdown [save/nosave]  关闭客户端，save，刷新aof文件，关闭redis服务进程
slowlog len  查询slowlog总条数
slowlog get [number]  打印所有(指定数量)slowlog
slowlog reset  清空slowlog
config get 配置项  动态获得配置文件中配置项的值
config set 配置项 值  动态设置配置文件中配置项的值(特殊的选项,不允许用此命令设置,如slave-of, 需要用单独的slaveof命令来设置)
Info [Replication/CPU/Memory..]  查看redis服务器的信息
~~~
**注**: 如果不小心运行了flushall,立即shutdown nosave,关闭服务器.然后手工编辑aof文件,去掉文件中的"flushall"相关行,然后开启服务器,就可以导入回原来数据.  
不幸的是,如果flushall之后,系统恰好bgrewriteaof了,那么aof就清空了,数据丢失.   
**slowlog**:用于记录**慢查询执行时间**(单单是执行一个查询命令所耗费时间)的日志系统，由于slowlog保存在内存中，所以slowlog的效率很高。  
**注**:
1. 多慢才叫慢?   
答: 由slowlog-log-slower-than 10000 ,来指定slowlog的界限(单位是微秒)，只有query执行时间大于定义的才会定义成慢查询，才会被slowlog进行记录。
2. 服务器储存多少条慢查询的记录?
答: 由 slowlog-max-len 128 ,来做限制，当slowlog超过设定的最大值后，会将最早的slowlog删除，是个FIFO队列。

**redis运维时需要注意的参数**:
1. 内存Memory  
used_memory:859192  数据结构的空间  
used_memory_rss: 7634944 实占空间  
mem_fragmentation_ratio:8.89 前2者的比例,1.N为佳,如果此值过大,说明redis的内存的碎片化严重,可以导出再导入一次.
2. 主从复制Replication   
role:slave  
master_host:192.168.17.128  
master_port:6379  
master_link_status:up  
3. 持久化Persistence  
rdb_changes_since_last_save:0  
rdb_last_save_time:1375224063  
4. 耗时fork  
latest_fork_usec:936  上次导出rdb快照,持久化花费微秒  
**注意**: 如果某实例有10G内容,导出需要2分钟,每分钟写入10000次,导致不断的rdb导出,磁盘始处于高IO状态.
5. 慢日志slowlog  
config get/set slowlog-log-slower-than  
config get/set slowlog-max-len   
slowlog get N 获取慢日志