// ==UserScript==
// @name         下载当前页面图片
// @namespace    http://tampermonkey.net/
// @version      1.0.4
// @description  调用 downloadImagesSequentially(getDocumentImgNode(img节点)) 方法，并传入img节点，下载网页上的图片并保存到本地
// @author       slowFever
// @match        *://*/*
// @grant        unsafeWindow
// @grant        GM_download
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 获取图片节点的函数
    function getDocumentImgNode(nodes) {
        let imgNodes = [];
        nodes.forEach(node => {
            const src = node.getAttribute('src');
            if (src && !imgNodes.includes(src)) {
                imgNodes.push(src);
            }
        });
        console.log(`获取到${imgNodes.length}张图片`)
        return imgNodes;
    }

    // 下载单张图片的函数
    function downloadImage(url, name) {
        GM_download({
            url: url,
            name: name,
            onload: function() {
                console.log(`成功下载：${name}`);
            },
            onerror: function(error) {
                console.error('下载图片时出错:', error);
            }
        });
    }

    // 依次下载图片的函数
    function downloadImagesSequentially(imgUrls) {
        imgUrls.forEach((url, index) => {
            const fileName = `image-${index + 1}.${url.split('.').pop().split('?')[0]}`;
            downloadImage(url, fileName);
        });
    }

    // 将函数暴露到全局，以便在控制台调用
    unsafeWindow.downloadImagesSequentially = downloadImagesSequentially;
    unsafeWindow.getDocumentImgNode = getDocumentImgNode;

    // 提示用户可以通过控制台调用函数
    (async () => {
        console.log('已加载图像下载器脚本。');
        await new Promise(resolve => setTimeout(resolve, 1000)); // 延时1秒
        console.log('%c使用控制台调用带有所需图像节点的方法：↓ ↓ ↓', 'color:#ec2c64');
        await new Promise(resolve => setTimeout(resolve, 1000)); // 再延时1秒
        console.log('%cdownloadImagesSequentially(getDocumentImgNode(img节点))',  'color:#0f59a4; background:#eef7f2; font-size:1.5rem; padding:0.15rem 0.35rem; margin: 1rem auto; font-family: Rockwell; border: 2px solid #0f59a4; border-radius: 4px;font-weight: bold; text-shadow: 1px 1px 1px #0f59a4;');
    })();
})();
