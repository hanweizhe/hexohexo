title: redis对于set集合的操作(第五部分)
author: 夏茂盛
tags:
  - 教程| redis教程 | redis对于set集合的操作
categories:
  - redis
date: 2018-02-06 15:34:32
---
说到集合，大家肯定不陌生，初中高中都学过。是不是呢???   
**集合的性质**: 唯一性,无序性,确定性。  
**注**: 在string和lists的命令中,可以通过range 来访问string中的某几个字符或某几个元素 ,但,因为**集合的无序性,无法通过下标或范围来访问部分元素**.因此想看元素,要么随机选一个,要么全选。
~~~
sadd key  value1 value2
~~~
作用: 往集合key中增加元素。
~~~
smembers key
~~~
作用: 返回集合key中所有的元素。
~~~
scard key
~~~
作用: 返回集合中元素的个数。
~~~
srem key  value1 value2
~~~
作用: 删除集合key中值为 value1 value2的元素。  
返回值: 忽略不存在的元素后,真正删除掉的元素的个数。
~~~
spop key
~~~
作用: 返回并删除集合中key中1个随机元素。
~~~
srandmember key
~~~
作用: 返回集合key中,随机的1个元素。
~~~
sismember key  value
~~~
作用: 判断value是否在key集合中。
是返回1,否返回0。
~~~
smove source dest value
~~~
作用:把source中的value删除,并添加到dest集合中。
~~~
sinter  key1 key2 key3
~~~
作用: 求出key1 key2 key3 三个集合中的交集,并返回。
~~~
redis 127.0.0.1:6379> sadd s1 0 2 4 6
(integer) 4
redis 127.0.0.1:6379> sadd s2 1 2 3 4
(integer) 4
redis 127.0.0.1:6379> sadd s3 4 8 9 12
(integer) 4
redis 127.0.0.1:6379> sinter s1 s2 s3
1) "4"
redis 127.0.0.1:6379> sinter s3 s1 s2
1) "4"
~~~
~~~
sinterstore dest key1 key2 key3
~~~
作用: 求出key1 key2 key3 三个集合中的交集,并赋给dest。
~~~
sunion key1 key2.. Keyn
~~~
作用: 求出key1 key2 keyn的并集,并返回。
~~~
sdiff key1 key2 key3 
~~~
作用: 求出key1与key2 key3的差集。即key1-key2-key3 
