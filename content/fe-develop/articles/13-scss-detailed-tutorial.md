---
title: "SCSS详细教程"
description: "Sass(全称：Syntactically Awesome StyleSheets)是一种编译为CSS的样式表语言。它允许我们使用变量、嵌套规则、混合、函数等，所有这些都使用完全兼容CSS的语法。Sass有助于保持大型样式表井井有条，并可以轻松地在项目内和项目之间共享设计."
img: "/content-images/fe-develop/articles/13-scss-detailed-tutorial/cover.webp"
date: "2023-06-08 21:57"
update: 0
tags: ["CSS", "Scss"]
---

![cover.webp](/content-images/fe-develop/articles/13-scss-detailed-tutorial/cover.webp)

---
Sass(全称：Syntactically Awesome StyleSheets)是一种编译为CSS的样式表语言。它允许我们使用变量、嵌套规则、混合、函数等，所有这些都使用完全兼容CSS的语法。Sass有助于保持大型样式表井井有条，并可以轻松地在项目内和项目之间共享设计。

## Sass实现
- **Dart Sass**：Dart Sass是Sass的主要实现，它在任何其他实现之前都会获得新功能。它快速，易于安装，并且可以编译为纯JavaScript，从而可以轻松集成到现代Web开发工作流程中。我们平时npm安装的sass包就是从Dart Sass实现构建的纯JavaScript包。
- **LibSass**：LibSass是C/C++中Sass的实现，旨在轻松集成到许多不同的语言中。然而，随着时间的推移，它最终在功能和CSS兼容性方面落后于Dart Sass。LibSass现已弃用， 新项目应改用Dart Sass。
- **Ruby Sass**：Ruby Sass是Sass的最初实现，但它已于2019年3月26日到期。它不再受支持，Ruby Sass用户应该迁移到另一个实现。
- **Node-sass**：Node-sass是一个库，它为Node.js提供了与LibSass的绑定。它允许用户以令人难以置信的速度将`.scss`文件本机编译为CSS，并通过连接中间件自动编译。与LibSass一样，Node-sass已弃用。

## 语法格式
Sass 有两种语法格式：
- **SCSS** (Sassy CSS)：现在更常使用这种格式，**本文也只介绍Scss格式**，这种格式仅在CSS3语法的基础上进行拓展，所有CSS3语法在SCSS中都是通用的，同时加入Sass的特色功能。此外，SCSS也支持大多数CSS hacks写法以及浏览器前缀写法 (vendor-specific syntax)，以及早期的IE滤镜写法。这种格式以`.scss`作为拓展名。
- 缩进格式：最早的Sass语法格式，通常简称**Sass**，是一种简化格式。它使用*缩进*代替*花括号*表示属性属于某个选择器；用*换行*代替*分号*分隔属性。很多人认为这样做比SCSS更容易阅读，书写也更快速。缩进格式也可以使用Sass的全部功能，只是与SCSS相比个别地方采取了不同的表达方式，这种格式以`.sass`作为拓展名。

  缩进格式目前不支持跨多行换行的表达式。

任何一种格式可以直接 导入 (`@import`) 到另一种格式中使用

## 安装和使用
- Vue3+Vite配置:
  1. 安装：
      ```cmd
      npm install sass -D
      ```
  2. 配置vite.config.js/ts文件：   
     ```js
     import { defineConfig } from 'vite'
     import vue from '@vitejs/plugin-vue'

     // https://vitejs.dev/config/
     export default defineConfig({
       plugins: [vue()],
       css: {
         preprocessorOptions: {
           scss: {
             additionalData: '@import "全局变量文件路径.scss";'
           }
         }
       }
     })
     ```
- Create-react-app + react配置：
  1. 暴露webpack配置文件： 
     ```cmd
     npm run eject
     ```
  2. 安装sass和sass-resources-loader：
     ```cmd
     npm install sass ass-resources-loader -D
     ```
  3. 创建一个scss文件用于存放全局变量：
     ```scss
     $w: 100px;
     $h: 100px;
     $bgc: lightblue;
     ```
  4. 配置config/webpack.config.js/ts文件：    
     ```js
     // clrt+f 搜索sassRegex，找到如下配置：
     {
       test: sassRegex,
       exclude: sassModuleRegex,
       use: getStyleLoaders(
         {
           importLoaders: 3,
           sourceMap: isEnvProduction
             ? shouldUseSourceMap
             : isEnvDevelopment,
           modules: {
             mode: 'icss',
           },
         },
         'sass-loader'
       ),
       // Don't consider CSS imports dead code even if the
       // containing package claims to have no side effects.
       // Remove this when webpack adds a warning or an error for this.
       // See https://github.com/webpack/webpack/issues/6571
       sideEffects: true,
     },
     // Adds support for CSS Modules, but using SASS
     // using the extension .module.scss or .module.sass
     {
       test: sassModuleRegex,
       use: getStyleLoaders(
         {
           importLoaders: 3,
           sourceMap: isEnvProduction
             ? shouldUseSourceMap
             : isEnvDevelopment,
           modules: {
             mode: 'local',
             getLocalIdent: getCSSModuleLocalIdent,
           },
         },
         'sass-loader'
       ),
     },
     
     // ==============================================
     // 改成：
     {
       test: sassRegex,
       exclude: sassModuleRegex,
       use: getStyleLoaders(
         {
           importLoaders: 3,
           sourceMap: isEnvProduction
             ? shouldUseSourceMap
             : isEnvDevelopment,
           modules: {
             mode: 'icss',
           },
         },
         'sass-loader'
       ).concat([{
         loader: "sass-resources-loader",
         options: {
           resources:[
               path.resolve(__dirname,"全局scss变量文件路径.scss"),
           ]
         }
       }]),
       // Don't consider CSS imports dead code even if the
       // containing package claims to have no side effects.
       // Remove this when webpack adds a warning or an error for this.
       // See https://github.com/webpack/webpack/issues/6571
       sideEffects: true,
     },
     // Adds support for CSS Modules, but using SASS
     // using the extension .module.scss or .module.sass
     {
       test: sassModuleRegex,
       use: getStyleLoaders(
         {
           importLoaders: 3,
           sourceMap: isEnvProduction
             ? shouldUseSourceMap
             : isEnvDevelopment,
           modules: {
             mode: 'local',
             getLocalIdent: getCSSModuleLocalIdent,
           },
         },
         'sass-loader'
       ).concat([{
         loader: "sass-resources-loader",
         options: {
           resources:[
               path.resolve(__dirname,"全局scss变量文件路径.scss"),
           ]
         }
       }]),
     },
     ```
  5. 定义一个scss文件，例如App.scss：
     ```scss
     // 使用全局变量
     .test {
       width: $w;
       height: $h;
       background-color: $bgc;
     }
     ```
   6. 在组件中引入：
      ```js
      import React from 'react'
      import './App.scss';

      export default function App() {
        return (
          <div className='test'>App</div>
        )
      }
      ```

## 注释
Scss支持两种注释方式：
- **单行注释**：使用 **//** 后跟注释。单行注释不会输出到编译后的CSS中。
- **多行注释**：**/* 注释内容 */**。多行注释会输出到编译后的CSS中。

## 变量
变量可以减少重复、进行复杂的数学运算、配置库等等，同时也用于在单个位置控制常用值，主要用于解决相同的值重复数十次甚至数百次的问题。

### 定义变量
Sass变量用`$`符号定义，语法：`$变量名：值`。

🌰：
```scss
// 数据类型
$w: 100px;                           // 数值（带单位）
$img-path: './src/images';           // 字符串
$bgc: #add8e6;                       // 颜色
$is-light: true;                     // 布尔值
$var: null;                          // null
$size-list: xs, sm, md, lg, xl;      // 列表（逗号/空格分隔）
$map: (key1: value1, key2: value2);  // maps，相当于Javascript中的对象


// 值还可以是另一个变量
$var1: var2; // 不属于Scss的数据类型
```


### 使用变量
Sass使用变量的方式就像在CSS中为属性赋值，使用时用`$`符号后接变量名即可。
```scss
div {
  background-color：$box-bgc；
  border-color：$border-color；
}
```
> 注意：
> 1. 可以在Sass中使用CSS变量，Sass变量都被Sass编译掉了。CSS变量包含在CSS输出中。
> 2. 对于不同的元素，CSS变量可以有不同的值，但Sass变量一次只有一个值。
> 3. Sass变量是命令式的，如果我们使用变量然后更改其值，则先前的使用将保持不变。CSS 变量是声明性的，进行与Less一样的操作，它将影响前后的使用：
>    ```scss
>    // Scss
>    $w: 100px;
>    $h: $w;
>
>    $w: 200px;
>    .test {
>      width: $w;
>      height: $h;  // 100px
>      background-color: lightblue;
>    }
>    
>    // 编译后
>    .test {
>      width: 200px;
>      height: 100px;
>      background-color: lightblue;
>    }
>    ```
> 4. Sass变量将连字符和下划线视为相同。这意味着`$font-size`和`$font_size`都引用同一个变量。这是Sass早期的历史遗留物，当时它只允许在标识符名称中使用下划线。

### 各值类型的注意点
#### 数字
Sass数字支持与CSS数字相同的格式，包括科学记数法：`@num: 5.2e2; // 520`。但**Sass不区分整数和小数**。

#### 字符串
字符串可以带或不带引号，关于引号有：引号字符串写在**单引号**或**双引号**之间，如`“Helvetica Neue”`还可以包含插值，以及任何未转义的字符，除了:
- `\`，可以转义为`\\`。
- `'`或`"`，以用于定义该字符串的术语为准，可以将其转义为`\'`或`\"`;
- 换行符，可以转义为`\a`（包括尾随空格）。
   
带引号的字符串保证被编译成与原始Sass字符串具有相同内容的CSS字符串。确切的格式可能因实现或配置而异——包含双引号的字符串可能被编译为`"\""`or`'"'`，非ascii字符可能被转义，也可能不被转义。但是在任何符合标准的CSS实现(包括所有浏览器)中都应该以相同的方式解析。
   
官方🌰：
```scss
$debug: "Helvetica Neue"; // "Helvetica Neue"
$debug: "C:\\Program Files"; // "C:\\Program Files"
$debug: "\"Don't Fear the Reaper\""; // "\"Don't Fear the Reaper\""
$debug: "line1\a line2"; // "line1\aline2"
```
如果不带引号，那么不是所有的标识符都被解析为不带引号的字符串：
- CSS颜色名称被解析为颜色。
- `null`被解析为Sass的`null`值。
- `true`和`false`被解析为布尔值。
- `not`、`and`和`or`被解析为布尔运算符。

#### 布尔值
与其他编程语言不同，在Sass中空字符串、空列表和数字`0`在Sass中都是真值。只需要记住**在Sass中`false`和`null`是假值，其他值均为真值**。

#### 列表
Sass列表可以包含一个甚至零个元素。单元素列表可以写入`(表达式)`或 `[表达式]`，零元素列表可以写成`()`或`[]`（**没有括号的空列表不是有效的CSS**）。

##### 斜杠分隔列表
Sass中的列表可以用斜杠分隔，比如`font: 12px/30px`表示设置字体大小和行高的简写，或者用`hsl(80 100% 50% / 0.5)`语法创建具有给定不透明度值的颜色。但是，用斜杠分隔的列表目前还不能按字面意思编写。

##### 列表的不变性
Sass列表是不可变的，也就是说列表值的内容永远不会更改。不变性有助于避免在样式表的不同部分共享同一列表时可能出现的许多奇怪的的错误。

不过仍然可以通过将新列表分配给同一变量来随着时间的推移更新状态，通常用于函数和混合中，以将一堆值收集到一个列表中。

#### Maps
在Sass中实际上**所有Map都算作列表**。每个映射都算作一个列表，其中包含每个键/值对的双元素列表。空Map的写法与空列表相同（即`()`），它既算作Map又算列表。

大多数时候，Map的键使用带引号的字符串而不是不带引号的字符串。这是因为一些值（比如颜色名称）可能看起来像不带引号的字符串，但实际上是其他类型。为了避免出现令人困惑的问题，最好带上引号。

##### Maps不变性
参考列表不变性。

### 默认变量
Sass提供了`!default`标志。仅当变量未定义或其值为`null`时，才会为变量赋值。否则，将使用现有值。

使用`!default`定义的变量可以在使用`@use`规则加载模块时进行配置。Sass库通常使用`!default`变量来允许用户配置库的CSS。

加载带有配置的模块的语法：`@use url with (变量: 值, 变量: 值,...);`。配置的值将覆盖变量的默认值。只能配置在样式表顶层编写的带有`!default`标志的变量。

官方🌰：
```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}
// style.scss
// 覆盖 _library.scss 中的 $black 和 $border-radius
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);

// 编译后
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
```
> 注意：如果使用`@use`时加上了`with (变量: 值, 变量: 值,...)`，但是被加载文件中的变量没有`!default`标识，则会报错：`This variable was not declared with !default in the @used module.`。

### 内置变量
在Scss中的内置模块中有内置变量，如`sass:math`模块中内置有`$pi`变量。这里只需要注意的是我们无法修改这些内置变量。

### 变量范围
在Sass中，在样式表顶层声明的变量是全局的，也就是说在声明它们之后，可以在其模块中的任何位置访问它们。但是那些在块中声明的（SCSS 中的大括号或 Sass 中的缩进代码）通常是局部的，只能在声明它们的块内访问。

🌰：
```scss
$global: 1; // 全局变量

.local {
  $local: 2; // 局部变量
  margin: $global;
  padding: $loacl;
}

.other {
  margin: $global;
  padding: $loacl; // Error：Undefined variable.
}
```
> 注意：Scss变量不像Less变量有惰性求值的特性，在Scss中**变量必须在使用前定义好**。
> 
> 这是Less惰性求值的一个示例：
> ```less
> // 在Less中下面的写法都是有效的
>  div {
>    background-color: @bgc; // 值为lightblue
>    @bgc: lightblue;
>  }
>  
>  // ----------------------------
>  div {
>    background-color: @bgc; // 值为lightblue，这里懵的话下文有解释
>    @main-color: lightblue;
> }
>  
>  @bgc: @main-color;
>  @main-color: lightpink;
>  ```
>  而在Sass中上面的写法都是错误的。

#### Shadowing
可以在块中定义与全局变量同名的局部变量，如果发生这种情况，实际上有两个具有相同名称的不同变量：一个是局部变量，另一个是全局变量。这有助于确保编写局部变量的作者不会意外更改他们甚至不知道的全局变量的值。

🌰：
```scss
$var: global; // 全局变量
.local {
  $var: local; // 局部变量
  result: $var;
}

.other {
  result: $var;
}

// 编译后
.local {
  result: local;
}
.other {
  result: global;
}
```
如果要从局部范围中修改全局变量的值，则可以使用`!global`标志，**标记为`!global`的变量声明将始终分配给全局范围**。

修改上面那个🌰：
```scss
$var: global; // 全局变量
.local {
  $var: local !global; // 局部变量修改全局变量的值
  result: $var;
}

.other {
  result: $var;
}

// 编译后
.local {
  result: local;
}
.other {
  result: local;
}
```
> 注意：`!global`标志只能用于设置已经在文件顶层声明的变量，不能用于声明新变量。

#### 流控制范围
在流控制（类似我们熟悉的条件判断语句，详细请看下文@规则的流控制部分）规则中声明的变量具有特殊的作用域规则：**它们不会与流控制规则处于同一级别的变量重叠。相反，他们只是给这些变量赋值**。这使得有条件地为变量赋值或将值构建为循环的一部分变得更加容易。

官方🌰：
```scss
$dark-theme: true;
$primary-color: #f8bbd0;
$accent-color: #6a1b9a;

// @if流控制规则与$primary-color和$accent-color处于同一级别
@if $dark-theme {
  $primary-color: darken($primary-color, 60%);
  $accent-color: lighten($accent-color, 60%);
}

.button {
  background-color: $primary-color;
  border: 1px solid $accent-color;
  border-radius: 3px;
}

// 编译后
.button {
  background-color: #750c30;
  border: 1px solid #f5ebfc;
  border-radius: 3px;
}
```
> 注意：流控制作用域中的变量可以分配给外部作用域中的现有变量，但在流控制作用域中声明的新变量在外部作用域中将无法访问。确保在赋值之前已声明变量，即使需要将其声明为`null`也是如此。

### 插值
插值几乎可以在Sass样式表的任何地方使用，将SassScript表达式的结果嵌入到CSS块中。只需将表达式包装在`#{}`中的任何以下位置:
1. 样式规则中的选择器。
2. 属性名称。
3. CSS自定义属性值。
4. @规则。
5. 继承。
6. 普通CSS `@import`。
7. 带或不带引号的字符串。
8. 特殊函数。
9. 普通CSS函数名称。
10. 多行注释。

🌰：
```scss
$family: 'Droid Sans';
$theme: light;
$selector: ipt;
$prop: color;
$bor-style: solid;
$value: 10;
$screen: screen;
$ext: '.test';
$commet: '注释';
$func-name: 'calc';
.test {
  color: lightpink;
}

// 普通CSS @import
@import url("http://fonts.googleapis.com/css?family=#{$family}"); 
:root {
  --theme: #{$theme}; // 自定义属性值
}

/* 多行#{$commet}插值 */
.#{$selector} { // 选择器
  @extend #{$ext}; // 继承
  @media #{$screen} and (min-width: 1024px) { // @规则
    background-#{$prop}: lightblue; // 属性名
    border-style: #{#bor-style}; // 带或不带引号的字符串
    padding: #{$func-name}(10px + 10px); // 普通CSS函数名
  }
}

// 编译后
@charset "UTF-8";
@import url("http://fonts.googleapis.com/css?family=Droid Sans");
:root {
  --theme: light;
}

.test, .ipt {
  color: lightpink;
}

/* 多行注释插值 */
@media screen and (min-width: 1024px) {
  .ipt {
    background-color: lightblue;
    border-style: solid;
    padding: calc(20px);
  }
}
```
> 注意：
> - SassScript中的插值总是返回一个不带引号的字符串。因此尽量不要对数字使用插值。插值返回不带引号的字符串，不能用于任何进一步的数学运算，并且它避免了Sass的内置保障措施，以确保正确使用单位。
> 
>   可以使用Sass提供的单位算术来代替。例如不要写`#{$width}px`，而是写`$width * 1px`，或者更好的是，以声明`$width`变量时包含单位。这样，如果`$width`已经有单位，将得到一个错误消息，而不是编译坏的CSS。
> - 在SassScript表达式中很少需要插值。比如与其写`color: #{$accent}`，不如只写`color: $accent`。

## 运算
在Sass中运算有相等运算、关系运算、数字运算、字符串运算和布尔运算。先来说明各种运算符的优先级（从高到低）和一些注意点：
- 一元运算符`not`、`+`、`-`和`/`。
- `*`、`/`和`%`操作符。
- `+`和`-`运算符。
- `>`、`>=`、`<`和`<=`运算符。
- `==`和`!=`操作符。
- `and`运算符。
- `or`运算符。
- `=`运算符（如果可用）。

如果要显式控制运算顺序，可以用括号`()`包裹运算，括号内的运算优先级始终优于括号外的运算。另外括号可以嵌套使用，这回先计算最里面的括号。

对于`=`运算符，Sass只允许在函数参数中使用的特殊`=`运算符，它只**创建一个不带引号的字符串**，其两个操作数用`=`分隔。这是为了向后兼容非常旧的仅限IE的语法。

🌰：
```scss
.test {
  filter: chroma(color=#0000ff); // filter: chroma(color=#0000ff);
  
  $var: color;
  filter: chroma($var=#0000ff); // filter: chroma(color=#0000ff);
}
```
最后对于颜色运算，Sass支持对颜色进行数字运算，运算分别在每个颜色的RGB通道上运行，但是Sass似乎并不建议这么做，因此要对颜色进行运算最好是使用颜色函数。

### 数字运算
Sass数字运算跟Less数字运算类似，通过`+`、`-`、`*`、`/`和`%`算术运算符对任意**数字**和**变量**进行运算。但是要注意，如果运算中带了单位要注意：
- 如果单位不兼容，进行任何数字运算都会报错。
- 如果单位兼容：
  - 对于加减和取余运算，最终单位为从左往右遇到第一个明确的单位，并且数字部分也会根据换算关系进行转换。
  - 不能进行乘法运算，因为这样没有意义，比如长度乘以长度得到的是一个区域，而CSS不支持指定区域。在进行乘除运算时要带单位的话：
    - 要么在运算后再乘上单位，🌰（设`$num: 5`）：`result: $num * 2 * 1px; // 10px`。
    - 要么用插值语法写入运算：🌰：`result: #{$num * 2}px; // 10px`。
- 还有一点：**无单位数字可以与任何单位的数字一起使用**。

🌰：
```scss
$num: 5cm;

.test {
  result1: $num + 5mm; // 5.5cm
  result2: $num - 5mm; // 4.5cm
  result3: $num * 5mm; // Error：isn't a valid CSS value.
  
  /*
   * math.div()函数的返回值不带单位，如果需要可以用插值语法：#{math.div($num, 5mm)}px;
   * 另外如果其中有一个参数不带单位，另一个参数带了参数会报错 */
  result5: $num % 2cm; // 1cm
}
```
> 关于百分比的注意点：百分比在Sass中就像其他单位一样。它们不能与小数互换，因为在CSS中小数和百分比不一样。例如，`50%`是一个以`%`为单位的数字，Sass认为它不同于数字`0.5`。
> 
> 可以使用单位算术在小数和百分比之间进行转换。`math.div($percentage, 100%)`将返回相应的小数，`$decimal * 100%`将返回相应的百分比。还可以使用`math.percentage()`函数作为更显式的方式来编写`$decimal * 100%`。

#### 除法运算问题（重大变更）
对于除法运算，直接使用`/`符进行除法运算的方式虽然可用，但这种方式已经被弃用了，因为在Sass中`/`符也被用作分隔符，两者会形成冲突，现在在Sass中主要是通过 `math.div()`函数进行除法运算。

```scss
@use 'sass:math';

result4: math.div($num, 5mm); // 10，
```
  
如果仍要直接使用`/`符进行除法运算，必须满足以下条件（具体请参考[Slash-Separated Values](https://sass-lang.com/documentation/operators/numeric#slash-separated-values)）：
  - 任何表达式都不是字面数。
  - 结果存储在变量中或由函数返回。
  - 运算用圆括号括起来，除非这些圆括号位于包含该运算的列表之外。
  - 结果被用作另一个操作(而不是`/`)的一部分。

#### 一元运算符问题
一元运算符只取一个值：
- `+表达式`返回表达式的值而不更改它。
- `-表达式`返回表达式值的负版本。

> 注意点：因为`-`既可以指减法，也可以指一元否定，所以在空格分隔的列表中，为了安全起见：
> - 进行减法运算时，两边都要写空格。
> - 对于负数或一元否定，在前面写空格，后面不要写空格。
> - 如果是在一个空格分隔的列表中，则一元否定要用括号括起来。
> 
> 在Sass中`-`的不同含义优先顺序如下:
> - 作为标识符的一部分。唯一的例外是单位；Sass通常允许使用任何有效的标识符作为标识符，但单位不能包含连字符后接数字。
>- 在表达式和不带空格的字面值之间，它被解析为减法。
>- 在数字字面量的开头，它被解析为负数。
>- 在两个数字之间，不管是否有空格，这将被解析为减法。
>- 在一个非文字数字的值之前，该值被解析为一元否定。

##### 严格的一元运算符（重大变更）
`-`和`＋`即可是一元运算符，也可以是二元运算符。有些时候这很容易把人搞懵，比如官方给出的🌰：
```scss
$size: 10px;

div {
  margin: 15px -$size;
}
```
这里的结果是`5px`还是`15px -10px`呢？sass认为是前者。在将来，如果要使用`-`或`+`进行二元运算需要在运算符两侧添加空格；要进行一元运算，则需要将一元运算符与数字包裹在括号中：
```scss
margin: 15px - $size  // 有效
margin: (15px)-$size  // 有效
margin: 15px -$size   // 无效

margin: 15px (-$size) // 有效
```

### 字符串运算
字符串运算比较简单，只有两种：
- `表达式 + 表达式`返回一个包含两个表达式值的字符串。如果任一值是带引号的字符串，则结果将带引号；否则，它将不加引号。
- `表达式 - 表达式`返回一个不带引号的字符串，其中包含两个表达式的值，用`-`分隔。这是一个遗留运算符，通常应改用插值。

🌰：
```scss
result1: a + b; // ab
result2: a - b; // a-b
```
除此之外，还可以与可以与任何可以写入CSS的值一起使用，但要注意：
- 数字不能用作左侧值，因为它们有自己的运算符。
- 颜色不能用作左侧值，因为它们曾经有自己的运算符。

这些可以用插值语法来代替。

#### 一元运算符
由于历史原因，Sass还支持`/`和`-`作为仅取一个值的一元运算符：
- `/表达式`返回一个不带引号的字符串，该字符串以`/`开头，后跟表达式的值。
- `-表达式`返回一个不带引号的字符串，该字符串以`-`开头，后跟表达式的值。

### 相等运算
相等运算返回两个值是否相同。相等为`true`，不相等为`false`，有两种运算符：
- **表达式 == 表达式**。返回两个表达式是否相等。
- **表达式 != 表达式**。返回两个表达式是否不等。

如果两个值具有相同的类型和相同的值，则认为它们是相等的，有几种情况：
- 如果数字具有相同的值和相同的单位，或者当它们的单位相互转换后它们的值相等，则数字相等。
- 具有相同内容的无引号和带引号的字符串被视为相等。
- 如果颜色具有各通道值（rgba）都相等，则颜色相等。
- 如果列表的内容相等，则列表相等。逗号分隔的列表不等于空格分隔的列表，带括号的列表不等于不带括号的列表。
- 如果Maps的键和值都相等，则Maps相等。
- `true`、`false`和`null`只等于它们自己。
- 函数等于相同的函数。函数是通过引用进行比较的，因此即使两个函数具有相同的名称和定义，如果它们未在同一位置定义，它们也会被视为不同。

### 关系运算
关系运算本质上也是数字运算的一种，就是判断1数字间大于还是小于：
- `表达式 ＜ 表达式`返回第一个表达式的值是否小于第二个表达式的值。
- `表达式 ≤ 表达式`返回第一个表达式的值是否小于或等于第二个表达式的值。
- `表达式 ＞ 表达式`返回第一个表达式的值是否大于第二个表达式的值。
- `表达式 ≥ 表达式`返回第一个表达式的值是否大于或等于第二个表达式的值。

返回值要么为`true`，要么为`false`。

比较的时候，无单位数可以与任何数进行比较，会自动转换单位；如果比较两侧的单位不兼容则会报错。

### 布尔运算
布尔运算也就是我们熟悉的与或非运算，在Sass中有：
- `not 表达式`返回表达式值的反义词：它将`true`变为`false`和`false`变为`true`。
- `表达式 and 表达式`如果两个表达式的值都为`true`则返回`true`，如果其中一个为`false`则返回`false`。.
- `表达式 or 表达式`如果任一表达式的值为`true`则返回`true`，如果两个表达式的值都为`false`则返回`false`。

## 嵌套
> 温馨提示：Sass嵌套大部分内容与Less嵌套类似，这部分内容我将照搬Less篇的嵌套，当然在该注意/不一样的地方我会在文中说明。

嵌套是指将一套CSS样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器。是对CSS功能的扩展。

🌰：
```less
// 普通的CSS
.fat {
  color: #eee;
}

.fat .son {
  background-color: lightblue;
}

.fat .daughter {
  background-color: lightpink;
}

// 使用Less嵌套
.fat {
  color: #eee;
  
  .son {
    background-color: lightblue;
  }
  .daughter {
    background-color: lightpink;
  }
}
```
可以看出，虽然行数一样，但是Sass嵌套写法不需要写父选择器，会更简洁一点。

### 引用父选择器
在某些情况下可能需要在嵌套中出现父选择器（比如伪类，伪元素等），可以用`&`符表示嵌套规则的所有父选择器（不仅仅是最近的祖先）。

🌰：
```less
div {
  color: lightblue;
  
  // &:hover即表示div:hover
  &:hover {
    color: lightpink;
  }
}

.fat {
  .son {
    // &表示嵌套规则的所有父选择器，因此这里表示 .fat .son:hover
    &:hover {
      color: lightblue;
    }
  }
}
```
> 注意：如果没有`&`或者`&`与后接的内容中间有空格的话，最终会生成`div :hover`（匹配`<div>`标记中的悬浮元素的后代选择器），而这并不是我们想要的效果。

另外还可以用其他方式组合嵌套规则的选择器，而不是默认方式。

🌰：
```less
.test {
  // 最终的选择器为.test-ok，相当于拼接
  &-ok {
    background-color: green;
  }
 
  // 最终的选择器为.test-cancel
  &-cancel {
    background-color: red;
  }
}
```
> 注意：`&`后面可以是任意合法的内容，不一定就要用连字符。

#### 多个父选择器
`&`可能会在选择器中多次出现。这样就可以重复引用父选择器而不重复其名称。
> 注意：`&`必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器。

🌰：
```less
.one {
  // 相当于.one + .onetwo {...}
  & + &two {...}
  
  // 相当于.one，.onetwo {...}
  &, &two {...}
  
  // 不同于Less，在Sass中下面这种写法会报错："&" may only used at the beginning of a compound selector. 
  && {...}  
}
```

#### 更改选择器顺序
可以通过将`&`放在当前选择器之前（或后）来将选择器的位置放到继承的（父）选择器前（或后）。
🌰：
```less
.header {
  .menu {
    border-radius: 5px;
    
    // .no-borderradius被添加到父元素前面，形成：.no-borderradius .header .menu {...}
    .no-borderradius & {
      background-image: url('images/button-background.png');
    }
  }
}
```

#### 组合爆炸
`&`还可用于在选择器列表中生成选择器的所有可能排列。

官方🌰：
```less
p, a, ul, li {
  border-top: 2px dotted #366;
  & + & {
    border-top: 0;
  }
}

// 编译后
p, a, ul, li {border-top: 2px dotted #366;}
// 接着会列出p, a, ul, li的所有可能：
p + p, p + a, p + ul, p + li, a + p, a + a, a + ul, a + li, ul + p, ul + a, ul + ul, ul + li, li + p, li + a, li + ul, li + li {
  border-top: 0;
}
```

### 属性嵌套
众所周知，在CSS中存在各种复合属性，如：`font`、`animation`、`transform`...。为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中。

🌰：
```scss
.test {
  // 不要漏了冒号
  font: {
    family: fantasy;
    size: large;
    weight: bold;
    ...
  }
}

// 编译后
.test {
  font-family: fantasy;
  font-size: large;
  font-weight: bold;
}
```
> 注意：在属性嵌套中定义变量编辑器会有警告，但是会正常编译。

另外命名空间也可以用自己的值，官方🌰：
```scss
.funky {
  font: 20px/24px {
    family: fantasy;
    weight: bold;
  }
}

// 编译后
.funky {
  font: 20px/24px;
  font-family: fantasy;
  font-weight: bold; 
}
```

### 占位符选择器
> 官方：
> 
> Sass有一种特殊的选择器，称*占位符*。它的外观和行为都很像一个类选择器，但它以`%`开头，并且不包含在CSS输出中。事实上，任何复杂的选择器（如逗号之间的选择器）甚至包含一个占位符选择器都不包括在CSS中，任何选择器都包含占位符的样式规则也不包括在内。
> 
> 没有被触发的选择器有什么用？它仍然可以继承！与类选择器不同，占位符不会在没有扩展的情况下使CSS变得混乱，也不会强制库的用户为其HTML使用特定的类名。
> 
> 占位符选择器在编写Sass库时很有用，其中每个样式规则可能会也可能不会使用。根据经验，如果只为自己的应用程序编写样式表，通常最好只扩展类选择器（如果有）。

跟下文混合的不会输出到CSS编译中的特性有点类似，不过占位符选择器是用于继承。

官方🌰：
```scss
.alert:hover, %strong-alert {
  font-weight: bold;
}

%strong-alert:hover {
  color: red;
}

// 编译后
.alert:hover {
  font-weight: bold;
}
```

## @规则
### 混合（@mixin）
混合是将一个规则集的样式复制到另一个规则集中。在Sass中，混合使用`@mixin`规则定义，语法：`@mixin 混合名称 {...}`；使用语法：`@include 混合名称;`

混合的名称可以是任何Sass标识符，可以包含除顶级语句之外的任何语句。可以用来封装可以放入单个样式规则中的样式；它们可以包含自己的样式规则，这些规则可以嵌套在其他规则中，也可以包含在样式表的顶层；或者它们可以用来修改变量。
> 注意：混合名称与变量名称都将连字符和下划线视为相同。

定义和使用混合🌰：
```scss
@mixin test-mixin {
  color: lightblue;
  background-color: lightpink;
}

// 使用
.test {
  @include test-mixin;
}

// 编译后
.test {
  color: lightblue;
  background-color: lightpink;
}
```
> 注意：
> - 混合本身不会输出到编译后的CSS中。
> - 混合中可以混入另一个混合，但是不能混入自己，这会造成死循环。
> - 一个混合声明中不能再嵌套声明混合。

#### 参数混合
混合可以接受参数，这允许每次调用它们时自定义它们的行为。参数在`@mixin`名称之后的`@mixin`规则中指定为用括号括起来的变量名称列表。然后，必须以SassScript表达式的形式将混合包含在相同数量的参数中。这些表达式的值在混合的主体中作为相应的变量可用。

官方🌰：
```scss
@mixin rtl($property, $ltr-value, $rtl-value) {
  #{$property}: $ltr-value;

  [dir=rtl] & {
    #{$property}: $rtl-value;
  }
}

.sidebar {
  @include rtl(float, left, right);
}

// 编译后
.sidebar {
  float: left;
}
[dir=rtl] .sidebar {
  float: right;
}
```
> 从上面的🌰可以看出，混合中的`&`符最终是混入方的所有父选择器。

#### 默认参数
就是在定义参数混合时，为参数提供默认值，使得参数变为可选，默认值只会在调用时未传递参数的情况下有效。

🌰：
```scss
@mixin mixin($bgc: #eee) {
  background-color: $bgc;
}

.test {
  @include mixin();
  // .mixins(lightblue); background-color: lightblue;
}

// 编译后
.test {
  background-color: #eee;
}
```

#### 关键字参数
混合会按顺序接收参数，而如果一个混合有若干个参数，有时一下子忘记了每个参数顺序，甚至连参数名都忘了，直接提供值可能会出现牛头不对马嘴的情况，这时候就可以使用命名参数来解决。

命名参数就是指在调用混合时，可以按照名称（而不是位置）提供参数值。

🌰：
```less
@mixin mixin($color, $padding: 2px) {
  color: $color;
  padding: $padding;
}

.test {
  @include mixin($padding: 5px, $color: #008000);
}

// 编译后
.test {
  color: #008000;
  padding: 5px;
}
```
任何参数都可以按其名称引用，不需要纠结它们的顺序。

#### 参数列表
如果混合声明中的最后一个参数以`...`结尾（如：`$selectors...`），则该混合的所有额外参数都将作为列表传递给该参数。

通常要配合一些@规则或内置模块提供的函数来使用参数列表中的某个值，直接使用`$selectors`会使用全部额外参数；而像使用Javascript数组那样使用参数列表是不合法的。

官方🌰1：
```scss
@mixin order($height, $selectors...) {
  @for $i from 0 to length($selectors) {
    #{nth($selectors, $i + 1)} {
      position: absolute;
      height: $height;
      margin-top: $i * $height;
    }
  }
}

@include order(150px, "input.name", "input.address", "input.zip");

// 编译后
input.name {
  position: absolute;
  height: 150px;
  margin-top: 0px;
}

input.address {
  position: absolute;
  height: 150px;
  margin-top: 150px;
}

input.zip {
  position: absolute;
  height: 150px;
  margin-top: 300px;
}
```
官方🌰2：
```scss
@use "sass:meta";

@mixin syntax-colors($args...) {
  // meta.keywords($args); → (string: #080, comment: #800, variable: #60b)
  
  // $name为键，$color为值
  @each $name, $color in meta.keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
)

// 编译后
.CSS输出
pre span.stx-string {
  color: #080;
}

pre span.stx-comment {
  color: #800;
}

pre span.stx-variable {
  color: #60b;
}
```
`meta.keywords()`函数接受一个参数列表，并返回传递给混合的任何额外关键字作为从参数名称（不包括`$`）到这些参数值的映射。

##### 传递参数列表
就是在混入参数混合时，像定义参数列表那样传递一个参数列表给混合，如果传递一个列表，后跟`...`作为最后一个参数，则其元素将被视为附加位置参数。同样，后跟`...`的映射将被视为附加关键字参数。甚至可以同时通过两者！

官方🌰：
```scss
$form-selectors: "input.name", "input.address", "input.zip" !default;

@include order(150px, $form-selectors...);
```

#### 内容块
除了传递参数给混合外，还可以给混合传递一个内容块，与传递参数不同的是，传递内容块不需要括号，内容块使用大括号传入，在混合内部用`@content`规则来代替传入的内容块。

🌰：
```scss
@mixin mixin {
  @content;
}

.test {
  // 用大括号传递内容块
  @include mixin {
    color: lightblue;
    background-color: lightpink;;
  }
}

// 编译后
.test {
  color: lightblue;
  background-color: lightpink;
}
```
> 注意：
> - 一个混合可以包含多个`@content`，内容块将分别包含在每个@content中。
> - 内容块是词法范围的，也就是说它只能看到混入方的局部变量和全局变量，而看不到定义方的变量和传递给混合的参数，即使它们是在调用内容块之前定义的：
>   ```scss
>   @mixin mixin($bgc) {
>     background-color: $bgc;
>     $color: blue; // 内容块看不见该变量
>     @content;
>   }
>
>   .test {
>     $color: lightblue;
>     @include mixin(lightpink) {
>       color: $color;
>       background-color: lightpink;;
>     }
>   }
>   
>   // 编译后
>   .test {
>     background-color: lightpink;
>     color: lightblue;
>     background-color: lightpink;
>   }
>   ```


##### 将参数传递给内容块
混合可以通过编写`@content(参数...)`将参数传递给它的内容块，就像它将参数传递给另一个混合一样。写入内容块的用户可以通过`using(参数...)`写入`@include 混合名`来接受参数。内容块的参数列表就像混合的参数列表一样，`@content`传递给它的参数也像传递给混合的参数一样。

🌰：
```scss
@mixin mixin($color) {
  @content($color);
}

.test {
  @include mixin(lightblue) using ($color) {
    color: $color;
    background-color: lightpink;;
  }
}

// 编译后
.test {
  color: lightblue;
  background-color: lightpink;
}
```

#### 其余注意点
- 混合的参数分隔符始终是**逗号**，使用分号会报错。
- Sass混合没有重载特性，如果有多个相同名称和参数数量的混合，Sass只会匹配最后一个混合。
- 定义参数混合时，参数不能是固定值。

### 继承（@extend）
在写样式的时候会出现这种情况：一个规则集的大部分样式与另一个规则集的样式完全相同，但是又有额外的属性。为了避免写重复的样式，可以使用继承来解决这个问题。继承语法：`@extend 选择器;`它告诉Sass一个选择器应该继承另一个选择器的样式。

当合并选择器时，`@extend`会很聪明地避免无谓的重复并且不能匹配任何元素的选择器也会删除。

🌰：
```scss
.ext {
  color: lightblue;
  background-color: lightpink;
}

.test {
  width: 100px;
  height: 100px;
  @extend .ext;
}

// 编译后
.ext, .test {
  color: lightblue;
  background-color: lightpink;
}
.test {
  width: 100px;
  height: 100px;
}
```
> 注意，假设现在有类A和类B两个类规则集：
> 
> - 当类A继承类B时，会继承除了引用父选择器`&`外的规则集类B中的全部样式和嵌套规则集。这也意味着SassScript中的父选择器看不到继承的结果：
>   ```scss
>   .ext {
>     color: lightblue;
>   
>     #a {
>       background-color: lightpink;
>     }
>     &:hover {
>       width: 100px;
>     }
>     &nesting {
>       height: 100px;
>     }
>   }
>   
>   .test {
>     @extend .ext;
>   }
>   
>   // 编译后
>   .ext, .test {
>     color: lightblue;
>   }
>   .ext #a, .test #a {
>     background-color: lightpink;
>   }
>   .ext:hover, .test:hover {
>     width: 100px;
>   }
>   .extnesting {
>     height: 100px;
>   }
>   ```
> - 如果只要继承类B中的某个嵌套规则，则可以直接写嵌套选择器的名称，不需要带其父选择器的名称。如上面的🌰更改一下：
>   ```scss
>   .ext {
>     color: lightblue;
>
>     #a {
>       background-color: lightpink;
>     }
>     &:hover {
>       width: 100px;
>     }
>     &nesting {
>       height: 100px;
>     }
>   }
>
>   .test {
>     @extend #a; // （1）
>    }
>    
>   // 编译后
>   .ext, .test {
>     color: lightblue;
>   }
>   .ext #a, .ext .test { // （2）
>     background-color: lightpink;
>   }
>   .ext:hover, .test:hover {
>     width: 100px;
>   }
>   .extnesting {
>     height: 100px;
>   }
>   ```
> - 对于继承复杂的选择器，中文官方文档写明的可以继承如`.special.cool`，`a:hover `或者`a.user[href^="http://"]`等复杂的选择器，但是实际在写的时候，直接`@extend .special.cool;`这样继承会报错，并且会提示可以改为`@extend .special, .cool;`的写法，另外两个也是如此。
> - 另外，被继承的类不必在使用前声明。


#### 工作原理
与的混合不同，`@extend`更新包含扩展选择器的样式规则，以便它们也包含扩展选择器。扩展选择器时，Sass会进行智能统一:
- 它永远不会生成像 `#main#footer`这样不可能匹配任何元素的选择器。
- 它确保复杂的选择器是交错的，以便无论HTML元素嵌套的顺序如何，它们都可以工作。
- 它尽可能修剪冗余选择器，同时仍确保特异性大于或等于扩展器的特异性。
- 它知道一个选择器何时匹配另一个选择器所做的一切，并且可以将它们组合在一起。
- 它智能地处理组合器、通用选择器和包含选择器的伪类。
> 注意：`@extend`样式在层叠中的优先级是基于继承选择器的继承规则出现的位置，而不是基于`@extend`出现的位置。这可能会令人困惑，但请记住：如果将继承类添加到HTML中，这些规则的优先级是相同的。

#### 多次继承
如果要继承多个规则集，则可以写多个`@extend`，或者用`@extend`时，用逗号分隔多个选择器名称。

🌰：
```scss
.test1 {
  width: 100px;
}
.test2 {
  height: 100px;
}
.hoverlink {
  @extend .test1, .test2;
}

// 编译后
.test1, .hoverlink {
  width: 100px;
}
.test2, .hoverlink {
  height: 100px;
}
```

#### 继续继承
继续继承指的是一个类继承了另一个类，它仍然可以被继承给第二个、第三个、...第N个类。

🌰：
```scss
.father {
  color: lightblue;
}

.son {
  @extend .father;
  background-color: lightpink;
}

.grandson {
  @extend .son;
}

// 编译后
.father, .son, .grandson {
  color: lightblue;
}
.son, .grandson {
  background-color: lightpink;
}
```

#### 继承范围
当一个规则集继承另一个规则集时，该继承将仅影响在上游使用`@use`规则或`@forward`规则加载的模块等中编写的样式规则。这有助于使`@extend`规则更可预测，确保它们仅影响编写规则时知道的样式。

如果使用的是`@import`规则，则继承根本不限定范围。它们不仅会影响导入的每个样式表，还会影响导入样式表的每个样式表、这些样式表导入的其他所有内容，等等。如果没有`@use`，继承是全局的。

#### 可选继承
一般情况下一个继承继承了一个未声明的规则集会报错。通过在`@extend`末尾添加`!optional`标志，表示如果被继承规则集不存在时不做任何操作，继续往下执行。

🌰：
```scss
// .ext不存在
.test {
  @extend .ext !optional;
  color: lightblue;
}

// 编译后
.test {
  color: lightblue;
}
```

#### 其他注意事项
- 继承可以在`@media`规则和其他CSS@规则中使用，但是要注意，在`@media`中使用继承只能继承`@media`指令层内的规则集，不能继承指令层外的规则集，因为这会造成大量冗余的代码。
- 在Less中，`*.class`与`.class`被认为是不一样的，继承不会匹配；而在Sass中这两者被认为是一样的，继承是匹配的。但是Less与Sass对于`nth`表达式和对于属性选择器中的引号类型问题行为是一致的：
  - `nth-child(1n+3)`与`nth-child(n+3)`被认为是不一样的，不会匹配。
  - 无论属性选择器定义时是否带有引号，继承时都会匹配： 
    ```scss
    [title=identifier] {
      color: red;
    }
    [title='identifier'] {
      color: green;
    }
    [title="identifier"] {
      color: blue;
    }
    /*
      报错
      [title=`identifier`] {
        color: blue;
      } 
    */

    .noQuote:extend([title=identifier]) {}
    .singleQuote:extend([title='identifier']) {}
    .doubleQuote:extend([title="identifier"]) {}
    // .doubleQuote:extend([title=`identifier`]) {} 报错

    // 编译后
    [title=identifier],
    .noQuote,
    .singleQuote,
    .doubleQuote {
      color: red;
    }

    [title='identifier'],
    .noQuote,
    .singleQuote,
    .doubleQuote {
      color: green;
    }

    [title="identifier"],
    .noQuote,
    .singleQuote,
    .doubleQuote {
      color: blue;
    }
    ```

#### 选择混合 or 继承
继承与混合都是封装和重用样式的方式，这自然就提出了何时使用哪一种的问题。当需要使用参数配置样式时，选择混合；而根据经验，在表示语义类(或其他语义选择器)之间的关系时，继承是最佳选择。因为带有`.error——serious`类的元素是一个错误，所以扩展`.error`是有意义的。但是对于非语义的样式集合，编写混合可以避免层叠问题，并使其更容易进行后续配置。

大多数web服务器使用一种非常擅长处理相同文本重复块的算法来压缩它们所提供的CSS。这意味着，尽管混合可能会产生比继承更多的CSS，但它们可能不会大幅增加用户需要下载的数量。因此，选择对用例最有意义的特性，而不是生成最少CSS的特性!

### 函数（@function）
函数允许我们定义对SassScript值的复杂操作，可以在整个样式表中重复使用这些操作。它们可以轻松地以可读的方式抽象出常见的公式和行为。

定义语法：`@function 函数名(参数...) {...}`，如果有返回值则用`@return`指定。调用时使用正常的CSS函数调用语法即可。

官方🌰：
```scss
// 定义
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px; // 调用
}

// 编译后
.sidebar {
  float: left;
  margin-left: 64px;
}
```
> 注意：
> - 与混合名称与变量名称一样，都将连字符和下划线视为相同。
> - 不建议让函数做设置全局变量这些会产生副作用的行为，尽量将函数用于计算值，让混合来表示副作用。

#### 参数
这部分内容与参数混合内容差不多，各位请参考参数混合部分。

#### @return
`@return`指示要用作调用函数结果的值。它只允许在`@function`体内使用，并且每个`@function`都必须以`@return`结尾。

遇到`@return`时，它会立即结束函数并返回其结果。提前返回对于处理边缘情况或可以使用更有效算法的情况非常有用，而无需将整个函数包装在`@else`块中.

#### CSS函数
任何不是用户定义或内置的函数调用都将编译为纯CSS函数（除非它使用Sass参数语法）。参数将被编译为CSS，并按原样包含在函数调用中。

🌰：
```scss
.test {
  // background-image: radial-gradient(0deg, lightpink, lightblue);
  background-image: radial-gradient(0deg, lightpink, lightblue); 
}
```

### @import
> 官方：Sass团队不鼓励继续使用`@import`规则。Sass将在未来几年内逐步淘汰它，并最终将其完全从语言中移除。建议使用`@use`规则。(请注意，目前只有Dart Sass支持`@use`。其他实现的用户必须使用`@import`规则。)
> 
> `@import`存在的问题：
> - `@import`使所有变量、混合和函数全局可访问。这使得人们（或工具）很难分辨出任何定义在哪里。
> - 由于所有内容都是全局的，因此库必须为其所有成员添加前缀以避免命名冲突。
> - `@extend`规则也是全局的，因此很难预测哪些样式规则将被继承。
> - 每次`@import`编辑时都会执行每个样式表并发出其CSS，这会增加编译时间并产生臃肿的输出。
> - 无法定义下游样式表无法访问的私有成员或占位符选择器。

Sass扩展了CSS的`@import`规则，能够导入Sass和CSS样式表，提供对混合、函数和变量的访问，并将多个样式表的CSS组合在一起。与普通CSS导入不同，纯CSS导入要求浏览器在呈现页面时发出多个HTTP请求，Sass导入则完全在编译期间处理。

语法：`@import 样式表1, 样式表2, ..., 样式表N;`。当Sass导入文件时，就好像其内容直接代替`@import`出现一样。导入文件中的任何混合、函数和变量都可用，并且其所有CSS都包含在编写`@import`的确切位置。更重要的是，在`@import`之前定义的任何混合、函数或变量（包括来自其他`@import`）都可以在导入的样式表中使用。

#### 文件后缀
在导入时，文件可以不加后缀，Sass会自动添加`.scss`、`.sass`或`.css`，但要注意Sass 按URL导入文件，而不是按文件路径导入文件。这意味着需要使用正斜杠，而不是反斜杠，即使使用的是Windows。

#### 局部文件
在一个Sass文件中导入另一个文件，在编译时，被导入的文件也会被编译成CSS，即使被导入的文件是如全局变量这种没必要编译的文件，也会被生成一个空的CSS文件。针对这种只需要导入而不需要编译成CSS的Sass文件名以`_`开头(如`_code.scss`)。这些被称为局部文件，它们告诉Sass工具不要试图自行编译这些文件。

在导入这部分文件时可以不带`_`。

🌰：
```scss
// _other.scss
$color: lightpink;
.other {
  background-color: lightblue;
}

// test.scss
@import 'other';

.test {
  @extend .other;
  color: $color;
}

// 编译后
.other, .test {
  background-color: lightblue;
}

.test {
  color: lightpink;
}
```
> 注意：文件后缀和局部文件这两个特性同样适用于`@use`规则，在下文将不做过多说明。

#### 嵌套导入
Sass导入可以嵌套在规则集或者@规则中，不一定要在顶层作用域中使用。嵌套导入中的CSS像混合一样被评估，这意味着任何父选择器都将引用嵌套样式表的选择器：
```scss
// test.scss
.test { 
  @import 'other.scss';
  color: $color; 
}

// 编译后
.test {
  color: lightpink;
}
.test .other {
  background-color: lightblue;
}
```

> 注意：不能在混合指令和控制指令当中嵌套使用`@import`。

#### CSS导入
在Sass中，会将具有以下特征的任何`@import`编译为纯CSS导入：
- 在网址以`.css`结尾的位置导入。
- 在网址开始`http://`或`https://`的位置导入。
- 导入其中URL写入为`url()`。
- 具有媒体查询的导入。

### @use
`@use`规则用于从其他Sass样式表中加载混合、函数和变量，**并将来自多个样式表的CSS组合在一起**。`@use`加载的样式表称为*模块*。语法：`@use "url";`。

`@use`样式都只在编译后的CSS输出中包含一次，无论这些样式加载了多少次。

> 注意：样式表的`@use`规则必须位于`@forward`以外的任何规则（包括样式规则）之前。但是可以在`@use`之前声明变量和注释。

#### 加载成员
通过编写`命名空间.变量`、`命名空间.函数()`以及`@mixin 命名空间.混合`从另一个模块访问变量、函数和混合。默认情况下，命名空间为加载进来的模块的文件名。

🌰：
```scss
// _other.scss
$color: lightblue;

// test.scss
@use 'other';

.test {
  color: other.$color;
  // color: $color; Error: Undefined variable.
}

// 编译后
.test {
  color: lightblue
}
```
加载`@use`的成员（变量、函数和混合）仅在加载它们的样式表中可见。如果其他样式表也想访问它们，则需要编写自己的`@use`规则。这有助于轻松确定每个成员的确切来源。另外，由于成员名称加了命名空间，因此我们可以声明简单的成员名称，不需要担心与其他样式文件或者第三方库的成员发生冲突。

有的时候加载的模块的命名空间名称可能会很长很复杂，这时可以给命名空间选择较短的名称。语法：`@use 'url' as 命名空间;`

🌰：
```scss
// _other.scss
$color: lightblue;

// test.scss
@use 'other' as o;

.test {
  color: o.$color;
  // color: $color; Error: Undefined variable.
}

// 编译后
.test {
  color: lightblue
}
```
> 注意：如果要继承模块中的选择器，不用加命名空间，还是使用原来的写法。

#### 私有成员
Sass通过`$-成员名`或者`$_成员名`来定义私有成员，这些成员只能在他们定义的样式表中使用，@use加载模块的样式表是看不见它们的。

#### 配置
这部分内容在之前介绍默认变量的时候就见过了，这里会更详细的说明。

##### 配置变量
在被加载的样式表中用`!default`标志定义变量，在加载具有配置的模块时，可以使用`@use 'url' with (变量1: 值1, 变量2: 值2)`的语法来覆盖变量的默认值。

🌰：
```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}
// style.scss
// 覆盖 _library.scss 中的 $black 和 $border-radius
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);

// 编译后
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
```

#### 重新分配变量
在加载模块之后，可以用`命名空间.变量: 值;`的语法重新分配变量。但是内置模块的变量无法重新分配。

🌰：
```scss
// _other.scss
$color: lightblue;

// test.scss
@use 'other';
other.$color: lightpink;

.test {
  color: other.$color;
}

// 编译后
.test {
  color: lightpink;
}
```

#### 与@import的区别
- `@use`仅使变量、函数和混合在当前文件的范围内可用。它永远不会将它们添加到全局范围。这使得很容易弄清楚Sass文件引用的每个名称来自哪里，并且意味着可以使用较短的名称而不会有任何冲突风险。
- `@use`只加载每个文件一次。这可确保最终不会意外地多次复制依赖项的CSS。
- `@use`必须出现在文件的开头，并且不能嵌套在样式规则中。
- 每个`@use`规则只能有一个URL。
- `@use`需要在其URL两边加上引号，即使使用缩进语法也是如此.

### @forward
`@forward`规则用于加载Sass样式表，并在样式表加载`@use`规则时使其混合、函数和变量可用。**它可以跨多个文件组织Sass库，同时允许其用户加载单个入口点文件**。

在当前样式表文件中无法访问到`@forward`规则加载的模块的任何成员，通常是将多个样式表文件用`@forward`规则整合在一个文件中，供其他文件用`@use`规则加载使用。

🌰：
```scss
// _other1.scss
$color: lightblue;

// _other2.scss
$bgc: lightpink;

// _forward.scss
@forward 'other1';
@forward 'other2';

// test.scss
@use 'forward';

.test {
  color: forward.$color;
  background-color: forward.$bgc;
}

// 编译后
.test {
  color: lightblue;
  background-color: lightpink;
}
```
> 注意：如果要在同一文件中为同一模块编写了`@forward`和`@use`，则最好先编写`@forward`。这样，如果用户想要配置转发的模块，则该配置将在`@use`加载之前应用于`@forward`，而无需任何配置。

#### 前缀
有些成员名称在定义它们的模块之外可能没有意义，因此`@forward`可以选择为其转发的所有成员添加额外的前缀。语法：`@forward 'url' as 前缀-*;`。它将给定的前缀添加到模块转发的每个混合，函数和变量名称的开头。

改造上面的🌰：
```scss
// _other1.scss
$color: lightblue;

// _other2.scss
$bgc: lightpink;

// _forward.scss
@forward 'other1' as o1;
@forward 'other2';

// test.scss
@use 'forward';

.test {
  color: forward.$o1-color;
  background-color: forward.$bgc;
}

// 编译后
.test {
  color: lightblue;
  background-color: lightpink;
}
```

#### 控制访问性
默认情况下，`@forward`会转发模块中的每个成员，如果希望将某些成员保持私有，以便只有自己的包可以使用它们，或者可能希望要求用户以不同的方式加载某些成员。则可以通过`hide`和`show`两个关键字来控制访问。

语法：`@forward 'url' [show || hide] 成员1, 成员2, ..., 成员N;`。跟在`hide`之后的所有成员不会转发，`show`则只转发列出的成员。

🌰：
```scss
// _other1.scss
$color: lightblue;
$w: 100px;
$h: 100px;

// _other2.scss
$bgc: lightpink;

// _forward.scss
@forward 'other1' show $color;
@forward 'other2';

// test.scss
@use 'forward';

.test {
  color: forward.$color;
  width: forward.$w;  // Error
  height: forward.$h;  // Error
  background-color: forward.$bgc;
}
```

#### 配置模块
`@forward`具有与`@use`的工作方式相同的配置，但增加了一个：`@forward`规则的配置可以在其配置中使用`!default`标志。这允许模块更改上游样式表的默认值，同时仍允许下游样式表覆盖它们。

官方🌰：
```scss
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

// _opinionated.scss
@forward 'library' with (
  $black: #222 !default,
  $border-radius: 0.1rem !default
);

// style.scss
@use 'opinionated' with ($black: #333);

// 编译后
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem #33333326;
}
```

### @at-root
@at-root规则会使其中的所有内容在文档的根部发出，而不是使用正常的嵌套。最常用于使用SassScript父选择器和选择器函数进行高级嵌套。

语法：`@at-root [选择器] {...}`。通常如果省略选择器名称的话是将多个样式规则发出到文档的根目录中。也就是`@at-root {[选择器 { ... }]... }`简写。

官方的🌰：
```scss
@use "sass:selector";

@mixin unify-parent($child) {
  @at-root #{selector.unify(&, $child)} {
    @content;  // 接收内容块
  }
}

.wrapper .field {
  @include unify-parent("input") {
    ...
  }
  @include unify-parent("select") {
    ...
  }
}

// 编译后
.wrapper input.field {
  ...
}

.wrapper select.field {
  ...
}
```
这里如果不使用`@at-root`规则而改用`&`，或者什么都不加的话，编译后会形成`.wrapper .field .wrapper input.field`和`.wrapper .field .wrapper select.field`。因为Sass不知道在执行选择器嵌套时使用什么插值来生成选择器，所以它会自动将外部选择器添加到内部选择器中，即使使用`&`作为SassScript表达式也是如此。

#### 超越样式规则
如果`@ar-root`规则处于一般的选择器样式规则中，其内容会发出到根部中；但是`@ar-root`规则处于其他任何@规则中，那么其内容只能发出到其他@规则的直接作用域中。🌰：
```scss
@media print {
  .page {
    width: 8in;

    @at-root .page {
      color: #111;
    }

    @at-root .page {
      font-size: 1.2em;
    }
  }
}

// 编译后
@media print {
  .page {
    width: 8in;
  }
  .page {
    color: #111;
  }
  .page {
    font-size: 1.2em;
  }
}
```
可以看出，一般情况下`@ar-root`规则无法摆脱其他@规则。可以使用下面两种语法来告诉Sass应该排除哪些规则或者排除列出的规则之外的所有规则：
- `@at-root (with: <@规则的名称…>){…}`。
- `@at-root (without: <@规则的名称…>){…}`。

改造上面那个🌰，同时也是官方🌰：
```scss
@media print {
  .page {
    width: 8in;

    @at-root (without: media) {
      color: #111;
    }

    @at-root (with: rule) {
      font-size: 1.2em;
    }
  }
}

// 编译后
@media print {
  .page {
    width: 8in;
  }
}
.page {
  color: #111;
}
.page {
  font-size: 1.2em;
}
```
注意：除了@规则的名称外，还可以使用两个特殊值：
- `rule`：是指样式规则。例如`@at-root (with: rule)`表示排除所有@规则，但保留样式规则。
- `all`：表示排除所有的样式规则和@规则。

### 流控制规则
流控制规则可以控制是否发出样式，或者以较小的变化多次发出它们。它们还可以用于混合和函数中以编写小算法，使编写 ass更容易。

#### @if、@else if与@else
- `@if`：控制是否评估其块（包括以CSS形式发出任何样式）。表达式通常返回`true`或`false`。如果表达式返回`true`，则计算块，如果表达式返回`false`，则不计算。
- `@else if`：仅当前面`@if`的表达式返回`false`，并且`@else if`的表达式返回`true`时，才会计算此规则的块。
- `@else`：如果前面的`@if`规则或`@else if`（如果存在）表达式都返回`false`，则计算此规则的块。

三者语法：
- `@if 表达式 {...}`。
- `@else if 表达式 {...}`。
- `@else {...}`。

🌰：
```scss
$theme: lightblue;
$num: 3;

// 两种写法效果一样
.theme {                                           // @if ($theme == lightblue) and ($num == 3) {
  @if ($theme == lightblue) and ($num == 3) {      //   .theme {
    background-color: lightblue;                   //     background-color: lightblue;  
  } @else if $theme == lightpink {                 //   }
    background-color: lightpink;              <=>  // } @else if $theme == lightpink { 
  } @else {                                        //    .theme {
    bgcground-color: #eee;                         //      background-color: lightpink;
  }                                                //    }
}                                                  // } @else {
                                                   //    .theme {
                                                   //      background-color: lightpink;
                                                   //    }
                                                   // }

// 编译后
.theme {
  background-color: lightblue;
}
```

#### @each
`@each`规则，可以轻松地为列表中的每个元素或Maps中的每个元素对发出样式或计算代码。

- 表达式返回列表的语法：`@each 变量 in 表达式 {...}`。其中表达式返回一个列表。依次为列表中的每个元素计算块，并将其分配给给定的变量名称。
- 表达式返回Maps的语法：`@each [变量]... in 表达式 {...}`。这种形式被称为*解构*，因为变量与内部列表的结构匹配。每个变量名称都分配给列表中相应位置的值，如果列表中没有足够的值，则为`null`。

表达式返回列表🌰：
```scss
$screen-width: small, medium, large, x-large;

@each $w in $screen-width {
  .screen-#{$w} {
    font-size: $w;
  }
}

// 编译后
.screen-small {
  font-size: small;
}
.screen-medium {
  font-size: medium;
}
.screen-large {
  font-size: large;
}
.screen-x-large {
  font-size: x-large;
}
```

表达式返回Maps🌰：
```scss
$map: (name1: value1, name2: value2, name3: value3);

@each $name, $value in $map {
  .select-#{$name} {
    value: $value;
  }
}

// 编译后
.select-name1 {
  value: value1;
}
.select-name2 {
  value: value2;
}
.select-name3 {
  value: value3;
}
```

#### @for
@for规则用于从一个数字（第一个表达式的结果）向上或向下计数到另一个数字（第二个表达式的结果），并为介于两者之间的每个数字计算一个块。沿途的每个数字都分配给给定的变量名称。

语法：`@for 变量 from 表达式 [to || through] 表达式 {...}`。如果使用`to`，则不包括最终数字；如果使用`through`，则将其包括在内。

🌰：
```scss
@for $i from 1 to 3 {
  .test#{$i} {
    width: $i * 1px;
  }
}

// 编译后
.test1 {
  width: 1px;
}

.test2 {
  width: 2px;
}
```

#### @while
@while规则，如果表达式返回`true`，则计算它的块。然后再判断其表达式是否为`true`，为`true`则再计算它的快...。这一直持续到表达式最终返回`false`。

语法：`@while <表达式>{...}`。

官方🌰：
```scss
@use "sass:math";

@function scale-below($value, $base, $ratio: 1.618) {
  @while $value > $base {
    $value: math.div($value, $ratio);
  }
  @return $value;
}

$normal-font-size: 16px;
sup {
  font-size: scale-below(20px, 16px);
}

// 编译后
sup {
  font-size: 12.36094px;
}
```
> 注意：对于一些特别复杂的样式表来说最好使用`@while`，但是一般情况下，如果能用`@each`或者`@for`就尽量用这两者，一是比较容易阅读，二是后两者编译速度会更快。

## 重大变更
> 注意：在本文中标了 **（重大变更）** 的内容原本是属于这部分的，为了方便学习和查询而写在了其他位置。

### 无效的组合器
Sass将抛弃那些在选择器中使用了前导、尾随和重复的组合器，除非对嵌套有用。官方🌰：
```scss
前导组合器，如 + .error {color: red}
尾随组合器，如 .error + {color: red}
重复运算器，如 div > > .error {color: red}
```
目前Sass仍然支持这些写法，但这三种组合器都是无效的CSS，所有这些都会导致浏览器忽略有问题的样式规则。支持它们增加了Sass实现的大量复杂性，并且使得修复与@extend规则相关的各种错误变得特别困难。因此官方决定删除对这些用途的支持。

除非他们像下面这样对嵌套有用：
```scss
.sidebar > {
  .error {
    color: red;
  }
}

// 编译后
.sidebar > .error {
  color: red;
}
```

### 媒体查询级别4
Sass添加了对CSS媒体查询级别4规范的完全支持，更改了一些构造的含义：
- `@media (not (foo))`在曾被Sass解释为`@media (#{not (foo)})`，因此被编译为`@media (false)`。
- `@media ((foo)和(bar))`和`@media ((foo)或(bar))`同样被解释为SassScript的逻辑运算符，分别编译为`@media (bar)`和`@media (foo)`。

这些语法已被弃用，现在根据CSS标准进行解释。

### -moz-document
Firefox曾经有一个需要特殊解析的`@-moz-document`规则，现在随着Firefox对该规则的弃用，Sass官方也正在删除对解析该规则的支持。

但是仍然允许使用针对Firefox的黑客攻击的空的url前缀函数：
```scss
@-moz-document url-prefix() {
  .error {
    color: red;
  }
}
```

## 内置模块
Sass提供了许多内置模块，其中包含有用的函数（偶尔还有混合）和变量。这些模块可以像任何用户定义的样式表一样使用`@use`规则加载，并且可以像任何其他模块成员一样调用它们的函数。所有内置模块URL都以`sass:`开头，表示它们是Sass本身的一部分。

> 注意：
> - 由于在这里`||`会被当成表格项，因此下文函数语法使用`//`代替`||`表示**或**。
> - 在下文中会出现有些函数带有其模块命名空间，有些则没有，不带命名空间的函数是一些函数的全局别名，全局可用，不需要加载对应的内置模块。
> 
>   官方对此的说明是：
>   
>   在引入Sass模块系统之前，所有Sass函数在任何时候都是全局可用的。许多函数仍然有全局别名。Sass团队不鼓励使用它们，并最终将弃用它们，但目前它们仍然可以与旧Sass版本和LibSass（还不支持模块系统）兼容。
>
>   即使在新的模块系统中，也只有少数函数是全局可用的，要么是因为它们具有特殊的求值行为，要么是因为它们在内置CSS函数(如`rgb()`和`hsl()`)之上添加了额外的行为。这些不会被弃用，可以自由使用。

### sass:color
`sass:color`模块基于现有颜色生成新颜色，从而轻松构建颜色主题。

### 函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `color.adjust` | `color.adjust($color[, $red, $green $blue // [$hue[, $saturation, $lightness // $whiteness, $blackness], $alpha])` | 按固定量增加或减少`$color`的一个或多个属性。 |
| `color.blue` | `color.blue($color)` | 以`0`到`255`之间的数字形式返回`$color`的蓝色通道。 |
| `color.green($color)` | `color.green($color)` | 以`0`到`255`之间的数字形式返回`$color`的绿色通道。 |
| `color.red($color)` | `color.red($color)` | 以`0`到`255`之间的数字形式返回`$color`的红色通道。 |
| `color.hue` | `color.hue($color)` | 以`0deg`到`360deg`之间的数字形式返回`$color`的色调。 |
| `color.saturation` | `color.saturation($color)` | 以`0%`到`100%`之间的数字形式返回`$color`的HSL饱和度。 |
| `color.lightness` | `color.lightness($color)` | 以`0%`到`100%`之间的数字形式返回`$color`的HSL亮度。 |
| `color.hwb` | `color.hwb($hue $whiteness $blackness)`、<br>`color.hwb($hue $whiteness $blackness / $alpha)`、<br>`color.hwb($hue, $whiteness, $blackness, $alpha)` | 返回具有给定色调、白度和黑度以及给定Alpha通道的颜色。 |
| `color.whiteness` | `color.whiteness($color)` | 以`0%`到`100%`之间的数字返回`$color`的HWB白度。 |
| `color.blackness` | `color.blackness($color)` | 以`0%`到`100%`之间的数字返回`$color`的HWB黑度. |
| `color.alpha` | `color.alpha($color)` | 以`0`到`1`之间的数字形式返回`$color`的`alpha`通道。 |
| `color.change` | 同`color.adjust` | 将颜色的一个或多个属性设置为新值。 |
| `color.complement` | `color.complement($color)` | 返回`$color`的RGB补码，与`color.adjust($color, $hue: 180deg)`相同。 |
| `color.grayscale` | `color.grayscale($color)` | 返回与`$color`具有相同亮度的灰色。与 `color.change($color, $saturation: 0%)`一样。 |
| `color.ie-hex-str` | `color.ie-hex-str($color)` | 返回一个不带引号的字符串，该字符串以IE的`--ms-filter`属性所需的`#AARRGGBB`格式表示`$color`。 |
| `color.invert` | `color.invert($color, $weight)` | 返回`$color`的反数或负数. |
| `color.mix` | `color.mix($color1, $color2, $weight)` | 返回混合了`$color1`和`$color2`的颜色. |
| `color.scale` | 同`color.adjust` | 流畅地缩放`$color`的一个或多个属性。 |
| `adjust-hue` | `adjust-hue($color, $degrees)` | 增加或减少`$color`的色调。 |
| `opacity` | `opacity($color)` | 以`0`到`1`之间的数字形式返回`$color`的`alpha`通道。 |
| `opacify` | `opacity($color, $amount)` | 使`$color`更加不透明。 |
| `darken` | `darken($color, $amount)` | 使`$color`更暗。 |
| `lighten` | `lighten($color, $amount) `| 使`$color`更亮。 |
| `desaturate` | `desaturate($color, $amount)` | 使`$color`饱和度降低。 |
| `saturate` | `saturate($color, $amount)` | 使`$color`更加饱和。 |
| `transparentize` | `transparentize($color, $amount)` | 使`$color`更加透明。 |

> 注意点：
> - 对于`adjust-color`函数，其参数必须使用关键字参数的形式传递，参数必须是数字，其中：
>   - 第2-4个参数表示**RGB**，参数不能带单位且介于 **-255~255**（含）之间。
>   - 第5-7个函数表示**HSL**，其中`$hue`必须具有单位`deg`或者不带单位，且介于 **-360deg~360deg**（含）之间；`$saturation`和`$lightness`参数必须带单位`%`，且介于 **-100%%~100%**（含）之间。
>   - 第5和第8-9个函数表示**HWB**，其中`$whiteness`和`$blackness`参数规则同上。
>   - `$alpha`参数必须是无单位的，并且介于 **-1~1**（含）之间。
>   
>   只能指定其中一种类型的参数，比如指定了RGB参数，就不能指定HSL和HWB参数。而最后一个参数可以与前面三种类型的参数组合构成**RGBA**、**HSLA**和**HWBA**。
> - `darken`、`desaturate`、`saturate`和`lighten`四个函数的`$amount`参数值必须是介于`0%`和 `100%`（含）之间的数字。将`$color`的HSL的某个通道降低/增加`$amount`。
> 
>   `opacify`和`transparentize`两个函数的`$amount`值必须是介于`0`和`1`（含）之间的数字。
>   
>   另外上述六个函数都是将某个通道增加或减少固定量，要使颜色比以前增加或减少一定百分比，请改用`color.scale`函数。因为这些函数通常不是处理颜色通道的最佳方法，所以它不会直接包含在新的模块系统中。但是如he果必须保留现有行为，举个栗子可以将`darken($color, $amount)` 写为`color.adjust($color, $lightness: -$amount)`。
> - `adjust-hue`函数的`$degrees`参数值与`$hue`一致。另外，因为`adjust-hue`与`adjust`是冗余的，所以它不会直接包含在新的模块系统中。可以用`color.adjust($color, $hue: $amount)`代替`adjust-hue($color, $amount)`。
> - `color.hwb`函数注意点：Sass对斜杠分隔值的特殊解析规则使得在使用 `color.hwb($hue $whiteness $blackness / $alpha)`签名时很难传递`$blackness`或`$alpha`变量。因此尽量改用`color.hwb($hue, $whiteness, $blackness, $alpha)`。
> - `$weight`参数注意点:
>   - `color.invert`函数的`$weight`参数必须是介于`0%`和`100%`（含）之间的数字。权重越高意味着结果更接近负数，权重越低意味着结果更接近`$color`。值为`50%`时将始终产生 `#808080`。
>   - 而`color.mix`函数每种颜色的`$weight`和相对不透明度决定了每种颜色在结果中的含量。`$weight`必须是介于`0%`和`100%`（含）之间的数字。较大的权重表示应使用更多的 `$color1`，较小的权重表示应使用更多的`$color2`。
> - `color.scale`函数每个关键字参数必须是`-100%`和`100%`（含）之间的数字。这指示相应属性应从其原始位置向最大值（如果参数为正）或最小值（如果参数为负）移动多远。🌰：`$lightness: 50%`将使所有颜色更接近最大亮度`50%`而不会使它们完全变白。
> 
> - 部分函数的全局别名：
>   - `color.adjust`、`color.change`和`color.scale` → `adjust-color`和`change-color`和`scale-color`。
>   - `color.red`、`color.green`和`color.blue` → `red`、`green`和`blue`。
>   - `opacify`和`transparentize` → `fade-in`和`fade-out`。
>   
>   `color.blackness`、`color.hwb`和`color.whiteness`不具有全局别名，其余的带命名空间的函数的全局别名就是去掉他们的命名空间即可。

### sass:math
`sass:math`模块提供了对数字进行操作的函数。

#### 变量
| 变量名 | 功能 |
| --- | --- |
| `math.$e` | 数学常数e的最接近的64位浮点近似值。 |
| `math.$epsilon`  | 根据浮点比较，`1`与大于`1`的最小64位浮点数之间的差值。由于Sass数字的精度为10位，在许多情况下会显示为`0`。 |
| `math.$max-number`  | 表示为64位浮点数的最大有限数。 |
| `math.$max-safe-integer`  | 使`n`和`n + 1`都可以精确地表示为64位浮点数的最大整数`n`。 |
| `math.$min-number`  | 可表示为64位浮点数的最小正数。由于Sass数字的精度为10位，在许多情况下会显示为`0`。 |
| `math.$min-safe-integer`  | 使`n`和`n + 1`都可以精确地表示为64位浮点数的最小整数`n`。 |
| `math.$pi `  | 数学常数最接近的64位浮点近似π。 |

#### 函数
##### 边界函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `math.ceil` | `math.ceil($number)` | 四舍五入`$number`到下一个最高整数。 |
| `math.floor` | `math.floor($number)` | 四舍五入`$number`到下一个最低整数。 |
| `math.clamp` | `math.clamp($min, $number, $max)` | 将`$number`限制在`$min`和`$max`间的范围内。如果`$number`小于`$min`则返回`$min`，如果大于`$max`则返回`$max`。 |
| `math.max` | `math.max($number...)` | 返回一个或多个数字中的最大值。 |
| `math.min` | `math.min($number...)` | 返回一个或多个数字中的最小值。 |
| `math.round` | `math.round($number)` | `$number`舍入到最接近的整数。 |
- `math.clamp`函数的`$min`、`$number`和`$max`必须具有兼容的单位，或者全部为无单位。
-  `math.clamp`函数没有全局别名，其他函数的全局别名去掉命名空间即可。

##### 距离函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `math.abs` | `math.abs($number)` | 返回`$number`的绝对值。如果`$number`为负数，则返回`-$number`，如果`$number`为正数，则按原样`$number`。 |
| `math.hypot` | `math.hypot($number...)` | 返回具有等于每个`$number`的分量的n维向量的长度。例如，对于三个数字 a、b 和 c，这将返回$a² + b² + c²$的平方根。 |
- `math.hypot`函数的参数必须全部具有兼容的单位，或者全部为无单位。如果数字的单位不同，输出采用第一个数字的单位。
- `math.hypot`函数没有全局别名，`math.abs`函数的全局别名去掉命名空间即可。

##### 指数函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `math.log` | `math.log($number, $base)` | 返回`$number`相对于`$base`的对数。如果`$base`为`null`，则计算自然对数。 |
| `math.pow` | `math.pow($base, $exponent)` | 返回`$base`的`$exponent`次方。 |
| `math.sqrt` | `math.sqrt($number)` | 返回`$number`的平方根. |
- 上述函数所有参数必须是无单位的。
- 指数函数均没有全局别名。

##### 三角函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `math.sin` | `math.sin($number)` | 返回`$number`的正弦。 |
| `math.cos` | `math.cos($number)` | 返回`$number`的余弦。 |
| `math.tan` | `math.tan($number)` | 返回`$number`的正切值。 |
| `math.asin` | `math.asin($number)` | 返回`$number`的反正弦。 |
| `math.acos` | `math.acos($number)` | 返回`$number`的反余弦。 |
| `math.atan` | `math.atan($number)` | 返回`$number`的反正切值。 |
| `math.atan2` | `math.atan2($y, $x)` | 返回`$y`和`$x`的2参数反正切值（deg为单位）。 |
- 前三个函数的参数`$number`必须是角度（其单位必须与`deg`兼容）或无单位。如果`$number`没有单位，则假定其为`rad`；`math.asin`、`math.acos`和`math.atan`三个函数的参数必须是无单位的
- `math.atan2`函数参数必须具有兼容的单位或不带单位。另外要注意：`math.atan2($y， $x)`不同于`atan(math.div ($y， $x)`。因为它保留了问题点的象限。🌰：`math.atan2(1， -1)`对应点`(-1, 1)`，返回135度。相比之下，`math.atan(math.div(1， -1))`和`math.atan(math. div(-1, 1))`首先解析为`atan(-1)`，因此两者都返回-45度。
- 三角函数均无全局别名。

##### 单位函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `math.compatible` | `math.compatible($number1, $number2)` | 返回`$number1`和`$number2`是否具有兼容的单位。如果返回`true`，则可以安全地添加、减去和比较`$number1`和`$number2`。否则，这样做会产生错误。 |
| `math.is-unitless` | `math.is-unitless($number)` | 返回`$number`是否没有单位。 |
| `math.unit` | `math.unit($number)` | 返回`$number`单位的字符串表示形式。 |
- `math.compatible`函数的全局名称是`comparableble`，以更清楚地传达函数的作用。其他函数的全局别名去掉命名空间即可。

##### 其他函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `math.div` | `math.div($number1, $number2)` | 返回`$number1`除以`$number2`的结果。 |
| `math.percentage` | `math.percentage($number)` | 将无单位`$number`（通常介于`0`和`1`之间的小数）转换为百分比。此功能与`$number * 100%`相同。 |
| `math.random` | `math.unit($number)` | 如果`$limit`为`null`，则返回一个介于`0`和`1`之间的随机十进制数；如果`$limit`是大于或等于`1`的数字，则返回一个介于`1`和`$limit`之间的随机整数。 |
- `math.div`函数两个参数共用的单位将被抵消。。`$number1`中不在`$number2`中的单位将最终出现在返回值的分子中，`$number2`中不在`$number1`中的单位将最终出现在其分母中。
- `math.random`函数忽略`$limit`中的单位（此行为已弃用），`random($limit)`将返回与`$limit`参数具有相同单位的随机整数。
- `math.div`不具有全局别名，其他函数的全局别名去掉命名空间即可。

### sass:string
#### 函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `string.quote` | `string.quote($string)` | 以带引号的字符串形式返回`$string`。 |
| `string.unquote` | `string.unquote($string)` | 以不带引号的字符串形式返回`$string`。这可能会产生无效的CSS字符串，因此请谨慎使用。 |
| `string.index` | `string.index($string, $substring)` | 返回`$string`中`$substring`的第一个索引，如果`$string`不包含`$substring`则返回`null`。 |
| `string.insert` | `string.insert($string, $insert, $index)` | 在`$string`的`$index`位置插入`$insert`， 返回处理后的`$string`副本。 |
| `string.length` | `string.length($string)` | 返回`$string`中的字符数。 |
| `string.slice` | `string.slice($string, $start-at, $end-at)` | 返回从索引`$start-at`开始到索引`$end-at`（包括两者）结束的`$string`切片。 |
| `string.split` | `string.split($string, $separator, $limit)` | 返回用`$separator`分隔的`$string`子字符串的括号、逗号分隔的列表。`$separator`不包含在这些子字符串中。 |
| `string.to-upper-case` | `string.to-upper-case($string)` | 返回ASCII字母转换为大写的`$string`的副本。 |
| `string.to-lower-case` | `string.to-lower-case($string)` | 返回ASCII字母转换为小写的`$string`的副本。 |
| `string.unique-id` | `string.unique-id()` | 返回随机生成的不带引号的字符串，该字符串保证是有效的CSS标识符，并且在当前Sass编译中是唯一的。 |
- 如果`string.insert`函数的`$index参`数大于`$string`的长度，则将`$insert`添加到末尾。如果`$index`小于字符串的负长度，则将`$insert`添加到开头。
- 如果`string.split`函数的`$limit`参数是数字`1`或更高，则最多拆分为`$separator`（因此最多返回`$limit + 1`个字符串）。最后一个子字符串包含字符串的其余部分，包括任何剩余的`$separator`。
- 各函数的全局别名：
  - `string.index`、`string.insert`、`string.length`和`string.slice`的全局别名均是将`命名空间.`换成`str-`即可，例如`string.index`函数的全局别名为`str-index`。
  - string.split函数没有全局别名。
  - 剩余其他函数的全局别名去掉命名空间即可。

### sass:selector
#### 函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `selector.is-superselector` | `selector.is-superselector($super, $sub)` | 返回选择器`$super`是否与选择器`$sub`匹配的所有元素匹配。即使`$super`匹配的元素多于`$sub`，仍然返回`true`。 |
| `selector.append` | `selector.append($selectors...)` | 组合`$selectors`而不使用后代组合符，即它们之间没有空格。如果`$selectors`中的任何选择器是选择器列表，则每个复杂的选择器将单独组合。 |
| `selector.extend` | `selector.extend($selector, $extendee, $extender)` | 像`@extend`规则一样扩展`$selector`。 |
| `selector.nest` | `selector.nest($selectors...)` | 在组合`$selectors`，就好像它们在样式表中彼此嵌套一样。 |
| `selector.parse` | `selector.parse($selector)` | 以选择器值格式返回`$selector`。 |
| `selector.replace` | `selector.replace($selector, $original, $replacement)` | 返回`$selector`的副本，其中`$original`的所有实例都替换为`$replacement`。|
| `selector.unify` | `selector.unify($selector1, $selector2)` | 返回仅匹配与`$selector1`和`$selector2`匹配的元素的选择器。如果`$selector1`和`$selector2`与任何相同的元素不匹配，或者没有可以表示其重叠的选择器，则返回`null`。 |
| `selector.simple-selectors` | `selector.simple-selectors($selector)` |返回 `$selector`中的简单选择器列表。 |
- `selector.is-superselector`、`selector.append`、`selector.extend`和`selector.replace`函数中的参数可能包含占位符选择器，但不包含父选择器；而`selector.nest`函数与其他选择器函数不同，除第一个选择器之外的所有选择器都可能包含父选择器。
- `selector.extend`会返回类似如下`@extend`规则修改`$selector`的副本：
  ```scss
  #{$extender} {
    @extend #{$extendee};
  }
  ```
  将`$selector`中的所有`$extendee`实例替换为`$extendee`，`$extender`。如果`$selector`不包含`$extendee`，则按原样返回。
- `selector.replace`函数使用`@extend`规则的智能统一来确保`$replacement`无缝集成到`$selector`中。如果`$selector`不包含`$original`，则按原样返回。
- 对于`selector.unify`函数，与`@extend`规则生成的选择器一样，如果`$selector1`和`$selector2`都是复杂的选择器，则不能保证返回的选择器匹配它们匹配的所有元素。
- `selector.simple-selectors`函数的`$selector`参数必须是包含复合选择器的单个字符串。这意味着它可能不包含组合符（包括空格）或逗号。
- 除了`selector.is-superselector`函数的全局别名为去掉命名空间之外，其余的函数到的全局命名空间均为将`命名空间.`改成`selector-`即可。

### sass:list
在Sass中，Maps属于特殊的列表，其中包含每个键/值对的双元素列表。如(1: 2, 3: 4) 计为 (1 2, 3 4)因此，单个值也计为列表。所有这些函数都将1px视为包含值1px的列表。所有这些功能也适用于Maps！

#### 函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `list.append` | `list.append($list, $val, $separator: auto)` | 返回`$list`的副本，并在末尾添加了`$val`。 |
| `list.index` | `list.index($list, $value)` | 返回`$list`中`$value`的索引。 |
| `list.is-bracketed` | `list.is-bracketed($list)` | 返回`$list`是否具有方括号。 |
| `list.join` | `list.join($list1, $list2, $separator $bracketed)` | 返回一个新列表，其中包含`$list1`的元素，后跟`$list2`的元素。 |
| `list.length` | `list.length($list)` | 返回`$list`的长度，这也可以返回Maps中的对数。 |
| `list.separator` | `list.separator($list)` | 返回`$list`使用的分隔符的名称，可以是`space（空格）`、`comma（逗号）`或`slash（斜杠）`。如果`$list`没有分隔符，则返回`space`。|
| `list.nth` | `list.nth($list, $n)` | 返回索引`$n`的`$list`元素`$n`。如果`$n`为负数，则从`$list`年底开始计数。如果索引`$n`处没有元素，则引发错误。 |
| `list.set-nth` | `list.set-nth($list, $n, $value)` |返回`$list`的副本，其中索引`$n`的元素`$n`替换为`$value`。如果`$n`为负数，则从`$list`年底开始计数。如果索引`$n`处没有现有元素，则引发错误。 |
| `list.slash` | `list.slash($elements...)` | 返回包含`$elements`的斜杠分隔列表。 |
| `list.zip` | `list.zip($lists...)` | 将`$lists`中的每个列表合并为一个子列表列表。返回列表中的每个元素都包含`$lists`中该位置的所有元素。返回的列表与`$lists`中的最短列表一样长。返回的列表始终以逗号分隔，子列表始终以空格分隔。 |
- 如果`list.append`和`list.join`函数的参数`$separator`为`comma`、`space`或`slash`，则返回的列表分别以逗号分隔、空格分隔或斜杠分隔。如果它是`auto`（默认值），则返回的列表将使用与`$list`相同的分隔符（如果没有分隔符，则使用`space`）。不允许使用其他值。

  另外，`list.append`与`list.join`函数不同，如果`$val`是一个列表，它将嵌套在返回的列表中，而不是将其所有元素添加到返回的列表中。
- 对于`list.join`函数，由于单个值计为单元素列表，因此可以使用`list.join()`将值添加到列表的末尾。但是，不建议这样做，因为如果该值是一个列表，它将被连接起来，这可能不是我们想要的。改用`list.append()`将单个值添加到列表中。仅使用`list.join()`将两个列表合并为一个。

  如果`$bracketed`是`auto`（默认值），则返回的列表将在`$list1`时括起来。否则，如果返回的列表为真，则返回的列表将带有方括号，如果`$bracketed`为假`$bracketed`，则没有方括号。
- `list.slash`函数注意点：此函数是用于创建斜杠分隔列表的临时解决方案。最终，它们将用斜杠字面意思编写，如`1px / 2px / solid`，但目前斜杠用于除法，因此官方在旧语法被删除之前不能将它们用于新语法。
- 除了`list.separator`函数的全局别名为`list-separator`，以及`list.slash`函数没有全局别名外，其余的函数的全局别名均为去掉命名空间即可。

### sass:map
> 官方：
> 
> Sass 库和设计系统倾向于共享和覆盖表示为嵌套映射（包含包含映射的映射的映射）的配置。
>
> 为了帮助您使用嵌套映射，某些映射函数支持深层操作。例如，如果您将多个键传递给 `map.get()`它将跟随这些键找到所需的嵌套映射：
> ```scss
> $config: (a: (b: (c: d)));
> @debug map.get($config, a, b, c); // d
> ```

#### 函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `map.merge` | `map.merge($map1, $map2)`<br><br>`map.merge($map1, $keys..., $map2)` | 如果未传递`$keys`，则返回一个新映射，其中包含`$map1`和`$map2`中的所有键和值。<br><br>如果`$map1`和`$map2`具有相同的键，则`$map2`的值优先。<br><br>返回的映射中也出现在`$map1`中的所有键的顺序与`$map1`中的顺序相同。`$map2`的新键将显示在地图的末尾。<br><br>如果`$keys`不为空，请按照`$keys`查找要合并的嵌套映射。如果映射中缺少`$keys`中的任何键或引用不是映射的值，则将该键处的值设置为空映射。<br><br>返回`$map1`的副本，其中目标映射将替换为包含目标映射和`$map2`中的所有键和值的新映射。|
| `map.deep-merge` | `map.deep-merge($map1, $map2)` | 与`map.merge`函数相同，只是嵌套的映射值也是递归合并的。 |
| `map.remove` | `list.nth($list, $n)` | 返回没有任何与`$keys`关联的值的`$map`副本。<br><br>如果`$keys`中的键在`$map`中没有关联的值，则会忽略该键。 |
| `map.deep-remove` | `map.deep-remove($map, $key, $keys...)` | 如果`$keys`为空，则返回不带与`$key`关联的值的`$map`的副本。<br><br>如果`$keys`不为空，则从左到右跟随一组键（包括`$key`和排除`$keys`中的最后一个键），以查找要更新的嵌套映射。返回目标映射没有与`$keys`中的最后一个键关联的值`$map`的副本.|
| `map.get` | `map.get($map, $key, $keys...)` | 如果`$keys`为空，则返回与`$key`关联的`$map`中的值。如果`$map`没有与`$key`关联的值，则返回`null`；<br><br>如果`$keys`不为空，则从左到右跟随一组键（包括`$key`和排除`$keys`中的最后一个键），以查找要搜索的嵌套映射。返回目标映射中与`$keys`中的最后一个键关联的值。<br><br>如果映射没有与键关联的值，或者映射中缺少`$keys`中的任何键或引用的值不是映射，则返回`null`。|
| `map.has-key` | `map.has-key($map, $key, $keys...)` | 如果`$keys`为空，则返回`$map`是否包含与`$key`关联的值。<br><br>如果`$keys`不为空，则从左到右跟随一组键（包括`$key`和排除`$keys`中的最后一个键），以查找要搜索的嵌套映射。<br><br>如果目标映射包含与`$keys`中的最后一个键关联的值，则返回`true`。<br><br>如果没有，或者映射中缺少`$keys`中的任何键或引用的值不是映射，则返回`false`。|
| `map.keys` | `map.remove($map, $keys...)` | 返回`$map`中所有键的逗号分隔列表。 |
| `map.values` | `list.slash($elements...)` | 返回`$map`中所有值的逗号分隔列表。 |
| `map.set` | `map.set($map, $key, $value)`<br><br>`map.set($map, $keys..., $key, $value)` | 如果没有传递`$key`，则返回`$map`的副本，并将`$key`处的值设置为`$value`。<br><br>如果传递`$keys`，请按照`$keys`查找要更新的嵌套映射。如果映射中缺少`$keys`中的任何键或引用不是映射的值，则将该键处的值设置为空映射。返回目标地图的`$map`副本，其中`$key`的值设置为`$value`。|
- 在实际上，`map.merge($map1, $keys..., $map2)`的实际参数作为 `map.merge($map1, $args...)`传递。它们在此处描述为`$map1, $keys..., $map2`，仅用于说明目的。`map.merge`函数也是同理。
- `map.deep-merge`、`map.deep-remove`和`map.set`函数没有全局别称，其他的函数全局别称均为将`命名空间.`换成`map-`即可。

### sass:meta
#### 混合
##### `meta.load-css($url, $with: null) `
在`$url`处加载模块并包含它的CSS，就好像它是作为这个混合的内容编写的一样。`$with`参数为模块提供配置；如果它被传递，它必须是一个从变量名(不含`$`)到加载模块中使用的这些变量值的映射。

如果`$url`是相对的，它将被解释为相对于包含`meta.load-css()`的文件。

- 与`@use`相似：
  - 只会评估给定模块一次，即使它以不同的方式多次加载也是如此。
  - 无法为已加载的模块提供配置，无论它是否已加载配置。
- 与`@use`不同：
  - 这不会使加载模块中的任何成员在当前模块中可用。
  - 这可以在样式表中的任何位置使用。它甚至可以嵌套在样式规则中以创建嵌套样式！
  - 正在加载的模块 URL 可以来自变量并包含插值。

#### 函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `meta.calc-args` | `meta.calc-args($calc)` | 返回给定计算的参数。如果参数是数字或嵌套计算，则返回为该类型。否则，返回不带引号的字符串。 |
| `meta.calc-name` | `meta.calc-name($calc)` | 返回给定计算的名称. |
| `meta.call` | `list.is-bracketed($list)` | 使用`$args`调用`$function`并返回结果。`$function`应该是`meta.get-function()`返回的函数。 |
| `meta.content-exists` | `list.join($list1, $list2, $separator $bracketed)` | 返回当前混合是否传递了`@content`块。不能在混合外部调用。 |
| `meta.feature-exists` | `meta.feature-exists($feature)` | 返回当前Sass实现是否支持`$feature`。`$feature`详情见下文。 |
| `meta.function-exists` | `meta.function-exists($name, $module)` | 返回名为`$name`的函数是定义为内置函数还是用户定义函数。如果传递`$module`，则还会检查名为`$module`的模块的函数定义。|
| `meta.get-function` | `meta.get-function($name, $css, $module)` | 返回名为`$name`的函数。 |
| `meta.global-variable-exists` | `meta.global-variable-exists($name, $module)` |返回名为`$name`（不带`$`）的全局变量是否存在。 |
| `meta.inspect` | `meta.inspect($value)` | 返回`$value`的字符串表示形式。返回任何Sass值的表示形式，而不仅仅是那些可以在CSS中表示的值。因此它的返回值不能保证是有效的CSS。 |
| `meta.keywords` | `meta.keywords($args)` | 返回传递给采用任意参数的混合或函数的关键字。`$args`参数必须是参数列表。关键字作为映射从参数名称作为不带引号的字符串（不包括 `$`）返回到这些参数的值。 |
| `meta.mixin-exists` | `meta.mixin-exists($name, $module)` | 返回一个名为`$name`的混合是否存在。 |
| `meta.module-functions` | `meta.module-functions($module) ` | 返回模块中定义的所有函数，作为从函数名称到函数值的映射。`$module`参数必须是与当前文件中`@use`规则的命名空间匹配的字符串。 |
| `meta.module-variables` | `mmeta.module-variables($module)` | 返回模块中定义的所有变量，作为从变量名称（不带`$`）到这些变量值的映射。 |
| `meta.type-of` | `meta.type-of($value)` | 返回`$value`的类型。 |
| `meta.variable-exists` | `meta.variable-exists($name)` | 返回当前作用域中是否存在名为`$name`（不带`$`）的变量。 |
- `meta.feature-exists`函数的参数$feature必须是字符串。目前公认的功能包括：
  - 全局`global-variable-shadowing`，这意味着局部变量将隐藏全局变量，除非它具有`!global`标志。
  - `extend-selector-pseudoclass`，这意味着@extend规则将影响嵌套在伪类中的选择器，如`:not()`。
  - 单位`units-level3`，这意味着单位算术支持CSS值和单位级别3中定义的单位。
  - `at-error`，表示支持`@error`规则。
  - 自定义属性，这意味着自定义属性声明值不支持插值以外的任何表达式`custom-property`。
  对于任何无法识别`$feature`返回`false`。
- `meta.function-exists`、`meta.module-functions`和`meta.module-variables`的`$module`必须是与当前文件中`@use`规则的命名空间匹配的字符串。

  `meta.get-function`、`meta.global-variable-exists`和`meta.mixin-exists`函数，前两者如果`$module`为`null`，则返回名为`$name`的函数，不带命名空间（包括全局内置函数）。否则，`$module`必须是与当前文件中`@use`规则的命名空间匹配的字符串，在这种情况下，这将返回该模块中名为`$name`的函数。后者将上述这段话中的`$name`改成混合。
- 对于`meta.get-function`，默认情况下，如果`$name`不引用Sass函数，则会引发错误。但是，如果`$csstrue`为`true`，则返回一个纯CSS函数。返回的函数可以使用`meta.call()`调用。
- `meta.type-of`可以返回以下值：
  - number
  - string
  - color
  - list
  - map
  - calculation
  - bool
  - null
  - function
  - arglist
  将来可能会添加新的可能值。
- `meta.calc-args`、`meta.calc-name`、`meta.module-functions`、`meta.module-variables`没有全局别称，其余函数的全局别称均为去掉命名空间即可。

### 全局函数
| 函数名 | 语法 | 功能 |
| --- | --- | --- |
| `hsl` | `hsl($hue $saturation $lightness)`、<br><br>`hsl($hue $saturation $lightness / $alpha)`、<br><br>`hsl($hue, $saturation, $lightness, $alpha)`| 返回具有给定色调、饱和度和亮度的颜色。 |
| `hsla` | 与`hsl`函数类似 | 返回具有给定色调、饱和度和亮度以及给定Alpha通道的颜色。 |
| `if` | `if($condition, $if-true, $if-false)`  | 如果`$condition`为真，则返回`$if-true`，否则返回`$if-false`。 |
| `rgb` | `rgb($red $green $blue)`<br><br>`rgb($red $green $blue / $alpha)`<br><br>`rgb($red, $green, $blue, $alpha: 1)`<br><br>`rgb($color, $alpha)`<br><br> | 如果传递了`$red`、`$green`、`$blue`和可选的$alpha，则返回具有给定红色、绿色、蓝色和Alpha通道的颜色。 |
| `rgba` | 与`rgb`函数类似 | 如果传递了`$red`、`$green`、`$blue`和可选的$alpha，则返回具有给定红色、绿色、蓝色和Alpha通道的颜色。 |
- 对于`hsl`、`hsla`、`rgb`和`rgba`函数，可以将`calc()`或`var()`等特殊函数代替任何参数传递，甚至可以使用`var()`代替多个参数，因为它可能会被多个值替换！当以这种方式调用颜色函数时，它会使用与调用它相同的签名返回一个不带引号的字符串。
- `if`函数的特殊之处在于它甚至不计算未返回的参数，因此即使未使用的参数会引发错误，也可以安全地调用。

## 参考资料
- [Sass](https://sass-lang.com/)
- [Sass中文网](https://www.sass.hk/)