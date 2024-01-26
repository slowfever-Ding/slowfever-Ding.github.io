let mySearch = document.getElementById('mySearch');
let list = document.getElementById('list');
let next = document.getElementById('next');
let milf = document.getElementById('milf');


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
        mya[i].href = `https://www.baidu.com/s?ie=utf-8&csq=1&pstg=20&mod=2&isbd=1&cqid=ace6d35e00005791&istc=86
                1&ver=RAoaGdUEPb0aje7bpqHNz39Y20ZzXC7NEYW&chk=65af8e7f&isid=A29474E1B2C34920&wd=${mya[i].innerText}&rsv_sp
                t=1&rsv_iqid=0xc65ea49500044067&issp=1&f=3&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_d
                l=ts_0&rsv_sug3=5&rsv_sug1=1&rsv_sug7=100&rsv_sug2=1&rsv_btype=i&prefixsug=df&rsp=0&inputT=1183&rsv_sug4
                =206180&f4s=1&_ck=139008.0.-1.-1.-1.-1.-1&rsv_isid=38499_40043_39938_39662&isnop=1&rsv_stat=-2&rsv_bp=1`
    }

}

window.onload = function () {

    const apiUrl = 'https://api.waifu.im/search';  // Replace with the actual API endpoint URL
    let params = {
        included_tags: 'maid',
        height: '>=2000'
    };
    let queryParams = new URLSearchParams(params);
    let requestUrl = `${apiUrl}?${queryParams}`;

    // 下一张
    next.onclick = function () {
        getBackgroundImage()
    }

    // milf
    milf.onclick = function () {
        params = {
            included_tags: 'milf',
        }
        let queryParams = new URLSearchParams(params);
        let requestUrl = `${apiUrl}?${queryParams}`;
        let typeConversion = () => {
            fetch(requestUrl)
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
                    let test = data.images.map((value) => {
                        return value
                    })
                    console.log(test[0].url)
                    document.body.style.backgroundImage = `url(${test[0].url})`;
                })
                .catch(error => {
                    console.log(error)
                });
        }
        typeConversion()
    }


    function getBackgroundImage() {
        fetch(requestUrl)
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
                let test = data.images.map((value) => {
                    return value
                })
                console.log(test[0].url)
                document.body.style.backgroundImage = `url(${test[0].url})`;
            })
            .catch(error => {
                console.log(error)
            });
    }

    getBackgroundImage()

}

let ua=navigator.userAgent; /Safari|iPhone/i.test(ua)&&0==/chrome/i.test(ua)&&$("#aside-nav").addClass("no-filter");
let drags={down:!1,x:0,y:0,winWid:0,winHei:0,clientX:0,clientY:0},
    asideNav=$("#aside-nav")[0],
    getCss=function(a,e){return a.currentStyle?a.currentStyle[e]:document.defaultView.getComputedStyle(a,!1)[e]};
$("#aside-nav").on("mousedown",function(a){
    drags.down=!0,
        drags.clientX=a.clientX,
        drags.clientY=a.clientY,
        drags.x=getCss(this,"right"),
        drags.y=getCss(this,"top"),
        drags.winHei=$(window).height(),
        drags.winWid=$(window).width(),
        $(document).on("mousemove",function(a){
            if(drags.winWid>640&&(a.clientX<120||a.clientX>drags.winWid-50))//50px
                return !1 /*,console.log(!1)*/;
            if(a.clientY<180||a.clientY>drags.winHei-120)//导航高度
                return!1;
            let e=a.clientX-drags.clientX,
                t=a.clientY-drags.clientY;
            asideNav.style.top=parseInt(drags.y)+t+"px";
            asideNav.style.right=parseInt(drags.x)-e+"px";
        })
}).on("mouseup",function(){drags.down=!1,$(document).off("mousemove")});


