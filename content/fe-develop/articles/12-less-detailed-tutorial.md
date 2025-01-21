---
title: "LESS详细教程"
description: "Less(全称：Leaner Style Sheets)是一种向后兼容的CSS语言扩展，是CSS的扩展，属于一种CSS预处理器语言。Less与CSS非常相似，但它提供了变量、函数、混合等功能，可以构建动态CSS。Less让样式表的管理更容易、更灵活。可以有效地提高网站的开发效率，并且在网站的性能、可维护性、可扩展性方面具有一定的优势。"
img: "/content-images/fe-develop/articles/12-less-detailed-tutorial/cover.webp"
date: "2023-06-08 21:55"
update: 0
tags: ["CSS", "Less"]
---

![cover.webp](/content-images/fe-develop/articles/12-less-detailed-tutorial/cover.webp)

---
Less(全称：Leaner Style Sheets)是一种向后兼容的CSS语言扩展，是CSS的扩展，属于一种CSS预处理器语言。Less与CSS非常相似，但它提供了变量、函数、混合等功能，可以构建动态CSS。Less让样式表的管理更容易、更灵活。可以有效地提高网站的开发效率，并且在网站的性能、可维护性、可扩展性方面具有一定的优势。

> Tips：本文中所使用的版本为Less V4.1.3。

## 安装和使用
- NPM：
  ```cmd
  npm install -g less
  ```
- CDN：
  ```html
  <link rel="stylesheet/less" type="text/css" href="Less文件路径.less" />
  <script src="https://cdn.jsdelivr.net/npm/less" ></script>
  ```
- 配合Vue3+Vite使用：
  1. 安装
     ```cmd
     npm i less -D
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
           less: {
             additionalData: '@import (reference) "全局变量文件路径.less";'
           }
         }
       }
     })
     ```
  由于Vue-cli现在处于维护模式，Vue-cli的配置方法这里就不过多说明。
- 配合React + Create-react-app使用：
  1. 暴露webpack配置文件 
     ```cmd
     npm run eject
      ```
  2. 安装 
     ```cmd
     npm i less less-loader -D
      ```
  
  3. 进入config/webpack.config.js文件，Ctrl+f搜索`sassModuleRegex`，在其之后添加：   
     ```js
     const lessRegex = /\.less$/;
     ```
  4. Ctrl+F搜索`oneOf`，在oneOf数组中找到如下配置：     
     ```js
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
     ```
  5. 在其之后添加：
     ```js
     {
       test: lessRegex,
       use: getStyleLoaders({
         importLoaders: 3,
         sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
         modules: {
           getLocalIdent: getCSSModuleLocalIdent,
         },
       },
       'less-loader'
       ),
     },
     ```
   6. 创建一个less文件。
   7. 在jsx中引入并使用：
      ```js
      import React from 'react'
      import appStyle from './App.less'

      export default function App() {
        return (
          <div className={appStyle.test}>App</div>
          // id
          // <div id={appStyle.test}>App</div>
        )
      }
      ```


## 注释
Less支持两种注释方式：
- **单行注释（也叫内联注释）**：使用 **//** 后跟注释。单行注释不会输出到编译后的CSS中。
- **多行注释（也叫块注释）**：**/* 注释内容 */**。多行注释会输出到编译后的CSS中。

## 变量
变量用于在单个位置控制常用值，主要用于解决相同的值重复数十次甚至数百次的问题。

### 定义变量
Less变量使用`@`符号定义，语法：`@变量名：值`。

🌰：
```less
@box-width: 100px;   // 数值（带单位）
@img-path: "src/assets/images";  //字符串
@box-bgc: #eee; // 颜色值
@var1: @var2; // 另一个变量

// 规则集
@rulesets: {
  width: 100px;
  height: 100px;
  color: lightblue;
}
```

### 使用变量
Less使用变量的方式就像在CSS中为属性赋值类似，用`@`符号后接变量名即可。
```less
div {
  background-color：@box-bgc；
  border-color：@border-color；
  ...
}
```
> 注意：如果对变量重新赋值，会影响前后的使用，这点与Sass不同。

### 变量插值
Less变量不仅可以用来控制值，还可以用于其他地方，比如选择器名称、属性名称、url和`@import`语句等。

使用语法：`@{变量名}`。在需要使用的地方用`@{}`包裹变量名，需要注意的是，此时括号中变量名前面不用再额外带`@`符号。

🌰：
```less
@selector: ipt;
.@{selector} {
  padding: 10px;
  padding: 10px;
}

// 用于网址
@img-path："./images";
div {
  background: url("@{img-path}/test.png");
}

// 用于@import语句
@themes: "../src/assets/themes";
@import "@{themes}/dark.less";

// 还可以用于属性
@prop-name：color；
div {
  @{prop-name}: #eee;
  background-@{prop-name}: #333;
}
```

### 变量的变量
变量的变量指的是可以使用另一个变量的值来作为变量的名称。直接看官方🌰比较好理解：
```less
@primary: lightblue;
@color: primary;

div {
  // color: @@color; → color: @primary; → color: lightblue;
  color: @@color; 
}
```
> 注意：变量的变量这种写法不能与变量插值一起用。另外最多只能是两个`@`符，多了是无效的输入。

### 惰性求值
惰性求值意思是在使用变量之前不必声明。
> Tips：该特性也适用于Mixins。

🌰：
```less
//下面的写法都是有效的
div {
  background-color: @bgc; // 值为lightblue
  @bgc: lightblue;
}

// ----------------------------
div {
  background-color: @bgc; // 值为lightblue，这里懵的话下文有解释
  @main-color: lightblue;
}

@bgc: @main-color;
@main-color: lightpink;
```

### 变量范围
**当在同/不同地方声明多个名称完全相同的变量时，会从当前范围向上搜索，并使用变量的最后一个定义**。也就是说会先从当前作用域范围中寻找目标变量，找不到再去上层作用域找，以此类推，直到顶级作用域。如果在某个作用域中找到了就会取那个作用域中的最后一个定义。
> Tips：该特性也适用于Mixins。

官方🌰：
```less
@var: 0;
.class {
  @var: 1;
  
  .brass {
    @var: 2;
    three: @var; // 当前作用域有@var，取最后一个定义，因此值为3.
    @var: 3;
  }
  
  /* 
    当前作用域是.class，有@var，取最后一个定义，因此值为1。
    如果当前作用域没有@var，那么会向外寻找，值为0。
  */
  one: @var; 
}
```
此时再看回惰性求值的第二个🌰：
```less
div {
  /* 
    1. 首先当前作用域没有@bgc，向外层作用域寻找。
    2. 在外层作用域中有@bgc，取最后一个定义，此时background-color: @main-color; 
    3. 当前作用域中有@main-color，取最后一个定义，因此值为lightblue，而不是lightpink。
  */
  background-color: @bgc; 
  @main-color: lightblue;
}

@bgc: @main-color;
@main-color: lightpink;
```

### 属性作为变量（V3.0.0↑）
意思是可以通过使用`$prop`语法将属性视为变量。官方🌰：
```less
div {
  color: #efefef;
  background-color: $color; // #efefef
}
```
> 注意：这种语法遵循上文的惰性求值和变量范围规则。

### 默认变量
我们有时会收到对默认变量的请求——一种仅在尚未设置变量时才设置变量的能力。此特性不是必需的，因为可以通过在后面放置定义来轻松覆盖变量。

官方🌰：
```less
// library.less
@base-color: green;
@dark-color: darken(@base-color, 10%);

// 假设test.less中使用library.less
@import "library.less";
@base-color: red; 

/*
  引入library.less文件，此时test.less文件有：
  @base-color: green;
  @dark-color: darken(@base-color, 10%);
  @base-color: red; 
  
  根据规则，@dark-color: darken(@base-color, 10%)中的@base-color值为当前作用域的最后一个定义，
  因此@base-color的值为red，dark-color的值变为暗红色。
*/
```

## 运算与转义
### 运算
在Less中通过`+`、`-`、`*`和`/`算术运算符对任意**数字**、**颜色**或**变量**进行运算。如果可能的话，数学运算会考虑到单位，并在加、减或比较之前对数字进行转换。**最终的单位为从左往右遇到第一个明确的单位，如果单位不能转换或者没有意义，则会忽略单位**。

> 注意：在官方的例子中有`@incompatible-units: 2 + 5px - 3cm; // result is 4px`，他写着结果是4px，但是实际在编辑器中编译成CSS后这个运算的结果是`-106.38582677px`。那经过测试可以得出以下结论（适用于加减运算）：
> 1. 如果单位间可以转换（比如cm和mm），除了最终的单位遵循上面的规则外，数字部分也会根据换算关系进行转换。例如：`@result: 5cm + 10mm; // 6cm`。
> 2. 如果单位之间不能转换（比如rem和cm），那么最终的单位遵循上面的规则，数字部分原封不动。例如：`@result: 10rem + 10cm; 20rem`。

🌰：
```less
// 不带单位
@result1: 5 + 5;  // 10

// 相同单位
@result2: 10cm - 5cm;  // 5cm

// 不同单位
@result3: 10px + 10cm; // 387.95275591px

// 变量运算
@result4: 10px;
@result5: @result + 10px;

// 直接颜色运算
@color1: #333 * 2; // #666666 

/* 十六进制颜色值的范围在0 ~ 255，低于0取0；高于255取255，
 * 透明度无论运算前是多少，结果始终返回不带透明度通道的十六进制颜色值。*/
@color2: #eee * 2; 
```
## 乘除运算问题
乘除法运算不会转换数字，因为在大多数情况下这是没有意义的，例如长度乘以长度得到一个区域，而CSS不支持指定区域。Less将按原样对数字进行操作，并为结果分配明确声明的单位类型。🌰：`@result: 2cm * 3mm; // 6cm`

另外，从Less4.0开始，不能在括号外使用`/`运算符进行除法运算：
```less
@result: 10px / 5px; // 10px / 5px
@result: (10px / 5px); // 2px
```

#### 一元运算符
- `+表达式`返回表达式的值而不更改它。
- `-表达式`返回表达式值的负版本。

🌰：
```less
result1: 5 - (-3); // 8
```


### 转义
转义是指**允许使用任意字符串作为属性或变量值**。在Less3.5之前，转移的语法是`~"quote"`/`~'quote'`，除插值外，`~"任意内容"`里面的任意内容按原样使用。

官方🌰：
```less
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}

// 不转义
@min768: "(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}

// 编译后
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}

@media "(min-width: 768px)" { // 报错
  .element {
    font-size: 1.2rem;
  }
}
```
在Less3.5之后，大部分需要用需要*引号转义*的情况都不需要了。比如上面的🌰可以简写为：
```less
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

## 嵌套
Less允许我们使用嵌套而不是层叠，或与层叠结合使用。
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
可以看出，虽然行数一样，但是Less嵌套写法不需要写父选择器，会更简洁一点。

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

另外还可以用其他方式组合嵌套规则的选择器。🌰：
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

🌰：
```less
.one {
  // 相当于.one + .onetwo {...}
  & + &two {...}
  
  // 相当于.one.one {...}
  && {...}
  
  // 相当于.one，.onetwo {...}
  &, &two {...}
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
p + p,
p + a,
p + ul,
p + li,
a + p,
a + a,
a + ul,
a + li,
ul + p,
ul + a,
ul + ul,
ul + li,
li + p,
li + a,
li + ul,
li + li {
  border-top: 0;
}
```

## 混合
混合（mixins）是**一种将一组属性从一个规则集包含(混入)到另一个规则集的方法**。调用混合时会将混合中的 **全部属性和选择器（遵循嵌套规则）** 都混入到目标规则集中。

Less允许混合类选择器和ID选择器。

🌰：
```less
.mixin {
  background-color: lightblue;
  color: lightpink;
  
  &:hover {
    color: purple;
  }
}

.test {
  width: 100px;
  height: 100px;
  
  /*
    .mixin();被替换为：
    background-color: lightblue;
    color: lightpink;
    &:hover {
      color: purple;
    }
  */
  .mixin(); 
}

// 编译后
.mixins {
  background-color: lightblue;
  color: lightpink;
}

.test {
  width: 100px;
  height: 100px;
  background-color: lightblue;
  color: lightpink;
}
.test:hover {
  color: purple;
}
```
> 注意：调用混合时括号是可选的，但根据Less官方的说法：可选圆括号已弃用，在未来的版本中将需要。因此最好带上括号。

### 带括号的混合
在定义一个混合时，带上括号表示该混合不会出现在CSS输出中。注意是创建时，上面注意点说的是调用时。

🌰：
```less
.mixin() {
  background-color: lightblue;
  color: lightpink;
}

.test {
  width: 100px;
  height: 100px;
  .mixin();
}

// 编译后
.test {
  width: 100px;
  height: 100px;
  background-color: lightblue;
  color: lightpink;
}
```

### 命名空间
有的时候可能一个混合当中的规则会很复杂，在调用时不一定需要这个混合的全部规则，这可以使用命名空间来决定调用混合的某一部分规则。这样命名的混合可以减少与其他库混合或用户混合的冲突，但也可以作为一种*组织*一组混合的方式。

语法：`选择器[.选择器 | #选择器]...()`

🌰：
```less
.mixin() {
  .mixin-1 {
    color: lightblue;
  }

  #mixin-2 {
    background-color: lightpink;
  }

  .mixin-3 {
    background-color: purple;
  }
}

.test {
  width: 100px;
  height: 100px;
  .mixin.mixin-1();
  .mixin#mixin-2();
}

// 编译后
.test {
  width: 100px;
  height: 100px;
  color: lightblue;
  background-color: lightpink;
}
```
> 注意：如果混合当中包含复杂的选择器种类时，有几种情况：
> - 当混合中的复杂选择器为**属性选择器**，使用命名空间的方式调用该部分混合时，无论如何调用都会报错：
>   ```less
>   .mixin() {
>     .mixin-2[tabindex='1'] {
>       background-color: purple;
>     }
>   }
>
>   // 调用时均会报错
>   .mixin.mixin-2();
>   .mixin.mixin-2[tabindex='1']();
>   ```
> - 当混合中的复杂选择器为**选择器列表**，使用命名空间的方式调用该部分混合时，可以分开调用其中的某个选择器，而不能像上面那样连着调用：
>   ```less
>   .mixin() {
>     .mixin-2, .mixin-3 {
>       background-color: purple;
>     }
>   }
>
>   // 调用时
>   .mixin.mixin-2(); // 有效
>   .mixin.mixin-3(); // 有效
>   .mixin.mixin-2.mixin-3(); // 报错
>   ```
>   
>  补充：
>  - 当混合当中包含多个同名选择器，使用命名空间的方式调用该部分混合时，会将所有同名选择器的规则混入到目标规则集中：
>    ```less
>    .mixin() {
>     .mixin-2, .mixin-3 {
>       background-color: purple;
>    }
>     
>      .mixin-3 {
>        color: lightblue;
>      }
>    }
>
>    // 调用
>    .test {
>      .mixin.mixin-3();
>    }
>   
>    // 编译后
>    .test {
>      background-color: purple;
>      color: lightblue;
>    }
>    ```
> - 创建混合时，可以混入另一个不同/同一规则集下的混合，或用命名空间的方式调用另一个混合的部分规则。
>   ```less
>   .mixin1() {
>     color: red;
>   }
>   
>   .mixin2() {
>     .mixin-1 {
>       background-color: purple;
>     }
>     
>     .mixin-2 {
>       .mixin1()；
>       .mixin2.mixin-2()；
>       .mixin2() // 报错，这会造成死循环
>     }
>   }
>
>   // 调用
>   .test {
>     .mixin2.mixin-2();
>   }
>   
>   // 编译后
>   .test: {
>     color: red;
>     background-color: purple;
>   }
>   ```

### !important关键字
在调用混合时添加`!important`关键字，会使得被调用的混合中的规则都加上`!important`关键字。

🌰：
```less
.mixins() {
  color: lightblue;
  background-color: lightpink;
}

.test {
  .mixins() !important;
}

// 编译后
.test {
  color: lightblue !important;
  background-color: lightpink !important;
}
```

### 参数混合
混合还可以接受参数，这些参数是混合时传递给选择器块的变量。需要注意，参数混合不会输出到编译后的CSS中。
🌰：
```less
.mixins(@bgc) {
  background-color: @bgc;
}

.test {
  .mixins(lightblue);
}

// 编译后
.test {
  background-color: lightblue;
}
```

#### 默认参数
就是为参数提供默认值，该值只会在调用时未传递参数的情况下有效。

🌰：
```less
.mixins(@bgc：#eee) {
  background-color: @bgc;
}

.test {
  .mixins();
  // .mixins(lightblue); background-color: lightblue;
}

// 编译后
.test {
  background-color: #eee;
}
```

#### 参数分隔符
当需要多个参数时，参数之间的分隔符可以是**分号**或者**逗号**。有以下几种情况：
- 两个参数，每个参数包含逗号分隔的列表：`.name(1, 2, 3; something, else)`,
- 三个参数，每个参数包含一个数字：`.name(1, 2, 3)`,
- 使用虚拟分号创建混合调用，其中一个参数包含逗号分隔的CSS列表：`.name(1, 2, 3;)`,
- 逗号分隔的默认值：`.name(@param1: red, blue;)`。
- 从Less4.0开始，您可以使用圆括号转义`[~()]`来包装列表值，例如`.name(@param1: ~(red，blue))`。这类似于引号转义语法：`~"quote"`。

#### 重载混合
在Less中定义具有相同名称和参数数量的多个混合是合法的，Less会使用所有适用的属性。如果将混合与一个参数一起使用（例如`.mixin(green);`），则将使用仅具有一个强制参数的所有混合的属性：

官方🌰：
```less
.mixin(@color) { // 一个强制参数
  color-1: @color;
}
.mixin(@color, @padding: 2) {  // 一个强制参数
  color-2: @color;
  padding-2: @padding;
}
.mixin(@color, @padding, @margin: 2) {  // 两个强制参数
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}

// 调用
.some .selector div {
  .mixin(#008000);
}

// 编译后
.some .selector div {
  color-1: #008000;
  color-2: #008000;
  padding-2: 2;
}
```
可以看出，第一个和第二个混合都只有一个强制参数（第二个混合有一个强制参数和一个可选参数），因此都被使用了；而第三个混合有2个强制参数，调用时只传递了一个参数，而混合按顺序接收参数，导致`@padding`的值不确定，因此第三个混合不会被使用。

#### 命名参数
刚刚说过混合会按顺序接收参数，而如果一个混合有若干个参数，有时一下子忘记了每个参数顺序，直接提供值可能会出现牛头不对马嘴的情况，这时候就可以使用命名参数来解决。

命名参数就是指在调用混合时，可以按照名称（而不是顺序位置）提供参数值。

🌰：
```less
.mixin(@color, @padding: 2px) {
  color: @color;
  padding: @padding;
}

.test {
  .mixin(@padding: 5px, @color: #008000);
}

// 编译后
.test {
  color: #008000;
  padding: 5px;
}
```
任何参数都可以按其名称引用，不需要纠结它们的顺序。

#### @arguments变量、高级参数和@rest变量
`@arguments`变量在混合内部具有特殊含义，它包含调用混合时传递的所有参数。类似Javascript中函数的`arguments`参数。
 
🌰：
```less
.border(@widtth, @style, @color) {
  border: @arguments;
}

.test {
  .border(2px, solid, #333);
}

// 编译后
.test {
  .border: 2px, solid, #333;
}
```
高级参数用于与`@arguments`变量配合使用来处理混合接受可变数量的参数的情况。有几种匹配情况：
```less
.mixin() {}           // 匹配0个参数
.mixin(@a: 1) {}      // 匹配0-1个参数
.mixin(...) {}        // 匹配0-N个参数
.mixin(@a: 1, ...) {} // 匹配0-N个参数
.mixin(@a, ...) {}    // 匹配1-N个参数
```
高级参数要与`@arguments`变量配合使用（直接给属性赋值...会报错），但`@arguments`变量包含所有参数，看上面第4种情况，当在规则中使用`@arguments`变量时，是包含`@a`的，有时可能我并不想要他包含`@a`，那么就可以考虑使用`@rest`变量。

`@rest`变量与高级参数类似，但是`@rest`变量可以在规则集中使用，并且`@rest`的范围不包含强制参数和明确定义的可选参数。
```less
.mixin(@a: #eee, @b: #333, @rest...) {
  color：@a;
  background-color: @b;
  border: @rest;
}

.test {
  .mixin(#f07c82, #144a74, 1px, solid, #20a162);
}

// 编译后
.test {
  color：#f07c82;
  background-color: #144a74;
  border: 1px solid #20a162;
}
```

### 模式匹配
模式匹配用于根据传递给混合的参数更改混合的行为。

官方🌰：
```less
// 请注意dark和light并不是Less变量，可以将它们看成是固定期望值
.mixin(dark, @color) {
  color: darken(@color, 10%);
}
.mixin(light, @color) {
  color: lighten(@color, 10%);
}

// @_和@color都是变量，传递给它什么值他就是什么值，因此它匹配任意值。
.mixin(@_, @color) {
  display: @color;
}

@switch: light;
.class {
  .mixin(@switch, #888);
}

// 编译后
.class {
  color: #a2a2a2;
  display: #888;
}
```
- 第一个混合定义不匹配，因为它期望dark作为第一个参数。
- 第二个混合定义匹配，因为它期望light。
- 第三个混合定义匹配，因为它期望任何值（如果只传递了一个值，则该混合定义不匹配，因为该混合期望两个任意值）。

### 使用混合作为函数
在调用混合时可以通过在后面加上`[属性/非规则集型的变量名]`以选择属性或者变量。

#### 属性/值访问器（V3.5.0⇡）
可以使用属性/变量访问器从被调用的混合规则中选择一个值。

官方🌰：
```less
.average(@x, @y) {
  @result: ((@x + @y) / 2);
}

div {
  /* 
    注意这里是选择一个变量/属性的值，而不是将.average的全部规则混入进来。因此这里调用的位置与平常不同。
    另外还可以选择属性，在[]中写入需要的属性名即可。
  */
  padding: .average(16px, 50px)[@result];  // 查找.average的@result的值。
}

// 编译后
div {
  padding: 33px;
}
```

#### 覆盖混合值
当有多个匹配的混合时，则会评估和合并所有规则，并返回具有该标识符的**最后一个匹配值**。这类似于CSS中的层叠，它允许我们*覆盖*混合值。

将上面模式匹配的例子改动一下：
```less
.mixin(dark, @color) {
  color: lightblue;
}

.mixin(light, @color) {
  color: lightpink;
}

.mixin(@_, @color) {
  color: @color;
}

@switch: light;
.class {

  /*
    此时有：
    color: lightpink;
    color: #888;
  */
  color: .mixin(@switch, #888)[color];
}

// 编译后
.class {
  color: #888;
}
```
从现在这个🌰和上面模式匹配的🌰来看，第二个和第三个混合都是匹配的，但是这里进行评估和合并所有规则后，返回具有该标识符的最后一个匹配值，因此这里取得是第三个混合的`color`值。

#### 未命名的查询
就是指在调用混合时只有`[]`而不写入变量/属性名，这种情况所有值都将层叠，并选择最后一个声明的值。简单点说就是在调用混合时只写了空`[]`，那么最终返回的值是该混合中的最后一个属性的值。

🌰：
```less
.mixin() {
  padding: 10px;
  margin: 10px;
  border: 1px solid blue;
  color: lightblue; // 最终返回该color值，即lightblue
  // background-color：purple；如果背景颜色是该mixin的最后一个规则，则下方调用时返回值为purple。
}

.test {
  color: .mixin()[];
}

// 编译后
.test {
  color: lightblue;
}
```

### 递归混合
在Less中，一个混合可以自己调用自己，当与保护表达式和模式匹配结合使用时，这种递归混合可用于创建各种迭代/循环结构。

官方🌰：
```less
.generate-columns(4); // （1）

.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1)); // （2）
}

// 编译后
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```
1. 首先看到（1）这个位置，调用了`generate-columns`并传递了一个参数`4`，此时`@n`的值为`4`，开始进行判断条件。
2. 当进行到（2）的位置时，又调用一次`generate-columns`并把这一轮的`@n`的值传给下一轮的`@n`，`@i`的值用于生成选择器名和进行宽度值的计算，加一传递给下一轮的`@i`。
3. 重复执行2，3步，在这期间，`@n`的值始终为`4`。
4. 直到第五轮，`@i`的值等于`5`，大于`@n`的值，条件不满足，递归停止。

### 混合守卫
混合守卫通过保护表达式引入一个保护序列，对匹配很有用。

官方🌰：
```less
/*
  lightness()函数返回HSL颜色空间中颜色对象的亮度（L）通道。
*/
.mixin(@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
.mixin(@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.mixin(@a) {
  color: @a;
}

.class1 {
  .mixin(#ddd); // hsl(0, 0, 87%)
}
.class2 {
  .mixin(#555); // hsl(0, 0, 33%)
}

// 编译后
.class1 {
  background-color: black;
  color: #ddd;
}
.class2 {
  background-color: white;
  color: #555;
}
```

#### 守卫比较运算符、守卫逻辑运算符与类型检查函数
比较简单，直接上🌰：
```less
// 守卫比较运算符：>、>=、=、=<、<
.truth(@a) when (@a > 1) { ... }
.truth(@a) when (@a >= 5) { ... }
.truth(@a) when (@a = 5) { ... }
...

// 守卫逻辑运算符：and、not以及or（用逗号分隔来模拟or运算符）
.mixin(@b, @c) when (@b > 0) and (@c < 3) { ... }
.mixin(@b, @c) when (@b > 10), (@c < 0) { ... }
.mixin(@b) when not (@b > 0) { ... }

// 类型检查函数，详细请查看后文函数部分
.mixin(@a; @b: 0) when (isnumber(@b)) { ... }
.mixin(@a; @b: black) when (iscolor(@b)) { ... }
```

### 混叠混合（V3.5.0⇡）
混叠混合就是将混合调用分配给变量，混合可以被赋值给一个变量作为变量调用来调用，也可以用于映射查找。

官方🌰：
```less
#theme.dark.navbar {
  .colors(light) {
    primary: purple;
  }
  .colors(dark) {
    primary: black;
    secondary: grey;
  }
}

.navbar {
  /*
    这里@colors就相当于成了：
    @colors: {
      primary: black;
      secondary: grey;
    }
  */
  @colors: #theme.dark.navbar.colors(dark);
  background: @colors[primary];  
  border: 1px solid @colors[secondary];
  
  // 也可以像下面这样使用，可以理解为现在@colors是#theme.dark.navbar.colors(dark)的别名
  // @colors()
}

// 编译后
.navbar {
  background: black;
  border: 1px solid grey;
}
```
![01.webp](/content-images/fe-develop/articles/12-less-detailed-tutorial/01.webp)

## 合并
**merge**特性允许将多个属性中的值聚合到单个属性下的**逗号或空格分隔**的列表中。逗号合并用`+`；而空格合并用`+_`。

🌰：
```less
.mixin() {
  box-shadow+: inset 0 0 10px #555; // 逗号合并
  transform+_: scale(2);            // 空格合并
}
.myclass {
  .mixin();
  box-shadow+: 0 0 20px black;       
  transform+_: rotate(15deg);
}

// 编译后
.myclass {
  box-shadow: inset 0 0 10px #555, 0 0 20px black; // 逗号分隔
  transform: scale(2) rotate(15deg);               // 空格分隔
}
```
> 注意：不能合并变量，`@color+/@color+_`这种写法虽然不报错（会Warning），但是最后并不会合并。另外，如果混合中的属性不加`+/+_`，而调用的规则集中的属性又加了`+/+_`，那么这时也不会合并，而是会层叠。
> ```less
> .mixin() {
>   @mixin-anima+_: animation2 1s linear; // 未知规则@mixin-anima
>   transform: scale(2);                  // 不加合并符
> }
> 
> .myclass {
>   .mixin();
>   @mixin-anima+_: animation1 1s linear;     
>   transform+_: rotate(15deg);
> }
> 
> // 编译后
> .myclass {
>   @mixin-anima +_: animation2 1s linear; // 未知规则@mixin-anima
>   transform: scale(2);
>   @mixin-anima +_: animation1 1s linear; // 未知规 则@mixin-anima
>   transform: rotate(15deg);
> }
> ```

## Maps（V3.5.0↑）
Maps是指**使用规则集和Mixins作为值映射，通过`@变量名[键]`的形式使用**。 

这部分结合Sass的Maps会比较好理解，两者的Maps十分相似，都允许我们定义一组*键值对*，并在样式中引用。再看回混叠混合的🌰：
```less
#theme.dark.navbar {
  .colors(light) {
    primary: purple;
  }
  .colors(dark) {
    primary: black;
    secondary: grey;
  }
}

.navbar {
  /*
    这里@colors就相当于成了，也就是Maps：
    @colors: {
      primary: black;
      secondary: grey;
    }
  */
  @colors: #theme.dark.navbar.colors(dark);
  background: @colors[primary];  
  border: 1px solid @colors[secondary];
  
  // 也可以像下面这样使用，可以理解为现在@colors是#theme.dark.navbar.colors(dark)的别名
  // @colors()
}

// 编译后
.navbar {
  background: black;
  border: 1px solid grey;
}
```
> 注意点：映射在使用时加括号会报错，并且如果只有一个`[]`时，则`[]`中只能是属性或者非规则集型变量。如果有嵌套规则集型变量需求的话请看下文。

### 查找值产生了另一个规则集的情况
就是一个规则集中的某个变量又是一个规则集，又要映射这个内层规则集的情况。语法：`变量[[内层变量1]...][属性/非规则集型变量]`
```less
@map: {
  @map1: {
    color: lightblue;
  }
}

.test {
  color: @map[@map1][color];
}

// 编译后
.test {
  color: lightblue;
}
```
> 注意：如果内层是`选择器 {...}`，要映射它的话，再使用上面这种语法会报错，用命名空间那种语法也不行。

### 在查找中使用变量变量
还记得变量那部分的变量的变量吗，这里就是指使用的时候可以使用`[@@变量名]`的方式取值：

官方🌰：
```less
.foods() {
  @dessert: ice cream;
}

@key-to-lookup: dessert;

.lunch {
  treat: .foods[@@key-to-lookup];
}

// 编译后
.lunch {
  treat: ice cream;
}
```
## 继承
继承是一个Less伪类，它会将它所在的选择器与它所引用的选择器合并。

语法：`选择器:extend((选择器 [all || 嵌套选择器])...)`。继承要么附加到选择器，要么放置在规则集中，看起来就像一个伪类。

🌰：
```less
.ext1 {
  color: lightblue;
}

// 附加到选择器
.test:extend(.ext) {}

// 使用&:extend(selector)语法放置在规则集中
/*.test {
  &:extend(.ext);
} */

// 编译后
.ext, .test {
  color: lightblue;
}
```
> 注意：
> 1. 再附加到选择器中时，一个选择器可以包含多个扩展子句，但所有`:extend`都必须位于选择器的末尾：
>    - 在选择器后的继承：`pre:hover:extend(div pre)`。
>    - 选择器和继承之间允许有空格：`pre:hover :extend(div pre)`。
>    - 允许多个继承：`pre:hover:extend(div pre):extend(.bucket tr)`。这与`pre:hover:extend(div pre, .bucket tr)`相同。
>    - 这是不允许的：`pre:hover:extend(div pre).nth-child(odd)`。继承必须是最后一个。
>    - 如果规则集包含多个选择器，则其中任何一个都可以具有`extend`关键字。在一个规则集中扩展多个选择器：
>      ```less
>      .big-division,
>       .big-bag:extend(.bag),
>       .big-bucket:extend(.bucket) {...}
>      ```
> 2. 将继承放入主体是将其放入该规则集的每个选择器的快捷方式。
>    ```less
>    pre:hover,
>    .some-class {
>      &:extend(div pre);
>    }
>    
>    // 与下面这种方式完全相同
>    pre:hover:extend(div pre),
>    .some-class:extend(div pre) {}
>    ```

### 继承嵌套选择器
看回那个语法：`选择器:extend(选择器 [all || 嵌套选择器])`。继承能够匹配嵌套选择器，也就是在选择器后面用空格分隔再接一个嵌套选择器，表示要继承的是这个选择器中的嵌套某个嵌套选择器。

🌰：
```less
.ext {
  .ext-1 {
    color: lightblue;
  }
  
  tr {
    color: lightpink;
  }
}
 
.test:extend(.ext tr) {...} // 继承.ext中的tr规则集
.test:extend(.ext .ext-1) {...} // 继承.ext中的.ext-1规则集
```

### 继承多个规则集
要继承多个规则集，就是用逗号分隔若干个`选择器 [all || 嵌套选择器]`。

官方🌰：
```less
.e:extend(.f) {...}
.e:extend(.g) {...}

.e:extend(.f, .g) {...}
```

### 完全匹配继承
继承默认查找选择器之间的精确匹配。比如两个`nth`表达式具有相同的含义并不重要，它们必须具有相同的形式才能匹配。唯一的例外是属性选择器中的引号类型并不重要（这点请查看下文）。

结合官方🌰：
```less
.a.class,
.class.a,
.class > .a {
  color: blue;
}

// .test:extend(.class) {} 这不匹配上面的任何选择器
.test:extend(.a.class) {} // 匹配上面的.a.class选择器

// 编译后
.a.class,
.class.a,
.class > .a,
.test {
  color: blue;
}
```
注意：`*.class`和`.class`是等效的，但是Less会认为它们两者不匹配：
```less
*.class {
  color: blue;
}

.noStar:extend(.class) {} // 不匹配*.class
```
另外选择器伪类的顺序顺序很重要，比如选择器`link:hover:visited`和`link:visited:hover`匹配同一组元素，但Less会将它们区别对待。

### nth表达式和属性选择器中的引号类型
nth表达式形式很重要，正常情况下`1n+3`和`n+3`是等价的，但继承时它们不匹配：
```less
:nth-child(1n+3) {
  color: blue;
}
.child:extend(:nth-child(n+3)) {} // 不匹配:nth-child(1n+3)
```

对于属性选择器中的引号类型问题，现在假设有`.ipt[tabindex='1']`，在继承时，无论加不加括号或者括号的类型不一致都是匹配的。

但要注意：在定义时和继承时用（呃。。这里打出来会被当成代码处理，总之就是Javascript的模板字符串那种引号）会报错，这是不合法的。

官方🌰：
```less
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
### 继承all
当在继承语法参数的最后指定`all`关键字时，它会告诉Less将该选择器作为另一个选择器的一部分进行匹配。**选择器将被复制，选择器中匹配的部分将被继承替换**，从而生成一个新的选择器。

看着很懵对吧，结合官方的🌰来看就很清楚了：
```less
.a.b.test,
.test.c {
  color: orange;
}
.test {
  &:hover {
    color: green;
  }
}

.replacement:extend(.test all) {}

// 编译后
.a.b.test,
.test.c,
.a.b.replacement,
.replacement.c {
  color: orange;
}
.test:hover,
.replacement:hover {
  color: green;
}
```
可以很明显的看出，所有与`.test`相关的都被复制了一份，并且复制出来的那份中所有`.test`的位置都被替换成`.replacement`了。再倒回去看他的概念就明白了吧。

### 带继承的选择器插值
继承无法将选择器与变量匹配。如果选择器包含变量，继承将忽略它：
```less
@variable: .bucket;
@{variable} { 
  color: blue;
}
.some-class:extend(.bucket) {} // 与上面不匹配

// -------------------------------------------------

.bucket {
  color: blue;
}
@variable: .bucket;
.some-class:extend(@{variable}) {} // 也不匹配

```
但是将扩展附加到插值选择器中是有效的：
```less
.bucket {
  color: blue;
}
@{variable}:extend(.bucket) {}
@variable: .selector;

// 编译后
.bucket, .selector {
  color: blue;
}
```

### 范围界定/继承内部@media
目前，`@media`规则中的`:extend`**只匹配同一个@media中的选择器**。这个就不过多解释了，官方的🌰已经写的很清楚了：
```less
@media print {
  .screenClass:extend(.selector) {} 
  .selector { // 匹配，处于同一个@media
    color: black;
  }
}

.selector {  // 忽略
  color: red;
}

@media screen {
  .selector {  // 忽略
    color: blue;
  }
}

// 编译后
@media print {
  .selector,
  .screenClass {-
    color: black;
  }
}
.selector {-
  color: red;
}
@media screen {
  .selector {-
    color: blue;
  }
}
```
> 注意：如果一个@media中又嵌套了@media，那么继承时嵌套@media也会被忽略。而如果是继承处于顶级的话，会匹配所有内容，包括嵌套媒体中的选择器。

### 重复检测
重复检测通常出现在继承多个规则集的时候，但是Less不会进行重复检测。

官方🌰：
```less
.alert-info,
.widget {...}

.alert:extend(.alert-info, .widget) {}

// 编译后
.alert-info,
.widget,
.alert,
.alert {...} // 有两个.alert
```

### 继承应用
#### 经典用例
JavaScript在ES6添加了类的概念，与大多数语言的类类似，类有一个继承特性，可以在现有功能之上创建新功能，比如利用继承来重写父类方法。在Less中，我们也可以用继承的方式来覆盖父类规则。

官方🌰：
```less
.animal {
  background-color: black;
  color: white;
}

.bear {
  &:extend(.animal);
  background-color: brown;
}

// 编译后
.animal,
.bear {
  background-color: black;
  color: white;
}
.bear {
  background-color: brown; // 会覆盖前面的背景颜色
}
```

#### 减小CSS的体积
相比混合可能会导致不必要的重复，继承是将选择器移动到自己希望使用的属性，从而减小生成的CSS的体积。

官方🌰：
```less
// Mixins
.my-inline-block() {
  display: inline-block;
  font-size: 0;
}
.thing1 {
  .my-inline-block;
}
.thing2 {
  .my-inline-block;
}

// 编译后
.thing1 {
  display: inline-block;
  font-size: 0;
}
.thing2 {
  display: inline-block;
  font-size: 0;
}

// ----------------------------------------------------------
// 继承
.my-inline-block {
  display: inline-block;
  font-size: 0;
}
.thing1 {
  &:extend(.my-inline-block);
}
.thing2 {
  &:extend(.my-inline-block);
}

// 编译后
.my-inline-block,
.thing1,
.thing2 {
  display: inline-block;
  font-size: 0;
}
```
很直观的就能看出继承没有重复。

既然进行了对比，那我有一点好奇的地方，如果我给基类加上括号（也就是想让它不会显示到CSS输出中），能不能完成继承？答案是不行，对上面🌰中继承部分的基类加上括号的话，虽然不会报错，但最终编译出来的CSS是一片空白，什么都没有。

### 组合样式/更高级的混合
继承可以作为混合的替代方案，因为混合通常与简单的选择器一起使用，如果有两个不同的html块，但需要将相同的样式应用于两者时，可以使用继承来关联两个区域。

官方🌰：
```less
li.list > a {...}

button.list-style {
  &:extend(li.list > a); 
}

// 编译后
// 使用相同的列表样式
li.list > a,
button.list-style {
  color: red;
}
```
### 选择混合 or 继承
继承与混合都是封装和重用样式的方式，这自然就提出了何时使用哪一种的问题。当需要使用参数配置样式时，选择混合；而根据经验，在表示语义类(或其他语义选择器)之间的关系时，继承是最佳选择。因为带有`.error——serious`类的元素是一个错误，所以扩展`.error`是有意义的。但是对于非语义的样式集合，编写混合可以避免层叠问题，并使其更容易进行后续配置。

大多数web服务器使用一种非常擅长处理相同文本重复块的算法来压缩它们所提供的CSS。这意味着，尽管混合可能会产生比继承更多的CSS，但它们可能不会大幅增加用户需要下载的数量。因此，选择对用例最有意义的特性，而不是生成最少CSS的特性!


## CSS守卫
与混合守卫类似，保护表达式可以直接应用于CSS选择器。是用于声明混合然后立即调用它的语法糖。

官方🌰：
```less
@my-option: true;

/*
  V1.5.0前，需要在外层包一个带括号的混合，并将保护表达式用在这层混合上才能实现CSS守卫。
*/
.my-optional-style() when (@my-option = true) {
  button {
    color: white;
  }
}
.my-optional-style();

// ----------------------------------------------------------------
// V1.5.0之后可以直接将保护表达式应用在CSS选择器上实现CSS守卫。
button when (@my-option = true) {
    color: white;
}
```
保护表达式除了应用在选择器上，也可以结合继承`&`来实现对嵌套规则集进行分组：
```less
@num: 10;

.test {
  & when (@num <= 15) {
    a {
      color: lightblue;
    }
  }

  & when (@num > 15) {
    a {
      color: lightpink;
    }
  }
}
```

另外还可以使用`if`逻辑函数作用在变量/属性上来实现类似的效果，这点放在函数部分再说。

## 分离的规则集
分离的规则集是一组CSS属性、嵌套规则集、媒体声明或存储在变量中的任何其他内容。可以将其包含在规则集或其他结构中，其所有属性都将**复制**到该规则集或其他结构中。还可以像是在Javascript中将对象作为参数传递给函数一样，将这些内容作为参数传递给混合。

简单的就是官方的🌰：
```less
@detached-ruleset: { background: red; }; 

.top {
  @detached-ruleset(); 
}

// 编译后
.top {
  background: red;
}
```
是不是跟映射一毛一样。再来看一个🌰：
```less
.mixin(@rules) {
  .mixin-1 {
    @rules();
  }
}

.test {
  background-color: lightpink;
  .mixin({
    color: lightblue;
  })
}

// 编译后
.test {
  background-color: lightpink;
}
.test .mixin-1 {
  color: lightblue;
}

```
将规则集作为Mixins的参数传递。

### 范围
> 来看一下官方的定义：
> 
> 分离的规则集可以使用所有*变量*和*混合*，可在定义和调用的位置访问。否则，定义和调用方作用域都可用。如果两个作用域包含相同的变量或混合，则声明作用域值优先。
> 
> 声明范围是定义分离规则集正文的范围。将分离的规则集从一个变量复制到另一个变量无法修改其范围。规则集不会仅通过在此处引用来访问新范围。
> 
> 最后，分离的规则集可以通过解锁（导入）到作用域中来访问。
> 
> 注意：不赞成通过调用mixin将变量解锁到作用域中。使用属性/变量访问器。


#### 定义和调用方范围可见性
分离的规则集可以看到调用方的变量和混合（定义方肯定可见）。这里对应第一段话，简单点说就是在独立的规则集中使用的变量/混合在当前独立的规则集中有没有定义：
1. 有的话就优先使用定义方的变量/混合值。
2. 没有的话按照变量范围的规则进行查找，如果到最顶层都找不到，就使用调用方的变量/混合值。

🌰：
```less
@ruleset: {
  @color: purple;
  color: @color; // purple
  .test-mixin(); // 此处为undefined
}

.test {
  @ruleset();

  @color: lightblue;
  .test-mixin() {
    background-color: lightpink;
  }
}

// 编译后
.test {
  color: purple;
  background-color: lightpink;
}
```
首先`@color`在定义方有定义，虽然在调用方也有定义，但是根据规则，优先使用定义方的值，因此最终color的值为`purple`；而`.test-mixin`在定义方没有定义，在使用方有定义，因此使用使用方的值。

#### 引用不会修改分离的规则集范围 和 解锁将修改分离的规则集范围
这部分对应第二，三段话，引用不会修改分离的规则集范围是指**一个规则集不能仅仅通过被引用而获得对新作用域的访问**。

解锁将修改分离的规则集范围是指**一个分离的规则集通过在作用域内解锁(导入)来获得访问权限**。

来看一下官方对这两个内容的🌰：
```less
// 引用不会修改分离的规则集范围
@detached-1: { scope-detached: @one @two; };
.one {
  @one: visible;
  .two {
    @detached-2: @detached-1; // 复制/重命名规则集
    @two: visible; // 规则集看不到这个变量
  }
}

.use-place {
  .one.two(); 
  @detached-2();
}

// -----------------------------------------------------------------------

// 解锁将修改分离的规则集范围
#space {
  .importer-1() {
    @detached: { scope-detached: @variable; };
  }
}

.importer-2() {
  @variable: value; // 解锁的分离规则集可以看到这个变量
  #space.importer-1(); // 解锁/导入分离的规则集
}

.use-place {
  .importer-2(); // 第二次解锁/导入分离的规则集
   @detached();
}
```

## @import
`@import`规则用于从其他样式表导入样式。

与CSS不同的是，`@import`不一定就要放在所有其他类型的规则之前，可以放在任意合法的位置，但是如果要将`@import`规则当成参数直接传递给Mixins或者放在`@media`的条件中，这些极端的写法都是达咩的，前者还可以包裹在规则集中传递；后者直接报错。

🌰：
```less
.foo {
  background: #900;
}
@import "other.less";
```

### 文件扩展名
Less会根据`@import`文件扩展名的不同对`@import`语句进行不同的处理。有以下3种规则：
- 如果文件扩展名为`.css`，它将被视为CSS，`@import`语句保持原样（请参阅下面的`inline`选项）。
- 如果它有*任何其他扩展名*，它将被视为“less”并导入。
- 如果它没有扩展名，会自动附加`.less`，并将作为导入的Less文件包含在内。

🌰：
```less
// other.css
div {
  color: lightblue;
}

// test.less
@import 'other.css';
color: lightpink;

// -------------------------------------------

// other.js
let a = 1;

// test.less
@import 'other.js';

// -------------------------------------------

// other.css
div {
  color: purple;
}

// test.less
@import 'other';

// ===============================================
// 编译后
@import 'other.css';
color: lightpink;

// ------------------------------------------------
在other.js文件报错

// ------------------------------------------------
div {
  color: purple;
}
```

### 导入选项
Less提供了对CSS@import规则的多个扩展，以便对外部文件执行的操作提供更大的灵活性。语法：`@import (keyword) "filename";`

`keyword`可选的关键字有：
- `reference`：使用less的文件但不输出它。
- `inline`：在输出中包含源文件，但不处理它。
- `less`：将文件视为Less文件，无论文件扩展名如何。
- `css`：将文件视为CSS文件，无论文件扩展名如何。
- `once`：仅包含文件一次（默认）。
- `multiple`：多次包含文件。
- `optional`：找不到文件时继续编译。

来逐个分析（`less`和`css`比较简单，就不多说了）
#### `reference`
```less
// other.less
@color: lightblue;
.other-mixin {
  background-color: lightpink;
}

// test.less
@import (reference) 'other.less';
.test {
  color: @color;
  .other-mixin();
}

// 编译后
.test {
  color: @color;
  background-color: lightpink;
}
```
在导入的文件中，每个@规则和选择器都有引用标记，正常导入，但是当生成CSS时，“引用”选择器(以及只包含引用选择器的任何媒体查询)不会输出。引用样式不会输出到编译后的CSS中，除非引用样式被用作Mixins或继承。
  
此外，`reference`根据所使用的方法（混合或继承）产生不同的结果：
- 混合：当一个引用样式被用作隐式Mixins时，它的规则被混合，标记为“非引用”，并正常出现在引用的位置。参考上面的🌰。
- 继承：继承选择器时，只有新选择器被标记为未引用，并且它被拉入引用`@import`语句的位置。
  ```less
  // other.less与上面🌰中的一样
  @import (reference) './other.less';

  .test:extend(.other-mixin) { 
    color: lightblue;
  }
  
  // 编译后
  // 正常是.other-mixin，.test {...}，但是这里other.less不输出，只有.test
  .test {
    background-color: lightpink;
  }
  .test {
    color: lightblue;
  }
  ```
  
#### `inline`
  ```less
  // other.less
  @color: lightblue;
  .other-mixin {
    background-color: lightpink;
  }
  
  // test.less
  @import (inline) 'other.less';
  .test {
    color: purple;
  }

  // 编译后
  @color: lightblue;
  .other-mixin {
    background-color: lightpink;
  }
  .test {
    color: purple;
  }
  ```
  在test.less文件中是访问不到other.less文件中的变量/混合的，但是输出会包含other.less文件的内容。
  
  当Less可能不兼容CSS文件时，可以使用它；虽然Less支持大多数已知的标准CSS，但在某些地方它不支持注释，并且在不修改CSS的情况下不支持所有已知的CSS hacks。可以使用它将文件包含在输出中，以便所有CSS都将在一个文件中。
  
#### `once`和`multiple`：
```less
// once是@import的默认行为，表示该文件仅导入一次，后续导入语句将被忽略。
@import (once) "other.less";
@import (once) "other.less";  // 该导入被忽略

// ---------------------------------------------------------------
// multiple与once行为相反，允许导入具有相同名称的多个文件。官方🌰：
// foo.less
.a {
  color: green;
}
// main.less
@import (multiple) "foo.less";
@import (multiple) "foo.less";

// 编译后
.a {
  color: green;
}
.a {
  color: green;
}
```

#### optional
用于`@import (optional)`仅在文件存在时才允许导入。如果没有`optional`关键字则在导入找不到的文件时会引发FileError并停止编译。
```less
// nonexistence.less文件不存在
@import './nonexistence.less'; // 报错
@import (optional) './nonexistence.less'; // 不报错，继续往下编译

.test { 
  color: lightblue;
}
```

## @plugin
@plugin用于导入JavaScript插件以添加Less.js函数和特性。使用`@plugin`规则类似于对 .less文件使用`@import`。

官方🌰：
```js
// plugin.js
// 1.
registerPlugin({
  install: function(less, pluginManager, functions) {
    functions.add('pi', function() {
      return Math.PI;
    });
  }
})

// ----------------------------------------------------
// 2.用于在浏览器和Node.js中工作
module.exports = {
  install: function(less, pluginManager, functions) {
    functions.add('pi', function() {
      return Math.PI;
    });
  }
};
```
```less
// test.less
@plugin "plugin"; // 不加扩展名默认追加.js
.show-me-pi {
  value: pi();
}

// 编译后
.show-me-pi {
  value: 3.141592653589793;
}
```
如果想将其与其他值相乘或执行其他Less操作，则需要返回一个适当的Less节点。否则样式表中的输出是纯文本。

改动一下上面那个🌰：
```less
@plugin "plugin";
.show-me-pi {
  /* 
    js部分不变，只在这里进行乘法运算。
    此时这里会报错：Operation on an invalid type，
  */
  value: pi() * 2; 
}
```
需要返回一个Less节点才能进行Less操作：
```js
registerPlugin({
  install: function(less, pluginManager, functions) {
    functions.add('pi', function() {
      /* 
        返回{unit: te {...}, value: 3.141592653589793}
      */
      return new tree.Dimension(Math.PI); // 返回一个Less节点
    });
  }
})
```

### 插件范围
`@plugin`添加的函数遵循Less作用域规则。假设有来自两个不同的第三方库的插件，都具有同名的函数：
```js
// lib1.js
functions.add('foo', function() {
    return "foo";
});

// lib2.js
functions.add('foo', function() {
    return "bar";
});

```
```less
.el-1 {
    @plugin "lib1";
    value: foo();
}
.el-2 {
    @plugin "lib2";
    value: foo();
}
```
在Less3.0之前，函数必须是属性值或变量赋值的一部分，并且可以通过将私有函数放置在特定范围内来有效地制作私有函数。

而从Less3.0开始，函数可以返回@规则、规则集、任何其他Less节点、字符串和数字（后两个节点转换为匿名节点），并且可以在任何级别调用。

🌰：
```less
// test.less
.test { 
  @plugin './plugin.js';
  color: red;
}

.te11{
  padding: pi() * 2;
}
```

### 空函数
在定义插件时，设置函数的返回值为`false`来实现想要调用函数，但不希望任何输出（例如存储值供以后使用）的情况。

🌰：
```js
var collection = [];

functions.add('store', function(val) {
  collection.push(val);  // imma store this for later
  return false;
});

functions.add('retrieve', function() {
  return new tree.Value(collection);
});
```
```less
@plugin "collections";
@var: 32;
store(@var);

.get-my-values {
   values: retrieve();   
}

// 编译后
.get-my-values {
  values: 32;
}
```
`store`函数接收一个变量，在Less顶级作用域中调用`store(@var);`，将`@var`的值作为参数传递给`store`函数，并暂存到`collection`数组中。后续在`.get-my-values`中使用`retrieve`函数，`retrieve`函数返回一个包含`collection`的Less节点：
![02.webp](/content-images/fe-develop/articles/12-less-detailed-tutorial/02.webp)

最终将`value[0].value`赋值给`values`。

### Less.js插件对象
Less.js 插件指的是`registerPlugin`函数包裹着的对象/`module.exports = {}`导出的对象，Less.js 插件应导出具有一个或多个这些属性的对象（有些翻译可能不太准哈。。）：
```js
{
  /* 在插件第一次导入后立即调用，只调用一次 */
  install: function(less, pluginManager, functions) { },

  /* 调用@plugin的每个实例。 */
  use: function(context) { },

  /* 在评估规则时，调用@plugin的每个实例。不过会在生命周期后评估 */
  eval: function(context) { },

  /* 
    向插件传递任意字符串，例如@plugin (args) "file";
    这个字符串不会为你解析，所以它可以包含几乎任何东西
  */
  setOptions: function(argumentString) { },

  /* 设定一个最低不兼容性字符串，还可以使用一个数组（如[3,0]） */
  minVersion: ['3.0'],

  /* 仅用于lessc，用于解释终端中的选项 */
  printUsage: function() { },
}
```
`install`函数的PluginManager实例提供添加访问者，文件管理器和后处理器的方法。

这是一些示例存储库，显示了不同的插件类型：
- 后处理器：https : //github.com/less/less-plugin-clean-css
- 访客：https：//github.com/less/less-plugin-inline-urls
- 文件管理器：https : //github.com/less/less-plugin-npm-import

## 函数
### 逻辑函数
#### if（V3.0.0↑）
`if`函数会根据条件返回两个值之一。

语法：`if(condition, value1, value2)`，参数：
- `condition`：布尔表达式
- `value1`：如果`condition`为`true`，则返回`value1`。
- `value2`：如果`condition`不为`true`，则返回`value2`。

🌰：
```less
@theme: light;

.test {
  background-color: if(@theme = light, #eee, #333);
  color: if(@theme = light, black, white);
}

// 编译后
.test {
  background-color: #eee;
  color: black;
}
```
> 注意：`if`函数的`condition`表达式可以与`when`语句的布尔表达式相同。也就是说`when`语句的布尔表达式可以怎么写，`if`函数也可以怎么写，但有一点不行，就是在`if`函数中不能用逗号分隔两个条件来模拟`or`运算符。另外前者是应用于选择器，而后者应用于变量/属性。
> 
> 🌰：
> ```less
> @theme: light;
> @num: 1;
> 
> .test{
>   color1: if((@theme = light) and (@num < 3), black, white);
>   color2: if((@theme = light) or (@num < 3), black, white);
>   color3: if(not (@theme = light), white, black);
> }
> ```
> 补充一点：在Less3.6之前，`if`函数中的`condition`参数要用括号进行包裹，Less3.6之后括号可选。

#### boolean（V3.0.0↑）
`boolean`函数计算结果为`true`/`false`。常用于存储布尔测试，以便以后在保护表达式或`if`函数中进行评估。

官方🌰：
```less
@bg: black;
@bg-light: boolean(luma(@bg) > 50%); // luma函数计算颜色对象的亮度

div {
  background: @bg; 
  color: if(@bg-light, black, white);
}

// 编译后
div {
  background: black;
  color: white;
}
```

### 字符串函数
| 函数 | 语法 | 参数 | 功能 | 返回值 | 
| --- | --- | --- | --- | --- |
| `escape` | `escape(string)` | string | 对输入字符串中的特殊字符应用url编码。 |  不带引号的`string`内容。 |
| `e` | `e(string)` | string | 期望字符串作为参数，并按原样返回其内容（但不带引号）。它可以用来输出CSS值，这些值要么是无效的CSS语法，要么使用Less不识别的专有语法。 | string -转义字符串，不带引号。 |
| `% 格式化` | `%(string, arguments...)` | **string**：带有占位符的字符串。<br><br>**arguments...**：用于代替占位符的值 | 格式化字符串 | 格式化`string` |  
| `replace` | `replace(string, pattern, replacement[, flags])` | **string**：要搜索和替换的字符串。<br><br>**pattern**：要搜索的字符串或正则表达式模式。<br><br>**replacement**：用于替换匹配模式的字符串。<br><br>**flags**：（可选）正则表达式标志。 | 替换字符串中的文本。 | 带有替换值的字符串。 |

- `escape`函数的参数注意点：
  - 这些字符不编码：`,`、`/`、`?`、`@`、`&`、`+`、`'`、`~`、`!`和`$`。
  - 最常见的编码的字符：`\<space\>`、`#`、`^`、`(`，`)`、`{`、`}`、`|`、`:`、`>`、`<`、`;`、`]`、`[`和`=`。
  
  如果参数不是字符串，则不定义输出。当前的实现在颜色上返回undefined，在任何其他类型的参数上返回不变的输入。不应依赖此行为，将来可能会更改。
  
  ---
  
- `% 格式化`函数的第一个参数是带有占位符的字符串。所有占位符以百分号`%`开始后跟字母`s/S`、`d/D`以及`a/A`。其余参数包含替换占位符的表达式。如果需要打印百分比符号，请用另一个百分比将其转义`%%`。

  占位符：
    - `d`，`D`，`a`，`A`可以通过任何种类的参数（颜色，号码，转义值，表达，...）的替换。如果将它们与字符串结合使用，则将使用整个字符串-包括其引号。但是，引号按原样放置在字符串中，不能用“ /”或类似符号进行转义。
    - `s`和`S`可以用任何表达式替换。如果将它与字符串一起使用，则仅使用字符串值-省略引号。

  如果需要将特殊字符转义为utf-8转义码，请使用大写占位符。该函数会转义除以外的所有特殊字符`()'~!`。空格编码为`%20`。小写占位符保留原样的特殊字符。

### 列表函数
| 函数 | 语法 | 参数 | 功能 |
| --- | --- | --- | --- |
| `length` | `length(list) `| **list**：逗号或空格分隔的值列表。 | 返回值列表中的元素数。 |
| `extract` | `extract(list, index)` | **list**： 逗号或空格分隔的值列表。<br><br>**index**：一个整数，指定要返回的列表元素的位置(从1开始)。 | 返回列表中指定位置的值。 |
| `range`（V3.9.0↑） | `range([start, ]end[, step])` | **start**：可选，起始值。<br><br>**end**：结束值。<br><br>**step**：可选，递增量。 | 生成一个包含一系列值的列表。 | 
| `each`（V3.7.0↑） | `each(list, rules)` | **list**：逗号或空格分隔的值列表。<br><br>**rules**：匿名规则集/混合。 | 将规则集的求值绑定到列表的每个成员。 |

🌰：
```less
// length
.test {
  @len: a, b, c, d;
  list-length: length(@len); // 4
}

// extract
@fruit: apple, banana, orange, grape;

.test {
  fruit: extract(@fruit, 3); // orange
}

// range
.test {
  range1: range(3); // 1 2 3
  range2: range(3, 6); // 3 4 5 6
  range2: range(3, 9, 2); // 3 5 7 9
}

// each
@selectors: sm, base, lg;

each(@selectors, {
  .screen-@{value} {
    a: b;
  }
});

// each编译后
.screen-sm {
  a: b;
}
.screen-base {
  a: b;
}
.screen-lg {
  a: b;
}
```
- `length`函数有个鸡肋的点：像上面的例子，如果直接`list-length: length(a, b, c, d);`，它始终会输出`1`，要用个变量进行中转才会正常输出。

- `range`函数的每个参数都可以带单位，但每个值的输出将与`end`参数的单位相同：
  ```less
  .test {
    value1: range(1px, 5px, 1px); // 1px 2px 3px 4px 5px;
    value2: range(1cm, 5px, 1rem); // 1px 2px 3px 4px 5px;
  }
  ```
  
- `each`函数注意点：
  - 默认情况下，每个规则集都被绑定到`@value`、`@key`和`@index`变量。对于大多数列表，`@key`和`@index`将被分配相同的值(数值位置从1开始)。但是也可以将规则集本身作为结构化列表使用：
    ```less
    // 官方🌰
    @set: {
    one: blue;
    two: green;
    three: red;
    }
    
    /* 
      @key表示当前项的属性名。
      @index表示当前项的索引，从1开始。
      @value表示当前项的值。
    */
    .set {
      each(@set, {
        @{key}-@{index}: @value;
      });
    }
    
    // 编译后
    .set {
      one-1: blue;
      two-2: green;
      three-3: red;
    }
    ```
  - 在Less 3.7中，通过`each()`函数，Less引入了匿名混合的概念，这可能会在以后扩展到语法的其他部分：    
    ```less
    // 官方🌰
    .set-2() {
      one: blue;
      two: green;
      three: red;
    }
    .set-2 {
      // @v, @k, @i分别对应@value, @key, @index
      each(.set-2(), .(@v, @k, @i) {
        @{k}-@{i}: @v;
      });
    }
    ```
  - 使用range创建 for 循环（V3.9.0↑）:只需生成一个数字列表并使用`each`列表将其扩展为规则集，即可模拟`for`循环:
    ```less
    // 官方🌰
    // 通过range函数生成数字列表
    each(range(4), {
      .col-@{value} {
        height: (@value * 50px);
      }
    });
    
    // 编译后
    .col-1 {
      height: 50px;
    }
    .col-2 {
      height: 100px;
    }
    .col-3 {
      height: 150px;
    }
    .col-4 {
      height: 200px;
    }
    ```
### 数学函数
| 函数 | 语法 | 功能 | 返回值 |
| --- | --- | --- | --- |
| `ceil` | `ceil(number) `| 向上舍入到下一个最大整数。 | 一个整数。 |
| `floor` | `extract(number)` | 向下舍入到下一个最低整数。 | 一个整数。 |
| `percentage` | `range(number)` | 将浮点数转换为百分比字符串。 | 百分比字符串。 | 
| `round` | `each(number[, decimalPlaces])`<br><br>(`decimalPlaces`：要四舍五入的小数位数) | 四舍五入 | 整数/浮点数。 |
| `sqrt` | `sqrt(number)` |  计算数字的平方根。 | number |
| `abs` | `abs(number)` | 计算数字的绝对值。| number |
| `sin` | `sin(number)` | 计算正弦函数。 | number |
| `asin` | `asin(number)`<br><br>`number`：[-1, 1]之间的浮点数。 | 计算反正弦（正弦的反函数）函数。 | 以弧度为单位的数字 |
| `cos` | `cos(number)` | 计算余弦函数。 | number |
| `acos` | `acos(number)`<br><br>`number`：[-1, 1]之间的浮点数。 | 计算反余弦（余弦的反函数）函数。 | 以弧度为单位的数字 |
| `tan` | `tan(number)` | 计算正切函数。 | number |
| `atan` | `atan(number)`<br><br>`number`：[-1, 1]之间的浮点数。| 计算反正切（切线的反函数）函数。 | 以弧度为单位的数字 |
| `pi` | `pi()` | 圆周率 | π（pi） |
| `pow` | `pow(base, exponent)` | 计算基数`base`的指数`exponent`次幂。 | 基数`base`的指数`exponent`次幂。 |
| `mod` | `mod(number, number)` | 返回值与第一个参数具有相同的维度，第二个参数的维度将被忽略。该函数还能够处理负数和浮点数。 | 第一个参数模数第二个参数的值。 |
| `min` | `min(value1, ..., valueN)` | 一个或多个值中的最小值。 | 最小值。 |
| `max` | `max(value1, ..., valueN)` | 一个或多个值中的最大值。 | 最大值。 |

这部分的函数与Javascript的Math对象暴露的函数类似，不过多说明，只介绍一下`mod`函数：简单点说就是求余数，比如`mod(-8, 3) // -2`，先不看符号和单位（如果有），8÷3余2，再加上第一个参数的符号和单位，就成了-2。

### 类型函数
| 函数 | 语法 | 功能 |
| --- | --- | --- |
| `isnumber` | `isnumber(value) `| 如果值为数字，则返回`true`，否则返回`false`。 |
| `isstring` | `isstring(value)` | 如果值为字符串，则返回`true`，否则返回`false`。 |
| `iscolor` | `iscolor(value)` | 如果值为颜色，则返回`true`，否则返回`false`。|
| `iskeyword` | `iskeyword(value)` | 如果值是关键字，则返回`true`，否则返回`false`。 |
| `isurl` | `isurl(value)` |  如果值是 url，则返回`true`，否则返回`false`。 |
| `ispixel` | `ispixel(value)` | 如果值是以像素为单位的数字，则返回`true`，否则返回`false`。|
| `isem` | `isem(value)` | 如果值是em值，则返回`true`，否则返回`false`。 |
| `ispercentage` | `ispercentage(value)` | 如果值是百分比值，则返回 `true`，否则返回 `false`。 |
| `isunit` | `isunit(value, 单位)` | 如果值是指定单位的数字，则返回`true`，否则返回`false`。 |
| `isruleset` | `isruleset(value)`= | 如果值是规则集，则返回`true`，否则返回`false`。 |
| `isdefined` | `isdefined(变量)` | 如果定义了变量，则返回`true`，否则返回`false`。 |

### 杂项函数
| 函数 | 语法 | 功能 |
| --- | --- | --- |
| `color` | `color(string)`| 如果string为颜色字符串，则该字符串将成为颜色值。 |
| `image-size` | `image-size(string)` | 从文件中获取图像尺寸。 |
| `image-width` | `image-width(string)` | 从文件中获取图像宽度。|
| `image-height` | `image-height(string)` | 获取文件的图像高度。 |
| `convert` | `convert(number, 单位)` | 将数字从一个单位转换为另一个单位。 |
| `data-uri` | `data-uri(MIMETYPE, url)` | 如果`ieCompat`选项打开且资源太大，或者在浏览器中使用该函数，则内联资源并回落到`url()`。如果没有给出MIME类型，则node使用MIME包来确定正确的MIME类型。|
| `default` | `default()` | 仅在保护表达式中可用，如果没有其他mixin匹配则返回`true`，否则返回`false`。 |
| `unit` | `unit(维度, 单位)` | 删除或更改维度(即正负号)的单位。 |
| `get-unit` | `get-unit(number)` | 返回数字的单位。 |
| `svg-gradient` | `svg-gradient(方向, 颜色百分比对1...颜色百分比对N, 颜色百分比对last)` | 生成多档svg渐变。 |

- `image-*`开头的函数均只能在Node环境中使用。

- `convert`函数的第一个参数带单位的数字，第二个参数是单位，如果两个单位兼容，则转换数字。如果它们不兼容，则原封不动返回第一个参数。
  
  兼容的单位组：
  - 长度：m、cm、mm、in、pt和 pc,
  - 时间：s和ms,
  - 角度：rad度、deg、grad和turn.
  - 
- `data-uri`函数注意点：
  - 如果没有mimetype，`data-uri`函数会从文件名后缀中猜测。文本和svg文件编码为 utf-8，其他任何文件都编码为base64。
  - 如果用户提供了mimetype，如果mimetype参数以`;base64`结尾，则函数使用base64。例如`image/jpeg;base64编码为base64`，而`text/html`编码为utf-8。
  ```less
  .test {
    background: data-uri('../data/image.jpg');
  }
  
  // 编译后
  .test {
    // 输出url('data:image/jpeg;base64,bm90IGFjdHVhbGx5IGEganBlZyBmaWxlCg==');
    
    // 浏览器中的输出：
    background: uri('../data/image.jpg');
  }
  ```
- `default`函数注意点：
  - 先看官方的基本🌰：
    ```less
    .mixin(1) {x: 11}
    .mixin(2) {y: 22}
    .mixin(@x) when (default()) {z: @x}

    div {
     .mixin(2); // 匹配.mixin(2)
    }
    div.special {
      .mixin(5); // .mixin(1)和.mixin(2)都不匹配，.mixin(@x)进行兜底匹配。
    }
  
    // 编译后
    div {
      z: 22;
    }
    div.special {
      x: 5;
    }
    ```
  - 如果将`default`函数返回的值与保护运算符一起使用，例如`.mixin() when not(default()) {}`至少还有一个混合定义匹配`.mixin()`调用时才会匹配。

  - 允许在相同的保护条件或具有相同名称的混合的不同条件下进行多个default()调用，但是，如果 Less 检测到使用 default() 的多个混合定义之间的潜在冲突，则会引发错误:
    ```less
    div {
      .m(@x) when (default())    {}
      .m(@x) when not(default()) {}

      .m(1); // Error
    }
    ```
  - 高级用法：
    ```less
    // 官方例子
    .x {
      .m(red) {case-1: darkred;}
      .m(blue) {case-2: darkblue;}
      .m(@x) when (iscolor(@x)) and (default()) {
        default-color: @x;
      }
      .m('foo') {case-1: I am 'foo';}
      .m('bar') {case-2: I am 'bar';}
      .m(@x) when (isstring(@x)) and (default()) {
        default-string: and I am the default;
      }
      
      &-blue  {.m(blue)} // 匹配.m(blue)
      &-green {.m(green)} // .m(@x) when (iscolor(@x)) and (default())兜底
      &-foo   {.m('foo')} // 匹配.m('foo')
      &-baz   {.m('baz')} // .m(@x) when (isstring(@x)) and (default())兜底
    }
    
    // 编译后
    .x-blue {
      case-2: #00008b;
    }
    .x-green {
      default-color: #008000;
    }
    .x-foo {
      case-1: I am 'foo';
    }
    .x-baz {
      default-string: and I am the default;
    }
    ```
  - 最后，`default`函数也可以在混合保护条件之外使用，它被解释为常规CSS值：
    ```less
    // 原样输出
    div {
      foo: default();
      bar: default(42);
    }
    ```
- `svg-gradient`函数注意点：
  - 它必须至少具有三个参数。第一个参数指定渐变类型和方向，其余参数列出颜色及其位置。第一个和最后一个指定颜色的位置是可选的，其余颜色必须指定位置。
  - 方向必须是`to bottom`，`to right`，`to bottom right`，`to top right`，`ellipse`或`ellipse at center`其中之一。方向既可以指定为转义值`~'to bottom'`，也可以指定为空格分隔的单词列表`to bottom`。该方向后面必须有两个或多个色标。它们可以在列表中提供，也可以在单独的参数中指定每个色标。

### 颜色定义函数
| 函数 | 语法 | 参数 | 功能 |
| --- | --- | --- | --- |
| `rgb` | `color(red, green, blue)` | `red`、`green`和`blue`：均为整数0-255或百分比0-100%。 | 根据十进制的红、绿、蓝(RGB)值创建一个不透明颜色对象。 |
| `rgba` | `rgba(red, green, blue, alpha)` | `red`、`green`和`blue`：均为整数 0-255 或百分比 0-100%。<br><br>`alpha`：数字0-1或百分比0-100%。 | 根据十进制的红、绿、蓝(RGB)值创建一个透明颜色对象。 |
| `argb` | `argb(color)` | `color`：颜色对象 | 创建一个颜色的十六进制表示，格式为`#AARRGGBB`(不是`#RRGGBBAA`)。|
| `hsl` | `hsl(hue, saturation, lightness)` | `hue`：色相。0-360表示角度的整数。<br><br>`saturation`：百分比 0-100% 或数字 0-1。<br><br>`lightness`：百分比 0-100% 或数字 0-1。 | 根据色相、饱和度和亮度（HSL）值创建不透明的颜色对象。 |
| `hsla` | `hsla(度数, 饱和度, 亮度, alpha)` | `hue`：色相。0-360表示角度的整数。<br><br>`saturation`：百分比 0-100% 或数字 0-1。<br><br>`lightness`：百分比 0-100% 或数字 0-1。<br><br>`alpha`：数字0-1或百分比0-100%。 | 根据色相、饱和度、亮度和alpha （HSLA）值创建透明颜色对象。 |
| `hsv` | `hsv(度数, 饱和度, value)` | `hue`：色相。0-360表示角度的整数。<br><br>`saturation`：百分比 0-100% 或数字 0-1。<br><br>`value`：百分比 0-100% 或数字0-1。 | 根据色相、饱和度和值 （HSV） 值创建不透明的颜色对象。|
| `hsva` | `hsva(度数, 饱和度, value, alpha)` | `hue`：色相。0-360表示角度的整数。<br><br>`saturation`：百分比 0-100% 或数字 0-1。<br><br>`value`：百分比 0-100% 或数字 0-1。<br><br>`alpha`：数字0-1或百分比0-100%。 | 根据色调、饱和度、值和 alpha （HSVA） 值创建透明颜色对象。 |

- `argb`函数这种格式用于IE，以及.NET和Android开发。
- `hsv`和`hsva`函数是Photoshop中可用的色彩空间。

### 颜色通道函数
| 函数 | 语法 | 功能 |
| --- | --- | --- |
| `hue` | `hue(color)` | 提取HSL色彩空间中颜色对象的色调(H)通道。 |
| `saturation` | `saturation(color)` | 提取 HSL 色彩空间中颜色对象的饱和度（S）通道。 |
| `lightness` | `lightness(color)` | 提取 HSL 颜色空间中颜色对象的亮度通道。|
| `hsvhue` | `hsvhue(color)` | 提取HSV颜色空间中颜色对象的色调通道。 |
| `hsvsaturation` | `hsvsaturation(color)` | 提取 HSV 颜色空间中颜色对象的饱和通道。 |
| `hsvvalue` | `hsvvalue(color)` | 提取 HSV 颜色空间中颜色对象的值通道。 |
| `red` | `red(color)` | 提取颜色对象的红色通道。 |
| `green` | `green(color)` | 提取颜色对象的绿色通道。 |
| `blue` | `blue(color)` | 提取颜色对象的蓝色通道。 |
| `alpha` | `alpha(color)` | 提取颜色对象的Alpha通道。 |
| `luma` | `luma(color)` | 计算颜色对象的亮度（感知亮度）。 |
| `luminance` | `luminance(color)` | 计算不进行伽玛校正的亮度值（此函数在V1.7.0之前被命名为luma） |

### 颜色操作函数
颜色操作通常采用与它们要更改的值相同的单位参数，百分比被作为绝对值处理，因此将10%的值增加10%将得到20%。将选项方法参数设置为相对百分比。当使用相对百分比时，将10%的值增加10%将得到11%。值被限制在允许的范围内。

它们不会被环绕。在显示返回值的地方，除了通常使用的十六进制版本外，我们还使用了明确每个函数所做的工作的格式。

| 函数 | 语法 | 参数 | 功能 |
| --- | --- | --- | --- |
| `saturate` | `saturate(color, amount[, method])` | `color`：颜色对象。<br><br>`amount`：百分比0-100%。<br><br>`method`：可选，设置`relative`为相对于当前值进行调整。 | 在HSL颜色空间中增加一个绝对数量的颜色饱和度。 |
| `desaturate` | `desaturate(color, amount[, method])` | `color`：颜色对象。<br><br>`amount`：百分比0-100%。<br><br>`method`：可选，设置`relative`为相对于当前值进行调整。 | 在HSL颜色空间中降低一个绝对数量的颜色饱和度。 |
| `lighten` | `lighten(color, amount[, method])` | `color`：颜色对象。<br><br>`amount`：百分比0-100%。<br><br>`method`：可选，设置`relative`为相对于当前值进行调整。| 将HSL颜色空间中的颜色的亮度增加一个绝对值。|
| `darken` | `darken(color, amount[, method])` | `color`：颜色对象。<br><br>`amount`：百分比0-100%。<br><br>`method`：可选，设置`relative`为相对于当前值进行调整。| 将HSL颜色空间中的颜色的亮度降低一个绝对值。 |
| `fadein` | `fadein(color, amount[, method])` | `color`：颜色对象。<br><br>`amount`：百分比0-100%。<br><br>`method`：可选，设置`relative`为相对于当前值进行调整。| 降低颜色的透明度(或增加不透明度)，使其更不透明。 |
| `fadeout` | `fadeout(color, amount[, method])` | `color`：颜色对象。<br><br>`amount`：百分比0-100%。<br><br>`method`：可选，设置`relative`为相对于当前值进行调整。 | 增加颜色的透明度（或降低不透明度），使其不那么不透明。要在另一个方向淡入淡出，请使用`fadein`. |
| `fade` | `fade(color, amount)` | `color`：颜色对象。<br><br>`amount`：百分比0-100%。| 设置颜色的绝对不透明度。可以应用于颜色，无论它们是否已经具有不透明度值。 |
| `spin` | `spin(color, angle)` | `color`：颜色对象。<br><br>`angle`：要旋转的度数（+或-） | 沿任一方向旋转颜色的色调角度。 |
| `mix` | `mix(color1, color2[, weight])` | `color1`和`color2`：颜色对象。<br><br>`weight`：可选，两种颜色之间的百分比平衡点，默认为 50%。 | 以不同的比例将两种颜色混合在一起。不透明度包含在计算中。 |
| `tint` | `tint(color[, weight])` | `color`：颜色对象。<br><br>`weight`：可选，两种颜色之间的百分比平衡点，默认为 50%。 | 以可变比例将颜色与白色混合。与调用`mix(#ffffff, @color, @weight)`）相同 |
| `shade` | `shade(color[, weight])` | `color`：颜色对象。<br><br>`weight`：可选，两种颜色之间的百分比平衡点，默认为 50%。 | 以可变比例将颜色与黑色混合。它与调用 `mix(#000000, @color, @weight)`） 相同 |
| `greyscale` | `greyscale(color)` | `color`：颜色对象。 | 删除 HSL 色彩空间中颜色的所有饱和度;与调用`desaturate(@color, 100%)`。 |
| `contrast` | `contrast(color[, dark, light, threshold])` | `color`：要比较的颜色对象。<br><br>`dark`：可选，指定的深色（默认为黑色）。<br><br>`light`：可选，指定的浅色（默认为白色）。<br><br>`threshold`：可选，指定从“深色”到“浅色”的过渡位置的百分比 0-100%（默认为 43%，与 SASS 匹配）。这用于以一种或另一种方式偏向对比度，例如，允许您决定 50% 的灰色背景应该产生黑色还是白色文本。您通常会为“较亮”的调色板设置较低的调色板，为“较深”的调色板设置较高的调色板。 | 选择两种颜色中的哪一种与另一种颜色形成最大对比度。 |

- `spin`函数注意点：虽然angle范围是0-360，但它应用了mod 360操作，所以可以传入更大的(或负的)值，低于0取0，高于360取360，例如角度360和720将产生相同的结果。注意，颜色是通过RGB转换传递的，它不会为灰色保留色相值(因为当没有饱和度时，色相没有任何意义)，所以需要确保应用函数的方式保持色相。

- `greyscale`函数注意点：由于饱和度不受色调影响，因此生成的颜色映射可能有些暗淡或浑浊；亮度可能会提供更好的结果，因为它提取的是感知亮度而不是线性luma，例如`greyscale('#0000ff')`将返回与`greyscale('#00ff00')`相同的值，尽管它们在人眼看来亮度大不相同。
- `contrast`函数注意点：这对于确保可在背景下读取颜色非常有用，对于可访问性合规性也很有用。该函数的工作方式与Compass for SASS中的对比函数相同。根据WCAG 2.0，使用经过伽玛校正的亮度值（而非亮度）比较颜色。

  浅色和深色参数可以按任一顺序提供 - 该函数将计算其亮度值并自动分配明暗，这意味着您无法使用此函数通过反转顺序来选择对比度最低的颜色。


### 颜色混合函数
| 函数 | 语法 | 参数 | 功能 |
| --- | --- | --- | --- |
| `multiply` | `multiply(color1, color2)` | `color1`和`color2`: 均为颜色对象。 | 将两种颜色相乘。两种颜色中每种颜色的相应RGB通道相乘，然后除以255。结果是颜色变深。 |
| `screen` | `screen(color1, color2)` | `color1`和`color2`: 均为颜色对象。 | 与`multiply`函数相反。结果是颜色更亮。 |
| `overlay` | `overlay(color1, color2)` | `color1`：基色对象。也是使结果变浅或变暗的决定性颜色。<br><br>`color2`：要叠加的颜色对象. | 结合了`multiply`和`screen`的效果。有条件地使亮通道变亮，使暗通道变暗。条件的结果由第一个颜色参数确定。|
| `softlight` | `softlight(color1, color2)` | `color1`：一个颜色对象，用于柔和照亮另一个对象。<br><br>`color2`：要柔和变亮的颜色对象. | 与`overlay`类似，但避免纯黑色导致纯黑色，纯白色导致纯白色。 |
| `hardlight` | `hardlight(color1, color2)` | `color1`：要叠加的颜色对象。<br><br>`color2`：基色对象。也是使结果变浅或变暗的决定性颜色。 | 与`overlay`相同，但颜色角色颠倒了。 |
| `difference` | `difference(color1, color2)` | `color1`：充当减号的颜色对象。<br><br>`color2`：用作子结构的颜色对象。 | 逐个通道从第一种颜色中减去第二种颜色。负值反转。减去黑色不会产生任何变化；减去白色会导致颜色反转。 |
| `exclusion` | `exclusion(color1, color2)` | `color1`：充当减号的颜色对象。<br><br>`color2`：用作子结构的颜色对象。 | 与对比度较低的difference效果相似。 |
| `average` | `average(color1, color2)` | `color1`和`color2`: 均为颜色对象。 | 基于每个通道（RGB）计算两种颜色的平均值。 |
| `negation` | `negation(color1, color2)` | `color1`：充当减号的颜色对象。<br><br>`color2`：用作子结构的颜色对象。  | 对`difference`做相反的效果.结果是更明亮的颜色。注意：相反的效果并不意味着由加法操作产生的反转效果。 |

## 参考资料
- [Less中文网](https://lesscss.com.cn/)
