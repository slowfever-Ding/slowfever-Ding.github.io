import {controlTheme} from "./controlTheme.js"
import {getDataList} from "./getData.js";
import {queryDataId } from "./queryDataId.js";

// controlTheme()
controlTheme()

// getDataList()
let dataList = getDataList('./db/dataList.json')
let recentlyReleasedData = getDataList('./db/recentlyReleased.json')
let allArticlesData = getDataList('./db/allArticles.json')

let onURL = new URL(location.href)
let dataId = Number(onURL.searchParams.get('id'))
let data_r_id = Number(onURL.searchParams.get('r_id'))
let data_a_id = Number(onURL.searchParams.get('a_id'))

// 搜索框
$('.searchButton').on('click', function () {
    $('.search_box_wrap').fadeToggle(500, 'linear', () => console.log('搜索框显示完成'))
})

/**
 * @description 详情渲染模板
 * @param data
 * @returns {HTMLElement}
 */
const renderDataDetails = (data) => {
    if (data !== undefined) {
        /*console.log(data)*/
        // 设置title
        $('title').text(data.title)
        // 设置简介
        let briefIntroduction = `
                <h1 class="fs-3 fw-bolder data_title">${data.title}</h1>
                <p class="my-2 data_text">${data.introduce}</p>                    
            `
        $('.briefIntroduction_box').html(briefIntroduction)
        // 设置内容
        let data_body = data.content.map(item => {
            return `
                    <h5 class="my-2 data_text">${item.content_title}</h5>
                    <p class="my-2 data_text">${item.content_body}</p>
                `
        })
        $('#data_body').html(data_body.join(""))
        let img = $(`<img data-original="${data.image}" alt="" class="img-fluid lazy">`)
        $('.data_body_img').append(img)
    } else {
        console.error("renderDataDetails() 没有数据")
        return $('body').html('<h1 class="fw-bold display-2 position-absolute top-50 start-50 translate-middle">404</h1>')
    }
}

if (dataId !== 0 && dataId !== undefined) {

    dataList.then(response => {
        // 渲染趋向详情数据
        let data_list01 = queryDataId(dataId, response.data)
        renderDataDetails(data_list01)
    })

} else if (data_r_id !== 0 && data_r_id !== undefined) {

    recentlyReleasedData.then(response => {
        // 渲染最近发布-封面详情数据
        let data_list02 = queryDataId(data_r_id, response.cover_inner_data)
        // 渲染最近发布-列表详情数据
        let data_list03 = queryDataId(data_r_id, response.data_list)

        if (data_list02) {
            renderDataDetails(data_list02)
        } else if (data_list03){
            renderDataDetails(data_list03)
        } else {
            console.error("没有数据！")
            $('body').html('<h1 class="fw-bold display-2 position-absolute top-50 start-50 translate-middle">404</h1>')
        }

    })

} else if (data_a_id !== 0 && data_a_id !== undefined) {

    allArticlesData.then(response => {
        // 渲染所有文章-封面详情数据
        let data_list04 = queryDataId(data_a_id, response.cover_inner_data)
        // 渲染所有文章-列表详情数据
        let data_list05 = queryDataId(data_a_id, response.data_list)

        if (data_list04) {
            renderDataDetails(data_list04)
        } else if (data_list05){
            renderDataDetails(data_list05)
        } else {
            console.error("没有数据！")
            $('body').html('<h1 class="fw-bold display-2 position-absolute top-50 start-50 translate-middle">404</h1>')
        }

    })

} else {
    console.error("没有数据！")
    $('body').html('<h1 class="fw-bold display-2 position-absolute top-50 start-50 translate-middle">404</h1>')
}

// 最近发布右边栏渲染
recentlyReleasedData.then(response => {
    let right_column_data = response.data_list.map(item => {
        return `
            <div class="w-100 my-3 item_number position-relative">
                <a href="./details.html?r_id=${item.r_id}" class="d-block py-2 py-lg-2 text-center position-relative">
                    <img data-original="${item.image}" class="rounded-1 w-100 lazy" alt="${item.title}">
                    <p class="item toe-3 my-2 px-1">${item.title}</p>
                </a>
            </div>
        `
    })
    $('.right_sidebar .items_wrap').html(right_column_data.join(""))
})

// 搜索事件
$('#search_form').on('submit', function (event) {
    // 阻止默认提交事件
    event.preventDefault()
    // 修改action
    $('#search_form').attr('action', `./search.html?search=${$('#search_input').val()}`)
    location.href = `./search.html?search=${$('#search_input').val()}`
})

// 页面所有图片加载完毕后，执行
Promise.all([dataList, recentlyReleasedData, allArticlesData]).then(res => {
    /*console.log(res)*/
}).then(() => {
    $(function() {
        $("img.lazy").lazyload({effect: "fadeIn",threshold: 200});
    })
}).catch(err => {
    console.error("加载数据失败", err)
})