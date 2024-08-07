<template>
  <div class="text-white position-relative z-3 d-flex w-100 h-100">
    <div class="w-100 h-100 container py-2 d-flex flex-column justify-content-around m-auto">
      <div id="JavDB-head" class="rounded w-100" ref="JavDBHead">
        <h1 class="w-100 text-center py-2 px-2 border-bottom fw-bolder">{{ title }}</h1>
          <div class="option-box my-2 py-2 text-lg-start text-center">
            <!-- 触发queryData方法来加载数据 -->
            <!-- /db/JavDB.json -->
            <a class="item my-lg-0 my-2 btn btn-primary" href="javascript: void (0);" @click="queryData('https://slowfever-ding.github.io/javdbnumberdatabase/db/JavDB.json');">番号清单</a>
            <a class="item my-lg-0 my-2 btn btn-primary" href="javascript: void (0);" @click="queryData('https://slowfever-ding.github.io/javdbnumberdatabase/db/series.json');">系列清单</a>
          </div>
      </div>
      <DataView
        v-if="isShowJavDBDataList"
        :style="{ height: JavDBDataListHeight }"
        :JavDBDataList="renderSearchData"
      >
      </DataView>
      <SearchBar v-if="isShowSearchBar" @searchEvent="handleSearchEvent"></SearchBar>
    </div>
  </div>
</template>

<script>
import DataView from '@/views/DataView'
import SearchBar from '@/components/SearchBar'

export default {
  data () {
    return {
      title: 'JavDB番号收藏数据库', // 页面标题
      JavDBDataList: {}, // 用于存储数据
      JavDBDataListHeight: 'auto', // 显示数据列表元素的高度
      isShowSearchBar: false, // 是否显示搜索栏
      SearchBar: {
        search: '' // 搜索数据
      }
    }
  },
  components: {
    DataView,
    SearchBar
  },
  mounted () {
    setTimeout(() => {
      this.$emit('loadingEvent', false)
    }, 2500)
  },
  updated () {
    // 当显示数据列表时，显示搜索栏
    if (this.isShowJavDBDataList) this.isShowSearchBar = true
  },
  methods: {
    queryData (url) {
      this.$emit('loadingEvent', true) // 显示加载动画
      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.JavDBDataList = data
          this.$nextTick(() => {
            this.adjustDataListHeight() // 初始化时调整高度
            window.addEventListener('resize', this.adjustDataListHeight) // 监听窗口大小变化
          })
        })
        .catch(err => {
          console.log(err)
        })
        // 无论响应成功与否，都执行finally方法
        .finally(() => {
          setTimeout(() => {
            this.$emit('loadingEvent', false)
          }, 1000)
        })
    },
    // 调整数据列表高度方法
    adjustDataListHeight () {
      const headTitleHeight = this.$refs.JavDBHead.offsetHeight
      const containerHeight = document.body.offsetHeight // 获取整个文档的高度

      if (containerHeight > headTitleHeight) {
        this.JavDBDataListHeight = `${(containerHeight - headTitleHeight) - 50}px` // 调整高度并留出一定空间
      } else {
        this.JavDBDataListHeight = 'auto' // 如果容器高度小于JavDBHead高度，则恢复自动高度
      }
    },
    // 搜索事件方法
    handleSearchEvent (value) {
      console.log('当前搜索：', value)
      this.SearchBar.search = value

      console.log('原始数据：', this.JavDBDataList)
      console.log('搜索到的数据：', this.renderSearchData)
    }
  },
  computed: {
    // 计算是否显示数据列表
    isShowJavDBDataList () {
      return Object.keys(this.JavDBDataList).length > 0
    },
    // 渲染搜索过滤数据
    renderSearchData () {
      const searchTerm = this.SearchBar.search.toLowerCase().toString() // 获取搜索词
      const filtered = {} // 创建一个空对象用于存储过滤后的数据

      Object.keys(this.JavDBDataList).forEach(key => {
        const filteredValues = this.JavDBDataList[key].filter(item => {
          // 将每个字段都转换为小写，并转换为字符串
          const fanhao = (item.fanhao || '').toLowerCase().toString()
          const title = (item.title || '').toLowerCase().toString()
          const content = (item.content || '').toLowerCase().toString()

          // 检查每个字段是否包含搜索词
          return fanhao.includes(searchTerm) || title.includes(searchTerm) || content.includes(searchTerm)
        })

        // 仅在过滤后的数组不为空时将其添加到 filtered 对象中
        if (filteredValues.length > 0) {
          filtered[key] = filteredValues
        }
      })
      return filtered
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.adjustDataListHeight) // 在组件销毁前移除事件监听
  }
}
</script>

<style lang="scss" scoped>
#JavDB-head {
    backdrop-filter: blur(8px) saturate(200%);
    -webkit-backdrop-filter: blur(8px) saturate(200%);
    background-color: rgba(255, 255, 255, 0.35);
    border: 1px solid rgba(209, 213, 219, 0.3);
}
.option-box .item {
    display: inline-block;
    padding: 0.7em 1.7em;
    font-size: 1.0625rem;
    cursor: pointer;
    text-decoration: none;
    margin: 0 8px;
}
</style>
