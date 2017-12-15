title: Hexo博客源文件备份
author: 夏茂盛
tags:
  - 教程| Hexo教程 | Hexo源文件备份
categories:
  - Hexo
date: 2017-11-11 12:49:00
---
#### 前言

使用Hexo编写博客还是比较Nice的，但是有一个问题就是Hexo博客的源文件是放在本地的，如果换一台电脑更新博客或者源文件不小心丢失啦，那就麻烦啦。未雨绸缪，现在给出这一问题的解决方案。

#### 备份方案

想到的办法：
  
  - 将博客源文件拷贝到U盘里---但是这样做，无法同步。
  
  - 使用网盘的话，据说.git文件不能上传同步---而且我对国内的网盘也不放心。
  
综合起来，我觉得比较流行的方法就是：
 
  - 将博客源文件托管到Github.
  
#### 实现方法：
 
  - 在Github上创建一个新的repository ,名字为` hexohexo `。（与你的本地博客源文件文件名相同即可）
  
  - 进入本地`hexohexo`文件夹,执行以下命令：
  
  ``` bash
  git init
  ```
  
  - 设置远程仓库地址，并更新，本地文件夹与远程仓库绑定：
  
  ``` bash
  git remote add origin git@github.com:hanweizhe/hexohexo.git
  git pull orgin master
  
  ```
  
  - (**非必须项**) 修改`.gitignore`文件（如果没有就手动创建一个），在里面加入`.*.log`和`public/`以及`.deploy*/`。因为每次执行`hexo generate`命令时，上述目录都会被重写更新，因此忽略上述目录下的文件更新，加快push速度。
  
  - 完成Hexo源码在本地的提交，执行以下命令：
  
  ``` bash
  git add .
  git commit -m "添加Hexo源码文件作为备份"
  ```
  - 将本地仓库文件推送到Github，执行以下命令：
  
  ``` bash
  git push origin master
  ```
 - 当远程仓库有更新时，执行以下命令，即可同步远程源代码文件到本地文件。
 
 ``` bash
 git pull origin master
 ```

现在在任何一台电脑上，只需要` git clone git@github.com:hanweizhe/hexoohexo.git ` 即可将Hexo源文件复制到本地。（请将` git clone git@github.com:hanweizhe/hexohexo.git` 换成自己远程仓库地址）
 
在本地编写完博客时，顺序执行以下命令，即可完成Hexo博客源文件的同步更新，保持Github上的Hexo源码为最新的版本。
 
 ``` bash
 git add .
 git commit -m "更新Hexo源文件"
 git push origin master
 ```
至此，Hexo源代码文件就完成了同步与更新。
 
对于博主这种懒人，每次更新博文都需要输入两三行重复的git命令真是一件麻烦事，说不定哪天就忘记push到Github上啦。有没有更省事的办法？？完成自动备份 ？？
  
#### 原理
 
利用`NodeJs`的事件监听机制实现监听Hexo的`deployAfter`事件，待博客部署完成之后自动运行Git备份命令，以达到自动备份的目的。
 
#### 实现
 
##### 将hexohexo目录加入Git仓库（见前面）。
 
##### 安装`shelljs`模块。
 
要实现这个自动备份功能，需要依赖NodeJs的一个`shelljs`模块，该模块重新包装啦`child_process`
 ,调用系统命令更加方便。该模块需要安装后使用。
 
 
键入以下命令，完成`shelljs`模块的安装：
 
 ``` bash
 npm install --save shelljs
 ```
 
##### 编写自动备份脚本
 
 
待到模块安装完成，在`hexohexo`根目录的`scripts`文件夹下新建一个js文件，文件名字随意取。
 
**如果没有`scripts`目录，请新建一个。**
 
然后再脚本中，写入以下内容：
 
 ``` js
 require('shelljs/global');
 try {
        hexo.on('deployAfter', function() {//当   deploy完成后执行备份
            run();
        });
    } catch (e) {
        console.log("产生了一个错误<(￣3￣)>     !，错误详情为：" + e.toString());
    }
    function run() {
        if (!which('git')) {
            echo('Sorry, this script requires   git');
            exit(1);
        } else {
            echo("======================Auto   Backup Begin===========================");
            cd('D:/hexohexo');    //此处修改为   Hexo根目录路径
            if (exec('git add --all').code   !== 0) {
                echo('Error: Git add       failed');
                exit(1);
            }
            if (exec('git commit -am "Form   auto backup script\'s commit"').code !== 0) {
                echo('Error: Git commit     failed');
                exit(1);
            }
            if (exec('git push origin       master').code !== 0) {
                echo('Error: Git push        failed');
                exit(1);
            }
            echo("==================Auto      Backup Complete============================")
        }
    }
```
  - 其中，需要修改地`17`行的`D:/hexohexo`路径为Hexo的根目录路径。（脚本中的路径为博主的Hexo路径）；
  - 如果你的Git远程仓库名称不为`origin`的话（默认为`origin`），还需要修改第`28`行执行的push命令，修改成自己的远程仓库名与相应的分支名。
  
保存脚本并退出，然后执行`hexo deploy`命令，将会得到类似以下结果：
 
 ``` bash
 INFO  Deploying: git>
INFO  Clearing .deploy folder...
INFO  Copying files from public folder...
[master 3020788] Site updated: 2015-07-06 15:08:06
 5 files changed, 160 insertions(+), 58 deletions(-)
Branch master set up to track remote branch gh-pages from git@github.com:smilexi
amo/notes.git.
To git@github.com:smilexiamo/notes.git
   02adbe4..3020788  master -> gh-pages
On branch master
nothing to commit, working directory clean
Branch master set up to track remote branch gitcafe-pages from git@gitcafe.com:s
milexiamo/smilexiamo.git.
To git@gitcafe.com:smilexiamo/smilexiamo.git
   02adbe4..3020788  master -> gitcafe-pages
INFO  Deploy done: git
======================Auto Backup Begin===========================
[master f044360] Form auto backup script's commit
 2 files changed, 35 insertions(+), 2 deletions(-)
 rewrite db.json (100%)
To git@github.com:smilexiamo/hexo.git
   8f2b4b4..f044360  master -> master
==================Auto Backup Complete============================
```

这样子，每次更新博客并`hexo deploy`到服务器上之后。备份就会自动启动并完成备份啦！~~~ 是不是很方便呀！

Enjoy it!