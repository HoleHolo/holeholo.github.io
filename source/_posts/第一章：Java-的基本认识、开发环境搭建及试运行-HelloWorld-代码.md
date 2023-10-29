---
title: 第一章：Java 的基本认识、开发环境搭建及试运行 HelloWorld 代码
date: 2023-10-29 12:41:21
tags: Java 学习笔记
---
# Java 的基本认识

## Java 运行环境介绍

Java 运行环境分为 JRE 和 JDK 两种，前者为 Java Runtime Environment，即运行时环境，后者为 Java Development Kit，为开发者而生，在 JRE 的基础上添加了更多组成部分。

### JRE（Java Runtime Enviroment）

是 Java 的运行环境。面向 Java 程序的使用者，而不是开发者。如果你仅下载并安装了 JRE，那么你的系统只能运行 Java 程序。JRE 是运行 Java 程序所必须环境的集合，包含 JVM 标准实现及 Java 核心类库。它包括 Java 虚拟机、Java 平台核心类和支持文件。它不包含开发工具 (编译器、调试器等)。

### JDK（Java Development Kit）

又称 J2SDK (Java2 Software Development Kit)，是 Java 开发工具包，它提供了 Java 的开发环境 (提供了编译器 javac 等工具，用于将 java 文件编译为 class 文件) 和运行环境 (提 供了 JVM 和 Runtime 辅助包，用于解析 class 文件使其得到运行)。如果你下载并安装了 JDK，那么你不仅可以开发 Java 程序，也同时拥有了运行 Java 程序的平台。JDK 是整个 Java 的核心，包括了 Java 运行环境 (JRE)，一堆 Java 工具 tools.jar 和 Java 标准类库 (rt.jar)。

### 具体实现环境

Java 的开源实现是 OpenJDK。Java 的所有者是 Oracle（甲骨文）公司。

## Java 的特点

1. 简单易用
2. 跨平台支持：一次编写，多端使用
3. 性能优异
4. 采用 Java 虚拟机（JVM: Java Virtual Machine）机制运行
5. 带有自动垃圾回收（GC）机制，不需要过于担心内存问题
6. 安全性好，对文件读写有一定限制
7. 面向对象，逻辑清晰简洁，区别于 C 语言的面向过程特点
8. 支持多线程

## Java 的版本类型

1. **Java** ( Platform) **E**(nterprise)**E**(dition)

    Java 的企业版平台，应用于 Web 开发之类的技术平台。
2. **Java** ( Platform) **S**(tandard)**E**(dition)

    Java 的标准核心开发平台。
3. **Java ​**( Platform)**​ M**(icro)**E**(dition)

    Java 的微型应用程序开发平台。

## Java 的运行过程

.java 源代码 -> javac 编译为 .class 字节码 -> (打包成 .jar 文件) -> java 解释器运行

开发者需要 JDK，而用户只需要 JRE

# 开发平台的搭建

## Windows 系统安装 Java（未验证）

### 下载 JDK

首先我们需要下载 Java 开发工具包 JDK，下载地址：[https://www.oracle.com/java/technologies/downloads/](https://www.oracle.com/java/technologies/downloads/)，在下载页面中根据自己的系统选择对应的版本，本文以 Windows 7 64 位系统为例：

​![img](https://www.runoob.com/wp-content/uploads/2013/12/jdk-download.png)​

下载后 JDK 的安装根据提示进行，还有安装 JDK 的时候也会安装 JRE，一并安装就可以了。

安装 JDK，安装过程中可以自定义安装目录等信息，例如我们选择安装目录为 `C:\Program Files (x86)\Java\jdk1.8.0_91`​。

### 配置环境变量

1. 安装完成后，右击 "我的电脑"，点击 "属性"，选择 "高级系统设置"；

​![img](https://www.runoob.com/wp-content/uploads/2013/12/win-java1.png)​

2. 选择 "高级" 选项卡，点击 "环境变量"；

​![img](https://www.runoob.com/wp-content/uploads/2013/12/java-win2.png)​

然后就会出现如下图所示的画面：

​![img](https://www.runoob.com/wp-content/uploads/2013/12/java-win3.png)​

在 "系统变量" 中设置 3 项属性，`JAVA_HOME`​、`PATH`​、`CLASSPATH`​ (大小写无所谓), 若已存在则点击 "编辑"，不存在则点击 "新建"。

> **注意：** 如果使用 1.5 以上版本的 JDK，不用设置 CLASSPATH 环境变量，也可以正常编译和运行 Java 程序。

变量设置参数如下：

* 变量名：**`JAVA_HOME`**​
* 变量值：**`C:\Program Files (x86)\Java\jdk1.8.0_91`**​ // 要根据自己的实际路径配置
* 变量名：**`CLASSPATH`**​
* 变量值：**`.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;`**​ // 记得前面有个 "."
* 变量名：**`Path`**​
* 变量值：**`%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;`**​

### JAVA_HOME 设置

​![img](https://www.runoob.com/wp-content/uploads/2013/12/java-win4.png)​

​![img](https://www.runoob.com/wp-content/uploads/2013/12/java-win5.png)​

### PATH 设置

​![img](https://www.runoob.com/wp-content/uploads/2013/12/java-win6.png)​

​![img](https://www.runoob.com/wp-content/uploads/2013/12/java-win7.png)​

**注意：** 在 Windows 10 中，Path 变量里是分条显示的，我们需要将 **`%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;`**​ 分开添加，否则无法识别：

```
%JAVA_HOME%\bin;
%JAVA_HOME%\jre\bin;
```

​![img](https://www.runoob.com/wp-content/uploads/2013/12/44A70696-B2E6-4055-B88F-7FC0222DCCA4.png)​

更多内容可参考：[Windows 10 配置 Java 环境变量](https://www.runoob.com/w3cnote/windows10-java-setup.html "https://www.runoob.com/w3cnote/windows10-java-setup.html")

### CLASSPATH 设置

​![img](https://www.runoob.com/wp-content/uploads/2013/12/java-win8.png)​

这是 Java 的环境配置，配置完成后，你可以启动 Eclipse 来编写代码，它会自动完成 Java 环境的配置。

### 测试 JDK 是否安装成功

1、"开始" -> "运行"，键入 "cmd"；

2、键入命令：**`java -version`**​、**`java`**​、**`javac`**​ 几个命令，出现以下信息，说明环境变量配置成功；

​![img](https://www.runoob.com/wp-content/uploads/2013/12/java-win9.png)​

### 附录：DOS 基础命令

​**`D:`**​ 用于切换盘符

​**`dir`**​ 查看当前目录下文件（夹）

​**`cd`**​ 切换目录，填写具体路径或相对路径，**..** 表示上级路径

​**`rd`**​ 删除目录

​**`del`**​ 删除文件

​**`cls`**​ 清屏

​**`exit`**​ 退出

## Arch Linux 系统安装 JDK

两个常见的包经常作为其它包的依赖，分别是 [java-runtime-common](https://archlinux.org/packages/?name=java-runtime-common) 包（包含 Java 运行环境的公共文件）和 [java-environment-common](https://archlinux.org/packages/?name=java-environment-common) 包（包括 Java 开发包的公共文件）。

在命令行执行以下命令即可搭建 Java 环境（作为 Root 用户执行，否则需要在命令前添加 `sudo`​）：

```shell
# pacman -S java-environment-common
```

# 编写、编译和运行 Hello World 代码

新建一个 `HelloWorld.java`​ 文件，在其中输入以下内容

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("你好，世界！");
    }
}
```

在控制台依次执行以下命令运行程序：

```shell
javac HelloWorld.java
java HelloWorld
```

输出如下：

```shell
❯ javac HelloWorld.java
❯ java HelloWorld
你好，世界！
```
