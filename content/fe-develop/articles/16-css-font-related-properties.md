---
title: "CSS字体相关属性"
description: "在网页设计中，字体是一个非常重要的元素。正确选择和使用字体可以使网页更加美观、易读和易于理解。CSS提供了一系列字体相关的属性，可以帮助我们控制字体的大小、样式、粗细、颜色等等。在本文中，将参考MDN并介绍列出的字体相关属性。"
img: "/content-images/fe-develop/articles/16-css-font-related-properties/cover.webp"
date: "2023-06-10 12:29"
update: 0
tags: ["CSS"]
---

![cover.webp](/content-images/fe-develop/articles/16-css-font-related-properties/cover.webp)

---
在网页设计中，字体是一个非常重要的元素。正确选择和使用字体可以使网页更加美观、易读和易于理解。CSS提供了一系列字体相关的属性，可以帮助我们控制字体的大小、样式、粗细、颜色等等。在本文中，将参考MDN并介绍列出的字体相关属性。

温馨提示：本文中部分属性会结合[设计师必看的字体与排版应用指南](https://www.zcool.com.cn/article/ZMTE3MjI3Ng==.html)（以下简称指南）进行说明，如果与规范中的定义有出入，请以规范为主。

## 字型、字体和字形
![01.webp](/content-images/fe-develop/articles/16-css-font-related-properties/01.webp)

## 字体格式
- **TrueType字体 (TTF)**：TrueType是1980年代后期由Apple和Microsoft开发的字体标准。 TrueType是Mac OS和Microsoft Windows操作系统最常用的字体格式。

- **OpenType字体 (OTF)**：OpenType是可缩放计算机字体的格式。它基于TrueType构建，并且是Microsoft的注册商标。今天，OpenType字体在主要计算机平台上得到普遍使用。 
  
  Tips：本文中有相当一部分CSS属性与OpenType的特性相关。建议先学习一下[OpenType字体](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Fonts/OpenType_fonts_guide)。更具体的可以查看[OpenType font development](https://learn.microsoft.com/en-us/typography/opentype/)。
- **Web 开放字体格式 (WOFF)**：WOFF是用于网页的字体格式。于2009年开发，现已成为W3C的推荐标准。WOFF本质上是具有压缩和其他元数据的OpenType或TrueType。目标是支持在有带宽限制的网络上从服务器到客户端进行字体分发。

- **Web 开放字体格式 (WOFF 2.0)**：TrueType/OpenType字体比WOFF 1.0提供更好的压缩。

- **SVG字体/形状**：SVG 字体允许在显示文本时将SVG用作字形。SVG 1.1规范定义了一个字体模块，该模块允许在SVG文档中创建字体。还可以将CSS应用于SVG文档，同时`@font-face `规则可以应用于SVG文档中的文本。

- **嵌入式 OpenType 字体 (EOT)**：EOT字体是Microsoft设计的OpenType字体的紧凑形式，用作网页上的嵌入式字体。

### 各浏览器对各Web字体格式的兼容性
![02.webp](/content-images/fe-develop/articles/16-css-font-related-properties/02.webp)

## `font-family`
`font-family`指定**字族名称或通用族名称的优先级列表**。

### 族类
> 族类就是不同字体类型，例如阿里巴巴普惠体、方正新书宋、站酷酷黑体等。而这些众多字体又可分为*衬线体*和*无衬线体*。
> - 衬线体：意思是在字的笔画开始、结束的地方有额外的装饰，而且笔画的粗细会有所不同。宋体就是衬线体。衬线体在一般的APP中比较少见，文字阅读类APP偏爱这种衬线体。
> - 无衬线体：没有额外的装饰，而且笔画的粗细差不多。黑体就是无衬线字体。相比严肃的衬线体，简单干净的无衬线体给人一种休闲轻松的感觉。因此大多数App都是使用黑体作为默认字体。
> ![03.webp](/content-images/fe-develop/articles/16-css-font-related-properties/03.webp)

#### 字族
一个族类包含不同的字体，然而一个字体又可能有好几种**字族**。在CSS中，字族用`font-family`属性指定。比如在电脑上安装了JetBrains Mono字体，在ttf文件夹中就可以看到各种样式的字族。
![04.webp](/content-images/fe-develop/articles/16-css-font-related-properties/04.webp)
> 基本字族包括细体、标准、粗体、斜体，值得注意的是，斜体字常用在引用文本上，代表“本段文字引用的是另一个著作”的含义。

### 取值
| 值类型 | 简介 |
| --- | --- |
| 字族名称（family-name） | 字族系列的名称。比如`JetBrainsMono-Bold`。 |
| 通用字族名称（generic-name） | 是具有标准名称（由 CSS 定义）的字体系列，但它是系统上现有已安装字体系列的别名。也是一种回退机制，是一种在指定的字体都不可用时保留样式表作者的某些意图的方法 |

通用字族名称表如下：
| 字族名称 | 简介 |
| --- | --- |
| `serif` | 衬线字体。表示脚本的正式文本样式。通常按比例间隔。比`sans-serif`通用字体系列中的字体在粗笔画和细笔画之间显示更大的变化。 |
| `sans-serif` | 无衬线字体。通常对比度低(垂直和水平的主干有接近相同的粗细)，并且笔画结尾比较普通(没有任何外露、交叉笔画或其他装饰)。 |
| `monospace` | 等宽字体。所有字形具有相同的固定宽度。这通常用于呈现计算机代码的示例。 |
| `cursive` | 草书。通常使用更非正式的脚本样式，结果看起来更像手写笔或毛笔书写，而不是印刷的字母 |
| `fantasy` | 幻想字体。主要是装饰性或表达性字体，包含装饰性或表达性的字符表示。 |
| `system-ui` | 系统用户界面字体。允许在运行UA的平台上使用默认用户界面字体呈现文本。 |
| `ui-serif` | 用于系统用户界面的衬线变体。 |
| `ui-sans-serif` | 用于系统用户界面的无衬线变体。 |
| `ui-monospace` | 用于系统用户界面的等宽变体。 |
| `ui-rounded` | 用于系统用户界面的圆形变体。 |
| `emoji` | 表情符号。与表情符号字符一起使用。 |
| `math` | 数学字体。与数学表达式一起使用。 |
| `fangsong` | 仿宋字体。用于中文的仿宋字体。介于宋（serif）和楷（cursive）之间的一种轻松的中间形式 |
> 注意：
> - 在使用`font-family`时，至少要包含一个通用字族名称，通常写在最后。因为指定的字族不一定都能用，这允许浏览器在必要时选择可接受的回退字体。
> - 指定的字族列表优先级从高到低。字体选择不会停留在用户系统中列表中的第一个字体。相反，字体选择是一次选择一个字符，因此，如果可用的字体没有所需字符的字形，则尝试后一种字体。当字体仅在某些样式、变体或大小中可用时，这些属性也可能影响所选择的字体族。
> - 除了通用字族外的其他字体系列需要使用引号包裹。并且为避免转义错误，建议将包含空格、数字或连字符以外的标点符号的字体族名也用引号包裹。



## `font-weight`
`font-weight`属性**设置字体的粗细或粗体（字重）**。

### 取值
| 关键字/值类型 | 简介 |
| --- | --- |
| number（1 ~ 1000） | 数字由低到高字体越粗，反之越细。 |
| `normal` | 正常字体粗细。与 400 相同. |
| `lighter` | 比父元素`font-weight`更细的相对字体粗细。 |
| `bold` | 粗体字体粗细。与 700 相同. |
| `bolder` | 比父元素`font-weight`更粗的相对字体粗细。 |

- 需要注意的是，`font-weight`属性的效果由`font-family`决定。比如`font-family`指定了某个字体，然后`font-weight: bold;`，但是指定的字体中并没有`bold`样式的字族，用户代理会转为使用与`bold`相邻的可用字体粗细，具体规则如下：

  | `font-weight`值（w） | 实际呈现字体粗细规则 |
  | --- | --- |
  | w < 400 | 先降序查找小于`w`的可用字体粗细；找不到则升序查找大于`w`的可用字体粗细。 |
  | 400 ≤ w ≤ 500 | 先升序查找`w`到500之间的可用字体粗细；找不到则降序查找400到`w`之间的可用字体粗细；还找不到就升序查找大于500的可用字体粗细。 |
  | w > 500 | 先升序查找大于`w`的可用字体粗细；找不到则降序查找小于`w`的可用字体粗细。 |

- 数字值（1，900）对应的字体粗细名称：

  | 数字值 | 对应名称 |
  | --- | --- |
  | 100 | Thin |
  | 200 | Extra Light (Ultra Light) |
  | 300 | Light |
  | 400 | Normal |
  | 500 | Medium |
  | 600 | Semi Bold (Demi Bold) |
  | 700 | Bold |
  | 800 | Extra Bold (Ultra Bold) |
  | 900 | Black (Heavy) |

#### 相对粗细相对于父元素`font-weight`的粗细
根据CSS Fonts Module Level 4规范（以下简称 CFML4），相对粗细相对于父元素`font-weight`的粗细如下表：
| 继承父元素`font-weight`值（w） | bolder | lighter |
| --- | --- | --- |
| w < 100 | 400 | 无变化 |
| 100 ≤ w < 350 | 400 | 100 |
| 350 ≤ w < 550 | 700 | 100 |
| 550 ≤ w < 750 | 700 | 400 |
| 750 ≤ w < 900 | 900 | 700 |
| 900 ≤ w | 无变化 | 700 |

### 字重设计
> 一般都有细体、正常、粗体三种基本字族。在应用场景上，通常细体多用于超大号字体；「正常」用于正文内容；「粗体」表示强调，多用于标题。
> 
> #### 两种字重设计
> - **轻字重**：传递出轻盈放松的视觉感受，常配合粗的字重使用，在一些辅助信息，说明文案时候使用； 
> - **重字重**：视觉感受庄重，很重要，常用在重点强调的文字，页面大标题，数字，引导行动操作点上等。 
> 
> 知识点：在进行界面设计时，不要用软件自带的文本加粗，它不仅破坏了字体本身的美感，还改变了文字原本的字宽，小字体下会模糊不清，合理的方式是使用字体本身的字重来控制粗细。
> 
> #### 注意超细体的字体 
> 字重超细的字体要谨慎使用。如果你设计的文本是装饰性倒还好，如果是需要用户能清晰阅读的，就要特别慎重，能不用就不用，否则在部分低分辨率的手机屏幕上看起来会非常糟糕。


## `font-size`
`font-size`属性**设置字体的大小（字号）**。对于可伸缩字体，`font-size`是应用于字体EM单元的缩放因子。对于不可伸缩的字体，字体大小被转换为绝对单位，并与字体声明的字体大小相匹配，对两个匹配值使用相同的绝对坐标空间。

### 取值
| 值类型/关键字 | 值 |
| --- | --- |
| 绝对大小 | `xx-small`/`x-small`/`small`/`medium`/`large`/`x-large`/`xx-large`/`xxx-large` |
| 相对大小 | `larger`/`smaller`  |
| 长度/百分比 | 如`16px`/`10%` |
| math | 如`clamp(16px, ..., 35px);` |

绝对大小关键字与正常字体大小的比例：
| 绝对大小 | xx-small | x-small | small | medium | large | x-large | xx-large | xxx-large |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 比例 | 3/5 | 3/4 | 8/9 | 1 | 6/5 | 3/2 | 2 | 3 |

### 字号大小设计
> 字号大小决定了信息的层级和主次关系，合理有序的字号设置能让界面信息清晰易读、层次分明；相反，糟糕无序的字号使用会让界面混乱不堪，影响阅读体验。通常在网页端使用`px`作为字号的单位。移动端兴起后，IOS字体单位是`pt`，Android是`sp`。各端更多设计规范请参考[设计规范](https://www.qijishow.com/down/ios.html)。
> 
> #### 设计中的最小字号
> 我们都知道在界面设计中最小字号不能低于`20px`，那是因为，正常情况下，在手机距离眼睛30cm左右，使用视角计算公式，我们能识别到的最低的文字大小为$h= 2*30·tan(0.3/2) ≈ 0.157cm$，拿我们经常使用iPhone7的尺寸1334×750为例。iPhone7的dpi为324，也就是一英寸上显示324个像素，1英寸为2.54cm，那么$0.157cm=324*(0.157/2.54cm)= 20px$。
> 
> #### 字号的基数关系
> 我们在做设计时，字号的单位最好使用一个基数作为倍增，如2、4、6、8、10  或者3、6、9、12。但其实我们在做移动端设计时，单位需要遵循**偶数原则**，因为开发中的单位是以一倍图的基数来进行计算。那么其实在制定字体规范中，使用2为单位会导致字号过多，且2号字体的差异化不大。所以在字号方面我们使用4作为单位是比较合适的：一是适配后在@2x跟@3x不会出现半像素，二是使用4为单位，能满足字体大小的均衡。
> 
### 使用技巧
- 在`<body>`元素上设置一个具体的字体大小，在页面的其他地方使用相对大小关键字轻松的放大或缩小这个页面上的字体。
- 当需要像素精度时，以像素值（px）为单位设置字体大小是一个不错的选择。`px`值是静态的。这是一种独立于操作系统的跨浏览器方式，用于从字面上告诉浏览器以我们指定的像素高度数呈现字母。

## `font-style`
`font-style`属性用于**选择当前字体的正常或者斜体样式**。斜体字体本质上通常是草体，比无样式字体使用更少的水平空间。

### 取值
| 关键字 | 简介 |
| --- | --- |
| `normal` | 选择`font-family`中被分类为normal字体的字体。 |
| `italic` | 选择`font-family`中被分类为italic字体的字体。通常倾斜度为`14°`。 |
| `oblique[ angle[ angle range]]` | 选择分类为oblique的字体，并指定文本倾斜的角度或角度范围。 |

对于`oblique[ angle[ angle range]]`，可以参考MDN的描述：
> 如果所选字体族中有一个或多个斜面可用，则会选择与指定角度最匹配的斜面。如果没有可用的倾斜面，浏览器将通过将正常面倾斜指定的量来合成字体的倾斜版本。有效值是-90deg到90deg的度数值（包括-90deg和90deg）。如果未指定角度，则使用14度的角度。正值倾斜到线的末端，而负值倾斜到线的开始。
> 
> 通常，对于14度或更大的所需角度，优选更大的角度；否则，更小的角度是首选的。

注意：如果`oblique`不可用，会回退到`italic`字体。

## `font-synthesis`
`font-synthesis`属性**控制浏览器可以合成哪些缺失的字体（粗体、斜体或小大写）**。在需要用到`font-family`的某个字体，但这个字体不存在时，就可以通过这个属性控制用户代理是否合成对应的字体。

比如设置了`font-style: italic;`但是`font-family`指定的字体当中没有斜体字体，那么就可以通过`font-synthesis: style;`让用户代理去合成斜体字体。

根据CFML4中的定义，`font-synthesis`属性是`font-synthesis-weight`、 `font-synthesis-style`和`font-synthesis-small-caps`属性的简写，但是在MDN中并没有这三个属性的内容。在[Can I use](https://caniuse.com/)当中有这三个属性的结果，不过兼容性并不乐观。

简单了解一下这三个属性：分别表示当缺少粗体、斜体和小型大写字体时，是否控制浏览器合成对应的字体，其取值均为`auto`和`none`。

大多数标准西方字体包括斜体和粗体变体，某些字体包括小写字母变体。但是用于中文、日文、韩文和其他标文的字体往往不包含这些变体，合成它们可能会影响文本的易读性。可以关闭浏览器的默认字体合成。

### 取值
| 关键字 | 简介 |
| --- | --- |
| none | 表示不能合成粗体、斜体或小写字体。 |
| `weight` | 表示如果需要，可以合成粗体字体。 |
| `style` | 表示如果需要，可以合成斜体字体。 |
| `small-caps` | 表示如果需要，可以合成小型大写字体。 |

## `font-stretch`
`font-stretch`属性用于**从`font-family`中选择正常的、压缩的或拉伸（横向）的字体**。

### 取值
| 关键字/值类型 | 简介 |
| --- | --- |
| `normal` | 指定普通字体。 |
| `semi-condensed`、`condensed`、`extra-condensed`和`ultra-condensed` | 均指定比正常字体更紧凑的字体，其中`ultra-condensed`字体是最“瘦”的字体。 |
| `semi-expanded`、`expanded`、`extra-expanded`和`ultra-expanded` | 均指定比正常字体更紧凑的字体，其中`ultra-expanded`字体是最“胖”的字体。 |
| 百分比 | 表示字形的分数宽度。 |

值为百分比时不允许为负，其中关键字值与百分比值的对应关系如下：
| 关键字 | `ultra-condensed` | `extra-condensed` | `condensed` | `semi-condensed` | `normal` | `semi-expanded` | `expanded` | `ultra-expanded` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 对应百分比 | 50% | 62.5% | 75% | 87.5% | 100% | 112.5% | 125% | 200% |

与`font-weight`属性类似，为`font-stretch`的值由`font-family`决定。如果`font-family`指定的字体没有完全匹配的值的字体时，`font-stretch`小于100%的值映射到较窄的面，大于或等于100%的值映射到较宽的面。

注意：该属性生效的前提是字族中有压缩或拉伸的字体。

## 字体变体相关属性
样式字体特性有两类：
1. 影响字形形状与周围上下文的协调，如字距和连字特性。
2. 影响形状选择的小大写、下标/上标和交替特性。

温馨提示：下文中出现的对应OpenType特性中的各种功能标记可在[注册功能](https://learn.microsoft.com/en-us/typography/opentype/spec/featurelist)中查询具体信息。

### `font-variant-ligatures`
`font-variant-ligatures`属性**控制在其应用的元素的文本内容中使用哪些连字和上下文形式**。

注意：不是连字符，而是像下面这样常见的连字，类似的还有ffi、th等：
![05.webp](/content-images/fe-develop/articles/16-css-font-related-properties/05.webp)

#### 取值
| 关键字/值类型 | 简介 | 对应OpenType特性 |
| --- | --- | --- |
| none | 显式禁用此属性涵盖的所有类型的连字和上下文形式。 | - |
| `normal` | 指定启用通用默认功能。 | - |
| `common-ligatures` | 显示常见连字。 | liga、clig |
| `no-common-ligatures` | 禁用常见连字的显示。 | liga、clig |
| `discretionary-ligatures` | 显示任意连字。哪些连字可以自由使用，哪些是可选的由字体设计者决定。 | dlig |
| `no-discretionary-ligatures` | 禁用任意连字的显示。 | dlig |
| `historical-ligatures` | 显示历史连字。 | hlig |
| `no-historical-ligatures` | 禁用历史连字的显示。 | hlig |
| `contextual` | 显示上下文替代项。 | calt |
| `no-contextual` | 禁用上下文替代项的显示。 | calt |

### `font-variant-position`
`font-variant-position`属性**控制定位为上标或下标的备用较小字形的使用**。字形相对于字体的基线定位，通常用于`<sub>`和`<sup>`元素。

#### 取值
| 关键字 | 简介 |
| --- | --- |
| `sub` | 允许显示下标变体。 |
| `super` | 允许显示上标变体。 |
| `normal` | 以上功能均未启用。 |

对于缺少给定字符的下标或上标字形的OpenType字体，用户代理会回退合成适当的下标和上标字形。

> 注意：由于一些限制，不建议在用户代理样式表中使用`font-variant-position`。应该在下标或上标只包含指定字体支持的很小范围的字符的情况下使用它。


### `font-variant-caps`
`font-variant-caps`属性**控制选择用于小写或小写字母或标题的备用字形**。

#### 取值
| 关键字 | 简介 | 对应OpenType特性 | 
| --- | --- | --- |
| `small-caps` | 允许显示小型大写字母。 | smcp |
| `all-small-caps` | 允许大写字母转化为小型大写字母。 | c2sc、smcp |
| `petite-caps` | 允许将大小写字母全部转化为小型大写字母。 | pcap |
| `all-petite-caps` | 允许将大小写字母全部转化为小型大写字母。 | c2pc、pcap |
| `unicase` | 允许大写字母转化为小型大写字母与普通小写字母的混用。 | c2pc、pcap |
| `titling-caps` | 允许首字母大写。 | unic |
| `normal` | 以上功能均未启用。 | - |

小型大写字母是字符选项的一种，这个选项比较特殊，就是大写字母在字号一样的情况下，与小写字母一样高，外形与原来保持一致。

### `font-variant-numeric`
`font-variant-numeric`属性**控制数字、分数和序号标记的备用字形的使用**。

#### 取值
| 关键字 | 简介 | 对应OpenType特性 | 
| --- | --- | --- |
| `lining-nums` | 允许显示内衬数字。 | lnum |
| `oldstyle-nums` | 允许显示旧式数字。 | onum |
| `proportional-nums` | 允许显示比例数字。 | pnum |
| `tabular-nums` | 允许显示表格数字。 | tnum |
| `diagonal-fractions` | 允许显示内衬对角线分数。 | frac |
| `stacked-fractions` | 允许显示内衬堆叠分数。 | afrc |
| `ordinal` | 允许显示与序数一起使用的字母形式。 | ordn |
| `slashed-zero` | 允许显示斜线零。 | zero |
| `normal` | 以上功能均未启用。 | - |

### `font-variant-alternates`
对于任何给定的字符，除了该字符的默认字形外，字体还可以提供各种备选字形。`font-variant-alternates`属性提供对这些替代符号的选择的控制。

#### 取值
| 关键字 | 简介 | 对应OpenType特性 | 
| --- | --- | --- |
| `historical-forms` | 允许启用历史形式 。 | hist |
| `stylistic`(feature-value-name) | 允许显示旧式数字。 | salt  |
| `styleset`(feature-value-name) | 允许显示比例数字。 | ss |
| `character-variant`(feature-value-name) | 允许显示表格数字。 | cv |
| `swash`(feature-value-name) | 允许显示内衬对角线分数。 | swsh |
| `ornaments`(feature-value-name) | 允许显示内衬堆叠分数。 | ornm  |
| `annotation`(feature-value-name) | 允许显示与序数一起使用的字母形式。 | nalt |
| `normal` | 允许显示斜线零。 | - |

feature-value-name是[@font-feature-values规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-feature-values)的名称。

### `font-variant-east-asian`
`font-variant-east-asian`属性控制东亚文本中的字形替换和大小调整。

#### 取值
| 关键字 | 简介 | 对应OpenType特性 | 
| --- | --- | --- |
| `jis78` | 允许使用jis78形式呈现。 | jp78 |
| `jis83` | 允许使用JIS83形式呈现。 | jp83 |
| `jis90` | 允许使用JIS90形式呈现。 | jp90 |
| `jis04` | 允许使用JIS04形式呈现。 | jp04 |
| `simplified` | 使用简体中文字形。 | smpl |
| `traditional` | 使用繁体中文字形。 | trad |
| `full-width` | 允许渲染全宽变体。 | fwid |
| `proportional-width` | 允许按比例间隔的变体的渲染。 | pwid |
| `ruby` | 允许显示Ruby变体字形。 | ruby |
| `normal` | 以上功能均未启用。 | - |

### `font-variant-emoji`
`font-variant-emoji`属性**控制选择某些表情符号代码点时是使用表情符号表示还是文本表示**。只影响Unicode列出的用于Unicode表情符号表示序列的代码点，对其他字符没有影响。，但可能会影响会影响字体回退。

#### 取值
| 关键字 | 简介 |
| --- | --- |
| `normal` | 用户代理根据平台约定，选择以表情符号样式或文本样式绘制演示参与代码点。 |
| `text` | 渲染表情符号，就像它正在使用 unicode 文本变体选择器 （`U+FE0E`)。 |
| `emoji` | 呈现表情符号，就像它正在使用 unicode 表情符号变体选择器（`U+FE0F`)。 |
| `unicode` | 根据表情符号表示属性呈现表情符号，如果存在`U+FE0E`或`U+FE0F 变体选择器`，则它将覆盖此值设置。 |

### `font-variant`
`font-variant`属性**允许设置字体的所有字体变体**。它是以上字体变体相关子属性的简写。

#### 取值
```css
font-variant： normal | none | [font-variant-ligatures || font-variant-caps || font-variant-alternates || font-variant-numeric || font-variant-east-asian || font-variant-position || font-variant-emoji] 
```
> 注意：如果`font-variant`值为`none`，相当于是将`font-variant-ligatures`的值设置为`none`，将其他手绘属性的值设置为`normal`值。

## `font-optical-sizing`
`font-optical-sizing`属性设置**文本渲染是否针对不同的尺寸进行优化。**。

### 取值
| 关键字/值类型 |简介 |
| --- | --- |
| `auto` | 用户代理可以根据屏幕的字体大小和像素密度修改字形的形状。 |
| `none` | 用户代理不可以根据屏幕的字体大小和像素密度修改字形的形状。 |

> 在CFML4中规定：
> 
> 当不是由字体直接执行光学大小时，用户代理不能合成光学大小。
> 
> 用户代理不能为“opsz”轴选择不被用于呈现文本的字体所支持的值。这可以通过将选定值夹紧到字体支持的范围来实现。
> 
> `font-optical-sizing`与`font-size-adjust`（这个属性的兼容性简直......如果它兼容性好的话兼容性一定很好😜...有兴趣的话可以参考[font-size-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust)，这里不过多说明，如果是未来可期的属性，就未来再说吧）相互作用。当应用光学尺寸时，用户代理必须应用与调整后的字体大小相适应的光学尺寸值，但要遵守上述限制。

### `font-variation-settings`
`font-variation-settings`属性通过**指定要更改的特征的四个字母轴名称及其值，提供提供对OpenType或TrueType字体变体的低级控制**。

#### 取值
| 关键字/值类型 | 简介 |
| --- | --- |
| `normal` | 文本使用默认设置进行布局。 |
| string number | 呈现文本时，可变字体轴名称列表将传递到文本布局引擎以启用或禁用字体功能。每个设置始终是一对或多对，由**4**个ASCII字符的字符串（区分大小写）后跟一个数字组成，指示要设置的轴值。如果字符串包含更多或更少的字符，或者包含**U+20 - U+7E**代码点范围之外的字符，则整个属性无效。数字可以是小数或负数，具体取决于字体设计器定义的字体中可用的值范围。 |



> 注意：
> - 该属性不会影响要使用备用字体的字体选择，而使用同一轴的字体属性会对字体选择产生影响。
> - 通常情况下我们通常应该使用与字体变化相关的其他属性，仅在特殊情况下使用此属性，即它是访问特定不常用字体变化的唯一方法。
> - 4个ASCII字符的字符串只需要匹配字体中定义的轴标记，因此它们不局限于显式注册的OpenType/TrueType变量轴。定义自定义轴名的字体应该遵循OpenType规范中定义的名称规则。
> - 细节：
>   ![06.webp](/content-images/fe-develop/articles/16-css-font-related-properties/06.webp)
> 
> - 可以使用以下机制将`font-variation-settings`动画化。如果字体特征设置的两个声明*相似*，则它们之间可以动画化。*相似*声明是出现同一组属性的声明（以任何顺序）。
> 
>   因为应用的是连续的重复属性而不是先前的重复属性，所以即使两个声明具有不同数量的属性，它们也可以*相似*。如果两个声明是*相似的*，则动画在声明中的对应值之间成对发生。否则，动画是不可能的。在这种情况下，动画的`from`值在动画过程中未指定的时间被交换为`to`值。
>   
>   具体的动画应用或者该属性的使用示例可以查看[突破限制，CSS font-variation 可变字体的魅力](https://juejin.cn/post/7069587075036626980#heading-3)。
---
## `font`
`font`属性用于**设置与字体相关的多个属性**。


`font`属性是`font-style`、`font-variant`、`font-weight`、`font-stretch`、`font-size`、`line-height`和`font-family`等属性的简写（上述各子属性的顺序也是在`font`属性指定各子属性时的顺序）。未指定的属性一致使用其默认值。

> 注意：
> - 必须包含`font-family`和`font-size`值。
> - 在`font`属性值可以包含`font-variant`和`font-stretch`，但`font-variant`只支持CSS 2.1；`font-stretch`只支持CSS 3。在 CSS Font Level 3和4中规定，`font`属性不包含`font-variant`。
> - 如果要指定`font-style`、`font-variant`和字体`font-weight`值，则必须位于`font-size`之前。
> - `font-stretch`只能是一个关键字值。
> - `line-height`必须紧跟`font-size`之后，写成font-size/line-height。如 `16px / 3`。
> - `font-family`必须是指定的最后一个值。

`font`的值还可以是单个系统字体名称，名称如下：
| 字体名称 | 简介 |
| --- | --- |
| `caption` | 带有标题的控件(例如，按钮，下拉菜单等)的字体。 |
| `icon` | 标记图标的字体。 |
| `menu` | 菜单中使用的字体(例如，下拉菜单和菜单列表)。 |
| `message-box` | 对话框中使用的字体。 |
| `small-caption` | 用于标记小控件的字体。 |
| `status-bar` | 窗口状态栏中使用的字体。 |

系统字体只能作为一个整体设置，其字体族、大小、粗细、样式等都是同时设置的，并且只在第一个值位置有效。同时，系统字体只能用`font`属性指定，不能使用`font-family`。

## `font-feature-settings`
`font-feature-settings`属性**提供对OpenType字体特性的低级控制**。

### 取值
| 关键字 | 值 | 简介 |
| --- | --- | --- |
| `normal` | - | 文本使用默认设置进行布局。 |
| `feature-tag-value` | string/int number/`on`/`off`| 将`feature-tag-value`传递到文本布局引擎以启用或禁用字体功能。  |

`feature-tag-value`（OpenType 功能标记值）的值类型为`string`类型时，是区分大小写的OpenType功能标记，包含四个ASCII字符（可以参考上面的[注册功能](https://learn.microsoft.com/en-us/typography/opentype/spec/featurelist)）。

值为整数时，必须大于等于`0`。值为`0`表示该功能已禁用。对于布尔特性，值为`1`则表示启用该特性。对于非布尔特性，值为`1`或更大将启用要素并指示要素选择索引。值`on`与`1`同义，`off`与`0`同义。如果省略该值，则默认值为`1`。

#### `font-feature-settings`不能设置的字体特性
上面字体变体相关属性能设置的OpenType特性，就不要使用`font-feature-settings`。原因如下：
1. 高级属性单独级联。可以在不设置整个字体功能设置列表的情况下设置一个。
2. 可以为不支持字体特性的字体合成一些高级属性。

## `font-kerning`
`font-kerning`属性**控制使用字体中包含的调整数据的度量字距**。字距调整是对字形间距的上下文调整。对于不包含字偶间距调整数据的字体，将没有可见效果。

> 字偶间距，也叫做*字距调整*，是在字间距的基础上，为实现不同字偶（一对字符）可以有不同字间距的调整值。我们都知道，不同的字母外形不同，所以只有同样的字间距是不协调的。例如，“NA”间是标准的字间距，而“WA”由于W和A的形状可以重叠，所以需要负字偶间距才能达到协调一致的外观。
![07.webp](/content-images/fe-develop/articles/16-css-font-related-properties/07.webp)
在大段落文字排版时，我们一般不需要更改字间距和字偶间距，因为字体设计师已经对他们做过了最优处理。在对一组字符单独设计时，就需要考虑字偶间距，以达到更协调的视觉效果。总的来说，字号越小，字距应当相对越大，行高也应该相对越大。反之亦然。


### 取值
| 关键字 |简介 |
| --- | --- |
| none | 指定不应用字距调整。 |
| `normal` | 指定应用字距调整。  |
| `auto` | 由用户代理自动设置字距。 |

## `font-language-override`
`font-language-override`属性**允许作者显式指定字体的语言系统，重写内容语言隐含的语言系统**。

### 取值
| 关键字/值类型 |简介 |
| --- | --- |
| `normal` | 在使用OpenType字体呈现时，元素的内容语言用于推断OpenType语言系统。 |
| string | 指定要使用的OpenType语言系统，而不是元素语言所隐含的语言系统。具体的值请查看[语言系统标签](https://learn.microsoft.com/zh-cn/typography/opentype/spec/languagetags)。 |

值为string时，具体值参考上面字体变体相关属性的对应OpenType特性。未知的OpenType语言系统标记将被静默忽略，并且不会影响字形的选择和放置。

## 补充
### 全角和半角
全角和半角指的是输入的英文字母或数字的大小，全角输入的英文字母及数字是正常汉字的一半，全角输入的和正常汉字等大。一个汉字占两个英文字符的位置，一个英文字符所占的位置称为*半角*，把一个汉字所占的位置称为*全角*。

> 通常情况下，英文字母、数字、符号等都是半角字符。半角和全角主要是针对标点符号来说的，因为正常情况下没有打全角英文的需求。
>  
> 在设计作品时也一定要记得中文搭配全角符号，英文使用半角符号。否则会出现诸如“你好.”或者“t h a n k s。”这样的错误。可按键盘**capslock**键切换全角和半角。这个小知识点虽然非常基础，却也是设计中经常出错的地方。


## 写在最后
在[设计师必看的字体与排版应用指南](https://www.zcool.com.cn/article/ZMTE3MjI3Ng==.html)中还包含了排版的CRAP原则、信噪比在设计中的作用等有助于提高字体与排版的章节，但由于篇幅过大这里就不过多说明了（膜拜大佬，深受启发👍）。

## 参考资料
- [设计师必看的字体与排版应用指南](https://www.zcool.com.cn/article/ZMTE3MjI3Ng==.html)
- [CSS Fonts Module Level 4](https://w3c.github.io/csswg-drafts/css-fonts/)
- [CSS 参考](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)