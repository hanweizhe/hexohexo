title: redis的事务(第八部分)
author: 夏茂盛
tags:
  - 教程| redis教程 | redis的事务
categories:
  - redis
date: 2018-02-07 11:03:56
---
Redis支持简单的事务  
Redis与 mysql事务的对比:

||Mysql|Redis|
|:----:|:----:|:----:|
|开启|start transaction|multi|
|语句|普通sql|普通命令|
|失败|rollback 回滚|discard 取消|
|成功|commit|exec|
**注**: rollback与discard 的区别:  
如果已经成功执行了2条语句, 第3条语句出错.  
Rollback后,前2条的语句影响消失.  
Discard只是结束本次事务,前2条语句造成的影响仍然还在.  
注:
在multi后面的语句中, 语句出错可能有2种情况:
1. 语法就有问题, 这种exec时报错, 所有语句得不到执行.
2. 语法本身没错,但适用对象有问题. 比如 zadd 操作list对象,Exec之后,会执行正确的语句,并跳过有不适当的语句.
(如果zadd操作list这种事怎么避免? 这一点,由程序员负责)

**思考**: 
我正在买票  
Ticket -1 , money -100  
而票只有1张, 如果在我multi之后,和exec之前, 票被别人买了---即ticket变成0了.  
我该如何观察这种情景,并不再提交.  
**悲观的想法**: 
世界充满危险,肯定有人和我抢, 给 ticket上锁, 只有我能操作. [**悲观锁**]  
**乐观的想法**:
世界美好,没有那么人和我抢,因此,我只需要注意,有没有人更改ticket的值就可以了.[**乐观锁**]  
**Redis的事务中,启用的是乐观锁,只负责监测key没有被改动.**  
具体的命令----  watch命令  
例:  
~~~
redis 127.0.0.1:6379> watch ticket
OK
redis 127.0.0.1:6379> multi
OK
redis 127.0.0.1:6379> decr ticket
QUEUED
redis 127.0.0.1:6379> decrby money 100
QUEUED
redis 127.0.0.1:6379> exec
(nil)   // 返回nil,说明监视的ticket已经改变了,事务就取消了.
redis 127.0.0.1:6379> get ticket
"0"
redis 127.0.0.1:6379> get money
"200"
~~~
~~~
watch key1 key2  ... keyN
~~~
作用:监听key1 key2..keyN有没有变化,如果有变,则事务取消.
~~~
unwatch
~~~
作用: 取消watch命令对于所有key的监听.
