title: redis对于key的通用操作(第二部分)
author: 夏茂盛
tags:
  - 教程| redis教程 | redis对于key的通用操作
categories:
  - redis
date: 2018-02-05 16:34:54
---
~~~
del key1 key2 ... Keyn
~~~
作用:删除1个或多个键  
返回值: 不存在的key忽略掉,返回真正删除的key的数量
~~~
rename key newkey
~~~
作用: 给key赋一个新的key名  
**注**:如果newkey已存在,则newkey的原值被覆盖
~~~
renamenx key newkey
~~~
作用: 把key改名为newkey
返回值: 发生修改返回1,未发生修改返回0  
**注**: nx--> not exists, 即, newkey不存在时,作改名动作
~~~
move key db
~~~
~~~
redis 127.0.0.1:6379[1]> select 2
OK
redis 127.0.0.1:6379[2]> keys *
(empty list or set)
redis 127.0.0.1:6379[2]> select 0
OK
redis 127.0.0.1:6379> keys *
1) "name"
2) "cc"
3) "a"
4) "b"
redis 127.0.0.1:6379> move cc 2
(integer) 1
redis 127.0.0.1:6379> select 2
OK
redis 127.0.0.1:6379[2]> keys *
1) "cc"
redis 127.0.0.1:6379[2]> get cc
"3"
~~~
(注意: 一个redis进程,打开了不止一个数据库, 默认打开16个数据库,从0到15编号,如果想打开更多数据库,可以从配置文件修改)
~~~
keys pattern 
~~~
作用:查询相应的key  
在redis里,允许模糊查询key,有3个通配符 *, ? ,[]
1. *: 通配任意多个字符
2. ?: 通配单个字符
3. []: 通配括号内的某1个字符

~~~
redis 127.0.0.1:6379> flushdb
OK
redis 127.0.0.1:6379> keys *
(empty list or set)
redis 127.0.0.1:6379> mset one 1 two 2 three 3 four 4
OK
redis 127.0.0.1:6379> keys o*
1) "one"
redis 127.0.0.1:6379> keys *o
1) "two"
redis 127.0.0.1:6379> keys ???
1) "one"
2) "two"
redis 127.0.0.1:6379> keys on?
1) "one"
redis 127.0.0.1:6379> set ons yes
OK
redis 127.0.0.1:6379> keys on[eaw]
1) "one"
~~~
~~~
randomkey 
~~~
作用:返回随机key
~~~
exists key
~~~
作用:判断key是否存在,返回1(存在)/0(不存在)
~~~
type key
~~~
作用:返回key存储的值的类型
有string,link,set,order set, hash
~~~
ttl key 
~~~
作用: 查询key的生命周期
返回: 秒数
注:对于不存在的key或已过期的key,返回-2
  对于存在的key,返回-1
~~~
expire key 整型值
~~~
作用: 设置key的生命周期,以秒为单位
同理:   
pexpire key 毫秒数, 设置生命周期  
pttl  key, 以毫秒返回生命周期

~~~
persist key
~~~
作用: 把指定key置为永久有效
