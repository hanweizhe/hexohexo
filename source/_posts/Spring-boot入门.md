title: Spring-boot入门
author: 夏茂盛
tags:
  - 教程| Spring-boot教程 | Spring-boot入门
categories:
  - Spring-boot
date: 2018-03-02 10:19:28
---
##### Spring1.x时代
在Spring1.x时代，都是通过xml文件配置bean，随着项目的不断扩大，需要将xml配置分放到不同的配置文件中，需要频繁的在java类和xml配置文件中切换。
##### Spring2.x时代
随着JDK 1.5带来的注解支持，Spring2.x可以使用注解对Bean进行申明和注入，大大的减少了xml配置文件，同时也大大简化了项目的开发。  
那么，问题来了，究竟是应该使用xml还是注解呢？  
**最佳实践**：
1. 应用的基本配置用xml，比如：数据源、资源文件等；
2. 业务开发用注解，比如：Service中注入bean等；

##### Spring3.x到Spring4.x
从Spring3.x开始提供了Java配置方式，使用Java配置方式可以更好的理解你配置的Bean，现在我们就处于这个时代，并且Spring4.x和Springboot都推荐使用java配置的方式。  
##### SpringBoot简介
Spring Boot正是在这样的一个背景下被抽象出来的开发框架，它本身并不提供Spring框架的核心特性以及扩展功能，只是用于快速、敏捷地开发新一代基于Spring框架的应用程序。也就是说，它并不是用来替代Spring的解决方案，而是和Spring框架紧密结合用于提升Spring开发者体验的工具。同时它集成了大量常用的第三方库配置（例如Jackson, JDBC, Mongo, Redis, Mail等等），Spring Boot应用中这些第三方库几乎可以零配置的开箱即用（out-of-the-box），大部分的Spring Boot应用都只需要非常少量的配置代码，开发者能够更加专注于业务逻辑。
##### SpringBoot入门--HelloWorld
###### 工具
要想学习一门语言，必须有工具呀！！  
开发工具：Spring Tool Suite(STS)[**推荐**]  
官网地址：http://spring.io/tools/sts  
下载完STS压缩包进行解压，到sts-3.8.2.RELEASE目录，点击STS.exe即可，是不是与eclipse差不多。  
当然工具并不是唯一的，也可以选择其他工具：eclipse中安装spring-tool-suite插件也可以。  
**注解**：Eclipse安装spring-tool-suite插件：  
建议离线安装，选择与自己eclipse版本相对应的updatesite版本进行下载。http://download.springsource.com/release/TOOLS/update/3.8.2.RELEASE/e4.6/springsource-tool-suite-3.8.2.RELEASE-e4.6.1-updatesite.zip，这是链接的模板，查看官网进行相应的版本号替换即可。  
eclips离线安装插件长时间没有反应：点击avaliable software sites，将所有外网网址去掉，只保留本地插件地址。（或者电脑断网）
###### 入门实例
File > New > Spring Starter Project >  Next > Finish
![springboot1.1](/image/springboot1.1.png)
![springboot1.2](/image/springboot1.2.png)

项目创建完成：
![springboot1.3](/image/springboot1.3.png)

SpringBootHello1Application.java
~~~ java
package com.example.demo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
public class SpringBootHello1Application {
	public static void main(String[] args){  
       SpringApplication.run(SpringBootHello1Application.class,args);
	}
}
~~~
pom.xml
~~~ xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0  
http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>com.example</groupId>
	<artifactId>demo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>jar</packaging>

	<name>spring-boot-hello1</name>
	<description>Demo project for Spring Boot</description>

	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.0.0.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
		<java.version>1.8</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
</project>

~~~
下面我们创建一个 HelloController.java 定义3个方法:
~~~ java
package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @RequestMapping("/hello")
	public String hello(){
		return "Hello World";
	}
    
    @RequestMapping("/info")
    public Map<String,String> getinfo(@RequestParam String name){
    	Map<String,String> map = new HashMap<>();
    	map.put("name", name);
    	return map;
    }
    
    @RequestMapping("/list")
    public List<Map<String, String>> getList(){
    	List<Map<String, String>> list = new ArrayList<>();
    	Map<String, String> map=null;
    	for(int i=1;i<5;i++){
    		map=new HashMap<>();
    		map.put("name", "hello"+i);
    		list.add(map);
    	}
    	return list;
    }
}

~~~
然后现在可以直接运行 SpringBootHello1Application 的main方法，和执行普通java程序一样。 
然后可以看到spring-boot 内置server容器（默认为Tomcat），这一切spring-boot 都帮我们做好了。  
控制台输出内容Started SpringBootHello1Application in 8.981 seconds (JVM running for 10.675)表示服务已经启动。  
在浏览器输入我们3个请求便可看到结果。   
http://localhost:8080/hello 输出：Hello World   
http://localhost:8080/hello/info?name=shanhy 输出：{“name”:”shanhy”} 
http://localhost:8080/hello/list 
输出：[{“name”:”hello1”},{“name”:”hello2”},{“name”:”hello3”},{“name”:”hello4”}]  
通过我们的Hello实例，相信大家一目了然，可谓spring-boot创建一个项目如此简单，完全可以在几分钟内将服务启动。 
spring-boot抛弃繁琐的配置，让开发人员更专注与业务逻辑的实现。后面几篇文章将会对spring-boot的多个方面通过实例的方式呈现给大家。
