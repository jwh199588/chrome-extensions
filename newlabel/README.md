该插件主要是为了学习，当然本人也在使用当前插件

![新标签页的样式](assert/images/image-20210127110505931.png)

### 插件介绍



####  manifest.json介绍

```
{
  "name": "new label",  //标签名称
  "description": "新标签页的样式", //标签描述
  "version": "1.0.0",  //标签版本号，自己定义
  "manifest_version": 2, //必须要有的，可以根据自己chrome浏览器的版本去设置，现在一般使用2
  //插件图标
  "icons": {
    "16": "images/icon.png",
    "32": "images/icon.png",
    "128": "images/icon.png"
  },
  //覆盖新的标签页
  "chrome_url_overrides": {
    "newtab": "html/label.html"
  }
}
```

#### label.html

新标签页的样式，只要懂得css就可以根据自己的爱好去定制新标签页