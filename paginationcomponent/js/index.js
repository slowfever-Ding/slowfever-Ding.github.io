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

        // 数据列表
        this.DataLists = []
        this.init()
    }

    init() {
        this.getDataLists().then(res => {
            console.log(res) // 打印返回响应结果
            this.DataLists = res
            this.rendering()
            this.paging()
        })
    }

    rendering(){
        /*console.log(this.DataLists) // 测试是否有数据*/
        let myTest = this.DataLists.scenes.map(item => {
            return `<li><a href="${item.url}" target="_blank"><img class="items" src="${item.preview}" width="100" height="100" title="${item.title}" alt="${item.title}"/></a></li>`;
        });
        this.ul.classList = "dataLists"
        this.ul.innerHTML = myTest.join('')
    }

    paging(){
        this.getDataLists().then(res => {
            /*console.log(res.pagination) // 测试是否有分页数据*/

            if (res.scenes.length !== 0) {
                $(() => {
                    $("#pagingBox").bs_pagination({
                        currentPage: res.pagination.current_page, // 初始页码
                        totalPages: res.pagination.last_page, // 总页数
                        rowsPerPage: res.pagination.per_page, // 每页行数
                        maxRowsPerPage: 20, // 每页最大行数
                        totalRows: res.pagination.total, // 总数据
                        onChangePage: (page_num,rows_per_page) =>{ // returns page_num and rows_per_page after a link has clicked
                            /*console.log(page_num,rows_per_page.currentPage)*/
                            this.page = rows_per_page.currentPage
                            this.init()
                        }
                    });
                })
            }else {
                console.log("没有数据")
                $("#pagingBox").bs_pagination({
                    currentPage: 0, // 初始页码
                    totalPages: 1, // 总页数
                    rowsPerPage: 0, // 每页行数
                    maxRowsPerPage: 0, // 每页最大行数
                    totalRows: 0, // 总数据
                });
            }

        })
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

btn.addEventListener('click',function () {

    if (search.value === '') {
        test01.search = 'milf'
    } else {
        test01.search = search.value
    }

    test01.init()
})
