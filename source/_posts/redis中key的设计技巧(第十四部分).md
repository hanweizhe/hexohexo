title: redis中key的设计技巧(第十四部分)
author: 夏茂盛
tags:
  - 教程| redis教程 | redis中key的设计技巧
categories:
  - redis
date: 2018-02-28 11:45:37
---
#### Redis key 设计技巧
关系型数据库转化为分布式数据库：
1. 把表名转换为key前缀 如tag:
2. 第2段放置用于区分key的字段--对应mysql中的主键的列名,如userid
3. 第3段放置主键值,如2,3,4...., a , b ,c
4. 第4段,写要存储的列名

用户表 user转换为key-value存储:

|userid|username|passworde|email|
|:----:|:----:|:----:|:----:|
|9|Lisi|1111111|lisi@163.com|

设计：  
set  user:userid:9:username  lisi  
set  user:userid:9:password  111111  
set  user:userid:9:email  lisi@163.com  
查询所有存储的字段：  
~~~
keys user:userid:9*
~~~
**注意**:   
在分布式数据库中，我们是按主键进行存储的。除主键外,还有可能其他列也需要查询,如上表中, username 也是极频繁查询的,往往这种列也是加了索引的.那么该如何实现呢？？   
keys user:userid:*:username:lisi 查询所有username为lisi的userid，如果数据太多，这个方法可能导致效率低下，有没有更高的方法呢？？   
转换到k-v数据中,则也要相应的生成一条按照该列为主的key-value  
冗余信息维护set user:username:lisi:userid  9  
那，其他列也需要创建key-value吗?不需要!  
这样,我们可以根据user:username:lisi:userid ,查出userid=9,   
再查其他字段信息user:username:9:password/email ...  
完成了根据用户名来查询用户信息。  