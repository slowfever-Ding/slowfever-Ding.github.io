let next = document.getElementById('next')
let continuous = document.getElementById('continuous')
let State = continuous.querySelector('span')


window.onload = () => {
    function getRandomVideos(){
        let randomInt = Math.floor(Math.random() * (99999 - 1 + 1)) + 1;
        let url = `https://v.nrzj.vip/video.php?_t=${randomInt}`
        let setVideoURL = (url) => url
        return setVideoURL(url)
    }
    let randomVideoURL = getRandomVideos()

    const config = {
        "id": "mse", // 选择器 id 播放器实例化的时候需要明确DOM的占位，video将挂载到该DOM下，播放器的尺寸与占位DOM一致，id为容器DOM的id
        "playsinline": true, // 是否启用内联播放模式
        /*"poster": "//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",*/ // 视频封面
        "plugins": [], // 插件配置
        "url": randomVideoURL, // 视频源 url
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
    }

    let player = new Player(config)
    console.log(player)

    next.addEventListener('click',() => {
        player.playNext({
            "url": getRandomVideos(),
        })
    })

    let state = false
    continuous.addEventListener('click',() => {
        State ? (State.innerText === '关' ? (state = true, State.innerText = '开') : (State.innerText = '关', state = false)) : null;
        if (state) {
            // 监听 ended 事件
            player.on('ended', () => {
                player.playNext({
                    "url": getRandomVideos(),
                })
            })
            State.classList.add('textColourRed')
            console.log("监听 ended 事件")
        } else {
            player.off('ended'); // 取消监听 ended 事件
            State.classList.remove('textColourRed')
            console.log("取消监听 ended 事件")
        }
    })

    /*
            player.on('error', (error) => {
                console.log(error)
            })
    */
}
