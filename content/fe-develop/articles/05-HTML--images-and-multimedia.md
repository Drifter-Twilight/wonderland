---
title: "HTML详解 -- 图片与多媒体"
description: "HTML 支持的各种多媒体资源，例如图像、音频和视频元素。"
img: "/content-images/fe-develop/articles/05-HTML--images-and-multimedia/cover.webp"
date: "2023-02-05 21:51"
update: 0
tags: ["HTML"]
---

![cover.webp](/content-images/fe-develop/articles/05-HTML--images-and-multimedia/cover.webp)

---
一个网页，如果只有文本的话，就太无聊了，像这种HTML规范文档全是文字，一个张图片都没有，或者只有几张图片的，能认真看完的估计都是大佬吧：

![01.webp](/public/content-images/fe-develop/articles/05-HTML--images-and-multimedia/01.webp)

在HTML里支持各种多媒体资源，例如图像、音频和视频。也有相应的元素用于在页面中嵌入图片与多媒体。

## 图像嵌入元素 -- `<img>`
`<img>`元素用于**将一张图像嵌入文档**。HTML标准没有列出要支持的图像格式，因此用户代理可能支持不同的格式。

目前最常用的图像文件格式如下：
- JPEG — 静止图像有损压缩的不错选择（目前最流行）。
- APNG— 无损动画序列的不错选择（GIF 性能较差）。
- PNG — 静态图像无损压缩的不错选择（质量略好于 JPEG）。
- WebP — 图像和动画图像的绝佳选择。
- AVIF — 由于高性能，图像和动画图像的不错选择。
- GIF — 简单图像和动画的不错选择。
- SVG — 矢量图像格式。用于必须以不同大小准确绘制的图像。

### 属性
| 属性名 | 值 | 简介 |
| --- | --- | --- |
| src | string | 图像的URL。对于`<img>`元素是必需的。|
| alt | string | 定义图像的替代文本描述。 |
| crossorigin | `anonymous`或`use-credentials` | 指示图像的获取是否必须使用CORS请求完成。 |
| decoding |`auto`、`sync`或`async`| 为浏览器提供图像解码方式上的提示。|
| height | number | 图像的固有高度（以像素为单位）。必须是不带单位的整数。|
| width | number | 图像的固有宽度（以像素为单位）。必须是不带单位的整数。|
| ismap | boolean | 指示图像是服务器端映射的一部分。值为`true`时，用户单击图像的坐标将发送到服务器。|
| loading | `eager`或`lazy` | 指示浏览器应如何加载图像。|
| referrerpolicy | `strict-origin-when-cross-origin`（默认）、`no-referrer`、`no-referrer-when-downgrade`、`origin`、`origin-when-cross-origin`、`same-origin`、`strict-origin`、`unsafe-url` | 一个字符串，指示获取资源时要使用的引用者。|
| sizes | 源大小值或媒体查询条件（对于列表中的最后一项，必须省略此项。） | 一个或多个以逗号分隔的字符串，指示一组源大小。|
| srcset | 1x（默认）、指向图像的URL [ 空格后跟宽度描述符（一个正整数，后面紧跟 w 符号）与像素密度描述符（一个正浮点数，后面紧跟 x 符号）其中之一]| 以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像。 |
| usemap | string | 与元素相关联的[图像映射]()的部分 URL（#号后接`<map>`的`name`）。 |

- 在某些情况下，浏览器可能无法显示图像，这时浏览器可能会显示成损坏的图像图标加上元素的`alt`属性中的文本以代替加载失败或错误的图像。尽可能为`alt`提供有用的值。如果`alt`为空并且图像无法显示，则可视浏览器也会隐藏损坏的图像图标。

  将图像复制并粘贴到文本或将链接的图像保存到书签时，也会使用此属性。
  
- 浏览器在加载图像之前会根据`height`和`width`属性计算图像使用纵横比。此纵横比用于保留显示图像所需的空间，从而减少甚至防止在下载图像并将其绘制到屏幕时出现抖动。

- 仅当`<img>`元素是具有有效`href`属性的`<a>`元素的后代时，才允许使用`ismap`属性。

- 使用`loading`时需注意：只有在启用JavaScript时加载才会延迟。这是一种反跟踪措施，因为如果用户代理在禁用脚本时支持延迟加载，则站点仍然可以跟踪用户在整个会话中的大致滚动位置，方法是在页面的标记中战略性地放置图像，以便服务器可以跟踪请求的图像数量和时间。

- 如果`<img>`元素位于`<a>`或`<button>`元素内，则不能使用`usemap`属性。

- 在使用`srcset`属性时，如果包含宽度描述符，在支持srcset的用户代理中将忽略`src`属性。

### 图像加载错误问题
如果在加载或渲染图像时发生错误，并且错误事件上设置了`oneror`事件处理程序，则将调用该事件处理程序。以下情况都会触发`oneror`事件处理程序：
- `src`属性为空（"" 或null）。
- `src`的值与用户当前所在页面的URL相同。
- 图像已损坏，无法加载。
- 图像的元数据已损坏，无法检索其尺寸，并且未在`<img>`元素的属性中指定尺寸。
- 图像采用用户代理不支持的格式.

### 安全问题
大部分情况下使用`<img>`元素是无害的，但某些情况下可能会对用户安全和隐私产生不良后果。有关详细信息和缓解措施[请查看](https://developer.mozilla.org/en-US/docs/Web/Security/Referer_header:_privacy_and_security_concerns)。

### 可访问性问题
- `alt`属性的值应清晰简洁地描述图像的内容。其值不应是描述图像本身的存在或图像的文件名。当图像上不存在`alt`属性时，某些屏幕阅读器可能会改为朗读图像的文件名。如果文件名不能代表图像的内容，这可能会令人困惑。

- 如果`src`属性的目标图片是svg格式，由于VoiceOver错误，VoiceOver无法将SVG图像正确宣布为图像。可以设置`<img role='img'>`，以确保辅助技术正确地将SVG宣布为图像内容。

- `title`属性不能替代`alt`属性。一个是鼠标悬停在图像上时显示，一个是图像错误时显示，可能还有其他区别，但光从视觉效果上看，他们就有很大的不同，初学者可能会更偏向于使用`title`。

  此外，避免在同一个`<img>`上的`title`属性与`alt`属性的值重复。这样做可能会导致某些屏幕阅读器两次宣布相同的内容，从而造成混乱的体验。如果一个图像需要标题，请使用`<figure>`和`<figcaption>`元素。

### 使用示例

```html
<!-- 普通用法 -->
<img src="favicon.ico" alt="网站 logo" />

<!-- 使用width和height属性 -->
<!-- 此时图片的宽度为300px，高度为150px -->
<img 
  src="test.png"
  alt="测试图片"
  width='300'
  height='150'
/>

<!-- 使用srcset属性 -->
<!-- srcset的值：以逗号分隔的指向图片的URL 空格后接一个像素描述符 -->
<!-- 在高分辨率设备上，它将被优先加载，取代src属性中的图像。 -->
<img 
  src="test.png"
  alt="测试图片"
  srcset="test.png 2x, test.png 4x" 
  />
```

## 嵌入音频元素 -- `<audio>`与视频嵌入元素 -- `<video>`
### WebVTT
在正式开始之前，先来简单了解一下WebVTT，有兴趣的话就学习一下吧，没兴趣的话可以先跳过。

WebVTT表示**Web视频文本音轨格式**。是一种使用`<track>`元素显示定时文本音轨(如字幕)的格式。WebVTT文件的主要目的是为`<video>`添加文本覆盖。WebVTT是一种基于文本的格式，必须使用UTF-8编码。可以使用空格的地方也可以使用制表符。

简单点说WebVTT的本质就是个.vtt格式的文件。

#### 基本结构
WebVTT文件结构如下：
- 可选的字节顺序标记（BOM）。
- 字符串“`WEBVTT`".
- `WEBVTT`右侧的可选文本标题.
  -   `WEBVTT`之后必须至少有一个空格.
  -   可以使用它向文件添加说明。
  -   可以在文本标题中使用除换行符或字符串（`-->`）之外的任何内容.
- 一个空行，相当于两个连续的换行符。
- 零个或多个提示或注释。
- 零个或多个空行。

文件示例（`[]`包裹表示可选）：
```
WEBVTT [- 文本标题 ]

/* 
提示：
[1]                    
00:01.000 --> 00:04.000 
- xxxx     
*/

[1]  
00:01.000 --> 00:04.000 /* 开始时间戳 --> 结束时间戳（“-->”两侧至少包含一个空格） */
- 你好，我是杰克。

[2]
00:05.000 --> 00:09.000 /* 时间戳格式必须是 mm:ss.ttt 或者 hh:mm:ss.ttt 两者其中之一*/
- 你好，我是玛丽。
- 很高兴见到你。
```

#### 注释
除了基本内容外，还可以在文件中添加注释。注释是一个可选组件，用于向WebVTT文件添加信息。注释是为那些读取文件的人准备的，用户不会看到注释。注释可以包含换行符，但不能包含空行，因为空行表示注释的结束。

> 注意：注释不能包含字符串`-->`、和字符`&`，或小于号`<`。如果要使用这些字符，则需要使用例如`&amp`等进行转义。

注释结构：
- 字符串`NOTE`。
- 空格或换行符。
- 除上述字符外的零个或多个字符。

文件实例：
```
/* 单行注释 */
NOTE 这是个注释。

/* 多行注释 */
NOTE 
注释一
注释二

/* 这是错误的 */
NOTE 
注释一

注释二
```

#### 设置网络VTT的样式
要为网络VTT设置样式，可以通过CSS`::cue`伪元素进行匹配：
```css
video::cue {
  background-image: rgba(0, 0, 0, .5);
  color: white;
}
```
或者直接在.vtt文件中插入CSS规则：
```
WEBVTT

/* 样式块不能使用空行或 -->  */
STYLE
::cue {
  background-image: linear-gradient(to bottom, dimgray, lightgray);
  color: papayawhip;
}

NOTE

STYLE
::cue(b) {
  color: peachpuff;
}

00:00:00.000 --> 00:00:10.000
- Hello <b>world</b>.

/* 样式块不能出现在第一个提示后面 */
```
当然还有其他更复杂的方法，这里就不过多说明了。

#### 使用标签
在VTT文件中可以像使用HTML标签一样使用一些标签

##### 时间戳标签 -- `<hh:mm:ss.ttt>`/`<mm:ss.ttt>`
时间戳必须大于提示的开始时间戳，大于提示有效负载中的任何先前时间戳，并且小于提示的结束时间戳。活动文本是时间戳和下一个时间戳之间的文本，或者如果有效负载中没有其他时间戳，则到有效负载末尾的文本。有效负载中活动文本之前的任何文本都是以前的文本。活动文本之外的任何文本都是将来的文本。这将启用卡拉OK风格的字幕:
```
00:16.500 --> 00:18.500
xxx <00:17.500> xxx

00:00:18.500 --> 00:00:20.500
xx <00:19.000>xxx <00:19.500>xxx <00:20.000>xxx
```

##### 类标记标签 -- `<c>`
使用CSS类设置所包含文本的样式:
```
<c.classname>text</c>
```
##### 斜体标签 -- `<i>`
将包含的文本设置为斜体:
```
<i>text</i>
```
##### 斜体标签 -- `<i>`
将包含的文本设置为粗体:
```
<b>text</b>
```
##### 斜体标签 -- `<u>`
将包含的文本添加下划线:
```
<u>text</u>
```
##### ruby标签 -- `<ruby>`和Ruby 文本标签 -- `<rt>`
`<ruby>`与`<rt>`一起使用以显示拼音字符:
```
<ruby>xx<rt>xx</rt>xx<rt>xxx</rt></ruby>
```
##### 语音标签 -- `<v>`
与类标签类似，也用于使用 CSS 设置所包含文本的样式：
```
<v Bob>text</v>
```

OK，暂时就先了解到这吧，如果需要更深入的了解，请[参考](https://developer.mozilla.org/zh-CN/docs/Web/API/WebVTT_API)。

### 正文开始
#### 音频元素 -- `<audio>`和视频元素 -- `<video>`
`<audio>`元素用于在文档中**嵌入音频内容**。它可能包含一个或多个音频源，使用`src`属性或 `<source>`元素表示，浏览器会选择最合适的一个。它也可以是流媒体的目标（`MediaStream`）。

`<video>`元素将**支持视频播放的媒体播放器嵌入到文档中**。也可以将`<video>`用于音频内容，但`<audio>`元素可以提供更合适的用户体验。

在不支持`<audio>`与`<video>`的浏览器中，元素开始和结束标签中的内容会显示，作为回退处理。

### 属性
#### `<audio>`属性
| 属性 | 值 | 简介 |
| --- | --- | --- |
| src | string | 要嵌入的音频的URL。|
| autoplay | boolean | 指定音频是否在可以播放时自动开始播放，而无需等待整个音频文件完成下载。。|
| controls | boolean | 值为`true`浏览器将提供控件，允许用户控制音频播放，包括音量、搜索和暂停/恢复播放。 |
| crossorigin | `anonymous`或`use-credentials` | 指明是否使用CORS（跨域资源共享）来获取相关视频|
| loop | boolean | 指定音频播放器将在到达音频结尾时自动返回到开始位置。|
| muted | boolean | 指示音频最初是否被静音。|
| preload | `none`、`metadata`、`auto`或空字符串（等效于`auto`） | 指定浏览器使用何种加载方式以达到最好的用户体验。|

#### `<video>`属性

| 属性名 | 值 | 简介 |
| --- | --- | --- |
| src | string | 要嵌入的视频的 URL。|
| autoplay | boolean | 视频是否自动开始播放，而不会停止加载数据。 |
| controls | boolean | 浏览器是否提供允许用户控制视频播放的控件，包括音量、搜索和暂停/恢复播放。|
| crossorigin | `anonymous`或`use-credentials` | 指明是否使用CORS（跨域资源共享）来获取相关视频|
| loop | boolean | 是否开启循环播放。 |
| muted | string | 指明视频是否静音 |
| poster | string | 下载视频时要显示的图像的URL。类似于封面，如果未指定此属性，则在第一帧可用之前不会显示任何内容，然后第一帧将显示为海报帧。|
| preload | `auto`、`metadata`、`none`或空字符串 | 指定浏览器使用何种加载方式以达到最好的用户体验。每个浏览器的默认值都不同。规范建议将其设置为metadata。|
| width | string/number | 视频显示区域的宽度，以CSS像素为单位（仅限绝对值）。|
| hright | string/number | 视频显示区域的高度，以CSS像素为单位（仅限绝对值）。|

#### `<audio>`与`<video>`的属性相同点
- 自动播放音频（或带有音轨的视频）可能会给用户带来不愉快的体验（比如可能会吓用户一跳，或者浪费用户的流量等），因此应尽可能避免。如果必须提供自动播放功能，则应选择启用（要求用户专门启用）。

  部分浏览器在某些情况下不允许自动播放音视频，比如谷歌浏览器只允许在静音、用户与网站交互之后以及浏览器确定用户经常与媒体交互时才会自动播放。否则，播放可能会被阻止。目前QQ浏览器与360浏览器在不需要其他操作就可以自动播放，有需要请[参考](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide)。
  
- `autoplay`属性优先于`preload`。如果指定了`autoplay`，浏览器需要开始下载音视频进行播放。

- 不同浏览器默认控件样式可能不同。若要跨浏览器获得一致的外观，需要创建自定义控件。如果未指定`controls`属性，则音视频播放器将不包含浏览器的默认控件。但是可以使用JavaScript和HTMLMediaElement API创建自己的自定义控件。

### 事件
`<audio>`与`<video>`除了全局事件之外所具有的事件一致:
| 事件名 | 触发情况 |
| --- | --- |
| canplay | 浏览器可以播放媒体，但估计没有加载足够的数据来播放媒体，而无需停止以进一步缓冲内容。 |
| canplaythrough | 当用户代理可以播放媒体时触发，并且估计已经加载了足够的数据来播放媒体，而无需停止以进一步缓冲内容。 |
| complete | 当离线音频上下文播放完成时触发。 |
| durationchange | 在`duration`属性更新时被触发。 |
| emptied | 当媒体变为空时触发。例如，如果媒体已加载（或部分加载），并且调用`load()`方法来重新加载它，则会发送此事件。 |
| ended | 当到达媒体结尾或没有其他数据可用时触发。 |
| loadeddata | 媒体的第一帧已完成加载时触发。 |
| loadedmetadata | 元数据已加载时触发。 |
| pause | 播放暂停时触发。 |
| play | 播放开始时触发。 |
| playing | 播放事件在首次启动playing后以及每当重新启动时都会触发。例如，当播放因缺少数据而暂停或延迟后恢复时，将触发它。 |
| ratechange | 播放速率更改时触发。 |
| seeked | 当查找操作完成、当前播放位置已更改且`seeking`更改为`false`时触发。 |
| seeking | 当搜索操作开始时触发，这意味着`seeking`属性已更改为`true`，并且媒体正在搜索新位置。 |
| stalled | 用户代理正在尝试获取媒体数据，但数据意外不可用时触发。 |
| suspend | 媒体数据加载已暂停时触发。 |
| timeupdate | `currentTime`属性指示的时间已更新时触发。 |
| volumechange | 音量更改时触发。 |
| waiting | 由于暂时缺少数据，播放已停止时触发。 |

> 注意：部分事件无法停止且不会冒泡。

### 使用说明
浏览器并非都支持相同的文件类型和音视频编解码器。可以在嵌套`<source>`元素中提供多个源，然后浏览器将使用它理解的第一个源：
  
  ```html
  <!-- 音频 -->
  <audio controls>
    <source src="audio1.mp3" type="audio/mpeg" />
    <source src="audio2.ogg" type="audio/ogg" />
    您的浏览器不支持HTML video
  </audio>
  
  <!-- 视频 -->
  <video controls>
    <source src="audio1.mp4" type="video/mp4" />
    <source src="audio2.avi" type="video/avi" />
    您的浏览器不支持HTML video
  </video>
  ```

#### 音频
- 可以使用Web 音频API直接从JavaScript代码生成和操作音频流，而不是流式传输预先存在的音频文件。

- `<audio>`元素不能像`<video>`元素那样具有与之关联的字幕。

#### 视频
- 可以使用CSS的`object-position`属性来调整视频在元素帧内的位置，使用`object-fit`属性来控制如何调整视频的大小以适应帧。

- 要与视频一起显示字幕/字幕，可以使用一些JavaScript以及`<track>`元素和WebVTT格式。有关详细信息，请参阅[向HTML视频添加字幕和字幕](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video)。

- 可以使用`<video>`元素播放音频文件。例如需要使用WebVTT脚本执行音频，因为`<audio>`元素不允许使用WebVTT 的字幕。

- 若要在支持`<video>`元素的浏览器上测试回退内容，可以将`<video>`替换为不存在的元素，如 `<novideo>`.
  
### 可访问性问题
`<audio>`元素不直接支持WebVTT。要想使用就要找到并使用相应的库或框架，或者自己编写代码。一种选择是使用`<video>`元素播放音频，该元素直接支持WebVTT。

#### 相同点
带有语音对话的音视频应提供准确描述其内容的字幕和脚本。字幕是使用WebVTT指定的，允许听力损失的人在播放录音/视频时理解录音或视频的音频内容，而文字记录则允许需要额外时间的人能够以适合自己的节奏和格式查看录音内容。

除了口语对话外，字幕和录音稿还应识别传达重要信息的音乐和音效。这包括情感和语气。

## 嵌入文本轨道元素 -- `<track>`
`<track>`元素指定**定时文本轨道（或基于时间的数据）**，例如自动处理字幕。其允许的父元素为`<audio>`和`<video>`。

> 注意： `<track>`是一个空元素。

### 属性

| 属性名 | 值 | 简介 |
| --- | --- | --- |
| src | string | 轨道的地址（.vtt 文件）。必须指定 |
| default | boolean | 指示应启用该`<track>`，除非用户的首选项指示另一个`<track>`更合适。每个媒体元素只能在其中的一个`<track>`上使用。 |
| kind | `subtitles`（默认）、`captions`、`descriptions`、`chapters`或`metadata` | 如何使用字幕信息。 |
| label | string | 用户可读的文本音轨标题，浏览器在列出可用的文本音轨时使用。|
| srclang | 有效的BCP 47语言标记。 | 轨道文本数据的语言。 |

- `src`的值必须是有效的网址。并且其URL值必须与文档具有相同的来源，除非`<track>`的 `<audio>`或`<video>`父元素具有`crossorigin`属性。

- 如果`kind`属性设置为`subtitles`，则必须定义`srclang`。

- `kind`属性各值的含义如下：

  - `subtitles`
  
    1. 字幕提供观众无法理解的内容的翻译。例如，英语电影中非英语的语音或文本。 

    2. 字幕可能包含其他内容，通常是额外的背景信息。例如《星球大战》电影开头的文本，或场景的日期、时间和位置。

  - `captions`
  
    1. 隐藏式字幕提供音频的听录和可能的翻译。
    
    2. 它可能包括重要的非语言信息，例如音乐提示或声音效果。它可以指示提示的来源（例如音乐、文本、字符）。
    
    3. 适合有听力障碍或声音静音的用户。  

  - `descriptions` 
  
    1. 视频内容的文本描述。
    
    2. 适用于盲人或看不到视频的用户。

  - `chapters`。章节标题旨在当用户导航媒体资源时使用。
  
  - `metadata`。脚本使用的轨道。对用户不可见。

> 注意：一个媒体元素中的任意两个`<track>`子元素不能有相同的`kind`、`srclang`和`label`属性。
 
### 使用示例：

```html
<video controls>
  <source src="example.mp4" type="video/mp4" />
  <source src="example.ogv" type="video/ogv" />
  <track kind="captions" src="sampleCaptions.vtt" srclang="en" />
  <track kind="descriptions" src="sampleDescriptions.vtt" srclang="en" />
  <track kind="chapters" src="sampleChapters.vtt" srclang="en" />
  <track kind="metadata" src="keyStage1.vtt" srclang="en" label="Key Stage 1" />
  您的浏览器不支持HTML video
</video>
```

## 图像映射元素 -- `<map>`与图像映射区域元素 -- `<area>`
`<map>`元素与`<area>`元素一起使用，以定义**图像映射**（可单击的链接区域）。

`<area>`元素定义**图像映射内具有预定义可单击区域的区域**。图像映射允许将图像上的几何区域与超文本链接相关联。

### 属性
#### `<map>`属性
`<map>`中的`name`属性比较特殊，作用是为`<map>`指定一个名称，以便可以引用它。该属性必须存在，并且必须具有不带空格字符的非空值。与`id`属性一样在同一文档中值必须是唯一的。

#### `<area>`属性
| 属性值 | 值 | 简介 |
| --- | --- | --- |
| href | string | 该区域的超链接目标。 |
| alt | string | 在不显示图像的浏览器上显示的替代文本字符串。 |
| coords | 以逗号分隔的数字 | 以`<area>`的大小、形状和位置详细描述了`shape`属性的坐标。单位为px。 |
| download | boolean | 值为`truw`，表明作者想把超链接用于下载一个资源。 |
| hreflang | string | 指明链接资源的语言类型，值的范围参考BCP47。只能在指明`href`属性之后使用。 |
| ping | 一个以空格分隔的URL列表， | 浏览器（在后台）将发送带有主体PING的POST请求。 |
| rel | string | 指定目标对象与链接对象的关系。仅当存在`href`属性时才使用此属性。 |
| shape | `rect`、`circle`、`poly`或`default` | 关联区域的形状。如果`shape`设置为`default`，则不得使用`coords`属性. |
| target | `_self`、`_blank`、`_parent`或`_top` | 该区域的超链接目标。仅当存在`href`属性时才使用此属性。 |

- `coords`使用说明

  1. 当值为三个数字时，表示圆形，即`coords='x, y, radius'`。
  
  2. 当值为四个数字时，表示矩形，即`coords='x1, y1, x2, y2'`。
 
  3. 当值为四个以上的数字时，表示多边形，即`coords='x1, y1, x2, y2 ... xn, yn'`。

### 使用示例

```html
<map name="primary">
  <area
    shape="circle"
    coords="75,75,75"
    href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript"
    target="_blank"
    alt="JavaScript" />
  <area
    shape="circle"
    coords="275,75,75"
    href="https://developer.mozilla.org/zh-CN/docs/Web/CSS"
    target="_blank"
    alt="CSS" />
</map>

<!-- 搭配<img>元素使用 -->
<img
  usemap="#primary"
  src="parrots.jpg"
  alt="350 x 150 picture of two parrots" />
```

## 参考资料
- [图片与多媒体](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element#%E5%9B%BE%E7%89%87%E5%92%8C%E5%A4%9A%E5%AA%92%E4%BD%93)
- [Web 视频文本轨格式（WebVTT）](https://developer.mozilla.org/zh-CN/docs/Web/API/WebVTT_API)