---
title: "为视频增加画中画功能 -- Picture-in-Picture API详解"
description: "画中画（Picture-in-Picture，以下简称PiP）想必混迹各大视频网站的朋友应该很熟悉，它是一种视频播放技术，可以将网页上的视频内容从主窗口中分离出来并在一个浮动窗口中播放。这可以让用户在其它页面或者应用程序观看主要视频或者其他内容的同时，保持对辅助视频内容的关注。比如你在开视频会议时能通过小视频窗口看番摸鱼。"
img: "/images/jpg-png-webp/articles/cover.webp"
---

# 选择与范围
在正式学习之前，先来学习一下什么是选择（Selection）和范围（Range）。主要是学习范围，选择跟范围有一些联系，可以了解一下。

## 范围（Range）
`Range`表示包含节点和文本节点部分的文档片段。

实际上范围有多种，`Range`是最常见的一种范围类；还有一种`StaticRange`类，它与`Range`类似，但是它是不可变的范围，一旦创建就不会随着文档的变化而变化，因此性能会比`Range`更好。

`Range`和`StaticRange`都继承于`AbstractRange`，是定义所有DOM范围类型的抽象基类。但是它的浏览器兼容性要比`Range`和`StaticRange`差一点。

由于它们都很类似，这里我们只介绍`Range`。

构造函数：
```js
new Range()

// 下面这两种方式也可以创建和获取Range对象。
document.createRange()
document.getSelection().getRangeAt(index)
```
创建了`Range`对象之后，就可以通过`range.setStart(node, offset)`和`range.setEnd(node, offset)`方法来创建起始点（包含）和结束点（不包含）。

其中，`node`参数可以是**文本节点**或者**元素节点**，对应`offset`参数有两种情况：
- 如果`node`是文本节点，那么`offset`就是一个文本位置索引（从`0`开始）。🌰：
  ```html
  <!-- p唯一子节点是文本节点 -->
  <p id="test">test</p>
  
  <script>
    const range = new Range();
    range.setStart(test.firstChild, 2);
    range.setEnd(test.firstChild, 4);
  
    console.log(range.toString()) // st
  </script>
  ```
- 如果`node`是元素节点，则`offset`表示其任意子节点的编号索引，每一个子节点为一项。🌰：
  ```html
  <!-- 文本节点“这是”为第0项，i元素为第1项，b元素为第二项 -->
  <p id="test">这是<i>第一个</i><b>段落</b></p>
  
  <script> 
    const range = new Range();
    range.setStart(test, 0);
    range.setEnd(test, 2);
  
    console.log(range.toString()) // 这是第一个
  </script>
  ```
注意：起始点和结束点的`node`可以不一样，但是结束点必须在起始点之后。
```html
<p id="test1">这是第一个段落</p>
<p id="test2">这是第二个段落</p>
  
<script> 
  const range = new Range();
  // 如果将test1和test2互换一下结果是空字符串，因为起始点在结束点之前
  range.setStart(test1.firstChild, 5);
  range.setEnd(test2.firstChild, 2);
  
  /* 
   * 打印：段落
   *            这是
   */
  console.log(range.toString()) 
</script>
```