---
title: "HTML -- 内嵌内容"
description: "除了常规的多媒体内容，HTML 可以包括各种其他的内容，即使它并不容易交互。"
img: "/content-images/fe-develop/articles/10-HTML--inline-content/cover.webp"
date: "2023-02-06 20:37"
update: 0
tags: ["HTML"]
---

![cover.webp](/content-images/fe-develop/articles/10-HTML--inline-content/cover.webp)

---
HTML中除了常规的多媒体内容，HTML 可以包括各种其他的内容，比如另一个HTML页面。这一部分被称为**内嵌内容**，属于**可替换元素**。包含我们比较熟悉的`<ifame>`以及一些类似`<ifame>`但是比较少见的元素，接下来我们就来学习一下它们。

## 浏览器上下文
在正式开始之前，先来了解一下什么是浏览器上下文：浏览上下文是浏览器显示Document的环境。在现代浏览器中，它通常是一个选项卡，也可以是一个窗口，甚至是页面的一部分（如框架或 iframe）。

每个浏览上下文都有一个源（活动文档的源）和以前显示的文档的有序历史记录。浏览上下文之间的通信受到严重限制。

## 内联框架元素 -- `<ifame>`
`<iframe>`元素表示**嵌套的浏览上下文，将另一个HTML页面嵌入到当前页面中**。

每个嵌入式浏览上下文都有自己的会话历史记录和文档。嵌入其他内容的浏览上下文称为父浏览上下文。最顶层的浏览上下文（没有父级的上下文）通常是浏览器窗口，由 Window 对象表示。

由于每个浏览上下文都是一个完整的文档环境，因此页面中的每使用一个`<iframe>`就需要增加内存和其他计算资源。虽然理论上可以使用任意数量的`<iframe>`，但请检查性能问题。

作为可替换的元素，可以使用CSS的`object-position`和`object-fit`属性调整嵌入文档在`<iframe>`元素框中的位置、对齐方式和缩放比例。

### 属性

| 属性名 | 简介 |
| --- | --- |
| src | 要嵌入的页面的 URL。 |
| srcdoc | 嵌入的内联 HTML，覆盖 src 属性。如果浏览器不支持`srcdoc`属性，它将回退到`src`属性中的 URL。 |
| allow | 指定`<iframe>`的权限策略，具体的值[参考](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Permissions_Policy)。 |
| allowfullscreen | 布尔值，设置为true时，可以通过调用`<iframe>`的 requestFullscreen() 方法激活全屏模式。该属性为历史遗留属性，请改用`allow="fullscreen"`代替。 |
| allowpaymentrequest | 布尔值，设置为true时，允许跨源`<iframe>`调用付款请求API。该属性被视为旧属性，请改用`allow="payment"`代替。  |
| csp  | 对嵌入资源强制实施的内容安全策略。详细请[参考](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/csp)。 |
| height | 框架的高度。默认值为150（以 CSS 像素为单位）。 |
| width | 框架的宽度。默认值为300（以 CSS 像素为单位）。 |
| referrerpolicy | 指示在获取帧的资源时发送哪个引用 |
| importance | 表示`<iframe>`的`src`属性指定的资源的加载优先级。允许的值有：`auto`、`high`和`low`。 |
| name | 嵌入式浏览上下文的可定位名称。 |
| sandbox | 对框架中的内容应用额外的限制。属性的值可以为空以应用所有限制，也可以为空格分隔的标记以解除特定限制。 |

- `referrerpolicy`属性可选的值如下：   
 
    | 值 | 简介 |
    | --- | --- |
    | strict-origin-when-cross-origin(默认值) | 在执行同源请求时发送完整的URL，仅在协议安全级别保持不变时发送源（HTTPS→HTTPS），并且不向安全性较低的目标发送任何标头（HTTPS→HTTP）。 |
    | no-referrer | 无引荐来源网址，即不会发送Referer标头。 |
    | no-referrer-when-downgrade | 如果没有TLS (HTTPS)， Referer头将不会被发送到源。 |
    | origin | 发送的引用者将被限制在引用页的来源: 它的方案、主机和端口。 |
    | origin-when-cross-origin | 发送到其他origin的引用器将被限制在方案、主机和端口。同一原点上的导航仍将包含路径。 |
    | same-origin | 同一来源的引用将被发送，但跨来源请求将不包含引用信息。 |
    | strict-origin | 仅当协议安全级别保持不变（HTTPS→HTTPS）时，才将文档的来源作为引荐来源发送，但不要将其发送到安全性较低的目标（HTTPS→HTTP）。 | 
    | unsafe-url | 引荐来源网址将包括来源和路径（但不包括片段、密码或用户名）。此值不安全，因为它会将源和路径从受 TLS 保护的资源泄漏到不安全的源。 |

- `sandbox`属性可选的值如下：

    | 值 | 简介 |
    | --- | --- |
    | allow-downloads-without-user-activation | 允许在没有征求用户同意的情况下下载文件。 |
    | allow-forms | 允许嵌入的浏览上下文提交表单。如果没有使用该关键字，则无法提交表单。 |
    | allow-modals | 允许嵌入的浏览上下文打开模态窗口。 |
    | allow-orientation-lock | 允许嵌入的浏览上下文锁定屏幕方向. |
    | allow-popups | 允允许弹出窗口（如`window.open()`、`target="_blank"`或`showModalDialog()`）。 |
    | allow-popups-to-escape-sandbox | 允许沙箱文档打开新窗口，而这些窗口不继承沙箱。 |
    | allow-presentation | 允许资源启动一个[表示会话](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest)。 |
    | allow-same-origin | 如果没有使用这个令牌，资源将被视为来自一个特殊的源，总是无法执行同源策略(可能会阻止对数据存储/cookie和一些JavaScript api的访问)。 |
    | allow-scripts | 允许资源运行脚本（但不创建弹出窗口）。 |
    | allow-storage-access-by-user-activation（实验性） | 允许资源使用存储访问API请求访问父级的存储功能. |
    | allow-top-navigation | 允许嵌入的浏览上下文导航（加载）内容到顶级的浏览上下文。 |
    | allow-top-navigation-by-user-activation | 允许资源在顶级浏览上下文中导航，但仅当由用户允许后。 |

- 当嵌入文档与嵌入页面具有相同的来源时，强烈建议不要同时使用`allow-script`和`allow-scripts`，因为这可以让嵌入`allow-same-origin`的文档删除`sandbox`属性 — 使其不比根本不使用`sandbox`属性更安全。
- 如果攻击者可以在沙盒`iframe`之外显示内容（例如，如果查看器在新选项卡中打开框架），则沙盒是无用的。此类内容也应从单独的来源提供，以限制潜在的损害。
- `sandbox`属性在IE 9及更早版本中不受支持。

### Javascript相关
在Javascript中，内联框架（如`<frame>`元素）包含在`window.frames`伪数组中。在框架内部，脚本可以通过`window.parent`引用父窗口对象。

使用DOM HTMLIFrameElement对象，脚本可以通过`contentWindow`属性访问框架资源的窗口对象。`contentDocument`属性指的是`<iframe>`中的文档，与`contentWindow.document`相同。

脚本访问框架内容必须遵守同源策略，并且无法访问非同源的window对象的几乎所有属性。同源策略同样适用于子窗体访问父窗体的window对象。跨域通信可以通过`window.postMessage`来实现。

### 可访问性问题
使用辅助技术（如屏幕阅读器）导航的用户可以通过`<iframe>`上的`title`属性来标记其内容。标题的值应简明扼要地描述嵌入的内容。如果没有此标题，他们必须导航到`<iframe>`以确定其嵌入的内容是什么。这种上下文转换可能会令人困惑且耗时，尤其是对于具有多个`<iframe>`和/或嵌入包含视频或音频等交互式内容的页面。

## 外部对象元素 -- `<object>`
`<object>`元素表示外部资源，可能是图像、嵌套浏览上下文或要由插件处理的资源。

### 属性
使用`<object>`必须至少定义`data`和`type`其中之一。
| 属性名 | 简介 |
| --- | --- |
| data | 作为有效 URL 的资源地址。 |
| type | data指定的资源的 MIME 类型。如：`video/mp4`。 |
| form | 与对象元素关联的表单元素（如果有）（其表单所有者）。属性的值必须是同一文档中`<form>`元素的 ID。 |
| name | 有效浏览上下文的名称 （HTML5） 或控件的名称 （HTML 4）。 |
| usemap | 对`<map>`元素的哈希名称引用;这是一个“#”，后跟映射元素name的值。 |
| width | 资源显示的宽度，单位是 CSS 像素。仅限绝对值，无百分比。 |
| height | 显示的资源的高度，单位是 CSS 像素。仅限绝对值，无百分比。 |
    
注意：请注意，通常会指定`type`字段，但Youtube视频不需要。
    
使用示例：

```html
<!-- 嵌入B站的视频 -->
<object
  type="video/mp4"
  data="https://www.youtube.com/watch?v=Sp9ZfSvpf7A"
  width="1280"
  height="720"></object>
```
    
## 嵌入外部内容元素 -- `<embed>`
`<embed>`元素在文档中的指定点嵌入外部内容。此内容由外部应用程序或其他交互式内容源（如浏览器插件）提供。大多数现代浏览器已弃用并删除了对浏览器插件的支持，因此如果您希望您的网站在普通用户的浏览器上可操作，则依赖`<embed>`通常是不明智的。
    
### 属性

| 属性名 | 简介 |
| --- | --- |
| src | 要嵌入的资源的 URL。 |
| type | 用于选择要实例化的插件的 MIME 类型。 |
| width | 资源的显示宽度，以 CSS 像素为单位。这必须是绝对值，不允许使用百分比。 |
| height | 资源的显示高度，以 CSS 像素为单位。这必须是绝对值，不允许使用百分比。 |

可以使用CSS的`object-position`属性来调整嵌入对象在元素框架内的位置，并使用`object-fit`属性来控制如何调整对象的大小以适合框架。
 
### 可访问性问题
`<embed>`的可访问性问题与`<ifame>`类似，尤其是在`<embed>`包含视频或音频等交互式内容时。
    
## 媒体或图像源元素 -- `<source>`
`<source>`元素为`<picture>`、`<audio>`元素或`<video>`元素指定多个媒体资源。`<picture>`它是一个 void 元素，这意味着它没有内容，也没有结束标记。它通常用于提供多种文件格式的相同媒体内容，以便提供与各种浏览器的兼容性，因为它们对图像文件格式和媒体文件格式的支持不同。
    
### 属性

| 属性名 | 简介 |
| --- | --- |
| src | 媒体资源的地址。如果`<source>`的父元素是`<audio>`和`<video>`元素，则为必需元素，但如果source元素的父元素是`<picture>`元素，则不允许使用。 |
| type | 图像或其他媒体类型的MIME媒体类型，可选择使用[codecs参数](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter)。|
| srcset | 一个由逗号分隔的一个或多个字符串组成的列表，表示由源代码表示的供浏览器使用的一组可能的图像。 |
| sizes | 描述源表示的图像的最终呈现宽度的源大小列表。每个源大小都由以逗号分隔的媒体条件长度对列表组成。 |
| media | 资源预期媒体的媒体查询。 |
| height | 图像的固有高度（以像素为单位）。必须是不带单位的整数。 |
| width | 图像的固有宽度（以像素为单位）。必须是不带单位的整数。 |

注意：  
1. 无论`<source>`的父元素是`<audio>`、`<video>`或是`<picture>`，`type`都可以使用；而`src`属性。只能在`<audio>`和`<video>`元素为父元素时使用；其余的属性只能在父元素为`<picture>`时使用。
    
2. 如果未指定`type`属性，则会从服务器检索媒体的类型，并检查用户代理是否可以处理它；如果无法处理，则选中下一个`<source>`。如果指定了`type`属性，则会将其与用户代理可以呈现的类型进行比较，如果无法识别，则甚至不会查询服务器，将立即检查下一个`<source>`元素。
    
    当在`<picture>`元素的上下文中使用时，如果在检查每个提供的`<source>`后无法找到合适的图像，浏览器将返回到使用`<picture>`元素的`<img>`子元素指定的图像。

3. `<source>`元素是一个void元素，这意味着它不仅没有内容，而且没有结束标记，所以它不需要结束标签。
    
使用示例：

```html
<!-- 视频示例 -->
<video>
  <source src="test.webm" type="video/webm" />
  <source src="test1.ogg" type="video/ogg" />
  <source src="test2.mov" type="video/quicktime" />
  您的浏览器不支持HTML视频。
  <!-- 如果浏览器支持该元素，但不支持任何指定的格式，则会引发错误事件，并且默认媒体控件（如果已启用）将指示error。 -->
</video>
    
<!-- 图片示例 -->
<!-- 对于<picture>元素，必须始终包含带有回退图像的<img>，以及一个alt 属性以确保可访问性（除非图像是不相关的背景装饰图像）。 -->
<picture>
  <source srcset="test.png" media="(min-width: 800px)" />
  <source srcset="test1.png" media="(min-width: 600px)" />
  <img src="test2.png" alt="test" />
</picture>
```
    
## 图片元素 -- `<picture>`
`<picture>`元素包含零个或多个`<source>`元素和一个`<img>`元素，用于**为不同的显示/设备方案提供图像的替代版本**。通常用于**艺术指导**、**为不支持某些格式的情况提供替代图像格式**以及**通过为查看器的显示加载最合适的图像来节省带宽并加快页面加载时间**。
    
浏览器将考虑每个子`<source>`元素，并从中选择最佳匹配。如果未找到匹配项，或者浏览器不支持`<picture>`元素，则会选择`<img>`元素的`src`属性的URL。然后显示所选图像。

为了确定要加载的 URL，用户代理会检查每个`<source>`的`srcset`、`media`和`type`属性，以选择与显示设备的当前布局和功能最匹配的兼容图像。
 
使用用例：
```html
<picture>
  <source srcset="test.avif" type="image/avif" />
  <source srcset="test.webp" type="image/webp" />
  <img src="test.jpg" alt="Instead of pictures" />
</picture>
```
    
注意：可以在子`<img>`使用CSS的`object-position`属性来调整图像在元素框架内的位置，并使用 `object-fit`属性来控制如何调整图像大小以适合框架。
    
## 参考资料
[内嵌内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#%E5%86%85%E5%B5%8C%E5%86%85%E5%AE%B9)