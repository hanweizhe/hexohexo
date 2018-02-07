title: redis消息订阅(第九部分)
author: 夏茂盛
tags:
  - 教程| redis教程 | redis消息订阅
categories:
  - redis
date: 2018-02-07 13:27:56
---
使用办法:  
**订阅端**: subscribe 频道名称  
**发布端**: publish 频道名称 发布内容  
服务端例子:  
~~~
redis 127.0.0.1:6379> publish news 'good good study'
(integer) 1
redis 127.0.0.1:6379> publish news 'day day up'
(integer) 1
~~~
客户端例子:  
~~~
redis 127.0.0.1:6379> subscribe news
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "news"
3) (integer) 1
1) "message"
2) "news"
3) "good good study"
1) "message"
2) "news"
3) "day day up"
~~~
~~~
psubscribe new* 
~~~
根据匹配模式一次性监听多个频道.