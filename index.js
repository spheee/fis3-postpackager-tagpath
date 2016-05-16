'use strict';

module.exports = function(ret, conf, settings, opt) {

    //
    // var startReg = /<!--\s*build:(\w+)(?:\(([^\)]+?)\))?\s+(\/?([^\s]+?))\s*-->/gim;
    // var endReg = /<!--\s*endbuild\s*-->/gim;

    //替换a标签和css或者js中的资源
    var tagReg = [/<a[^>]+href=([^>]+)>/gi, /<link[^>]+href=([^>]+)>/gi, /<script[^>]+src=([^>]+)>/gi, /<img[^>]+src=([^>]+)>/gi];
    var aTagReg = /<a[^>]+href=([^>]+)>/gi;
    var imgTagReg = /<img[^>]+src=([^>]+)>/gi;
    var speTag = /#|http|(javascript:[;|(void(0)])/;

    //重组打包对象
    var map = {};
    // fis.util.map(ret.src, function(subpath, file) {

    //     if (!file.isHtmlLike && file.ext != ".tmpl") {

    //         map[subpath.replace("/src/", "")] = file.getUrl(opt.hash, opt.domain);
    //     }
    //     // console.log('\n'+subpath+' === '+file.getUrl())
    // });

    //concat
    fis.util.map(ret.src, function(subpath, file) {

        //html类文件，才需要做替换
        if (file.isJsLike) {
            var content = file.getContent();
            content = content.replace(aTagReg, function(tag, url) {
                if (speTag.test(url)) {
                    return tag;
                }
                if (settings && settings.domain) {
                    url = url.replace(/"|'/g, "");
                    console.log(url)
                    return tag.replace(url, settings.domain + url)
                }

            })
            content = content.replace(imgTagReg, function(tag, url) {
                if (settings && settings.domain) {
                    url = url.replace(/"|'/g, "");
                    console.log(url)
                    return tag.replace(url, settings.domain + url)
                }

            })

            file.setContent(content);
        }

        if (file.isHtmlLike) {
            var content = file.getContent();

            // for(var i=0;i<tagReg.length;i++){

            //     content = content.replace(tagReg[i],function(tag,url){

            //         if(url.indexOf("http://") > -1)return tag;

            //         // if(url.indexOf('test/a')>-1) console.log(url);

            //         url = url.replace(/"|'/g,"");

            //         url = url.split(" ")[0];
            //         //url = url.replace("../","");
            //         var pkg = map[url.replace("../","")];
            //         // console.log(url,pkg)

            //         if(pkg){

            //             return tag.replace(url,'xxxxx');
            //         }
            //         return tag;
            //     });

            // }
            //不行啊 这里还要去除javascript:; http://
            content = content.replace(aTagReg, function(tag, url) {
                if (speTag.test(url)) {
                    return tag;
                }
                if (settings && settings.domain) {
                    url = url.replace(/"|'/g, "");
                    return tag.replace(url, settings.domain + url)
                }
            })
            file.setContent(content);
        }
    });
};
