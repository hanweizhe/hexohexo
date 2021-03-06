title: redis对于order set有序集合的操作(第六部分)
tags:
  - 教程| redis教程 | redis对于order set有序集合的操作
categories:
  - redis
date: 2018-02-06 16:59:16
---
说到有序集合，大家是不是有点困惑，集合和有序集合有什么区别呢？  
所谓的有序集合就是比集合多啦一个score，这个就是有序集合能够有序进行排列的依据。
~~~
zadd key score1 value1 score2 value2 ..
~~~
添加元素到有序集合key。
~~~
redis 127.0.0.1:6379> zadd stu 18 lily 19 hmm 20 lilei 21 lilei
(integer) 3
~~~
~~~
zrange key start stop [WITHSCORES]
~~~
把集合排序后,返回名次[start,stop]的元素。
默认是升续排列。  
withscores 是把score也打印出来。
~~~
zcard key
~~~
返回有序集合key中元素个数。
~~~
zrank key member
~~~
查询member的排名(升续 0名开始)。
~~~
zrevrank key memeber
~~~
查询 member的排名(降续 0名开始)。
~~~
zrem key value1 value2 ..
~~~
作用: 删除集合中的元素。
~~~
zremrangebyscore key min max
~~~
作用: 按照socre来删除元素,删除score在[min,max]之间的元素。
~~~
redis 127.0.0.1:6379> zremrangebyscore stu 4 10
(integer) 2
redis 127.0.0.1:6379> zrange stu 0 -1
1) "f"
~~~
~~~
zremrangebyrank key start end
~~~
作用: 按排名删除元素,删除名次在[start,end]之间的元素。
~~~
redis 127.0.0.1:6379> zremrangebyrank stu 0 1
(integer) 2
redis 127.0.0.1:6379> zrange stu 0 -1
1) "c"
2) "e"
3) "f"
4) "g"
~~~
~~~
zrevrange key start stop
~~~
作用:把集合降序排列,取名字[start,stop]之间的元素。
~~~
zrangebyscore  key min max [withscores] limit offset N
~~~
作用: 集合(升续)排序后,取score在[min,max]内的元素,并跳过 offset个, 取出N个。
~~~
redis 127.0.0.1:6379> zadd stu 1 a 3 b 4 c 9 e 12 f 15 g
(integer) 6
redis 127.0.0.1:6379> zrangebyscore stu 3 12 limit 1 2 withscores
1) "c"
2) "4"
3) "e"
4) "9"
~~~
~~~
zcount key min max
~~~
返回score在[min,max] 区间内元素的数量。
****难理解
~~~
zinterstore destination numkeys key1 [key2 ...] 
[WEIGHTS weight [weight ...]] 
[AGGREGATE SUM|MIN|MAX]
~~~
求key1,key2的交集,key1,key2的权重分别是 weight1,weight2
聚合方法用: sum |min|max；聚合的结果,保存在dest集合内。  
**注意**: weights ,aggregate如何理解?  
如果有交集, 交集元素又有socre,score怎么处理?  
Aggregate sum求score相加 , min 求最小score, max 求最大score。  
另: 可以通过weigth设置不同key的权重, 交集时,socre * weights。  
详见下例
~~~
redis 127.0.0.1:6379> zadd z1 2 a 3 b 4 c
(integer) 3
redis 127.0.0.1:6379> zadd z2 2.5 a 1 b 8 d
(integer) 3
redis 127.0.0.1:6379> zinterstore tmp 2 z1 z2
(integer) 2
redis 127.0.0.1:6379> zrange tmp 0 -1
1) "b"
2) "a"
redis 127.0.0.1:6379> zrange tmp 0 -1 withscores
1) "b"
2) "4"
3) "a"
4) "4.5"
redis 127.0.0.1:6379> zinterstore tmp 2 z1 z2 aggregate sum
(integer) 2
redis 127.0.0.1:6379> zrange tmp 0 -1 withscores
1) "b"
2) "4"
3) "a"
4) "4.5"
redis 127.0.0.1:6379> zinterstore tmp 2 z1 z2 aggregate min
(integer) 2
redis 127.0.0.1:6379> zrange tmp 0 -1 withscores
1) "b"
2) "1"
3) "a"
4) "2"
redis 127.0.0.1:6379> zinterstore tmp 2 z1 z2 weights 1 2
(integer) 2
redis 127.0.0.1:6379> zrange tmp 0 -1 withscores
1) "b"
2) "5"
3) "a"
4) "7"
~~~