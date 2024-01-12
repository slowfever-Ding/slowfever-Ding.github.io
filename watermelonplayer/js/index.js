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
        "id": "mse",
        "playsinline": true,
        /*"poster": "//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",*/
        "plugins": [],
        "url": randomVideoURL,
        "pip": true,
        "autoplay": true,
        "width": 500,
        "fluid": true,
        "lang": "zh",
        "controls": {
            "mode": "flex"
        },
        "dynamicBg": {
            "disable": false
        }
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
