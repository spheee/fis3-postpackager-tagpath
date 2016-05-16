### 处理html页面或者isHtmlLike的模板js中的相对路径或者动态生成的src链接

> fis3插件


```javascript
    //配置
    postpackager : fis.plugin('tagpath',{ domain:'/AsYouWish'})
```

### v1.1.1
 新增了处理模板js中拼接img标签的处理，解决无法使用__uri的情况