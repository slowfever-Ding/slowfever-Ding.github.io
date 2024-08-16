<template>
    <div id="JavDB-dataList" class="w-100 py-3 rounded container overflow-y-scroll">
        <ul class="p-0 m-0 w-100 h-100">
            <template v-if="isShowJavDBDataList">
                <!-- 外部循环遍历 db 中的每个键值对 -->
                <li v-for="(values, key) in JavDBDataList" :key="key">
                    <h2 class="fw-bolder fs-3 text-red my-2 text-center">{{ key }}：</h2>
                    <ul class="p-0 m-0">
                        <!-- 内部循环遍历每个键对应的值的列表 -->
                        <li v-for="(value, index) in values" :key="index">
                            <!-- 根据 value.fanhao 是否存在来展示不同内容 -->
                            <template v-if="value.fanhao">
                                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-3 shadow-sm position-relative">
                                    <div class="col-auto d-none d-lg-block overflow-hidden">
                                        <img src="loading.gif" width="225" ref="javdbCover" :data-src="value.cover" :alt="value.title" class="h-100 img-fluid">
                                    </div>
                                    <div class="col p-4 d-flex flex-column">
                                        <h3 class="mb-2">{{ value.fanhao }}</h3>
                                        <p class="card-text">{{ value.title }}</p>
                                    </div>
                                </div>
                                <hr>
                            </template>
                            <template v-else>
                                <div class="g-0 border rounded overflow-hidden flex-md-row mb-3 shadow-sm">
                                  <div class="p-4">
                                    <h3 class="my-2">{{ value.content }}</h3>
                                  </div>
                                </div>
                                <hr>
                            </template>
                        </li>
                    </ul>
                </li>
            </template>
            <template v-else>
                <h2 class="text-center">暂无数据</h2>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    JavDBDataList: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 图片懒加载
    lazyImageLoading () {
      if (!this.observer) {
        this.observer = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              console.count('观察器')
              const img = entry.target
              img.src = img.dataset.src
              this.observer.unobserve(img) // 图片加载后取消观察
            }
          }
        }, {
          root: null, // 根元素
          rootMargin: '0px', // 根元素与视窗之间的距离
          threshold: 0.5 // 触发交叉的阈值
        })
      }

      // 判断 this.$refs.javdbCover 不等于 undefined
      if (this.$refs.javdbCover !== undefined) {
        this.$refs.javdbCover.forEach(item => {
          if (item.dataset.src) { // 只观察还没加载的图片
            this.observer.observe(item)
          }
        })
      }
    }
  },
  computed: {
    // 判断是否显示数据列表
    isShowJavDBDataList () {
      return Object.keys(this.JavDBDataList).length > 0
    }
  },
  mounted () {
    this.lazyImageLoading()
  },
  updated () {
    this.lazyImageLoading()
  },
  beforeDestroy () {
    if (this.observer) {
      this.observer.disconnect() // 组件销毁时断开观察器
    }
  }
}
</script>

<style lang="scss" scoped>
.text-red {
    color: #ff0000;
}
#JavDB-dataList {
    backdrop-filter: blur(8px) saturate(200%);
    -webkit-backdrop-filter: blur(8px) saturate(200%);
    background-color: rgba(255, 255, 255, 0.35);
    border: 1px solid rgba(209, 213, 219, 0.3);
    /* 定义滚动条样式 */
    &::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
        background-color: rgb(255, 255, 255);
        border-radius: 0.375rem;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
        box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
        border-radius: 8px;
        background-color: rgba(240, 240, 240, .5);
    }

    /*定义滑块 内阴影+圆角*/
    &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 0px rgb(148, 176, 239);
        box-shadow: inset 0 0 0px rgb(148, 176, 239);
        background-color: rgb(13, 110, 253);
    }
}
</style>
