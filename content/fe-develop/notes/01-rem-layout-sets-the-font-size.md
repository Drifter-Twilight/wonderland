---
title: "rem适配布局设置HTML font-size"
date: "2024-07-16 14:00"
update: 0
tags: ["HTML", "JavaScript"]
---

## rem适配布局设置HTML font-size

```js
setFontSize()
function setFontSize() {
  let designWidth = 1366;
  let designHeight = 768;
  let fontSize = document.documentElement.clientWidth / document.documentElement.clientHeight < designWidth / designHeight ? (document.documentElement.clientWidth / designWidth) * 12 : (document.documentElement.clientHeight / designHeight) * 12;
  document.documentElement.style.fontSize = fontSize + 'px';
}
    
window.onresize = function () {
  setFontSize()
};
```