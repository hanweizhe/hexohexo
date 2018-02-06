title: redis对于hashes 哈希类型的操作(第七部分)
tags:
  - 教程| redis教程 | redis对于hashes 哈希类型的操作
categories:
  - redis
date: 2018-02-06 17:42:28
---
可以将redis中的hashes类型看成具有String key和String value的map容器。
~~~
hset key field value
~~~
作用: 把key中 field域的值设为value。  
**注**:如果没有field域,直接添加,如果有,则覆盖原field域的值。
~~~
hmset key field1 value1 [field2 value2 field3 value3 ......fieldn valuen]
~~~
作用: 设置field1->N 个域, 对应的值是value1->N。 
(对应PHP理解为  $key = array(file1=>value1, field2=>value2 ....fieldN=>valueN))
~~~
hget key field
~~~
作用: 返回key中field域的值。
~~~
hmget key field1 field2 fieldN
~~~
作用: 返回key中field1 field2 fieldN域的值。
~~~
hgetall key
~~~
作用:返回key中,所有域与其值。
~~~
hdel key field
~~~
作用: 删除key中所有field域。
~~~
hlen key
~~~
作用: 返回key中元素的数量。
~~~
hexists key field
~~~
作用: 判断key中有没有field域。
~~~
hinrby key field value
~~~
作用: 把key中的field域的值**增长整型值**value。
~~~
hinrby float  key field value
~~~
作用: 把key中的field域的值**增长浮点值**value。
~~~
hkeys key
~~~
作用: 返回key中所有的field。
~~~
kvals key
~~~
作用: 返回key中所有的value。