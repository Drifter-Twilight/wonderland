---
title: "HTML -- 表单内容"
description: "HTML 提供了许多可一起使用的元素，这些元素能用来创建一个用户可以填写并提交到网站或应用程序的表单。"
img: "/content-images/fe-develop/articles/09-HTML--form-content/cover.webp"
date: "2023-02-06 20:37"
update: 0
tags: ["HTML"]
---

![cover.webp](/content-images/fe-develop/articles/09-HTML--form-content/cover.webp)

---
表单是与用户交互的非常强大的工具，最常见的是它们用于从用户那里收集数据，或允许他们控制用户界面。表单允许用户输入数据，这些数据通常发送到Web服务器进行处理和存储。表单的HTML由一个或多个表单控件（有时称为小部件）以及一些有助于构建整体表单的其他元素组成，它们通常称为HTML表单。

## 表单元素 -- `<form>`
`＜form＞`元素表示包含用于提交信息的交互式控件的文档部分。所有表单都以`<form>`元素开头。`＜form＞`还是一个容器元素，包含如`<section>`或`<footer>`等表单控件元素，但专门用于包含表单。

### 属性
| 属性名 | 值 | 简介 |
| --- | --- | --- |
| accept-charset | 服务器接受的空格分隔字符编码。[参考](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Encoding) | 服务器接受的字符编码。浏览器按列出顺序使用它们。 |
| autocapitalize | `sentences`（默认）、`words`、`characters`或`none` | iOS Safari使用的一种非标准属性，用于控制文本表单元素应如何自动大写。表单控件元素上的`autocapitalize`属性会覆盖`<form>`上的`autocomplete`属性。 |
| autocomplete | `of`f或`on` | 指示默认情况下输入元素的值是否可以由浏览器自动完成。表单控件元素上的`autocomplete`属性会覆盖`<form>`上的`autocomplete`属性。 |
| name | 非空字符串 | 表单的名称。并且必须在它所在的表单集合中的`<form>`中是唯一的（如果有）。 |
| rel | 批注：`external`、`nofollow`、`openernoopener`和`noreferrer`。<br>链接类型：`help`、`prev`、`next`、`search`和`license` | 控制批注以及表单创建的链接类型。 |
|action  | string | 处理表单提交的 URL。 |
| method | `get`（默认）、`post`或`dialog` | 用于提交表单的 HTTP 方法。 |
| enctype | `application/x-www-form-urlencoded`（默认）、`multipart/form-data`或者`text/plain` | 如果`method`属性的值为`post`，则`enctype`是表单提交的MIME类型。 |
| novalidate | boolean | 指示表单在提交时是否应进行验证。 |
| target | `_self`（默认）、`_blank`、`_parent`或`_top` | 指示提交表单后显示响应的位置。 |

- `<form>`的所有属性都是可选的，但标准做法是始终至少设置`action`和`method`属性。

- 默认情况下，浏览器会记住用户通过网站上的`<input>`字段提交的信息。这使浏览器能够提供自动完成（即为用户已开始键入的字段建议可能的补全）或自动填充（即在加载时预填充某些字段）。`可以使用autocomplete='off'`进行关闭。

- 对于`action`属性，此值可由`<button>`、`<input type="submit">`或`<input type="image">`元素上的`formaction`属性覆盖。设置方法`method="dialog"`时，将忽略此属性。

- 对于`enctype`属性，该值可以被`＜button＞`、`＜input type=“submit”＞`或`＜input type=“image”＞`元素上的`formencype`属性覆盖。

- 对于`method`属性，此值被`＜button＞`、`＜input type=“submit”＞`或`＜input type=“image”＞`元素上的`formmethod`属性覆盖。

## 字段集元素 -- `<fieldset>`与字段集图例元素 -- `<legend>`
`<fieldset>`HTML元素用于对web表单中的多个控件和标签（`<label>`）进行分组。

`<legend>`元素表示其父`<fieldset>`元素内容的标题。

`<fieldset>`元素将一个HTML表单的一部分组成一组，内置了一个`<legend>`元素作为`<fieldset>`的标题。这个元素有几个属性，最值得注意的是`form`属性，其可以包含同一页面的`<form>`元素的 `id`，以使`<fieldset>`成为这个`<form>`的一部分，即使`<fieldset>`不在其内。还有`disabled` 属性，可将`<fieldset>`及其所有内容设置为不可用。

`<fieldset>`默认呈现为有一个`2px groove`的边框，且有一点内边距。

### 属性

| 属性名 | 简介 |
| --- | --- |
| form | 此属性接受`<form>`元素的id属性的值，希望`<fieldset>`是其中的一部分，即使它不在表单中。 |
| name | 与组关联的名称。 |
| disabled | 如果值为`true`，那么所有属于`<fieldset>`后代的表单控件都会被禁用，这意味着它们不可编辑，不会与`<form>`一起提交。他们不会收到任何浏览事件，比如鼠标点击或与焦点相关的事件。默认情况下，浏览器显示这些控件为灰色。 |

- 在使用`form`属性时需注意：如果想要将`<fieldset>`内的`<input>`元素与表单相关联，你需要直接在这些元素上使用`form`属性。可以通过JavaScript使用`HTMLFormElement.elements`检查哪些元素与表单相关联。

- 如果使用了`disabled`属性，其中的`<legend>`元素中的表单控件元素不会被禁用。

### CSS注意
默认情况下，`<fieldset>`的`display`值为`block`，并且它建立了一个块格式化上下文。如果`<fieldset>`的`display`设置为`inline`，它将表现为`inline-block`。

如果存在`<legend>`，则将其放置在`block-start`边界上。`<legend>`收缩换行，并建立格式上下文。`display`值被阻止。

一个匿名的框会包围`<fieldset>`的内容，这个框继承了`<fieldset>`的一些属性。如果将 `<fieldset>`的样式设置为`display: grid`或`display: inline-grid`，那么这个匿名框也会是栅格上下文。如果将`<fieldset>`的样式设置为`display: flex`或`display: inline-flex`，则匿名框也会是弹性盒上下文。除上述情况之外，匿名框默认建立块级格式化上下文。

### 使用示例
```html
<form>
  <fieldset>
    <legend>选择您的性别</legend>

    <input type="radio" id="man" name="gender" value="man">
    <label for="man">男</label><br>

    <input type="radio" id="woman" name="gender" value="woman">
    <label for="woman">女</label><br>
  </fieldset>
</form>
```

## 按钮元素 -- `<button>`
`<button>`元素表示一个可点击的按钮。是由用户使用鼠标、键盘、手指、语音命令或其他辅助技术激活的交互式元素。激活后，它会执行某些操作（例如提交表单）。

### 属性

| 属性名 | 值 | 简介 |
| --- | --- | --- |
| autofocus | boolean | 指定在页面加载时按钮应具有输入焦点。 |
| autocomplete | `off`或`on` | 该属性是非标准的，并且只有Firefox允许。不像其它浏览器，Firefox默认在页面加载时持续禁用`<button>`的动态状态，将该值设置为`off`是关闭该特性。 |
| disabled | boolean | 值为`true`时可防止用户与按钮交互：无法按下或聚焦按钮。 |
| form | boolean | 要与按钮关联的`<form>`元素（其窗体所有者）。此属性的值必须是同一文档中`<form>`的`id`。如果未设置此属性，则`<button>`与其祖先`<form>`元素（如果有）相关联。 |
| formaction | string | 处理按钮提交的信息的URL。 |
| formenctype | `application/x-www-form-urlencoded`、`multipart/form-data`或`text/plain` | 如果按钮是提交按钮（它位于`<form>`内部/关联，并且没有`type="button"`），则指定如何对提交的表单数据进行编码。 |
| formmethod | `get`或`pos`t | 如果按钮是提交按钮（它位于`<form>`内部或与窗体相关联，并且没有`type="button"`），则此属性指定用于提交表单的HTTP方法。 |
| formnovalidate | boolean | 如果按钮是提交按钮，则此布尔属性指定在提交表单时不对其进行验证。 |
| formtarget | `_self`（默认）、`_blank`、`_parent`或`_top` | 指定在页面加载时按钮应具有输入焦点。 |
| type | `submit`、`reset`或`button` | 按钮的类型。 |
| value | string | 按钮的初始值。它定义的值与表单数据的提交按钮相关联。当表单中的数据被提交时，这个值便以参数的形式被递送至服务器。 |

### 使用注意
- 具有属性表单操作集但没有关联`formaction`的提交按钮不执行任何操作。您必须设置表单所有者，将其包装在`<form>`中，或者将属性form设置为表单的`id`。

- `<button>`元素比`<input>`元素更容易设置样式。您可以添加内部HTML内容，并使用`::after`和`::before`伪元素进行复杂的渲染。

- 如果按钮不是用于向服务器提交数据，请确保这些按钮的`type`属性设置成`button`。否则它们被按下后将会向服务器发送数据并加载（可能并不存在的）响应内容，因而可能会破坏当前文档的状态。

- Firefox 出于使用方便的目的，会在获得焦点的按钮上添加一个细小的虚线框。这个边框由浏览器内部的样式表中的 CSS 定义，但如果有需要的话，可以用`button::-moz-focus-inner`重写这个样式。

### 可访问性问题
只显示要表示的图标的按钮没有可访问的名称。可访问名称为辅助技术(例如屏幕阅读器)在解析文档和生成可访问性树时提供信息。然后辅助技术使用可访问性树来导航和操作页面内容。

若要为图标按钮指定一个可访问的名称，请在`<button>`元素中添加文本，以简明扼要地描述按钮的功能。

如果您想在视觉上隐藏按钮的文本，一种可行的方法是使用CSS属性的组合从屏幕上可视地删除它，但通过辅助技术保持它可解析：

```css

.screen-reader {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

然而，值得注意的是，保持按钮文本在视觉上明显可以帮助那些可能不熟悉图标的含义或不理解按钮用途的人。这尤其适用于那些技术不成熟的人，或者那些对按钮使用的图标有不同文化解释的人。

## 标签元素 -- `<label>`
`<label>`元素表示用户界面中项目的标题。

### 使用说明
将`<label>`与表单控件（如`<input>`或`<textarea>`相关联具有一些主要优点：

标签文本不仅在视觉上与其相应的文本输入相关联；它也以编程方式与之关联。这意味着，例如，当用户专注于表单输入时，屏幕阅读器将读出标签，从而使辅助技术用户更容易理解应输入哪些数据。
当用户单击或触摸/点击标签时，浏览器会将焦点传递给其关联的输入（也会为输入引发生成的事件）。用于聚焦输入的增加的命中区域为任何试图激活它的人提供了优势 - 包括那些使用触摸屏设备的人。

`<label>`要标记的表单控件称为标签元素的**标记控件**。多个标签可以与同一表单控件关联。

可以与`<label>`元素关联的元素包括`<button>`、`<input>`（`type="hidden"`除外）、`<meter>`、`<output>`、`<progress>`、`<select>`和`<textarea>`。

### 属性
`<label>`除了全局属性外，只有一个`for`属性，其必须是与`<label>`元素位于同一文档中的可标记表单相关元素的单个`id`。文档中具有与`for`属性值匹配的`id`属性的第一个元素是此`<label>`元素的标记控件。

可以将多个`<label>`元素的`for`属性设置为相同的值；这样做会导致关联的表单控件具有多个标签。简而言之，就是一个表单控件（例如`<input>`）可以关联多个`<label>`；但是一个`<label>`只能关联一个表单控件。

若要以编程方式设置和查看`for`属性，请使用`HTMLLabelElement.htmlFor`。

### 可访问性问题
- 不要在`<label>`内放置锚点或按钮等交互式元素。这样做会使用户难以激活与`<label>`关联的表单输入。

- 将标题元素（如`<h1>`）放置在`<label>`中会干扰多种辅助技术，因为标题通常用作导航辅助工具。如果需要直观地调整标签的文本，请改用应用于`<label>`元素的CSS类。。

如果表单或表单的一部分需要标题，请使用放置在`<fieldset>`的`<legend>`元素。

- 具有`type="button"`声明和有效`value`属性的`<input>`元素不需要与之关联的标签。这样做实际上可能会干扰辅助技术解析按钮输入的方式。`<button>`元素也是如此。

## 表单输入元素 -- `<input>`
`<input>`元素用于为基于web的表单创建交互式控件，以便接受来自用户的数据；根据设备和用户代理的不同，可以使用各种类型的输入数据和控件小部件。由于输入类型和属性的大量组合，元素是所有HTML中最强大和最复杂的元素之一。

### input类型

| 类型 | 简介 |
| --- | --- |
| text | 默认值。单行文本字段。换行符会自动从输入值中删除。 |
| button | 没有默认行为的按钮。如果`value`属性不为空，则`value`的值为按钮的文本，否则为空。 |
| radio | 单选按钮，允许从具有相同`name`值的多个选项中选择单个值。 |
| checkbox | 允许选择/取消选择单个值的复选框。 |
| color | 用于指定颜色的控件。处于激活状态时打开颜色选择器。 |
| date | 用于输入日期（年、月和日，不带时间）的控件。在支持的浏览器中处于活动状态时，打开年、月、日的日期选取器或数字轮。 |
| datetime-local | 用于输入日期和时间的控件，不带时区。处于活动状态时，打开日期和时间组件的日期选取器或数字轮。 |
| month | 用于输入月份和年份的控件，不带时区。 |
| week | 用于输入日期的控件，该日期由周-年数和不带时区的周数组成。 |
| time | 用于输入不带时区的时间值的控件。 |
| email | 用于编辑电子邮件地址的字段。看起来像text输入，但在支持具有动态键盘的浏览器和设备中具有验证参数和相关键盘。 |
| file | 允许用户选择文件的控件。可以使用`accept`属性定义控件可以选择的文件类型。 |
| hidden | 不显示的控件，其值仍会提交到服务器。 |
| image | 图形提交按钮。显示`src`属性定义的图像。如果图像异常，则显示`alt`属性。 |
| number | 用于输入数字的控件。显示微调框并添加默认验证。在某些具有动态键盘的设备中显示数字键盘。 |
| password | 值被遮盖的单行文本字段。如果站点不安全，将提醒用户。 |
| range | 用于输入数字的控件，其确切值并不重要。默认显示为中间值的范围小部件。与`min`和`max`结合使用来定义可接受值的范围。 |
| reset | 将窗体内容重置为默认值的按钮。不推荐。 |
| search | 用于输入搜索字符串的单行文本字段。换行符会自动从输入值中删除。在支持浏览器中可能包含可用于清除字段的删除图标。在某些具有动态键盘的设备上显示搜索图标而不是回车键。 |
| submit | 提交表单的按钮。 |
| tel | 用于输入电话号码的控件。在某些具有动态键盘的设备中显示电话键盘。 |
| url | 用于输入 URL 的字段。 |

### 属性
| 属性 | 支持的类型 | 值 | 描述 |
| --- | --- | --- | --- |
| accept | file | 文件的MIME类型 | 文件上传控件中预期文件类型的提示。 |
| alt | image | string | 图像类型的`alt`属性。辅助功能必需。 |
| autocomplete | `on`或`off` | 除checkbox、radio按钮和按钮之外的所有内容 | 表单自动填充功能的提示。 |
| autofocus | 除了hidden外的所有 | booelan | 指定在页面加载时按钮应具有输入焦点。 |
| capture | file | `user`或`environment` | 文件上传控件中的媒体捕获输入法。 |
| checked | checkbox，radio | booelan | 是否选中命令或控件。 |
| dirname | search、text | 包含两个值：表单控件将使用两个名称/值对提交：第一个是namevalue，第二个是 dirname 的值作为名称，其中 ltr 或 rtl 的值由浏览器设置。 | 表单提交中用于发送元素方向的表单字段的名称。 |
| disabled | 全部 | booelan | 表单控件是否禁用。 |
| form | 全部 | string | 将控件与`<form>`元素关联 |
| formaction | image，submit | string | 用于表单提交的网址。 |
| formenctype | image，submit | `application/x-www-form-urlencoded`、`multipart/form-data`或`text/plain` | 用于表单提交的表单数据集编码类型。 |
| formmethod | image，submit | `get`、`post`或`dialog` | 用于表单提交的HTTP方法。 |
| formnovalidate | image，submit | boolean | 绕过表单提交表单控件验证。 |
| formtarget | image，submit | `_self`、`_blank`、`_parent`或`_top` |  表单提交的浏览上下文。 |
| height | image | number/string | 与`<img>`的高度属性相同。 |
| list | 除了hidden、password、checkbox、radio按钮和按钮外的所有 | string | 自动完成选项的`<datalist>`的`id`属性的值。 |
| max | date、month、week、time、datetime-local、number、range和datetime | number | 最大值 |
| maxlength | text， search， url， tel， email和password | number | `value`的最大长度（字符数） |
| min | date、month、week、time、datetime-local、number、range和datetime | number | 最小值 |
| minlength | text， search， url， tel， email和password | number | `value`的最小长度（字符数） |
| multiple | email、file | boolean | 是否允许多个值。 |
| name | 全部 | string | 窗体控件的名称。与表单一起作为名称/值对的一部分提交。 |
| pattern | text，search，url，tel，email，password和number |有效的JavaScript正则表达式 | `value`必须匹配的模式才有效。|
| placeholder | text，search，url，tel，email，password和number | string | 表单控件中未设置`value`时显示的文本。 |
| readonly | 除hieen、range、color、checkbox、radio按钮和按钮外的所有 | boolean |  `value`是否可编辑。 |
| required | 除hieen、range、color和按钮外的所有 | boolean | 值为`true`时`value`是必需的，或者必须检查表单才能提交。 |
| size | text，search，url，tel，email和password | 对于password和text，它是默认值为`20` 的字符数（或 em 单位），对于其他字符，它是像素（或 px 单位）。 | 控件的大小。 |
| src | image | string | 图像资源的地址。 |
| step | date、month、week、time、datetime-local、number、range和datetime | number | 有效的增量值。 |
| type | 全部 | 查看上表 | 表单控件的类型 |
| value | 除image外的所有 | string | 控件的初始值。 |
| width | image | number/string | 与`<img>`的`width`属性相同> |

- **具有`autofocus`属性的元素可能会在触发`DOMContentLoaded`事件之前获得焦点。**
  
  文档中最多只能有一个元素具有`autofocus`属性。如果放在多个元素上，则具有该属性的第一个元素将获得焦点。

- 与其他输入控件不同，复选框和单选按钮值仅在当前`checked`时包含在提交的数据中。如果是，则提交已检查控件的名称和值。

- `disabled`为`true`的`<input>`不会收到click事件，禁用的输入不会随表单一起提交。

  尽管规范没有要求，但默认情况下，Firefox 将在页面加载期间保持`<input>`的动态禁用状态。使用autocomplete属性来控制此功能。
  
- 在使用`form`属性时注意：一个输入只能与一个表单相关联。

- 在使用`max`和`min`时，`min`此值必须小于或等于`max`属性的值。如果`min`属性存在但未指定或无效，则不应用`min`值。如果`min`属性有效，并且非空值小于`min`属性允许的最小值，则约束验证将阻止表单提交。

  有一种特殊情况：如果数据类型是周期性的（例如日期或时间），`max`的值可能小于`min`的值，这表明范围可能会环绕；
  
- 在使用`maxlength`和`minlength`时需注意：如果输入到字段中的文本长度大于/小于最大长度/最小长度UTF-16代码单元，则输入将无法通过约束验证。默认情况下，浏览器会阻止用户输入比`maxlength` 属性允许的字符多的字符。而`minlength`会阻止表单提交。

- `name`视为必需属性（即使它不是）。如果输入未指定名称`name`，或者`name`为空，则输入的值不会随表单一起提交！（禁用的控件、未选中的单选按钮、未选中的复选框和重置按钮也不会发送。

  有两种特殊情况：
  1. ` __charset_ `：如果用作隐藏类型的<input>元素的名称，则输入value用户代理自动设置为用于提交表单的字符编码。
  
  3. `isindex`：由于历史原因，不允许使用isindex。

  `name`属性为单选按钮创建唯一行为。
  
  一次只能选中同名单选按钮组中的一个单选按钮。选择该组中的任何单选按钮会自动取消选择同一组中当前选择的任何单选按钮。如果提交表单，则选中该单选按钮的值将与名称一起发送，

  当按 Tab 键进入一系列同名单选按钮组时，如果选中其中一个，则该单选按钮将获得焦点。如果它们未按源顺序分组在一起，则如果选中了其中一个组，则在遇到组中的第一个组时，将开始按 Tab 键进入组，跳过所有未选中的组。换句话说，如果选中一个，则 Tab 键将跳过组中未选中的单选按钮。如果未选中任何按钮，则当到达同名组中的第一个按钮时，单选按钮组将获得焦点。

  一旦组中的某个单选按钮具有焦点，使用箭头键将浏览所有同名单选按钮，即使单选按钮未按源顺序组合在一起也是如此。

  当输入元素被赋予name时，该名称将成为拥有表单元素的 HTMLFormElement.elements 属性的属性。
 
- 如果`pattern`属性存在但未指定或无效，则不应用正则表达式，并且完全忽略此属性。如果模式属性有效且非空值与模式不匹配，则约束验证将阻止表单提交。

  如果使用`pattern`属性，请通过在附近包含说明性文本来告知用户预期的格式。还可以包含`title` 属性来解释匹配模式的要求；大多数浏览器会将此标题显示为工具提示。可访问性需要可见的说明。工具提示是一项增强功能。
 
- `placeholder`属性在语义上不如解释表单的其他方式有用，并且可能会导致内容出现意外的技术问题。永远不应要求占位符来理解您的表单。它不是一个标签，不应该用作替代品。占位符用于提供有关输入值应是什么样子的提示，而不是说明或提示。
  
  屏幕阅读器不仅无法访问占位符，而且一旦用户在窗体控件中输入任何文本，或者窗体控件已具有值，占位符就会消失。具有自动页面翻译功能的浏览器在翻译时可能会跳过属性，这意味着`placeholder`可能无法翻译。
  
  如果可以避免使用`placeholder`属性，请不要使用它。如果需要标记`<input>`元素，请使用`<label>`元素。

#### 非标准属性
| 属性名 | 简介 |
| --- | --- |
| autocorrect | 指示自动更正是`on`还是`off`的字符串。仅限Safari。 |
| incremental | 是否发送重复search事件以允许在用户仍在编辑字段值时更新实时搜索结果。仅限WebKit和Blink（Safari，Chrome，Opera等）。 |
| orient | 设置范围滑块的方向。仅限火狐浏览器. |
| results | 应在先前搜索查询的下拉列表中显示的最大项数。仅限Safari。 |
| webkitdirectory | 一个布尔值，指示是否只允许用户选择一个目录（或多个目录，如果还存在multiple目录） |

非标准属性在某些浏览器上也可用。作为一般规则，应避免使用它们。

### Javascript事件
| 事件名 | 简介 |
| --- | --- |
| checkValidity | 如果元素的值通过有效性检查，则返回`true`；否则，返回`false`并在元素处触发`invalid`事件。 |
| reportValidity | 如果元素的值通过有效性检查，则返回`true`；否则，返回`false`，在元素上触发`invalid`事件，并（如果事件未取消）向用户报告问题。 |
| select | 选择`<input>`元素的全部内容（如果元素的内容是可选的）。对于没有可选文本内容的元素（如可视颜色选取器或日历日期输入），此方法不执行任何操作。 |
| setCustomValidity | 设置在输入元素的值无效时显示的自定义消息。 |
| setRangeText | 将输入元素中指定字符范围的内容设置为给定字符串。selectMode 参数可用于控制现有内容的影响方式。 |
| setSelectionRange | 选择文本输入元素中指定的字符范围。对未显示为文本输入字段的输入不执行任何操作。 |
| stepDown | 默认情况下，将数值输入的值递减 1 或按指定的单位数递减。 |
| stepUp | 将数值输入的值递增 1 或指定的单位数。 |

### CSS相关
#### 外观
`appearance`属性允许根据操作系统的主题将（几乎）任何元素显示为平台原生样式，以及删除任何具有 none 值的平台原生样式。

你可以使`<div>`看起来像带有`div {appearance: radio;}`的单选按钮，或者使单选看起来像带有`[type="radio"] {appearance: checkbox;}`的复选框，但不要这样做。

设置appearance: none 删除平台原生边框，但不删除功能

特定于文本输入相关元素的属性是CSS插入符号颜色属性，该属性允许您设置用于绘制文本输入`caret-color`的颜色。

#### 伪类
| 伪类 | 简介 |
| --- | --- |
| :enabled | 任何当前启用的元素，可以激活（选择、单击、键入等）或接受焦点，并且还具有禁用状态，在该状态下无法激活或接受焦点。 |
| :disabled | 任何当前禁用的具有启用状态的元素，这意味着如果未禁用，则可以激活（选择、单击、键入等）或接受焦点。 |
| :read-only | 用户无法编辑的元素 |
| :read-write | 可由用户编辑的元素。 |
| :placeholder-shown | 当前显示`placeholder文本`的元素，包括`<input>`和`<textarea>`元素，这些元素具有占`placeholder`属性，但尚未具有任何值。 |
| :default | 表单元素是一组相关元素中的默认值。匹配在页面加载或呈现时选中的复选框和单选输入类型。 |
| :checked | 匹配当前选中的复选框和单选输入类型（以及当前选中的`<select>`中的 （`<option>`）。 |
| :indeterminate | JavaScript将不确定属性设置为`true`的复选框元素、取消选中表单中具有相同名称值的所有单选按钮时的单选元素，以及处于不确定状态的`<progress>`元素 |
| :valid | 应用了约束验证且当前无效的表单控件。匹配其值与其属性（如`required`、`pattern`、`step`和`max`）设置的约束不匹配的窗体控件. |
| :in-range | 一个非空输入，其当前值在min值和max属性以及step指定的范围限制内. |
| :out-of-range | 非空输入，其当前值不在`min`值和`max`属性指定的范围限制内，或者不符合`step`约束。 |
| :required | `<input>`、`<select>` 或 `<textarea>`元素，该元素设置了`required`属性。仅匹配可能需要的元素。非必需元素中包含的属性不会匹配。 |
| :optional | `<input>`、`<select>`或 `<textarea>`元素，没有设置`required`属性。不匹配不需要的元素。 |
| :blank | `<input>`和`<textarea>`当前没有值的元素。 |
| :user-invalid | 类似于`:invalid`，但在模糊时激活。匹配无效输入，但仅在用户交互之后匹配，例如通过聚焦控件、离开控件或尝试提交包含无效控件的表单。和`<textarea>`当前没有值的元素。 |

### 可访问性问题
包含输入时，辅助功能要求在旁边添加`<label>`。这是必需的，以便使用辅助技术的人可以知道输入的用途。此外，单击或触摸标签可将焦点放在标签的关联表单控件上。这提高了视力正常的用户的可访问性和可用性，增加了用户可以单击或触摸以激活表单控件的区域。这对于很小的单选按钮和复选框特别有用（甚至是必需的）。

可以为`<input>`提供一个 `id`属性。`<label>`需要一个`for`属性，其值与`<input>`的`id`相同。这种方式被称为*显式label*：

```html
<label for="username">用户名：</label>
<input type="text" id="username" />
```

也可以在`<label>`中包含文本和`<input>`形成*隐式label*：
```html
<p>
  <label>用户名: <input type="text"  /></label>
</p>
```

交互式元素（如`<input>`）应提供足够大的区域，以便于激活它们。这有助于各种各样的人，包括有运动控制问题的人和使用非精确输入形式（如手写笔或手指）的人。建议最小交互大小为**44×44**CSS像素。

## 输出元素 -- `<output>`
`<output>`元素是一个容器元素，网站或应用可以将计算结果或用户操作的结果注入其中。其值、名称和内容不会在表单提交期间提交。

### 属性
| 属性名 | 简介 |
| --- | --- |
| for | 空格分隔的其他元素`id`列表，表示这些元素为计算贡献了输入值(或以其他方式影响了计算)。 |
| form | 要与输出关联的`<form>`元素（其表单所有者）。 |
| name | 元素的名称。在 form.elements API 中使用。 |

### 可访问性问题
许多浏览器将`<output>`元素实现为`aria-live`区域。因此，辅助技术将宣布发布在其中的 UI 交互的结果，而无需将焦点从生成这些结果的控件上移开。

### 使用示例

```html
<form id="test">
  <input type="number" id="a" name="a" value="10" /> +
  <input type="number" id="b" name="b" value="20" /> =
  <output id="result" name="result" for="a b">30</output>
</form>

<script>
  const test = document.querySelector('#test')
  const result = document.querySelector('#result')
  const a = document.querySelector('#a')
  const b = document.querySelector('#b')

  test.addEventListener('input', () => {
    result.value = +a.value + +b.value
  })
</script>
```

## 文本区域元素 -- `<textarea>`
`<textarea>`元素表示一个多行纯文本编辑控件，当希望允许用户输入大量自由格式的文本(例如对评论或反馈表单的评论)时非常有用。

### 属性
| 属性 | 值 | 简介 |
| --- | --- | --- |
| autocomplete | `off`或`on` | 是否使用浏览器的记忆功能自动填充文本。 |
| autofocus | boolean | 此布尔属性允许您指定窗体控件在页面加载时应具有输入焦点。 |
| cols | number | 文本控件的可见宽度（以平均字符宽度表示）。 |
| rows | number | 控件的可见文本行数。 |
| disabled | boolean | 是否禁用控件。 |
| form | string | `<textarea>`元素关联的表单元素。属性的值必须是同一文档中表单元素的 id。 |
| maxlength | number | 用户可以输入的最大字符数（UTF-16 代码单元）。 |
| minlength | number | 用户应输入的最小字符数（UTF-16 代码单元）。 |
| name | string | 控件的名称。 |
| placeholder | string | 向用户提示可在控件中输入的示例内容。呈现提示时，占位符文本中的回车符或换行符必须被视为换行符。 |
| readonly | boolean | 指示用户是否可以修改控件的值。 |
| required | boolean | 提示用户该元素的内容是否必填。 |
| spellcheck | boolean或者`default` | 指定`<textarea>`是否接受基础浏览器/操作系统的拼写检查。 |
| wrap | `hard`、`soft`或`off`  | 指示控件应如何包装表单提交的值。 |

### CSS注意
- HTML规范没有定义`<textarea>`的基线在哪里，因此不同的浏览器将其设置为不同的位置。对于Gecko，`<textarea>`基线设置在`<textarea>`第一行的基线上，在另一个浏览器上，它可能设置在`<textarea>`框的底部。不要在上面使用`vertical-align: baseline;`这种行为是不可预测的。

- 在大多数浏览器中，`<textarea>`是可调整大小的 -- 在右下角有拖动图标，它可以用来改变`<textarea>`在页面上元素的大小。这是由CSS的`resize`属性控制的，`resize`默认是启用的，可以使用`resize: none`禁用它。

# 选择元素 -- `<select>`、选项元素 -- `<option>`和选项组元素 -- `<optgroup>`
`<select>`元素表示提供选项菜单的控件。

`<option>`元素用于定义`<select>`、`<optgroup>`或`<datalist>`元素中的项目。

`<optgroup>`元素为`<select>`元素中的`<option>`创建分组。

### 使用说明
使用`<option>`时，每个`<option>`元素都应具有一个`value`属性，其中包含在选择该选项时要提交到服务器的数据值。如果未包含`value`属性，则值默认为元素中包含的文本。可以在`<option>`元素上包括`selected`属性，以便在页面首次加载时默认选中该属性。

可以进一步在`<optgroup>`元素中嵌套`<option>元素`，以在下拉列表中创建单独的选项组。

### 属性
#### `<select>`属性
| 属性名 | 简介 |
| --- | --- |
| autocomplete | 为用户代理的自动完成功能提供提示的字符串。 |
| autofocus | 指定`<select>`控件在页面加载时是否应具有输入焦点。 |
| disabled | 是否禁用`<select>`控件。 |
| form | `<select>`控件关联的表单元素。 |
| multiple | 指示是否可以在列表中选择多个选项。 |
| name | `<select>`控件的名称 |
| required | 指示是否必须选择具有非空字符串值的选项。 |
| size | 表示列表中一次应可见的行数。 |

- 根据HTML规范，`size`属性的默认值应为`1`；但是，在实践中，已经发现这会破坏某些网站，并且目前没有其他浏览器这样做，所以Mozilla选择继续在Firefox中返回`0`。

#### `<option>`属性
| 属性名 | 简介 |
| --- | --- |
| disabled | 是否禁用`<option>`控件。 |
| label | 此属性是指示选项含义的标签的文本。如果未定义label属性，则其值为元素文本内容的值。 |
| selected | 如果值为`true`，则表示最初选择了该选项。如果元素是未设置`multiple`属性的`<select>`元素的后代元素，该元素中只有一个可以具有`selected`属性。 |
| value | 此属性的内容表示要与表单一起提交的值（如果选择此选项）。如果省略此属性，则取自选项元素的文本内容。 |

#### `<optgroup>`属性
| 属性名 | 简介 |
| --- | --- |
| disabled | 是否禁用`<optgroup>`控件。 |
| label | 选项组的名称。浏览器在用户界面中标记选项时可以使用该组。如果使用`<optgroup>`元素，则此属性是必需的。 |

### CSS注意
#### `<select>`
`<select>`元素很难用CSS有效地设置样式。只能影响某些方面，例如，操作框模型、显示的字体等，并且可以使用`appearance`属性删除默认的系统`appearance`.

但是，这些属性不会跨浏览器产生一致的结果，并且很难在列中将不同类型的表单元素相互排列。`<select>`元素的内部结构复杂且难以控制。如果想获得完全控制，应该考虑使用一个具有良好工具的库来设置表单小部件的样式，或者尝试使用非语义元素、JavaScript 和WAI-ARIA来滚动自己的下拉菜单来提供语义。

#### `<option>`
`<option>`元素的样式受到高度限制。选项不会继承父项上设置的字体。在Firefox中，只能设置颜色和背景颜色，但是在Chrome或Safari中无法设置任何属性。

### 使用示例
```html
<form>
  <select>
    <optgroup label="选项1">
      <option>选项1.1</option>
    </optgroup>
    <optgroup label="选项 2">
      <option>选项 2.1</option>
      <option>选项 2.2</option>
    </optgroup>
    <optgroup label="选项 3" disabled>
      <option>选项 3.1</option>
      <option>选项 3.2</option>
      <option>选项 3.3</option>
    </optgroup>
  </select>
</form>
```

## 数据列表元素 -- `<datalist>`
`<datalist>`元素包含一组`<option>`元素，这些元素表示可在其他控件中选择的允许或建议的选项。

通常将`<datalist>`元素绑定到控件，我们在`id`属性中为其指定唯一标识符，然后将`list`属性添加到具有与`value`相同的标识符的`<input>`元素。只有某些类型的`<input>`支持此行为，并且它也可能因浏览器而异。

`<option>`元素可以将值作为内部内容存储在`value`和`label`属性中。下拉菜单中会显示哪一个取决于浏览器，但是当单击时，输入到控制字段的内容总是来自`value`属性。

### 使用示例
```html
<label for="filetype">选择文件的类型:</label>
<input list="filetypes" id="filetype" name="filetype" />
<datalist id="filetypes">
  <option value=".txt"></option>
  <option value=".xlsx"></option>
  <option value=".pdf"></option>
  <option value=".docx"></option>
</datalist>
```

## 计量元素 -- `<meter>`
`<meter>`元素表示已知范围内的标量值或小数值。

### 属性
| 属性名 | 简介 |
| --- | --- |
| value | 当前数值。 |
| min | 测量范围的数值下限。 |
| max | 测量范围的数字上限。 |
| low | 测量范围下限的数字上限。 |
| high | 测量范围上限的数字下限。 |
| optimum | 指示最佳数值。 |

- 对于`min`和`max`属性，如果指定，`min`必须小于`max`值；`max`值必须大于`min`值。如果未指定，则`max`为`1`，则`min`值为`0`。

- 对于`low`和`high`属性，如果指定，`low`必须大于`min`值，如果指定了`high`值和`max`值，那么它也必须小于它们；`high`必须小于`max`值。 如果指定了`low`值和`min`值，它也必须大于它们。

  如果未指定，或者`low`小于`min`值/`high`大于`max`值，则`low`值等于`min`值；`high`值等于`max`值。
  
- 对于`optimum`属性，当与`low`和`high`一起使用时，它会指示沿范围的位置被认为是可取的。例如，如果它介于`min`属性和`low`属性之间，则认为较低范围是首选范围。浏览器可能会根据值是否小于或等于最佳值而对仪表条进行不同的着色。

### 使用示例
[jcode](https://code.juejin.cn/pen/7193990895942369332)

## 进度指示器元素 -- `<progress>`
`<progress>`元素显示一个指示器，显示任务的完成进度，通常显示为进度条。

CSS`:indeterminate`伪类可用于匹配不确定的进度条。要在给进度条赋值后将其更改为不确定，必须使用`element.removeAttribute('value')`删除`value`属性。

### 属性
| 属性名 | 简介 |
| --- | --- |
| value | 此属性指定任务已经完成了多少。 |
| max | 描述由`<progress>`元素指示的任务所需的工作量。 |

- `value`属性的值必须是介于`0`和`max`值之间的有效浮点数，如果省略`max`，则介于`0`和`1`之间。如果没有`value`属性，则进度条不确定；这表明某项活动正在进行中，没有指示预计需要多长时间。

- `max`属性（如果存在）的值必须大于`0`，并且是有效的浮点数。默认值为`1`。

> 注意：与`<meter>`元素不同，最小值始终为`0`，并且`<progress>`元素不允许使用`min`属性。

### 使用示例
```html
<p>
  当前任务已完成：<progress value="70" max="100">70%</progress>
</p>
```

## 参考资料
[表单](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#%E8%A1%A8%E5%8D%95)