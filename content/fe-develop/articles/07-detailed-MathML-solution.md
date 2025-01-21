---
title: "MathML详细解析"
description: "数学标记语言（MathML）是一种基于 XML 的，用于描述数学符号的语言。最初被设计为用于浏览器、办公套件、计算机代数系统、EPUB 阅读器和基于 LaTeX 的生成器的通用规范。"
img: "/content-images/fe-develop/articles/07-detailed-MathML-solution/cover.webp"
date: "2023-02-06 20:37"
update: 0
tags: ["HTML", "XML"]
---

![cover.webp](/content-images/fe-develop/articles/07-detailed-MathML-solution/cover.webp)

---
MathML（数学标记语言）是一种基于XML的语言，用于在web页面上使用分数、脚本、根号、矩阵、积分、级数等编写数学公式。MathML最初是作为一种独立的XML语言设计的，但MathML通常嵌入HTML文档中，可以被视为HTML的扩展。

MathML最初是作为浏览器、办公套件、计算机代数系统、EPUB阅读器和基于latex的生成器的通用规范设计的。然而，这种方法不太适合Web：专注于语义的子集从未在浏览器中实现过，而专注于数学布局的子集导致浏览器实现不完整和不一致。

MathML Core是一个子集，它增加了基于LaTeX和Open Font Format规则的实现细节。它是为浏览器量身定制的，专门设计用于与其他web标准，包括HTML、CSS、 DOM和JavaScript。

这一部分，我们就来学习一下MathML及其相关的元素。注意：MathML使用与HTML相同的语法来表示元素和属性树。

## `<math>`
`<math>`元素是顶级MathML元素，用于编写单个数学公式。每个数学公式都由一个元素`<math>`表示。该元素可以直接放置在HTML页面中。

### 属性
**MathML元素有自己的全局属性 -- 全局MathML属性**。除了全局MathML属性外，`<math>`还含有一个`display`属性，指定应如何呈现包含的MathML标记。其允许的值为`block`和`inline`其中之一，其含义如下：

- `block`，表示此元素将显示在当前文本范围之外的自己的块中，并且`math-style`设置为`normal`。
- `inline`，表示此元素将显示在当前文本范围内，并将`math-style`设置为`compact`。

该属性默认值为`inline`。

## 总体布局
### `<mrow>`
`<mrow>`元素用于**对子表达式进行分组**。这些子表达式通常包含一个或多个运算符及其各自的操作数（例如`<mi>`和`<mn>`）。此元素呈现为包含其参数的水平行。

在编写MathML表达式时，应将`<mrow>`中的元素按照表达式的数学解释中的分组方式进行分组。正确的分组可以在以下几个方面帮助表达式的呈现:
- 它可以通过影响间距来改善显示。
- 它简化了计算机代数系统和音频渲染器等自动化系统对表达式的解释。

> 注意：`<mrow>`本身并不为其分组内容添加可视围栏（如括号），必须使用`<mo>`元素显式地指定它们。

### 使用示例：

```html
<!-- 
        1 + 2
  表示：——————
          3
-->
<math>
  <mfrac>
    <mrow>
      <mn>1</mn>
      <mo>+</mo>
      <mn>2</mn>
    </mrow>
    <mn>3</mn>
  </mfrac>
</math>
```

### `<mfac>`
`<mfrac>`元素用于表示**分数**。它还可用于标记类似分数的对象，例如二项式系数和勒让德符号。

#### 属性
`<mfac>`身上除了全局MathML属性还有一个`linethickness`属性，表示要用于分数条的分数线粗细。如果指定，它必须有一个有效的长度/百分比值。如果该属性不存在或具有无效值，则使用`FractionRuleThickness`作为默认值。百分比是相对于默认值进行解释的。负值解释为`0`。

#### 使用示例

```html
<math>
  <mn>1</mn>
  <mo>+</mo>
  <mfrac>
    <mn>1</mn>
    <mn>2</mn>
  </mfrac>
  <mo>−</mo>
  <!-- 分数线的厚度为0 -->
  <mfrac linethickness="0">
    <mn>1</mn>
    <mn>2</mn>
  </mfrac>
  <mo>+</mo>
  <mfrac linethickness="200%">
    <mn>1</mn>
    <mn>234</mn>
  </mfrac>
</math>
```

### `<msqrt>`和`<mroot>`
根式元素构造了一个表达式，该表达式的根符号为*√*，内容上方有一条线。

`<msqrt>`元素用于表示示**平方根**。

`<mroot>`元素用于**表示带下标的根号**，例如立方根。

`<msqrt>`只接受一个参数：`<msqrt>base</msqrt>`；而接受`<mroot>`两个参数：`<mroot>base index</mroot>`.

#### 使用示例
```html
<!-- <msqrt> -->
<!-- 表示√x -->
<math>
  <msqrt>
    <mi>x</mi>
  </msqrt>
</math>

<!-- <mroot> -->
<!-- 表示3√x -->
<math>
  <mroot>
    <mi>x</mi>
    <mn>3</mn>
  </msqrt>
</math>
```

### `<mpadded>`
`<mpadded>`元素用于**添加额外的填充**，并设置所包含内容的位置和大小的一般调整。

#### 属性
| 属性名 | 值 | 简介 |
| --- | --- | --- |
| depth | 长度/百分比 | 表示`<mpadded>`元素的所需深度（低于基线）。 |
| height | 长度/百分比 | 表示`<mpadded>`元素的所需高度（高于基线）。 |
| width | 长度/百分比 | 表示`<mpadded>`元素的所需宽度（低于基线）。 |
| lspace | 长度/百分比 | 表示子内容的定位点相对于`<mpadded>`元素的定位点的水平位置。 |
| voffset | 长度/百分比 | 表示子内容的定位点相对于`<mpadded>`元素的定位点的垂直位置。  |

如果`<mpadded>`没有属性的话，它的行为就像一个`<mrow>`。

#### 使用示例
```html
<!-- 调整分数周围的间距 -->
<math>
  <mrow>
    <mn>1</mn>
    <mpadded style="background: lightblue;">
      <mfrac>
        <mn>1</mn>
        <mn>2</mn>
      </mfrac>
    </mpadded>
  </mrow>
  <mo>+</mo>
  <mrow>
    <mn>1</mn>
    <mpadded 
      lspace="2em"
      voffset="-1em" 
      height="1em" 
      depth="3em"
      width="7em"
      style="background: lightblue;"
    >
      <mfrac>
        <mn>23456</mn>
        <mn>78</mn>
      </mfrac>
    </mpadded>
    <mn>9</mn>
  </mrow>
</math>
```

### `<mphantom>`
`<mphantom>`元素**以不可见的方式呈现，但仍保留维度（如高度、宽度和基线位置）**。其隐藏的方式使用了是CSS`visibility: hidden;`。

#### 使用示例
```html
<math>
  <mrow>
    <mi>x</mi>
    <mo>+</mo>
    <!-- “y+”不可见 -->
    <mphantom>
      <mi>y</mi>
      <mo>+</mo>
    </mphantom>
    <mi>z</mi>
  </mrow>
</math>
```

### `<merror> `
`<merror>`元素用于**将内容显示为错误消息**。此元素的目的是为从其他输入生成MathML的程序提供一种标准方法来报告语法错误。

默认情况下，`<merror>`呈现为用一个红框包裹住内容。

#### 使用示例
```html
<!-- 显示成Syntax error: \frac{1}被红框包裹 -->
<math>
  <merror>
    <mtext>Syntax error: \frac{1}</mtext>
  </merror>
</math>
```

### `<mstyle>`
`<mstyle>`元素用于**更改其子元素的样式**。从历史上看，`<mstyle>`元素几乎接受所有MathML属性，并用于覆盖其后代的默认属性值。

`<mstyle>`实际上等同于`<mrow>`元素。但是，`<mstyle>`可能仍然与浏览器外部的MathML实现的兼容性相关。

#### 使用示例
```html
<!-- 覆盖<munder>和<munderover>子项的math-style和color -->
<math>
  <mstyle displaystyle="false" mathcolor="teal">
    <munder>
      <mo>∑</mo>
      <mi>I</mi>
    </munder>
    <munderover>
      <mo>∏</mo>
      <mrow>
        <mi>i</mi>
        <mo>=</mo>
        <mn>1</mn>
      </mrow>
      <mi>N</mi>
    </munderover>
  </mstyle>
</math>
```

## token元素
通常，MathML公式中的每个文本都必须包含在此类容器元素（称为token元素）中。MathML提供了多个token元素，以区分文本内容的不同含义。

### `<mi>`
`<mi>`元素**表示内容应呈现为标识符，例如函数名、变量或符号常量**。还可以在其中使用任意文本来标记术语。

数学中的一种排版惯例是使用斜体字母表示变量。为了帮助解决这个问题，具有单个字符的 `<mi>` 元素表示变量，可能会自动呈现为**斜体**；多个字符表示**函数名**，呈现为默认字体。如果需要还原此默认斜体转换，可以在`<mi>`元素身上使用全局MathML属性`mathvariant="normal"`取消单个字符的斜体呈现。

#### 使用示例
```html
<math>
  <!-- 多个字符，表示函数名 -->
  <mi>sin</mi>
</math>

<math>
  <!-- 单个字符表示变量，呈现为斜体。 -->
  <mi>y</mi>
</math>

<math>
  <!-- 单个字符表示变量，呈现为斜体。 -->
  <!-- mathvariant="normal"属性取消斜体。 -->
  <mi mathvariant="normal">Y</mi>
</math>
```

### `<mn>`
`<mn>`元素表示一个**数字字面值或应呈现为数字文本的其他数据**。，通常是一个可能带有分隔符(点或逗号)的数字序列。它也允许在其中包含任意文本，实际上是一个数字数量。

#### 使用示例
```html
<!-- 整数 -->
<math>
  <mn>0</mn>
</math>

<!-- 十六进制 -->
<math>
  <mn>0xFFEF</mn>
</math>

<!-- 英文单词 -->
<math>
  <mn>twelve</mn>
</math>
```

### `<mo>`
`<mo>`元素表示**广义上的运算符**。表示一个操作符或任何应该呈现为操作符的东西。通常，数学运算符的符号约定相当复杂，因此MathML提供了一种相对复杂的机制来指定`<mo>`元素的呈现行为。

在MathML中，应该“作为运算符呈现”的事物列表包括许多不是一般意义上的数学运算符的符号。除了具有中缀、前缀或后缀形式的普通操作符外，这些操作符还包括围栏字符（如大括号、圆括号和“绝对值”条）；隔符（如逗号和分号）；数学上的重音（如符号上的横条或波浪号）。

#### 属性
| 属性名 | 值 | 简介 |
| --- | --- | --- |
| accent | boolean | 表示示在用作下标或上标（即绘制得更大、更靠近基本表达式）时，是否应将运算符视为重音符号。 |
| fence | boolean | 运算符是否为围栏（如括号）。此属性没有视觉效果。 |
| largeop | boolean | 指示当`math-style`设置为`normal`时是否应绘制更大的运算符. |
| lspace | 长度/百分比 | 指示运算符前面的空间量。 |
| rspace | 长度/百分比 | 表示运算符后面的空间量。 |
| maxsize | 长度/百分比 | 表示操作符具有弹性时的最大尺寸。 |
| minsize | 长度/百分比 | 表示操作符具有弹性时的最小尺寸。 |
| movablelimits | boolean | 表示当`math-style`设置为`compact`时，附加的下标和上标是否移动到下标和上标位置。 |
| separator | boolean | 表示运算符是否为分隔符（如逗号）。此属性没有视觉效果。 |
| stretchy | boolean | 表示运算符是否拉伸到相邻元素的大小。 |
| symmetric | boolean | 表示弹性运算符是否应该围绕假想的数学轴（中心分数线）垂直对称。 |

- 对于`lspace`、`maxsize`、`minsize`和`rspace`属性，某些浏览器也可能接受传统的MathML长度。

#### 使用示例
```html
<!-- 
    ∑ ∑
    5 6
-->
<math>
  <mrow displaystyle="true">
    <munder>
      <mo>∑</mo>
      <mn>5</mn>
    </munder>
    <munder>
      <mo largeop="false">∑</mo>
      <mn>6</mn>
    </munder>
  </mrow>
</math>
```

### `<mtext>`
`<mtext>`元素用于呈现**没有符号含义的任意文本**，例如公式中的短单词或注释。

#### 使用示例
```html
<!-- 在定义中放入条件词  -->
<!-- 表示：y = x2 if x >= 1 and 2 otherwise  -->
<math>
  <mi>y</mi>
  <mo>=</mo>
  <mrow>
    <msup>
      <mi>x</mi>
      <mn>2</mn>
    </msup>
    <mtext>&nbsp;if&nbsp;</mtext>
    <mrow>
      <mi>x</mi>
      <mo>≥</mo>
      <mn>1</mn>
    </mrow>
    <mtext>&nbsp;and&nbsp;</mtext>
    <mn>2</mn>
    <mtext>&nbsp;otherwise.</mtext>
  </mrow>
</math>
```

### `<ms>`
`<ms>`元素表示**表达式中的字符串字面量**，该表达式旨在由计算机代数系统或其他包含“编程语言”的系统解释。

在MathML3中，可以使用`lquote`和`rquote`属性分别指定作为开引号和闭引号的字符串。现在不再支持这些引号，必须将引号指定为`<ms>`元素文本的一部分。

#### 使用示例
```html
<!-- 写入一个字符串字面量 -->
<!-- 表示：s="hello world" -->
<math>
  <mi>s</mi>
  <mo>=</mo>
  <ms>"hello world"</ms>
</math>
```

### `<mspace>`
`<mspace>`元素表示任意大小的空格，由其属性设置。注意：`<mspace>`是一个空元素。

#### 属性
| 属性名 | 值 | 简介 |
| --- | --- |
| depth | 表示空间的所需深度（低于基线）。 |
| height | 表示空间的所需高度（高于基线）。 |
| width | 表示所需的空间宽度。 |

`width`、`height`和`depth`(如果存在)必须有一个有效的长度/百分比的值。未指定的属性、百分比值或无效值将解释为`0`。如果计算出的值中有一个为负，则将其视为`0`。

#### 使用示例
```html
<!-- 强制公式中的间距 -->
<math>
  <mn>1</mn>
  <mspace width="10px"
          style="border-top: 1px solid blue"/> 
  <mfrac>
    <mrow>
      <mn>2</mn>
      <mspace depth="10px"
              style="border-top: 1px solid blue"/>
    </mrow>
    <mrow>
      <mn>3</mn>
      <mspace height="20px"
              style="border-top: 1px solid blue"/>
    </mrow>
  </mfrac>
</math>
```

## 脚本和限制元素
### `<mmultiscripts>`与`<mprescripts/>`
`<mmultiscripts>`元素用于**一次将任意数量的下标和上标附加到表达式**，从而概括`<msubsup>` 元素。

`<mprescripts/>`在`<mmultiscripts>`元素中使用，用于分隔后标与前标。在`<mprescripts/>`之前的元素，除了基本表达式外，其余的元素表示后标；反之在其之后的元素表示前标。

#### 使用语法
如下，即一个基表达式，后面跟着任意数量的后下标-后上标对(按给定顺序附加)，中间使用`<mprescripts/>`分隔，后面可选地跟着任意数量的前下标-前上标对(按给定顺序附加)。此外，如果需要表示不存在的上标或下标可以用空的`<mrow>`表示：
```html
<mmultiscripts>
  基本表达式
  后下标1 后上标1
  后下标2 后上标2
  后下标3 后上标4
       ...
  后下标N 后上标N
  <mprescripts/>  
  前下标1 前上标1 
  前下标2 前上标2 
  前下标3 前上标3 
        ...                           
  前下标N 前上标N
</mmultiscripts>
```

#### 使用示例
```html
<!-- 
       9  35
表示：   X
      68  2
-->
<math>
  <mmultiscripts>
    <mn>X</mn>     <!-- 基本表达式 -->
    <mn>2</mn>
    <mn>3</mn>
    <mrow></mrow>  <!-- 该后下标不存在 -->
    <mn>5</mn>

    <mprescripts/>

    <mn>6</mn>
    <mrow></mrow>  <!-- 该前上标不存在 -->
    <mn>8</mn>
    <mn>9</mn>
  </mmultiscripts>
</math>
```

### `<munder>`、`<mover>`和`<munderover>`
`<munder>`元素用于**在表达式下附加重音或限制**。通常用于只需要下标的基本表达式。

`<mover>`元素用于**在表达式上附加强调符号或限制**。通常用于只需要上标的基本表达式。

`<munderover>`元素用于**在表达式下方和表达式上附加重音或限制**。通常用于上下标都需要的基本表达式。

#### 使用语法
`<munder>`和`<mover>`的使用语法是一致的：
```html
<munder> base underscript </munder>或者<mover> base underscript </mover>
```

而`<munderover>`的使用语法是：
```html
<munderover> base underscript overscript </munderover>
```
与`<mmultiscripts>`类似，`base`表示基本表达式；`underscript`表示下标；`overscript`表示上标。


#### 属性
`<munder>`元素使用`accentunder`属性指定是否强调下标；`<mover>`元素使用`accent`属性指定是否强调上标；而`<munderover>`同时具有`accentunder`和`accent`，作用是一致的（强调即绘制得更大、更靠近基本表达式）。

#### 使用示例
```html
<!-- 
表示：
        4   7   10  13
    1 + 3 + 5 + 8 + 11
    2       6   9   12
-->
<math>
  <munder>
    <mn>1</mn>
    <mn>2</mn>
  </munder>
  <mo>+</mo>
  <mover>
    <mn>3</mn>
    <mn>4</mn>
  </mover>
  <mo>+</mo>
  <munderover>
    <mn>5</mn>
    <mn>6</mn>
    <mn>7</mn>
  </munderover>
  <mo>+</mo>
  <munderover accent="true">
    <mn>8</mn>
    <mn>9</mn>
    <mn>10</mn>
  </munderover>
  <mo>+</mo>
  <munderover accentunder="true">
    <mn>11</mn>
    <mn>12</mn>
    <mn>13</mn>
  </munderover>
</math>
```

### `<msub>`, `<msup>`和`<msubsup>`
`<msub>`元素用于**将后下标附加到表达式**。

`<msup>`元素用于**将后上标附加到表达式**。

`<msubsup>`用于**将后上标和后下标附加到表达式**。

#### 使用语法
`<msub>`和`<msup>`的使用语法与上文的`<munder>`和`<mover>`一致；而`<msubsup>`的使用语法与`<munderover>`一致。

使用示例
```html
<!-- 
表示：
           4     5
    x  +  y  +  z
     2           6
-->
<math>
  <msub>
    <mn>x</mn>
    <mn>2</mn>
  </msub>
  <mo>+</mo>
  <msup>
    <mn>y</mn>
    <mn>4</mn>
  </msup>
  <mo>+</mo>
  <msubsup>
    <mn>z</mn>
    <mn>6</mn>
    <mn>7</mn>
  </msubsup>
</math>
```

## 表格数学
### `<mtable>`、`<mtr>`和`<mtd>`
`<mtable>`元素表示**创建一个表格或矩阵**。类似于HTML表格，但是`<mtable>`只包含`<mtr>`和`<mtd>`

`<mtr>`元素表示**表或矩阵中的行**。只能出现在`<mtable>`元素中。

`<mtd>`元素表示**表或矩阵中的单元格**。只能出现在`<mtr>`元素中。

> 注意：`<mtable>`、`<mtr>`和`<mtd>`身上都有许多属性，但是相当大一部分浏览器对这些属性的兼容性不太好，因此这里不过多说明。

#### 使用示例
```html
<!-- 
表示：
        A B
    X = C D
        E F
-->
<math display="block">
  <mi>X</mi>
  <mo>=</mo>
  <mtable>
    <mtr>
      <mtd>
        <mi>A</mi>
      </mtd>
      <mtd>
        <mi>B</mi>
      </mtd>
    </mtr>
    <mtr>
      <mtd>
        <mi>C</mi>
      </mtd>
      <mtd>
        <mi>D</mi>
      </mtd>
    </mtr>
    <mtr>
      <mtd>
        <mi>E</mi>
      </mtd>
      <mtd>
        <mi>F</mi>
      </mtd>
    </mtr>
  </mtable>
</math>
```

## 语义注释
### `<semantics>`、`<annotation>`和`<annotation-xml>`
`<semantics>`元素将注释与MathML表达式关联起来，例如将其文本源作为轻量级标记语言或以特殊XML方言表示的数学含义。

语义元素是将注释与MathML表达式关联起来的容器元素。通常，`<semantics>`元素的第一个子元素是要注释的MathML表达式，而随后的子元素`<annotation>`表示注释元素中的文本注释，或`<annotation-xml>`元素中的更复杂的标记注释。

通常`<semantics>`的结构为
- 第一个子项，它是要注释的 MathML 表达式。
- 随后`<annotation>`或`<annotation-xml>`元素，后者保留用于XML格式，如OpenMath。

默认情况下，只呈现`<semantics>`元素的第一个子元素，而其他元素的CSS`display`属性设置为`none`。

#### `<annotation>`和`<annotation-xml>`属性
`<annotation>`和`<annotation-xml>`除了全局属性外，还支持一个`encoding`属性，表示注释中语义信息的编码。常见的有：`MathML-Content`、`application/openmath+xml`、`image/png`、`MathML-Presentation`...

#### 使用示例
```html
<!-- 呈现为1/2 -->
<math>
  <semantics>
    <!-- 第一个子元素是默认呈现的MathML表达式。 -->
    <mfrac>
      <mn>1</mn>
      <mn>2</mn>
    </mfrac>
    
    <!-- 使用“application/x-tex”进行注释，用于表达数学公式的含义。 -->
    <annotation encoding="application/x-tex">\frac{1}{2}</annotation>
  </semantics>
</math>
```

## 全局MathML属性表
| 属性名 | 简介 |
| --- | --- |
| class | 元素类的空格分隔列表。类允许CSS和JavaScript通过类选择器或函数选择和访问特定元素。 |
| id | 定义在整个文档中必须是唯一的唯一标识符。可在链接（使用片段标识符）、CSS和JavaScript中标识元素。 |
| data-* | 自定义数据属性 |
| dir | 指示MathML元素的方向性。允许的值有`ltr`和`rtl`。 |
| displaystyle | 设置元素数学样式的布尔值。 |
| mathbackground | 元素的背景色。 |
| mathcolor | 元素的字体颜色。 |
| mathsize | 元素的字体大小。 |
| mathvariant | token元素的逻辑类。 |
| nonce | 一个加密随机数（使用一次的数字），内容安全策略可以使用它来确定是否允许继续给定的抓取。 |
| scriptlevel | 指定元素的数学深度。 |
| style | 包含要应用于元素的CSS样式声明。 |
| tabindex | 一个整数属性，指示元素是否可以接受输入焦点(是可聚焦的)，它是否应该参与顺序键盘导航，如果是，在什么位置。 |

`scriptlevel`全局属性用于设置MathML元素的数学深度。它允许覆盖来自用户代理样式表的规则，这些规则定义了MathML公式中字体大小的自动计算。在`<math>`元素上，`math-depth`默认为`0`。

如果`<U>`是无符号整数（即删除了前缀符号），则接受的值为：
- `<U>`：将`math-depth`设置为值`<U>`。这会将元素的`font-size`设置为与指定深度的元素相同的值。
- `+<U>`：将`math-depth`设置为值`add(<U>)`，这将把的元素的字体大小缩小`<U>`倍。
- `-<U>`：将`math-depth`设置为值`add(<-U>)`，这将把的元素的字体大小放大`<U>`倍。

简单理解就是深度越深，字体大小越小。

使用示例：
```html
<math>
  <msubsup>
    <!-- 数学深度和字体大小在基础上保持不变。 -->
    <mtext>BASE</mtext>
    <!-- Math-depth默认为在下标内添加(1)，因此它会加1，字体大小会缩小一次。 -->
    <mtext>SUBSCRIPT</mtext>
    <!-- 
        Math-depth默认也在上标内为add(1)，
        但scriptlevel属性告诉将其增加2，因此字体大小实际上缩小了两次。
    -->
    <mtext scriptlevel="+2">SUPERSCRIPT</mtext>
  </msubsup>
</math>
```

## 回退
有些浏览器并不支持MathML，因此建议为不支持MathML的浏览器提供回退机制。如果文档中只需要包含简单的数学公式，那么在文档中导入mathml.css样式表就可以了：
```html
<script src="https://fred-wang.github.io/mathml.css/mspace.js"></script>
```

如果包含复杂的数学公式，可以考虑MathJax库做polyfill，但相应的库的大小会比mathml.css大：
```html
<script src="https://fred-wang.github.io/mathjax.js/mpadded-min.js"></script>
```

或者，也可以在页面顶部为没有良好MathML支持的浏览器显示警告，并让用户在上面的后退选项中进行选择：
```html
<script src="https://fred-wang.github.io/mathml-warning.js/mpadded-min.js"></script>
```

## 使用示例
实现一个复杂的公式：
[jcode](https://code.juejin.cn/pen/7194421198199980089)

## 工具库
看了上面的示例，写一个公式要77行代码，看着好多啊，但通常情况下MathML内容不是手动编写的。

公式可以直接在网页中编写，通过JavaScript库负责执行它们到MathML的转换。这可能是最简单的选择，但它也有一些问题：必须加载和执行额外的JavaScript代码，必须转义保留字符，Web爬虫无法访问MathML输出...

可以使用自定义元素托管源代码，并确保通过阴影子树插入和呈现相应的MathML输出。例如，使用[TeXZilla](https://github.com/fred-wang/TeXZilla)的`<la-tex>`元素:
```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://fred-wang.github.io/TeXZilla/TeXZilla-min.js"></script>
    <script src="https://fred-wang.github.io/TeXZilla/examples/customElement.js"></script>
  </head>
  <body>
    <p>
      One over square root of two (inline style):
      <la-tex>\frac{1}{\sqrt{2}}</la-tex>
    </p>

    <p>
      One over square root of two (display style):
      <la-tex display="block">\frac{1}{\sqrt{2}}</la-tex>
    </p>
  </body>
</html>

```

也可以使用其他输入法，例如[ASCIIMath](http://asciimath.org/#syntax)或[jqMath](https://mathscribe.com/author/jqmath.html)语法。但都需要确保加载了库并使用正确的分隔符：
```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>ASCII MathML</title>

    <!-- ASCIIMathML.js -->
    <script src="/path/to/ASCIIMathML.js"></script>

    <!-- jqMath -->
    <script src="https://mathscribe.com/mathscribe/jquery-1.4.3.min.js"></script>
    <script src="https://mathscribe.com/mathscribe/jqmath-etc-0.4.6.min.js"></script>

  </head>
  <body>

    <p>One over square root of two (inline style, ASCIIMath): `1/(sqrt 2)`</p>

    <p>One over square root of two (inline style, jqMath): $1/√2$</p>

    <p>One over square root of two (display style, jqMath): $$1/√2$$</p>

  </body>
</html>

```

还可以使用命令行程序，而不是在页面加载时生成MathML表达式。这将导致包含静态MathML内容的页面加载速度更快。如下html文档并不包含任何工具库，通过命令行使用Node.js和TeXZilla执行：
```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    ...
  </head>
  <body>
    <h1>MathML in HTML5</h1>

    <p>
      One over square root of two (inline style):
      $\frac{1}{\sqrt{2}}$
    </p>

    <p>
      One over square root of two (display style):
      $$\frac{1}{\sqrt{2}}$$
    </p>
  </body>
</html>
```
```
cat input.html | node TeXZilla.js streamfilter > output.html
```
转换后生成如下文件output.html：
```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    ...
  </head>
  <body>
    <h1>MathML in HTML5</h1>

    <p>
      One over square root of two (inline style):
      <math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mfrac><mn>1</mn><msqrt><mn>2</mn></msqrt></mfrac><annotation encoding="TeX">\frac{1}{\sqrt{2}}</annotation></semantics></math>
    </p>

    <p>
      One over square root of two (display style):
      <math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mfrac><mn>1</mn><msqrt><mn>2</mn></msqrt></mfrac><annotation encoding="TeX">\frac{1}{\sqrt{2}}</annotation></semantics></math>
    </p>
  </body>
</html>
```

同样的也有更复杂的工具库进行转换，这里就不过多说明了。

## 参考资料
- [MathML](https://developer.mozilla.org/en-US/docs/Learn/MathML)
- [MathML core](https://w3c.github.io/mathml-core/)
- [MathML元素参考](https://developer.mozilla.org/en-US/docs/Web/MathML/Element)