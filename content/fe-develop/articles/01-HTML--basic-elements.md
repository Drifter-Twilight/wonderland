---
title: "HTML - 主根元素、文档元数据和分区根元素"
description: "元数据（Metadata）含有页面的相关信息，包括样式、脚本及数据，能帮助一些软件（例如搜索引擎、浏览器 等等）更好地运用和渲染页面。对于样式和脚本的元数据，可以直接在网页里定义，也可以链接到包含相关信息的外部文件。"
img: "/content-images/fe-develop/articles/01-HTML--basic-elements/cover.webp"
date: "2023-02-02 01:30"
update: 0
tags: ["HTML"]
---

![cover.webp](/content-images/fe-develop/articles/01-HTML--basic-elements/cover.webp)

---
很多初学者在学习HTML时，大多数都是在编辑器中输入 “!” 或者 “html5” 自动生成如下代码，再编写自己的代码吧。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body></body>	
</html>
```
老师或者一些教程说这些先不用管，我们先在`<body>`里写，那些以后再讲，结果后面学着学着就忘了。

今天我们就来学习那些自动生成的代码中的元素 -- **主根元素、文档元数据和分区根元素**。

## 元素分组
### 文档类型 -- `<!DOCTYPE html>`
在正式开始之前，先来学习HTML文件中第一行的`<!DOCTYPE html>`。它是最短有效的文档声明，是历史遗留的产物。只需要记住它的作用是**声明文档类型（DTD），保证文档正常读取**就可以了。

> 注意：`<!DOCTYPE html>`必须位于HTML5文档中的第一行。

#### Javascript接口
在JavaScript中，`<!DOCTYPE html>`是一个DOM节点，我们可以通过`document.doctype`访问到它：
```js
console.log(document.doctype) // `<!DOCTYPE html>`

//如果当前文档没有声明 DTD，则返回 null
console.log(document.doctype) // null
```
> 注意：`document.doctype`是只读的。

### 主根元素 --`<html>`
`<html>`元素比较简单，它是一个HTML文档的根（也叫顶级元素），包含整个页面的内容，规定**所有元素必须是该元素的后代**。

需要注意的是，浏览器有自动更正功能，遇到格式不正确的HTML，它会在形成DOM时自动更正它。
    
比如我故意将`div`写在html外面，最终会被浏览器塞到`<body>`中：
```html
<!DOCTYPE html>
<html>
   。。。
   <body></body>
</html>
<div>1</div>


<!-- 结果 -->
<html>
   。。。
   <body>
       <div>1</div>
   </body>
</html>
```

`<html>`身上除了全局属性外，还提供一个 `lang` 属性，其值是一个[有效 IETF 标识语言标记](https://www.ietf.org/rfc/bcp/bcp47.txt)字符串。该属性提供文档的语言。有助于语音合成工具确定使用什么发音，帮助翻译工具确定使用什么规则等等。

### 文档元数据 --`<base>`、`<head>`、`<link>`、`<meta>`、`<style>`和`<title>`
这一部分包括样式、脚本及数据，也就是元数据（Metadata）。包含页面的相关信息，但是我们视觉上是看不到他们的。

元数据**是描述数据的数据**。这些元数据能帮助一些软件（例如搜索引擎、浏览器等等）更好地运用和渲染页面。

#### `<head>`
`<head>`元素包含关于文档的机器可读信息。既然是机器可读信息，那么它的内容不是让我们去阅读和理解的，因此其内容不会在浏览器中显示，它的作用是保存页面的一些元数据。
    
`<head>`中至少要包含一个`<title>`元素，不过如果某个页面通过如`<iframe>`元素嵌入另一个页面，那么后者可以省略`<title>`。也就是说标题已经在更高等级协议中指定了，那么就可以省略标题。
    

#### `<base>`
`<base>`指定用于一个文档中包含的所有相对URL的根URL。直接看个栗子就很清晰了：

```html
...
<head>
  <base href="https://cn.vuejs.org">
  ...
</head>
<body>
  <a href="/guide/introduction.html">go to Vue Guide</a> 
  <!-- 点击该链接前往https://cn.vuejs.org/guide/introduction.html -->
  <!-- <base>中的href与<a>中的href进行了拼接 -->
  
  <a href="/guide/introduction.html#what-is-vue">what is vue</a> 
  <!-- 点击该链接前往https://cn.vuejs.org/guide/introduction.html#what-is-vue -->
</body>
...
```
同一个HTML文档中只能有一个`<base>`元素，如果有多个 `<base>` 元素，则只有第一个`<base>`元素会起作用。

##### 属性
| 属性名 | 值 | 简介 |
| --- | --- | --- |
| href | urlstring | 基本URL。 |
| target | `_self`、`_blank`、`_parent`或`_top` | 基本URL。 |

- `href`属性的值可以是绝对URL也可以是相对URL。

- 如果在使用`<base>`的时候指定了`href`或`target`属性其中的任意一个，那么`<base>`元素必须位于其他具有URL属性值的元素之前（比如指定了`href`属性的`<link>`元素）。

在Javascript中，可以用`document.baseURL`来获取当前文档的基本URL，默认值是`document.location.href`， 声明了`<base>`并指定了`href`属性后，则返回值为第一个`<base>`的`href`值。

#### `<title>`
`<title>`元素用于定义标题栏或页面选项卡中的文档标题。始终在`<head>`元素块中使用。合理的使用`<title>`可以吸引浏览搜索结果页面的读者的注意力。

`<title>`只包含文本，元素中如果出现标签，会被当成字符串处理。

```html
<!DOCTYPE html>
<html >
  <head>
    ...
    <!-- 最终的渲染结果是：'<i>test</i>'  -->
    <title>
      <i>test</i>
    </title>
  </head>
  ...
</html>
```

##### 页面标题、搜索引擎与可访问性问题
页面标题不要过长、过短或者使用通用标题，尽量使用准确且简洁的描述性标题，因为标题会影响搜索引擎优化（SEO），搜索引擎算法会根据页面的标题决定在搜索结果中页面的排列顺序。

对于可访问性问题而言，动态更新标题时，辅助技术不会自动宣布他发生了变化，如有需要请参考[ARIA_Live_Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)。

##### 撰写优质标题的准则与技巧
- 搜索引擎通常显示页面标题的前55-60个字符，超出此范围的文本可能会丢失。因此尽量使用准确简洁的术语或短语定义标题，显示页面的主要目的；尽量将重要的部分放在前面，不要书写过长的标题。

- 不要使用“关键字”，如果标题清一色是关键字列表，算法通常会降低页面在搜索结果中的位置。

- 保证标题在网站的各个页面中是唯一的。

比较理想的标题首先显示页面的主要目的，后接网站的名称。此模式对可访问性问题也有一定的好处。

#### `<link>`
`<link>`元素指定当前文档与外部资源之间的关系。比较常用的是用来链接CSS样式表跟站点图标。

`<link>`可以在`<head>`或者`<body>`当中使用，具体取决于其链接类型是否是[`body-OK`](https://html.spec.whatwg.org/multipage/links.html#body-ok)（比如`el=stylesheet`）。但是一般来说最好与正文内容分开，不建议在`<body>`当中使用。

##### 属性

| 属性名 | 简介 |
| --- | --- |
| as | 指定`<link>`加载的内容类型。仅当在`<link>`元素上设置了`rel="preload"`或 `rel="prefetch"`时，才使用此属性，具体值列表请[参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link#attr-as)。 |
| crossorigin | 指示在提取资源时是否必须使用 CORS。 |
| importance（实验性） | 提供提取预加载资源时要使用的相对优先级的提示。允许的值有： `height`、`low`、`auto`（仅在`rel`值为`preload`或`prefetch`时可用）。 |
| hreflang | 此属性指示链接资源的语言。允许的值由 [RFC 5646：用于标识语言的标记（也称为 BCP 47）](https://datatracker.ietf.org/doc/html/rfc5646)指定。 |
| integrity | 包含行内元数据，用户能用它来验证一个获取到的资源，在传送时未被非法篡改，值为一个哈希值（详细请[参考](https://developer.mozilla.org/zh-CN/docs/Web/Security/Subresource_Integrity)）。 |
| media | 这规定了外部资源适用的媒体场景。 |
| referrerpolicy  | 指示在获取资源时使用哪个引荐来源网址。 |
| rel | 指定链接文档与当前文档的关系。该属性的值必须是链接类型值的用空格分隔的列表。链接类型值请[参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types) 。|
| sizes | 定义了包含相应资源的可视化媒体中的 icons 的大小。 |
| title | 用于`rel="stylesheet"`时，它定义了一个首选样式表或备用样式表，不正确使用该属性会导致样式表被忽略。 |
| type | 定义链接的内容的类型。值为一个MIME类型。 |

- 如果存在`rel`属性，则其值必须是由空格分隔的关键字组成的无序集合。如果`rel`属性不存在，或者没有关键字，或者使用的关键字不规范，那么元素就不会创建任何链接。
  
  使用`<link>`元素可以创建两类链接：**指向外部资源的链接和超链接**。一个`<link>`元素可以创建多个链接(其中一些可能是外部资源链接，一些可能是超链接)。具体创建哪些链接和创建多少链接取决于`rel`属性中给出的关键字。用户代理会在每个链接的基础上处理链接，而不是在每个元素的基础上。

- `media` 属性的取值与CSS`@media`一致，允许用户代理为其运行的设备选择最适合的样式表，当满足媒体条件时，加载此资源：

  ```html
  <!-- 当屏幕尺寸小于600px时，加载test.css -->
  <link rel="stylesheet" href="./test.css" media="screen and (max-width:600px)">
  <!-- 当屏幕尺寸大于800px时，加载test1.css -->
  <link rel="stylesheet" href="./test1.css" media="screen and (min-width:800px)">
  ```
- `sizes`属性的值可以是 `any` 或者 以空格分隔的 `宽度 × 高度` 的列表，但是大多数图标格式只能存储一个图标，因此更多情况下，`sizes`属性只包含一个条目，同时在考虑兼容性的情况下，更应该使用一个条目的`sizes`属性。


#### `<style>`
`<style>` 定义HTML文档的样式信息。通常我们在其中书写内嵌式CSS样式。

##### 属性
| 属性名 | 简介 |
| --- | --- |
| media | 规定该样式适用于哪个媒体，默认值为`all`。 |
| nonce | 一种加密的随机数（一次使用的数字），用于在CSP：style-src Content-Security-Policy中将内联样式列入白名单。[详细请参考](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src) |
| title | 指定可选的样式表。与`<link>`的`title`属性类似。 |
| scoped | 指定样式仅适用于其父项和子项的元素。 |

- `media`属性与`<link>`的media属性类似：
   ```html
   <!DOCTYPE html>
   <html>
     <head>
       ...
      <!-- 适用于所以媒体场景 -->
       <style>
         p {
           color: hotpink;
         }
       </style>
        
       <!-- 当屏幕宽度小于800px时，<p>的文字颜色为cyan -->
       <style media='screen and (max-width: 800px)'>
         p {
           color: cyan;
         }
       </style>
   </head>
   <body>
     <p>test</p>
   </body>
  </html>
  ```
- `scoped`属性在2016年左右从HTML规范中删除了，但是根据 MDN 的说法，以后可能会重新引入该属性。目前直接在`<style>`上直接使用`scoped`是不起作用的，需要安装`style-scoped`包引入js才能使用：
    
    ```html
    <!DOCTYPE html>
    <html >
      <head>
        ...
        <script src="/node_modules/style-scoped/scoped.min.js"></script>
      </head>
      <body>
        <div>
          <!-- 该<style>中的样式规则只在当前div当中生效 -->
          <style scoped> 
            p {
              color: blue;
            }
          </style>
          <!-- 文字呈现蓝色 -->
          <p>test1</p>
        </div>

        <!-- 文字呈现默认黑色 -->
        <p>test2</p> 
      </body>
    </html>
    ```
    
#### `<mata>`
`<meta>`元素表示无法由其他HTML元相关元素表示的元数据。通常`<mate>`元素被用于规定页面的描述、关键词、文档的作者、最后修改时间以及其他元数据。这也是我把它放在最后的原因。

参考MDN，`<mate>`元素定义的元数据的类型包括以下几种：
-   如果设置了`name`属性，`meta` 元素提供的是文档级别的元数据，应用于整个页面。
-   如果设置了`http-equiv`属性，`meta` 元素则是编译指令，提供的信息与类似命名的 HTTP 头部相同。
-   如果设置了`charset`属性，`meta` 元素是一个字符集声明，告诉文档使用哪种字符编码。
-   如果设置了`itemprop`属性，`meta` 元素提供用户定义的元数据。

> 注意：在同一个`<meta>`标签中，`name`, `http-equiv` 或者 `charset` 三者中任何一个属性存在时，`itemprop` 属性不能被使用。

##### 属性

| 属性名 | 简介 |
| --- | --- |
| charset | 声明文档的字符编码。声明字符编码`<meta>`元素必须完全位于文档的前 1024 个字节内。|
| http-equiv | 定义了一个编译指示指令。所有允许的值都是特定HTTP头部的名称。 |
| name | `name`和`content`属性可以一起使用，以名 - 值对的方式给文档提供元数据，`name`提供元数据名称，`content`提供值。 |
| content | 包含`http-equiv`或`name`属性的值。 |

- 必须指定`name`、`http-equiv`、`charset`和`itemprop`属性其中的一个。

- `charset`属性理论上可以是任何字符编码，但不是所有浏览器都能理解（[可用的字符编码请参考](https://www.iana.org/assignments/character-sets/character-sets.xhtml)）。一些浏览器会自动修正错误的编码，具体取决于个人所使用的浏览器。建议将`charset`设置为`utf-8`，因为`utf-8`是一个通用字符集，避免在不同浏览器中出现某些潜在的问题。

  每个文档中只能有一个具有`charset`属性的`<mata>`元素。

- `http-equiv`
    | 允许的值 | content取值 |
    | --- | --- |
    | content-security-policy | [参考](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) |
    | content-type | text/html; charset=utf-8 |
    | default-style |  CSS 样式表集的名称 |
    | x-ua-compatible | 必须具有值“IE=edge” |
    | refresh | 刷新页面的秒数[ 后面跟着字符串 '`;url=`' 和一个合法的 URL ]
    
##### 使用示例
```html
<!-- 指定字符集  -->
<meta charset='utf-8' />

<!-- 指定页面的作者  -->
<meta name='author' content='witt' />

<!-- 3秒后刷新页面  -->
<meta http-equiv="refresh" content='3' />
```

### 分区根元素 -- `<body>`
`body` 元素表示文档的内容。我们平时更多的就是在`<body>`元素当中工作。

#### 属性
`<body>`元素身上除了全局属性外，还有很多事件函数属性，具体请[查看](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body#%E5%B1%9E%E6%80%A7)。

#### Javascript接口 --`document.body`。
在Javascript中，使用`document.body`访问当前文档的`<body>`。除此之外`document.body`还表示当前文档的 `<framset>` 元素 或 `null`（`<framset>` 元素已弃用，这里就不详细介绍了，[如有需要请参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/frameset)）。

`document.body`是可写的，也就是说可以为当前文档设置新的`<body>`，原来的`<body>`中的所有子元素也会被全部移除。

```js
const newBody = document.createElement('body')
newBody.innerText = 'newBody'
document.body = newBody //替换当前文档的body
```

## 参考资料
- [HTML元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)
- [DOM树](https://zh.javascript.info/dom-nodes#zi-dong-xiu-zheng)
- [学习HTML5](https://www.runoob.com/html/html-tutorial.html)