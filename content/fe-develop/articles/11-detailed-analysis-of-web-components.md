---
title: "Web Components详细解析"
description: "HTML提供了大量的元素给我们使用，这些是内置元素或者原生元素。同时HTML还允许我们创建经过自定义的标准HTML元素。Web Components，是一种与HTML相关联的技术，它允许开发者创建可重用的自定义元素，并如同普通的HTML一样使用它们。"
img: "/content-images/fe-develop/articles/11-detailed-analysis-of-web-components/cover.webp"
date: "2023-02-06 20:37"
update: 0
tags: ["HTML", "JavaScript"]
---

![cover.webp](/content-images/fe-develop/articles/11-detailed-analysis-of-web-components/cover.webp)

---
HTML提供了大量的元素给我们使用，这些是内置元素或者原生元素。同时HTML还允许我们创建经过自定义的标准HTML元素。**Web Components**，是一种与HTML相关联的技术，它允许开发者创建可重用的**自定义元素**，并如同普通的HTML一样使用它们。

到目前为止，Web Components的标准仍然在制定中。其中一些特性已经被很好地支持并集成到了现代HTML/DOM标准中，但是还有部分特性仍然处在草案阶段。

## Web Components组成部分
Web Components由三部分组成：
1. **Custom elements**：一组JavaScript API，允许我们定义自定义元素及其行为，然后可以根据需要在用户界面中使用。

2. **Shadow DOM**：一组JavaScript API，用于将封装的“shadow”DOM树附加到元素（与主文档DOM分开呈现）并控制相关功能。通过这种方式，可以将元素的特性保持为私有，因此可以编写脚本并设置样式，而无需担心与文档的其他部分发生冲突。

3. **HTML templates**：`<template>`和`<slot>`元素能够编写未显示在渲染页面中的标记模板。然后，这些模板可以多次重复使用，作为自定义元素结构的基础。

## 实现Web Components
1. 创建一个类，可以在其中使用类语法指定 Web 组件功能。
2. 使用`CustomElementRegistry.define()`方法注册新的自定义元素，向其传递要定义的元素名称、在其中指定其功能的类或函数，以及可选的继承自哪个元素。
3. 如果需要，可以使用`Element.attachShadow()`方法将Shadow DOM附加到自定义元素。使用常规DOM方法将子元素、事件侦听器等添加到Shadow DOM。
4. 如果需要，可以使用`<template>`和`<slot>`定义HTML模板。再次使用常规DOM方法来克隆模板并将其附加到Shadow DOM。
5. 在页面上的任何位置像使用任何常规HTML元素一样使用自定义元素。

### Custom elements
首先来看一下Custom elements，我们可以通过描述带有自己的方法、属性和事件等的**类**来创建自定义HTML元素。Custom elements有两种：

1. **Autonomous custom elements**（自主自定义元素） —— “全新的” 元素, 继承自HTMLElement抽象类.
2. **Customized built-in elements**（自定义内建元素） —— 继承内建的HTML元素，比如继承HTMLDivElement等。

这两种类型都可以通过创建一个带有几个特殊方法的类来完成。只需要添加几个方法就行了，并且这些方法都是可选的，这些方法就相当于自定义元素的生命周期函数：

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // 元素在这里创建
  }

  connectedCallback() {
    // 在元素被添加到文档之后，浏览器会调用这个方法
    // 如果一个元素被反复添加到文档／移除文档，那么这个方法会被多次调用
  }

  disconnectedCallback() {
    // 在元素从文档移除的时候，浏览器会调用这个方法
    // 如果一个元素被反复添加到文档／移除文档，那么这个方法会被多次调用
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // 当上面数组中的属性发生变化的时候，这个方法会被调用
  }

  adoptedCallback() {
    // 在元素被移动到新的文档的时候，这个方法会被调用
    // document.adoptNode 会用到, 但非常少见
  }
  
  static get observedAttributes() {
    return [/* 属性数组，这些属性的变化会被监视 */];
  }

  // 还可以添加更多的元素方法和属性
  ...
}
```

定义好之后，再使用`CustomElementRegistry.define(元素名, 功能类与函数, [继承于哪个元素])`注册元素。

Autonomous custom elements使用示例：

```html
<body>
  <script>
    class Counter extends HTMLElement {
      count = 0

      connectedCallback() {
        setInterval(() => {
          this.count++
          this.innerHTML = this.count //this.innerHTML的值每秒加一
        }, 1000)
      }
    }
		
    // 注册元素
    customElements.define('my-counter', Counter)
   //或者 customElements.define('my-counter', Counter, {extends: 'div'})
  </script>

  <!-- 使用元素 -->
  <my-counter></my-ounter>

</body>
```


上面示例中的`<my-counter>`是新的元素，没有相关的语义，搜索引擎也不知道他们的存在。但是这两点是很重要的，如果有需要，可以通过继承内建元素的类来扩展和定制它们。

Customized built-in elements使用示例：
```html
<body>
  <script>
   // class Counter extends HTMLElement { 改成↓
     class Counter extends HTMLDivElement {
      count = 0

      connectedCallback() {
        setInterval(() => {
          this.count++
          this.innerHTML = this.count //this.innerHTML的值每秒加一
        }, 1000)
      }
    }
		
    // 注册元素
    // customElements.define('my-counter', Counter) 改成↓
   customElements.define('my-counter', Counter, {extends: 'div'})
  </script>

  <!-- 
    在使用元素时，不是使用<my-counter>，
    而是使用一个普通的<div>，再使用全局属性is，
    并将is的值设置为自定义元素的名称：is='my-counter'
  -->
  <!-- <my-counter></my-ounter> 改成↓ --> 
  <div is='my-counter'></div>

</body>
```
#### 注意事项
- 如果在`customElements.define`之前的地方出现了自己设置的自定义元素，浏览器会将该元素当成未知元素，不会报错。可以通过CSS的`:not(:defined)`选择器对这样*未定义*的元素加上样式。直到`customElements.define`被调用，未定义的元素会升级为自定义元素，变成`:defined`。

   可以通过以下的方法获取更多的自定义元素的信息：
   
    - `customElements.get(name)` —— 返回指定custom element 名称的类。
    - `customElements.whenDefined(name)` – 返回一个promise，将会在这个具有给定`name`的 custom element变为已定义状态的时候resolve（不带值）。
    
- 元素里面的内容是在`connectedCallback`中渲染（创建）的。如果在`constructor`被调用的时候渲染内容，还为时过早。虽然这个元素实例已经被创建了，但还没有插入页面。在这个阶段，浏览器还没有处理／创建元素属性：调用`getAttribute`将会得到`null`。所以我们并不能在那里渲染元素。

 - Custom Elements的名称必须包含一个**短横线 -**。确保Custom element和内建HTML元素之间不会发生命名冲突。

 - 在HTML 解析器构建DOM的时候，会按照先后顺序处理元素，先处理父级元素再处理子元素。这对Custom elements产生了重要影响。

    例如，一个自定义元素想在`connectedCallback`内访问 `innerHTML`是什么都拿不到的。因为在这个阶段，子元素还不存在，DOM还没有完成构建。HTML解析器先连接custom element，然后再处理子元素，但是那时候子元素还并没有加载上。
   
   如果真的需要在`connectedCallback`内访问子元素，可以设置延迟时间为零的`setTimeout`或者在自定义元素身上使用元素属性。
   
### Shadow DOM
Shadow DOM API提供了一种将隐藏的分离DOM附加到元素的方法。Shadow DOM允许将隐藏的DOM树附加到常规DOM树中的元素 -- 这个Shadow DOM树以`#shadow-root`开始，可以在其中添加任何元素，方式与普通DOM相同。

我们平时使用的一些浏览器控件也是使用类似的方式实现的（例如`<input>`），浏览器在内部使用 DOM/CSS 来绘制它们。这个DOM结构一般来说对我们是隐藏的，但在控制台开启**show user agent shadow DOM**或者**显示用户代理 Shadow DOM**就可以看到：

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10b1ba33f4534cfd8a826e71dd84293b~tplv-k3u1fbpfcp-watermark.image?" alt="1674272579193.png" width="100%" />

`#shadow-root`中的内容就被称为*shadow DOM*。不能使用一般的JavaScript调用或者选择器来获取内建shadow DOM元素。因为它们不是常规的子元素，而是一个强大的封装手段。

Shadow DOM被非常明显地和主文档分开：
1. Shadow DOM元素对主文档的JavaScript选择器隐身。Shadow DOM中的元素可能与主文档中某些元素的id冲突。这些元素必须在Shadow tree中独一无二，也就是说有自己的`id`空间。

2.  Shadow DOM 有自己的样式。外部样式规则在shadow DOM中不产生作用。
> 注意：在`connectedCallback`中通过`innerHTML`等方式设置的元素不属于Shadow DOM。它们单纯就是元素的后代。

#### Shadow tree
一个DOM元素可以有以下两类DOM子树：

1. **Light tree**（光明树） —— 一个常规 DOM 子树，由HTML子元素组成。我们在之前章节看到的所有子树都是*光明的*。
2. **Shadow tree**（影子树） —— 一个隐藏的 DOM 子树，不在HTML中反映，无法被察觉。作用是隐藏组件内部结构和添加只在组件内有效的样式。

如果一个元素同时有以上两种子树，那么浏览器只渲染Shadow tree。但是我们同样可以设置两种树的组合。

还是那个`<my-counter>`，将它的内部DOM隐藏起来：

```html
<body>
  <script>
    class Counter extends HTMLElement {
      count = 0

      connectedCallback() {
        // ⭐this.attachShadow 给元素挂载一个 shadow DOM
        const shadow = this.attachShadow({mode: 'open'});
        setInterval(() => {
          this.count++
          shadow.innerHTML = this.count //this.innerHTML的值每秒加一
        }, 1000)
      }
    }
    
    // 注册元素
    customElements.define('my-counter', Counter)
  </script>
  
  <!-- 使用元素 -->
  <my-counter></my-counter>
</body>
```

此时在页面中一样正常显示，但是在控制台中发生了变化：
<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1eccfd81061413d905237b75d13af51~tplv-k3u1fbpfcp-watermark.image?" alt="1674289745430.png" width="100%" />

`mode`选项可以设定封装层级。他必须是以下两个值之一：

1. `open` -- Shadow root可以通过`elem.shadowRoot`访问。任何代码都可以访问`elem`的Shadow tree。

2. `closed` -- `elem.shadowRoot`永远是`null`。只能通过`attachShadow`返回的指针来访问Shadow DOM（并且可能隐藏在一个`class`中）。浏览器原生的Shadow tree是封闭的。没有任何方法可以访问它们。

`attachShadow`返回Shadow root，和任何元素一样：可以使用`innerHTML`或者DOM方法来扩展它。

具有有Shadow root的元素叫做*Shadow tree host*，可以通过Shadow root的`host`属性访问（当`{mode: "open"}`时）：

```js
console.log(elem.shadowRoot.host === elem) // true
```

#### 注意事项
1. 在每个元素中，只能创建一个Shadow root。
2. `elem.attachShadow({mode: …})`，`elem`必须是自定义元素或者是以下排列的其中一个元素：`<body>`、`<div>`、`<p>`、`<span>`、`<h1 - h6>`、`<blockquote>`以及其他HTML5新增的语义元素等（如`<main>`）。

### HTML templates
#### 内容模板元素 -- `<template>`
当我们必须在网页上重复使用相同的标记结构时，使用某种模板而不是反复重复相同的结构是有意义的。如今通过`<template>`元素，它变得容易得多。

内建的`<template>`元素用来存储HTML模板。浏览器会忽略它的内容（其内容可以是任何有效的HTML），仅检查语法的有效性，但是我们可以在JavaScript中访问和使用它来创建其他元素。

浏览器认为`<template>`的内容“不在文档中”：样式不会被应用，脚本也不会被执行， `<video autoplay>` 也不会运行等。直到我们将内容插入到文档时，内容才会变为活动状态（应用样式，运行脚本等）。

> 注意：如果在`<tr>`内放置类似`<div>`的元素等类似无效的 DOM 结构时，浏览器会对其进行“修复”，然后用`<table>`封闭`<tr>`。而`<template>`则完全保留我们储存的内容。
> 
> 也就是说`<template>`允许使用任何顶级HTML标签，即使没有适当包装元素的无意义的元素（如`<tr>`）。

全局属性在`<template>`元素身上是可用的，并且其具有一个`content`属性可看作`DocumentFragment` —— 一种特殊的DOM节点，将其克隆以在新组件中重复使用。我们可以将其视为普通的DOM节点，将其插入某个位置时，会被插入的则是`<template>`的子节点。

示例：

```html
<body>
  <button class="btn">点击</button>

  <template id="tmpl">
    <p>这是一个段落</p>
  </template>

  <!-- 初始 -->
  <div class="box"></div> 
  
  <!-- 模板插入结果 -->
  <div class="box">
    #shadow-root (open)
      <p>这是一个段落</p>
  </div>

  <script>
    const btn = document.querySelector('.btn')
    const box = document.querySelector('.box')
    const tmpl = document.querySelector('#tmpl')
    btn.onclick = function() {
      box.attachShadow({mode: 'open'});

      box.shadowRoot.append(tmpl.content.cloneNode(true));
    };
  </script>
</body>
```

#### Web 组件插槽元素 -- `<slot>`
`<slot>`元素是Web Components中的一个占位符，可以使用自己的标记填充该占位符，从而可以创建单独的DOM树并将它们一起显示。HTML内置的`<slot>`与Vue中的`<slot>`在写法和功能上差不多。

许多类型的组件，例如标签、菜单、照片库等等，可能需要实际的标签内容去渲染。尝试分析元素内容并动态复制重新排列DOM节点。这是可能的，但是如果我们要将元素移动到Shadow DOM，那么文档的CSS 样式不能在那里应用，因此文档的视觉样式可能会丢失。这时候`<slot>`元素就起作用了，由shadow DOM 提供`<slot>`, light DOM 进行填充。

HTML内置的`<slot>`类型有两种:**具名插槽**与**默认插槽**.

##### 具名插槽
全局属性在`<slot>`元素身上也是可用的，并且其`name`属性比较特殊，具有`name`属性的`<slot>`元素被称为**具名插槽**。

具名插槽示例：

```html
<body>
  <script>
    class Layout extends HTMLElement {
      connectedCallback() {
        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
          <div>
            <slot name="header"></slot>
          </div>
          <div>
            <slot name="cotent"></slot>
          </div>
          <div>
            <slot name="footer"></slot>
          </div>
        `
      }
    }

    customElements.define('my-layout', Layout)
  </script>

  <my-layout>
    <span slot="header">这是头部</span>
    <span slot="cotent">这是内容</span>
    <span slot="footer">这是底部</span>
  </my-layout>
</body>
```

在 Shadow DOM 中，`<slot>`元素有一个特殊的`name`属性，用来给各个插槽分配唯一的ID，以确定每一处要渲染的内容。它从Light DOM中获取元素并且渲染到Shadow DOM中的对应插槽中。最后被渲染成一个能被填充数据的通用组件。

为了渲染Shadow DOM 中的每一个`<slot name="...">`元素，浏览器在Light DOM中寻找相同名字的 `slot="xxx"`。这些元素在插槽内被渲染，结果被叫做扁平化 DOM，但是扁平化 DOM仅仅被创建用来渲染和事件处理，是“虚拟”的。虽然是渲染出来了，但**文档中的节点事实上并没有到处移动**！因此，扁平化 DOM是通过插入插槽从Shadow DOM派生出来的。浏览器渲染它并且用于样式继承、事件传播。

在使用时，如果Light DOM不指定`slot='xxx'`的话，则会被插入到默认插槽（第一个不具有`name`属性的`<slot>`）中。

###### 注意事项
- `slot="..."`属性仅对自定义元素的直接子代有效。将其用于嵌套元素它将被忽略。

    ```html
    <user-card>
      <span slot="username">John Smith</span>
      <div>
        <!-- 整个<div>将会被忽略 -->
        <span slot="birthday">01.01.2001</span>
      </div>
    </user-card>
    ```
-  如果在Light DOM里有多个相同插槽名的元素，那么它们会被一个接一个地添加到对应插槽中。

##### 后备内容
当外部没有提供任何内容的情况下，可以为插槽指定默认内容。将内容写在`<slot>`标签当中作为默认内容:

```js
class Layout extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});

    // 当外部没有内容传递给name="cotent"的<slot>时,将显示 "后备内容"
    this.shadowRoot.innerHTML = `
      <div>
        <slot name="header"></slot>
      </div>
      <div>
        <slot name="cotent">后备内容</slot>
      </div>
      <div>
        <slot name="footer"></slot>
      </div>
    `
  }
}
```

##### 更新插槽
当我们外部代码想动态添加/移除浏览器将监视插槽并更新渲染.由于不复制Light DOM节点，而是仅在插槽中进行渲染，所以内部的变化是立即可见的。因此我们无需执行任何操作即可更新渲染。但是如果组件想知道插槽的更改，那么可以用`slotchange`事件。

##### 插槽API
在JavaScript中,可以使用以下的方法访问插槽：
- `slot.assignedNodes/Elements()` – 返回插槽内的 节点/元素。
- `node.assignedSlot` – 相反的方法，返回一个节点的插槽。

## 给Shadow DOM添加样式
主文档中的样式一般不会影响到Shadow tree中的元素，如果需要为Shadow tree中的元素添加样式，有三种方式：
- 在Shadow DOM中使用`<style>`.
- 在Shadow DOM中使用`<link rel="stylesheet" href="…">`。样式表由HTTP缓存，不会为使用同一模板的多个组件重新下载样式表。这种被称为局部样式
- 在Shadow tree中的部件元素上使用`part`属性，就可以在CSS中使用`::part`为元素选择Shadow tree中的特定元素并设置其样式。`part`属性属性类似于`class`属性，其值为元素的部件名称的空格分隔列表。
  
  示例：
  ```html
  <head>
    <style>
      my-counter::part(countspan) {
        color: lightblue;
      }
    </style>
  </head>
  <body>
    <script>
      class Counter extends HTMLElement {
        count = 0

        connectedCallback() {
          const shadow = this.attachShadow({mode: 'open'});
          setInterval(() => {
            this.count++
            shadow.innerHTML = `
              <span part='countspan'>${this.count}</span>
            `
          }, 1000)
        }
      }
    
      // 注册元素
      customElements.define('my-counter', Counter)
    </script>
  
    <!-- 使用元素 -->
    <my-counter></my-counter> <!-- my-counter中的文本呈现浅蓝色。-->
  </body>
  ```
  但是`part`属性使元素仅在单个深度级别上可见。当Shadow tree嵌套时，部件将仅对Shadow tree的父级可见，而对其祖先不可见。进一步向下就要使用`exportparts`导出部件。`exportparts`允许我们**选择嵌套阴影树中存在的元素，并通过导出它们的部件名称来设置它们的样式**。来看一下规范中的例子（经过补全，暂时看不懂的话下文有解释）：
  ```html
  <head>
    <style>
      c-e::part(textspan) { color: red; }
    </style>
  </head>
  <body>
    <template id="c-e-outer-template">
      <c-e-inner exportparts="innerspan: textspan"></c-e-inner>
    </template>

    <template id="c-e-inner-template">
      <span part="innerspan">
        This text will be red because the containing shadow
        host forwards innerspan to the document as "textspan"
        and the document style matches it.
      </span>
      <span part="textspan">
        This text will not be red because textspan in the document style
        cannot match against the part inside the inner custom element
        if it is not forwarded.
      </span>
    </template>

    <c-e id="ce"></c-e>

    <script>
      let ceOuterTmp = document.querySelector('#c-e-outer-template')
      let ceInnerTmp = document.querySelector('#c-e-inner-template')
    
      class CeInner extends HTMLElement {
        connectedCallback() {
          this.attachShadow({mode: 'open'});

          this.shadowRoot.append(ceInnerTmp.content.cloneNode(true));
        }
      }
      customElements.define('c-e-inner', CeInner)

      class CE extends HTMLElement {
        connectedCallback() {
          ce.attachShadow({mode: 'open'});

          ce.shadowRoot.append(ceOuterTmp.content.cloneNode(true));
        }
      }
      customElements.define('c-e', CE)
    </script>
  </body>
  ```
  结果如下：
  ![1682149455885.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/942acdb765364bcfae0c5b576b1a894d~tplv-k3u1fbpfcp-watermark.image?)
  
  `exportparts`属性解析为以逗号分隔的部件映射列表，规范中的描述的部件映射如下：
  
  ![1682151502664.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1fd0a618d054903830feb0e8e39f411~tplv-k3u1fbpfcp-watermark.image?)
  - 先看第一条，它的理解方式就在示例中`c-e-inner-template`的那两个`<span>`的文本中：
    - `innerspan`的文本翻译过来是：该文本将是红色的，因为包含阴影的宿主将`innerspan`作为`textspan`转发给文档，并且文档样式与之匹配。
    - `textspan`的文本翻译过来是：该文本不会是红色的，因为如果没有转发，文档样式中的`textspan`将无法与内部自定义元素中的部分匹配。
  
    这样应该比较好理解了吧，第一段话就不过多说明，而`textspan`的文本不是红色的原因是在`exportparts`的值列表中出现`textspan`。
  
  - 然后是第二条，我对`ident`的理解是，`ident`指的是在Shadow tree中用`part`指定的部件名称。在`exportparts`的值列表中，可以直接写`part`部件名称，不用再将其作为xxx转发给文档。

局部样式可以影响到Shadow host（宿主）、Shadow tree以及插槽元素本身（但不能选择它们的子元素）。通过CSS的`:host`系列伪类影响Shadow host；通过`::slotted(selector)`选择插槽元素本身。

文档样式可以影响Shadow host以及插槽元素及其内容，因为它们都位于外部文档中。

当文档样式与局部样式冲突时，通常文档样式具有更高优先级，除非属性被标记为`!important`，那么局部样式优先。

另外，**自定义CSS属性存在于所有层次，包括Light DOM和ShadowDOM**。可以在组件外部定义好自定义CSS属性，在组件内部通过`var()`函数使用自定义CSS属性；组件的开发者也可以发布内部的自定义CSS属性。

## Shadow DOM和事件
浏览器在处理Shadow DOM内部的事件时，会**重新定位事件**（也叫**重定向事件**）。当事件在组件外部捕获时，Shadow DOM中发生的事件将会以宿主元素作为目标。内部事件处理程序能获取了正确的目标。而文档事件处理程序以Shadow host作为目标。

> 注意：如果事件发生在slotted元素上，实际存在于Light DOM上，不会发生重定向。

##### 事件冒泡
对于事件冒泡，使用扁平DOM（flattened DOM）。例如我们有一个`<slot>`元素，并且事件发生在它的内部某个地方，那么它就会冒泡到`<slot>`并继续向上。通过`event.composedPath()`可以获得原始事件目标的完整路径以及所有Shadow元素（如果Shadow tree是用`{mode: 'closed'}`创建的，那么`event.composedPath()`就会从Shadow host开始往上）。

另外，大多数事件能成功冒泡到Shadow DOM边界。很少有事件不能冒泡到Shadow DOM边界。如果`composed`事件对象属性是`true`，那么事件就能穿过边界。否则它仅能在Shadow DOM内部捕获。

一些`composed: false`的的事件：
-  `mouseenter`，`mouseleave`（它们根本不会冒泡），
-  `load`，`unload`，`abort`，`error`，
-  `select`，
-  `slotchange`。

对于自定义事件而言，如果要发送一个自定义事件，那么应该显式地设置`composed: true`。

## 参考资料
- [Web Components](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#web_components)
- [Web Components](https://zh.javascript.info/web-components)
