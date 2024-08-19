// ==UserScript==
// @name         Image Downloader Script
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  下载网页上的图片并保存到本地
// @author       slowFever
// @match        *://*/*
// @grant        GM.xmlHttpRequest
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
        return imgNodes;
    }

    // 下载单张图片的函数
    function downloadImage(url, name) {
        GM.xmlHttpRequest({
            method: 'GET',
            url: url,
            responseType: 'blob',
            onload: function(response) {
                const blob = response.response;
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
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
    window.downloadImagesSequentially = downloadImagesSequentially;
    window.getDocumentImgNode = getDocumentImgNode;

    // 提示用户可以通过控制台调用函数
    console.log('已加载图像下载器脚本。使用控制台调用带有所需图像节点的方法 downloadImagesSequentially(getDocumentImgNode(img节点))');
})();
