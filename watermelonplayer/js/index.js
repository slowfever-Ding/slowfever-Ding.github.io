// 定义视频链接数组对象
const urls = [
    {
        value: '//v.nrzj.vip/video.php',
        label: '风骚熟女1'
    },
    {
        value: '//api.suyanw.cn/api/xjj/api.php',
        label: '风骚熟女2'
    },
    {
        value: '//api.yujn.cn/api/zzxjj.php',
        label: '小姐姐视频1'
    },
    {
        value: '//jiejie.uk/xjj/tiktok/video2.php',
        label: '小姐姐视频2'
    },
    {
        value: '//api.szcyyds.icu/api/yy',
        label: '小姐姐视频3'
    },
    {
        value: '//www.yujn.cn/api/yuzu.php',
        label: '小姐姐视频4'
    },
    {
        value: '//api.yujn.cn/api/ksxjjsp.php',
        label: '小姐姐视频5'
    },
    {
        value: '//www.hhlqilongzhu.cn/api/MP4_xiaojiejie.php',
        label: '小姐姐视频6'
    },
    {
        value: '//api.yujn.cn/api/manzhan.php',
        label: 'Cosplay 视频'
    },
    {
        value: '//api.yujn.cn/api/COS.php',
        label: 'COS 系列'
    },
    {
        value: '//www.yujn.cn/api/tianmei.php',
        label: '甜妹视频'
    },
    {
        value: '//www.yujn.cn/api/jksp.php',
        label: 'JK 视频'
    },
    {
        value: '//www.yujn.cn/api/ndym.php',
        label: '你的欲梦'
    },
    {
        value: '//www.yujn.cn/api/sbkl.php',
        label: '双倍快乐'
    },
    {
        value: '//www.yujn.cn/api/rewu.php',
        label: '热舞系列'
    },
    {
        value: '//www.yujn.cn/api/luoli.php',
        label: '萝莉系列'
    },
    {
        value: '//www.yujn.cn/api/manhuay.php',
        label: '漫画芋'
    },
    {
        value: '//www.yujn.cn/api/shejie.php',
        label: '蛇姐系列'
    },
    {
        value: '//jkapi.com/api/xjj_video?apiKey=d64462f800c334673a29742711e1314b&',
        label: '美女变装'
    },
    {
        value: '//api.yujn.cn/api/xjj.php',
        label: '美女视频'
    },
    {
        value: '//api.yujn.cn/api/heisis.php',
        label: '随机黑丝'
    },
    {
        value: '//api.yujn.cn/api/baisis.php',
        label: '随机白丝'
    },
    {
        value: '//api.yujn.cn/api/juhexjj.php',
        label: '各类小姐姐'
    },
    {
        value: '//api.yujn.cn/api/chuanda.php',
        label: '穿搭系列'
    },
    {
        value: '//api.yujn.cn/api/wmsc.php',
        label: '完美身材'
    },
    {
        value: '//api.yujn.cn/api/shwd.php',
        label: '丝滑舞蹈'
    },
    {
        value: '//api.yujn.cn/api/hanfu.php',
        label: '汉服古风'
    },
    {
        value: '//api.yujn.cn/api/manyao.php',
        label: '慢摇系列'
    },
    {
        value: '//api.yujn.cn/api/jpmt.php',
        label: '玉足系列'
    },
    {
        value: '//api.yujn.cn/api/diaodai.php',
        label: '吊带系列'
    },
    {
        value: '//api.yujn.cn/api/qingchun.php',
        label: '清纯系列'
    },
    {
        value: '//api.yujn.cn/api/nvgao.php',
        label: '纯情女高系列'
    },
    {
        value: '//api.yujn.cn/api/jiepai.php',
        label: '街拍系列'
    },
    {
        value: '//api.yujn.cn/api/ksbianzhuang.php',
        label: '快手变装系列'
    },
    {
        value: '//api.heylie.cn/api/video?v=xq&',
        label: '美女视频'
    }
];

// 封装函数：创建并渲染选择框
function renderSelect(urls) {
    const selectElement = document.createElement('select');
    selectElement.id = 'urlSelect';

    // 获取存储的 URL 或者默认 URL
    const savedUrl = localStorage.getItem('selectedUrl') || urls[0].value;

    urls.forEach((url) => {
        const optionElement = document.createElement('option');
        optionElement.value = url.value;
        optionElement.textContent = url.label;
        if (url.value === savedUrl) {
            optionElement.selected = true; // 默认选中存储的 URL
        }
        selectElement.appendChild(optionElement);
    });

    // 添加到页面中
    document.querySelector('.select-wrapper').appendChild(selectElement);

    // 监听 select 变化时更新 localStorage
    selectElement.addEventListener('change', (event) => {
        localStorage.setItem('selectedUrl', event.target.value);
        // 切换源时自动播放新源的视频
        initializePlayer(event.target.value);
    });
}

// 封装函数：获取随机视频 URL
function getRandomVideoURL() {
    let randomInt = Math.floor(Math.random() * 10000) + 1; // 生成1到10000的随机整数

    // 获取存储的 URL 或者默认 URL
    const selectedUrl = localStorage.getItem('selectedUrl') || urls[0].value;

    // 拼接随机数参数
    return `${selectedUrl}?_t=${randomInt}`;
}

// 封装函数：初始化播放器
function initializePlayer() {
    const config = {
        "id": "mse", // 选择器 id 播放器实例化的时候需要明确DOM的占位，video将挂载到该DOM下，播放器的尺寸与占位DOM一致，id为容器DOM的id
        "playsinline": true, // 是否启用内联播放模式
        "poster": "//api.yujn.cn/api/yht.php", // 视频封面
        "plugins": [], // 插件配置
        "url": getRandomVideoURL(), // 视频源 url
        "pip": true, // 是否开启画中画
        "autoplay": true, // 是否自动播放
        "width": 500, // 播放器宽度
        "fluid": true, // 是否启用流式布局
        "lang": "zh", // 语言
        "controls": {
            "mode": "flex", // 控制栏模式，normal || flex || bottom
        },
        "dynamicBg": {
            "disable": false, // 动态背景高斯模糊渲染插件
        },
        "ignores": ["cssfullscreen"], // 禁用插件
    };

    let player = new Player(config);

    // 监听 "next" 按钮
    document.getElementById('next').addEventListener('click', () => {
        player.playNext({
            "url": getRandomVideoURL(),
        });
    });

    let state = false;
    document.getElementById('continuous').addEventListener('click', () => {
        const State = document.querySelector('#continuous span');
        state = !state;
        State.innerText = state ? '开' : '关';
        if (state) {
            player.on('ended', () => {
                player.playNext({
                    "url": getRandomVideoURL(),
                });
            });
            State.classList.add('textColourRed');
        } else {
            player.off('ended');
            State.classList.remove('textColourRed');
        }
    });

    // 监听 error 事件
    player.on('error', () => {
        player.playNext({
            "url": getRandomVideoURL(),
        });
    });
}

// 初始化页面逻辑
window.onload = () => {
    renderSelect(urls);  // 渲染选择框
    initializePlayer();   // 初始化播放器
};
