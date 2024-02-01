let mySearch = document.getElementById('mySearch');
let list = document.getElementById('list');
let next = document.getElementById('next');
let typeSelection = document.getElementById('typeSelection');
let type_selection_button = document.getElementById('type_selection_button');
let download_button = document.getElementById('download_button');

// 搜索提示
mySearch.oninput = function (event) {
    /*console.log(event.target.value)*/

    if (event.target.value === "" || event.target.value.replace(/(^\s*)|(\s*$)/g, "") === "") {
        list.classList.remove('listsBackground')
        list.innerHTML = ""
        return
    }

    let scriptElement = document.createElement('script');
    scriptElement.src = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=39998
            ,40043,39938,39662&wd=${event.target.value}&req=2&csor=3&pwd=ne&cb=test&_=1706002693521;`

    document.body.appendChild(scriptElement)
    scriptElement.onload = function () {
        // 执行完成删除script标签
        scriptElement.remove()
    }
}

function test(obj) {
    console.log(obj.g)
    if (obj.g === undefined) return
    let data = obj.g.map((value) => {
        return `<li>
                        <a href=""
                           target="_blank">
                           ${value.q}
                        </a>
                    </li>`
    })
    list.innerHTML = data.join('')
    list.classList.add('listsBackground')

    let mya = list.querySelectorAll('a')
    for (let i = 0; i < mya.length; i++) {
        mya[i].href = `https://www.baidu.com/s?wd=${mya[i].innerText}$ie=utf-8&rsv_spt=1`
    }

}


// 右下角菜单
let ua = navigator.userAgent;
/Safari|iPhone/i.test(ua) && 0 == /chrome/i.test(ua) && $("#aside-nav").addClass("no-filter")
let drags = {down: !1, x: 0, y: 0, winWid: 0, winHei: 0, clientX: 0, clientY: 0},
    asideNav = $("#aside-nav")[0],
    getCss = function (a, e) {
        return a.currentStyle ? a.currentStyle[e] : document.defaultView.getComputedStyle(a, !1)[e]
    }
$("#aside-nav").on("mousedown", function (a) {
    drags.down = !0,
        drags.clientX = a.clientX,
        drags.clientY = a.clientY,
        drags.x = getCss(this, "right"),
        drags.y = getCss(this, "top"),
        drags.winHei = $(window).height(),
        drags.winWid = $(window).width(),
        $(document).on("mousemove", function (a) {
            if (drags.winWid > 640 && (a.clientX < 120 || a.clientX > drags.winWid - 50))//50px
                return !1 /*,console.log(!1)*/;
            if (a.clientY < 180 || a.clientY > drags.winHei - 120)//导航高度
                return !1;
            let e = a.clientX - drags.clientX,
                t = a.clientY - drags.clientY;
            asideNav.style.top = parseInt(drags.y) + t + "px";
            asideNav.style.right = parseInt(drags.x) - e + "px";
        })
}).on("mouseup", function () {
    drags.down = !1, $(document).off("mousemove")
})



// 背景图像功能
class BackgroundImageFunction{
    constructor() {
        this.bgImg = document.body
        // 定义一个数组 来存 tags 参数
        this.arr = [
            'waifu',
            'maid',
            'marin-kitagawa',
            'mori-calliope',
            'raiden-shogun',
            'oppai',
            'selfies',
            'uniform',
            'ero',
            'ass',
            'hentai',
            'milf',
            'oral',
            'paizuri',
            'ecchi'
        ]
        this.arrItem = JSON.stringify(this.arr[0]) // 默认数组下标0第一项 ‘maid’
        // 去除属性名两侧的双引号，将数组下标0第一项 ‘maid’存入localStorage
        localStorage.setItem('tags', this.arrItem.replace(/"/g, ''))
        /*console.log(JSON.stringify(arr[0]))*/
        // 调用初始化方法
        let promise = this.init();
        console.log(promise)
    }

    // 初始化
    async init(){
        this.set_included_tag()
        console.log(this.set_included_tag())
        await this.setBackgroundImage()
    }

    // 设置当前背景图片类型
    set_included_tag(){
        // 从 localStorage 中取当前存入的值
        this.tags = localStorage.getItem('tags')
        return {
            included_tags: this.tags,
            height: ">=2000"
        };
    }

    // 请求获取背景图片
    async getBackgroundImage(){
        this.apiUrl = 'https://api.waifu.im/search' // Replace with the actual API endpoint URL
        this.queryParams = new URLSearchParams(this.set_included_tag())
        this.requestUrl = `${this.apiUrl}?${this.queryParams}`
        return await fetch(this.requestUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText
                    })
                }
            })
            .then(data => {
                return data
            })
            .catch(error => {
                console.log(error)
            })
    }

    // 设置背景图片
    async setBackgroundImage(){
        // 获取背景图片
        this.data = await this.getBackgroundImage()
        this.result = this.data.images.map((item) => {
            return item
        })
        console.log(this.result[0].url)
        this.bgImg.style.backgroundImage = `url(${this.result[0].url})`
    }
}

let background_image_function = new BackgroundImageFunction()

// 渲染类型切换列表
typeSelection.innerHTML = background_image_function.arr.map((item, index) => {
    return `<option value="${index}">${item}</option>`
}).join('')

// 类型切换操作
type_selection_button.addEventListener('click', async () => {
    let index = typeSelection.selectedIndex;
    let recordIndex = Number(typeSelection.options[index].value)
    console.log(recordIndex)
    background_image_function.arrItem = JSON.stringify(background_image_function.arr[recordIndex])
    localStorage.setItem('tags', background_image_function.arrItem.replace(/"/g, '')) // 去除属性名两侧的双引号
    await background_image_function.init()
})

// 下一张
next.onclick = async function () {
    await background_image_function.init()
}

// 下载当前背景 (显示当前背景图片)
download_button.onclick = async () => {
    const BackgroundImageUrl = background_image_function.result[0].url
    // 创建下载链接并模拟点击
    function downloadBackground() {
        const downloadLink = document.createElement('a')
        downloadLink.target = '_blank'
        downloadLink.href = BackgroundImageUrl
        downloadLink.download = 'background_image.png'
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }
    downloadBackground()
}