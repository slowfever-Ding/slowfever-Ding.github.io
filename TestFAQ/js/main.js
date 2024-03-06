import {controlTheme} from "./controlTheme.js"
import {getDataList} from "./getData.js";

// controlTheme()
controlTheme()

// getDataList()
let dataList = getDataList('./db/dataList.json')
let recentlyReleasedData = getDataList('./db/recentlyReleased.json')
let allArticlesData = getDataList('./db/allArticles.json')

// Trending
dataList.then(res => {
    // console.log(res.data)
    let data_structure = res.data.map(item => {
        return `
              <div class="col-lg-item d-flex flex-lg-row flex-column my-lg-2 my-2 item px-0 rounded-1">
                <div class="data_coverImage clickable overflow-hidden rounded-1 rounded-end-0 skeleton-img position-relative" title="${item.title}">
                    <a href="./details.html?id=${item.id}" data-id="${item.id}">
                        <img src="${item.image}" class="img-fluid" alt="${item.title}">
                    </a>
                </div>
                <div class="flex-1 toe-6">
                    <a href="./details.html?id=${item.id}" class="px-2">${item.title}</a>
                </div>
            </div>
        `
    })

    // 渲染模板数据
    $('#data_list_wrap').html(data_structure.join(""))

    // 点击获取data-id，根据data-id跳转指定详情页
    $('#data_list_wrap .data_coverImage').on('click', function () {
        location.href = "./details.html?id=" + $(this).find('a').attr('data-id')
    })
})

// Recently Published
recentlyReleasedData.then(res => {
    // 封面数据
    let cover_inner_data = {...res.cover_inner_data[0]}
    let cover_template = `
        <div class="w-100 px-0 px-lg-2 my-3">
            <div class="w-100 py-2 py-lg-2">
                <div class="project newData_item rounded-1">
                    <div class="project__card">
                        <a href="./details.html?r_id=${cover_inner_data.r_id}" class="project__image ">
                            <img src="${cover_inner_data.image}" width="450" height="350" class="rounded-1" alt="${cover_inner_data.title}">
                        </a>
                        <div class="project__detail">
                            <h2 class="project__title text-white px-2 toe"><a href="javascript: void (0)">${cover_inner_data.title}</a></h2>
                            <small class="project__category text-white toe-4"><a href="javascript: void (0)">${cover_inner_data.introduce}</a></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    $('#latestRelease_box .left_col_box').html(cover_template)
    let data_list = res.data_list.map(item => {
        return `
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 overflow-hidden items">
                <a href="./details.html?r_id=${item.r_id}" class="d-block py-2 py-lg-2 text-center position-relative">
                    <img src="${item.image}" class="rounded-1 w-100 img-fluid" alt="${item.title}">
                    <p class="item toe my-2 px-1">${item.title}</p>
                </a>
            </div>
        `
    })
    $('#latestRelease_box .right_col_box .items_wrap').html(data_list.join(""))
    /* 3D效果 */
    $(function () {
        $(document).ready(function(){
            $(".project").hover3d({
                selector: ".project__card",
                shine: true,
            });
        });
    })
})

// ALL Articles
allArticlesData.then(res => {
    // 封面数据
    let cover_inner_data = {...res.cover_inner_data[0]}
    let cover_template = `
        <div class="w-100 px-0 px-lg-2 my-3">
            <div class="w-100 py-2 py-lg-2">
                <div class="project newData_item rounded-1">
                    <div class="project__card">
                        <a href="./details.html?a_id=${cover_inner_data.a_id}" class="project__image ">
                            <img src="${cover_inner_data.image}" width="1020" height="450" class="rounded-1" alt="">
                        </a>
                        <div class="project__detail">
                            <h2 class="project__title text-white px-2 toe"><a href="javascript: void (0)">${cover_inner_data.title}</a></h2>
                            <small class="project__category text-white toe-4"><a href="javascript: void (0)">${cover_inner_data.introduce}</a></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    $('#allArticles_box .left_col_box').html(cover_template)
    let data_list = res.data_list.map(item => {
        return `
            <div class="col-lg-12 col-md-6 col-sm-12 col-12 overflow-hidden items">
                <a href="./details.html?a_id=${item.a_id}" class="d-block py-2 py-lg-2 text-center position-relative">
                    <img src="${item.image}" width="550" height="125" class="rounded-1 w-100 img-fluid" alt="">
                    <p class="item toe my-2 px-1">${item.title}</p>
                </a>
            </div>
        `
    })
    $('#allArticles_box .right_col_box .items_wrap').html(data_list.join(""))
})