---
title: "SVG详细解析系列"
description: "可缩放矢量图形（Scalable Vector Graphics，SVG）基于 XML 标记语言，用于描述二维的矢量图形。作为一个基于文本的开放网络标准，SVG 能够优雅而简洁地渲染不同大小的图形，并和 CSS、DOM、JavaScript 和 SMIL 等其他网络标准无缝衔接。"
img: "/content-images/fe-develop/articles/18-svg-detailed-series/cover.webp"
date: "2023-09-08 00:16"
update: 0
tags: ["XML", "SVG"]
---

![cover.webp](/content-images/fe-develop/articles/18-svg-detailed-series/cover.webp)

---
可缩放矢量图形（SVG）是一种基于XML的标记语言，用于描述基于二维的矢量图形。

> 根据百度百科的定义：矢量图形，就是使用直线和曲线来描述的图形，构成这些图形的元素是一些点、线、矩形、多边形、圆和弧线等，它们都是通过数学公式计算获得的，具有编辑后不失真的特点。
> 
> 矢量图以几何图形居多，图形可以无限放大，不变色、不模糊。常用于图案、标志、VI、文字等设计。
>
> 其优点有**文件小**、**对图像缩放，旋转或变形操作时，图形不会产生锯齿效果**、**可采取高分辨率印刷**。

与经典的位图图像格式（如JPEG或PNG）相比，SVG格式的矢量图像可以以任何大小渲染而不会降低质量，并且可以通过更新其中的文本轻松本地化，而无需图形编辑器来执行此操作。有了适当的库，SVG文件甚至可以即时本地化。

## SVG文件的基本规则
- 首先要注意的是渲染元素的顺序。SVG文件的全局有效规则是：后面的元素在前面的元素上呈现。元素越往下看，可见度就越高。

- SVG文件可以直接显示在浏览器中，也可以通过多种方法嵌入到HTML文件中：
  - 如果HTML是XHTML 并且作为`application/xhtml+xml`类型提供，则SVG可以直接嵌入到XML源代码中。
  - SVG也可以直接嵌入到HTML中。
  - 可以使用`<img>`元素。
  - 可以使用`<object>`元素引用。
  - 可以使用`<iframe>`元素嵌入。

## 坐标定位
对于所有元素，SVG使用类似于Canvas使用的坐标系或网格系统。即文档的左上角被视为点（0，0）或原点，从左上角开始以像素为单位测量位置，往右为正X方向，往下为正Y方向，反之为负方向。
![01.webp](/content-images/fe-develop/articles/18-svg-detailed-series/01.webp)

> MDN：在SVG文档中的1个像素对应输出设备（比如显示屏）上的1个像素。但是这种情况是可以改变的，否则 SVG 的名字里也不至于会有“Scalable”（可缩放）这个词。如同 CSS 可以定义字体的绝对大小和相对大小，SVG 也可以定义绝对大小（比如使用`pt`或`cm`标识维度）同时 SVG 也能使用相对大小，只需给出数字，不标明单位，输出时就会采用用户的单位。

一般一个用户单元等于一个屏幕单元。但可以通过`viewBox`属性来改变它的行为，这里的解释详见下文：
```html
<!-- 分辨率为 100x100 像素。一个用户单位等于一个屏幕单位。 --> 
<svg width="100" height="100">…</svg>

<!-- 宽和高还是200像素，但是图像被放大了2倍 -->
<svg width="200" height="200" viewBox="0 0 100 100">…</svg>
```

## SVG元素详解
其实学SVG作为一种XMLlei'x跟学HTML是差不多的，主要还是元素和属性方面的学习。SVG跟HTMLSVG注重图形设计和矢量图形的概念，而HTML注重网页结构和内容的呈现。

### `<svg>`
`<svg>`元素是**定义新坐标系和视区的容器**。它是SVG文档的最外层的容器元素（当然也可以在内部使用，这会生成一个新坐标系和视区），还可用于在SVG或HTML文档中嵌入SVG片段。

### 属性
| 属性名 | 值 | 简介 |
| --- | --- | --- |
| `height` | 长度/百分比 | 矩形视区的显示高度。 |
| `width` | 长度/百分比 | 矩形视区的显示宽度。 |
| `preserveAspectRatio` | (`none`、`xMinYMinxMidYMin`、`xMaxYMin`、`xMinYMid`、`xMidYMid`、`xMaxYMid`、`xMinYMax`、`xMidYMax`、`xMaxYMax`)<br> [(`meet`、`slice`)] | 指示具有提供给定宽高比的`viewBox`属性的元素必须如何适应具有不同宽高比的视口。如果未指定`viewBox`属性，则该属性无效。 |
| `viewBox` | `min-x min-y width height` | 定义了用户坐标空间中的一个矩形区域，用于确定视口的位置和尺寸。可以在不同大小的视窗中呈现相同的图形，同时保持图形的比例和外观不变。 |
| `x` | 长度/百分比 | 显示的svg容器的x坐标。对最外层`<svg>`元素没有影响。 |
| `y` | 长度/百分比 | 显示的svg容器的y坐标。对最外层`<svg>`元素没有影响。 |

- `preserveAspectRatio`属性的取值如上表，其中第一个括号中的值被称为**Alignment value**（必须值），第二个括号的值被称为**Meet or slice reference**（可选值），两种类型的值可以同时使用，具体说明如下：
  - `none`表示不强制均匀缩放。如有必要，不均匀地缩放给定元素的图形内容，以使元素的边界框与视区矩形完全匹配。
  - `x..Y..`格式的值都会强制均匀缩放。以`xMaxYMin`为例，它用于将元素的`viewBox`的`min-x`与视口的最大X值对齐。将元素的`viewBox`的`min-y`与视口的最小Y值对齐。其它同理。
  - `meet`表示视口与图像的宽高比相匹配，图像完全包含在视口内，且保持图像的宽高比。图像可能在视口内居中显示，但不一定填满整个视口。如果视口和图像的宽高比不同，图像将留有空白。
  - `slice`：视口与图像的宽高比相匹配，图像完全包含在视口内，且保持图像的宽高比。图像会被裁剪以填满整个视口，可能会超出视口的范围。
  
- 这里简单说明一下`viewBox`属性，它的作用其实就是在坐标空间中裁剪指定区域，然后将该区域映射到视口大小。比如现在有：
  ```html
  <svg width="200" height="200" viewBox="50 50 100 100" xmlns="http://www.w3.org/2000/svg" style="border: 1px solid #000">
    <circle cx='50' cy='50' r='50' fill='lightblue' />
  </svg>
  ```
  ![02.webp](/content-images/fe-develop/articles/18-svg-detailed-series/02.webp)

### 命名空间
将SVG解析为XML时，为了符合XML中的命名空间建议，必须提供SVG命名空间声明，以便将所有SVG元素标识为属于SVG命名空间。命名空间由`xmlns`属性声明，SVG 2命名空间是`http://www.w3.org/2000/svg`，与早期版本的 SVG相同。

#### 命名空间前缀
这部分是将SVG解析为XML时提供命名空间声明的可能方法。

在`<svg>`元素上指定没有命名空间前缀的`xmlns`属性，意味着SVG是具有`xmlns`属性的元素范围内所有元素的默认命名空间：
```html
<svg xmlns="http://www.w3.org/2000/svg">
  ...
</svg>
```
如果在`xmlns`属性上指定了命名空间前缀（例如，`xmlns:svg="http://www.w3.org/2000/svg"`），则相应的命名空间不是默认命名空间，因此必须为元素分配显式命名空间前缀：
```html
<svg:svg xmlns:svg="http://www.w3.org/2000/svg"">
  ...
</svg:svg>
```

注意：
1. 在HTML文档中使用时命名空间由HTML解析器自动提供，可以不用`xmlns`属性声明。
2. `xmlns`属性仅在SVG文档的最外层`<svg>`元素上是必需的。对于内部`<svg>`元素或HTML文档内部是不必要的。更多详情参考[XML 中的命名空间建议](https://www.w3.org/TR/xml-names/)。

## 系列文章
系列文章：
- [SVG元素详解系列（1） -- 图形元素、容器元素和描述性元素](https://juejin.cn/post/7275977439657705524 "https://juejin.cn/post/7275977439657705524")
- [SVG元素详解（2） -- 文本内容元素和其他未分类元素](https://juejin.cn/post/7276257296497508404 "https://juejin.cn/post/7276257296497508404")
- [SVG元素详解（3） -- 渐变元素和滤镜元素](https://juejin.cn/post/7276257954298118196 "https://juejin.cn/post/7276257954298118196")
- [SVG元素详解系列（4）-- 动画元素与动画系统](https://juejin.cn/post/7276266802824413236)
