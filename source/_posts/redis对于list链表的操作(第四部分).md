title: redis对于List链表的操作(第四部分)
author: 夏茂盛
tags:
  - 教程| redis教程 | redis对于list链表的操作
categories:
  - redis
date: 2018-02-06 12:52:19
---
L代表左边头 R代表右边尾
~~~
lpush key value
~~~
作用: 把值插入到链表头部。
~~~
rpop key
~~~
作用: 返回并删除链表尾元素。  
rpush,lpop: 不解释
~~~
lrange key start  stop
~~~
作用: 返回链表中[start ,stop]中的元素。 
**规律**: 左数从0开始,右数从-1开始
~~~
lrem key count value
~~~
作用: 从key链表中删除 value值。  
**注**: 删除绝对值count个值为value后结束  
Count>0 从表头删除  
Count<0 从表尾删除

~~~
ltrim key start stop
~~~
作用: 剪切key对应的链表,切[start,stop]一段,并把该段重新赋给。key。
~~~
lindex key index
~~~
作用: 返回index索引上的值。
如  lindex key 2
~~~
llen key
~~~
作用:计算链表的元素个数。
~~~
redis 127.0.0.1:6379> llen task
(integer) 3
~~~
~~~
linsert  key after|before search value
~~~
作用: 在key链表中寻找’search’,并在search值之前|之后,插入value  
**注**: 一旦找到一个search(如果有多个值，找到第一个)后,命令就结束了,因此不会插入多个value。

##### 重要
~~~
rpoplpush source dest
~~~
作用: 把source的尾部拿出,放在dest的头部,并返回该单元值。   
**场景**: task + bak 双链表完成安全队列。
**业务逻辑**:
1. Rpoplpush task bak；
2. 接收返回值,并做业务处理；
3. 如果成功,rpop bak 清除任务。 如不成功,下次从bak表里取任务。
~~~
brpop | blpop  key timeout
~~~
作用:等待弹出key的尾/头元素。 
Timeout为等待超时时间
如果timeout为0,则一直等待

**场景**: 长轮询Ajax,在线聊天时,能够用到。