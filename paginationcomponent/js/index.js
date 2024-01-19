let search = document.getElementById('search')
let btn = document.getElementById('btn')

class HandlingDataConstructors {
    constructor(element,search) {
        if (search) {
            this.search = search
        } else {
            this.search = 'milf'
        }

        this.ul = document.getElementById(element)
        this.dataArr = ['videos', 'pornstars', 'tags']
        this.page = 0

        this.testUrl = 'https://content.adspy.com/5GK9ShZf9HooUNJY.jpg'

        // 数据列表
        this.DataLists = []
        this.init()
    }

    async init() {
        let info = await this.getDataLists()
        /*console.log(info) // 打印返回响应结果*/

        if (info.scenes.length === 0) {
            alert('没有找到你想要的内容，换个关键词试试吧。')
            await this.paging()
            $("#loader_container").fadeOut();
        } else {
            this.DataLists = info
            this.rendering()
            await this.paging()
            $("#loader_container").fadeOut();
        }

    }

    rendering(){
        /*console.log(this.DataLists) // 测试是否有数据*/
        let myTest = this.DataLists.scenes.map(item => {
            // return `<li><a href="${item.url}" target="_blank"><img class="items skeleton-img" src="${item.preview}" width="150" height="150" title="${item.title}" alt="${item.title}"/></a></li>`;
            return `<li><a href="${item.url}" target="_blank"><img class="items" src="${this.testUrl}" width="150" height="150" title="${item.title}" alt="${item.title}"/></a></li>`;
        });
        this.ul.classList.add("dataLists")
        this.ul.innerHTML = myTest.join('')
    }

    async paging(){
        let info = await this.getDataLists()
        /*console.log(info.pagination) // 测试是否有分页数据*!/*/

        if (info.scenes.length === 0) {
            $("#pagingBox").bs_pagination({
                currentPage: 0, // 初始页码
                totalPages: 1, // 总页数
                rowsPerPage: 0, // 每页行数
                maxRowsPerPage: 0, // 每页最大行数
                totalRows: 0, // 总数据
            });
        }else {
            $(() => {
                $("#pagingBox").bs_pagination({
                    currentPage: info.pagination.current_page, // 初始页码
                    totalPages: info.pagination.last_page, // 总页数
                    rowsPerPage: info.pagination.per_page, // 每页行数
                    maxRowsPerPage: 20, // 每页最大行数
                    totalRows: info.pagination.total, // 总数据
                    onChangePage: async (page_num, rows_per_page) => { // returns page_num and rows_per_page after a link has clicked
                        /*console.log(page_num,rows_per_page.currentPage)*/
                        $("#loader_container").fadeIn();
                        this.page = rows_per_page.currentPage
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                        await this.init()
                    }
                });
            })
        }

    }

    async getDataLists() {
        try {
            const response = await fetch(`https://www.jsonpornapi.com/api/${this.dataArr[0]}?search=${this.search}&page=${this.page}`, {
                async: true,
                crossDomain: true,
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer 30|SxSxrYqZMVVlDcB4NC0gWrM6qInK5apxsJC5KGg0039d7576',
                }
            });

            if (response.ok) {
                return await response.json()
            } else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

}

let test01 = new HandlingDataConstructors("dataLists");

btn.addEventListener('click', function () {
    $("#loader_container").fadeIn();
    if (search.value === '') {
        test01.search = 'milf'
        test01.page = 0
    } else {
        test01.search = search.value
        test01.page = 0
    }
    test01.init()
})