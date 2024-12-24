---
title: "HTML详解 -- 交互内容"
description: "高亮（Highlight）是一种改变文本外观以突出显示特定内容的技术，有助于提高文本的可读性和信息传达效果。通常用于强调或突出显示文本中的范围内容，帮助读者快速识别重要内容。高亮通常通过改变文本的颜色、背景色或字体样式（如加粗或斜体）来实现。比如在复制文本内容时，选择的文本默认会出现蓝色背景跟字体变白，这就是一种高亮效果。"
img: "~/images/jpg-png-webp/articles/cover.webp"
date: "2023-9-26"
update: []
tags: ["HTML", "JavaScript"]
---

---
HTML提供了一系列有助于创建交互式用户界面对象的元素。称之为**交互内容**。根据MDN的归类，这一部分只有3个元素：`<dialog>`、`<details>`和`<summary>`。

## 对话框元素 -- `<dialog>`
`<dialog>`元素表示**对话框**。对话框主要是与用户进行交互，收集信息或者执行某些操作

在各种组件库中都可以看到dialog对话框的信息页，`<dialog>`就类似于组件库中的dialog对话框。不过可能`<dialog>`是HTML5新增的元素，兼容性没那么好，组件库一般都是用`<div role='dialog'>`实现的。

![test.webp](/images/jpg-png-webp/articles/test.webp)

### 属性
`<dialog>`身上除了全局属性外还有一个`open`属性，值为`true`时，显示`<dialog>`并可以与之交互。如果未设置`open`属性或值为`false`时，则不应向用户显示对话框。

需要注意的是：`open`属性和通过Javascript`HTMLDialogElement.show()`方法打开的`<dialog>`是非模态的；而通过Javascript`HTMLDialogElement.showModal()`方法打开的是模态对话框。最好是通过Javascript的方式来呈现对话框。

这里简单说明一下什么是**模态对话框**和**非模态对话框**：
- **模态对话框**：简单的理解就是当用户打开了对话框之后，不能操作对话框以外的应用程序，想要操作对话框外的应用程序，只必须先通过相应操作将对话框关闭。

- **非模态对话框**：与**模态对话框**相反，用户打开了对话框之后，依然可以操作对话框以外的应用程序。不过通常用户操作对话框以外的应用程序时，对话框会自动关闭或销毁这类对话框。

另外，不要在`<dialog>`元素上使用全局属性`tabindex`。点击 tab 键按顺序让元素获得焦点时，如果对话框未显示，会自动跳过`<dialog>`；如果对话框已经显示，点击 tab 键会导致焦点不能交给的会话框外的可聚焦元素。

最好是在`<dialog>`的后代元素（比如输入框、按钮等）上设置全局属性`autofocus`，让用户在打开对话框时就可以立即与之交互，或者也可以在`<dialog>`元素本身上设置。

| 标题 | 标题 |
| --- | --- |
| 单元格 | 单元格 |
| 单元格 | 单元格 |
| 单元格 | 单元格 |

[1123](https://www.baidu.com)

### 使用说明
实现`<dialog>`时，确保提供给用户关闭对话框的功能。例如在右上角添加一个关闭图标、提供一个关闭按钮或者在操作完成之后自动关闭等方式关闭对话框。

另外，还需要考虑可以通过键盘按键关闭对话框的功能，通常可以通过 Esc 键关闭**模态对话框**。默认情况下，`showModal()`方法调用的`<dialog>`也允许通过 Esc 键进行关闭。如果打开了多个模式对话框，Esc 键应仅关闭最后显示的对话框。而**非模态对话框**一般不需要 Esc 键进行关闭。

如果在`<dialog>`元素中存在具有`method="dialog"`的`<form>`元素，或具有`formmethod=“dialog”`的`<button>`元素，则它们可以关闭`<dialog>`。在这种情况下，表单控件的状态会被保存，而不是提交。

当使用`HTMLDialogElement.showModal()`显示对话框时，可以使用CSS`::backdrop`伪元素来设置`<dialog>`元素遮罩层的样式。比如将遮罩层的背景颜色调暗。

使用示例：

```html
<head>
  <style>
    .dag::backdrop {
      background-color: rgba(0, 0, 0, .5);
    }
  </style>
</head>

<body>
  <button class="open">显示对话框</button>

  <dialog class="dag">
    <p>这是一个对话框</p>
    <form method="dialog">
      <button>确定</button>
    </form>
  </dialog>

  <script>
    let dag = document.querySelector('.dag')
    let open = document.querySelector('.open')
    open.addEventListener('click', () => {
      dag.showModal()
    })
  </script>
</body>
```

## 详情披露元素 -- `<details>`与详情披露摘要元素 -- `<summary>`
`＜details＞`元素创建一个披露小部件，其中只有当小部件切换到“打开”状态时，内容才可见。必须使用`<summary>`元素提供摘要或标签。

`<summary>`元素指定其父元素`<details>`的信息展示框的摘要、标题或图例。单击`<summary>`元素可切换父`<details>`元素打开和关闭的状态。

`<details>`身上也有个`open`属性，此布尔属性指示`＜details＞`元素的内容当前是否可见。当此属性存在时显示详细内容，当此属性不存在时隐藏详细信息。默认情况下详细内容不可见。

### 使用说明
#### `<details>`
`<details>`小部件可以处于关闭和打开两种状态之一。默认关闭状态仅显示一个三角形图标和`<summary>`的内容。

当用户点击小部件或聚焦后按下空格键时，它就会“旋转”打开/关闭，显示/隐藏其内容。可以通过设置/删除其`open`属性以编程方式打开和关闭小部件。但目前还没有内置的方法实现打开和关闭之间的过渡或动画。

#### `<summary>`
`<summary>`元素只能用作`<details>`元素的第一个子元素。如果`<details>`元素的第一个子元素不是`<summary>`元素，则用户代理将使用默认字符串（通常为`details`）作为公开框的标签。

`<summary>`元素的内容可以是段落中可以使用的任何标题内容、纯文本或HTML。当用户点击`<summary>`时，父`<details>`元素被切换为打开或关闭状态，如果`<details>`元素绑定了`toggle`事件，那么也会触发该事件。

`<summary>`元素的默认样式包括`display:list-item`，该图标通常为三角形。可以在`<summary>`元素上设置`liststyle-type`更改覆盖图标。还可以在`<summary>`元素上设置`display: block`删除三角形图标。

对于基于Webkit的浏览器，例如Safari，可以通过非标准的CSS伪元素`::-Webkit details-marker`标记来控制图标显示。要删除显示三角形，请使用`summary::-webkit-details-marker { display: none }`.

### Javascript相关
`<details>`元素还支持`toggle`事件来检测小组件何时更改状态，每当`<details>`元素的状态在打开和关闭之间发生变化时，该事件会在状态发生变化后发送到`<details>`元素，但如果在浏览器可以发送事件之前状态发生多次变化（比如快速多次点击），则会合并事件，从而只发送一个事件。

### 使用示例
```html
<body>
  <details class="details">
    <summary>概述</summary>
    <p>这是一个详情信息展示框</p>
  </details>

  <script>
    let details = document.querySelector('.details')
    let status = '关闭'
    details.addEventListener('toggle', () => {
      status = status == '关闭' ? '打开' : '关闭'
      console.log(`＜details＞小部件已${status}`)
    })
  </script>
</body>
```

## 参考资料
- [交互元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)
- [交互元素规范](https://html.spec.whatwg.org/multipage/interactive-elements.html)