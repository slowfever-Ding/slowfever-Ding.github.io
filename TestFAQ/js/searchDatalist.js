import {controlTheme} from "./controlTheme.js"
import {getDataList} from "./getData.js";

// controlTheme()
controlTheme()

// getDataList()
let dataList = getDataList('./db/dataList.json')
let recentlyReleasedData = getDataList('./db/recentlyReleased.json')
let allArticlesData = getDataList('./db/allArticles.json')

let onURL = new URL(location.href)
let search_value = onURL.searchParams.get('search')

// 搜索框
$('.searchButton').on('click', function () {
    $('.search_box_wrap').fadeToggle(500, 'linear', () => console.log('搜索框显示完成'))
})

// 搜索内容
$('.search_content .content_wrap').html('" ' + search_value + ' "')

// 合并所有数据到一个数组中
Promise.all([dataList, recentlyReleasedData, allArticlesData]).then((data) => {
    // 解构赋值 data
    let [ _dataList, _recentlyReleasedData, _allArticlesData] = data
/*
    // 测试数据
    console.log(_dataList)
    console.log(_recentlyReleasedData)
    console.log(_allArticlesData)
*/

    /**
     * @description 合并多个对象
     * @param objects
     * @returns {object|result}
     */
    function mergeObjects(...objects) {
        return objects.reduce((result, current) => {
            // 遍历当前对象的所有字段
            for (let key in current) {
                // 如果结果对象中已经存在这个字段
                if (key in result) {
                    // 自定义合并逻辑，例如将重复字段的值合并为数组
                    if (Array.isArray(result[key])) {
                        // 如果值已经是数组，直接追加到数组中
                        if (Array.isArray(current[key])) {
                            result[key].push(...current[key])
                        } else {
                            result[key].push(current[key])
                        }
                    } else {
                        // 如果值不是数组，将两个值合并为数组
                        result[key] = [result[key], current[key]]
                    }
                } else {
                    // 如果结果对象中不存在这个字段，直接赋值
                    result[key] = current[key]
                }
            }
            return result
        }, {})
    }

    let mergeAllDataResult = mergeObjects(_dataList, _recentlyReleasedData, _allArticlesData)
/*
    // 合并数据结果
    console.log(mergeAllDataResult)
*/

    /**
     * @description 模糊搜索函数
     * @param search_value // 搜索值
     * @param fieldName // 字段名
     * @returns {Array}
     */
    function fuzzySearch(search_value, fieldName) {

        // 确保mergeAllDataResult[fieldName]是一个数组
        if (!Array.isArray(mergeAllDataResult[fieldName])) {
            console.error('mergeAllDataResult[' + fieldName + '] 不是一个数组')
            return []
        }

        // 使用 filter 进行模糊搜索
        return mergeAllDataResult[fieldName].filter(item => {
            return item.title && item.title.toLowerCase().includes(search_value.toLowerCase());
        })
    }

    let searchResults1 = fuzzySearch(search_value,"cover_inner_data")
    let searchResults2 = fuzzySearch(search_value, "data")
    let searchResults3 = fuzzySearch(search_value, "data_list")

    // 搜索结果合并
    let combinedResults = [...searchResults1, ...searchResults2, ...searchResults3]
    /*console.log(combinedResults)*/

    if (combinedResults.length > 0) {
        let idFieldName
        // 渲染数据
        let searchResultData = combinedResults.map(item => {
            if (item.r_id) {
                idFieldName = 'r_id'
            } else if (item.a_id) {
                idFieldName = 'a_id'
            } else {
                idFieldName = 'id'
            }
            return `
                <div class="col-lg-6 col-md-6 col-sm-12 col-12 overflow-hidden items">
                    <a href="./details.html?${idFieldName}=${item[idFieldName]}" class="d-block py-2 py-lg-2 text-center position-relative">
                        <img data-original="${item.image}" width="550" height="250" class="rounded-1 w-100 lazy" alt="">
                        <p class="item toe my-2 px-1">${item.title}</p>
                    </a>
                </div>
            `
        })
        $('#search_result').html(searchResultData.join(""))
    } else {
        // 没有搜索结果
        console.error("没有搜索结果")
        $('#search_result').html("<h1 class='text-center data_title my-3'>没有搜索结果</h1>")
    }

}).then(res => {
    // console.log(res)
    $(function() {
        $("img.lazy").lazyload({effect: "fadeIn",threshold: 200});
    })
}).catch(err => {
    console.error('处理数据时发生错误:',err)
    $('body').html('<h1 class="fw-bold display-2 position-absolute top-50 start-50 translate-middle">404</h1>')
})

// 搜索事件
$('#search_form').on('submit', function (event) {
    // 阻止默认提交事件
    event.preventDefault()
    // 修改action
    $('#search_form').attr('action', `./search.html?search=${$('#search_input').val()}`)
    location.href = `./search.html?search=${$('#search_input').val()}`
})