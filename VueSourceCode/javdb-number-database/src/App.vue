<template>
  <div id="app" class="w-100 h-100">
    <JavdbLoading v-if="loveLoading"></JavdbLoading>
    <HomeView @loadingEvent="handleLoadingEvent"></HomeView>
  </div>
</template>

<script>
// @ 是 /src 的别名
import JavdbLoading from '@/components/JavdbLoading'
import HomeView from '@/views/HomeView'

export default {
  data () {
    return {
      loveLoading: true // 是否显示加载动画
    }
  },
  components: {
    JavdbLoading,
    HomeView
  },
  methods: {
    handleLoadingEvent (value) {
      console.log('isShowLoveLoading：', value)
      this.loveLoading = value
    }
  }
}
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

body {
  width: 100%;
  height: 100vh;
  position: relative;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  background-image: url('/public/bg.png');
  -o-background-size: cover;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

body:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: .3;
    background: -webkit-radial-gradient(#d2f1df, #d3d7fa, #bad8f4) 0 0/400% 400%;
    background: -moz-radial-gradient(#d2f1df, #d3d7fa, #bad8f4) 0 0/400% 400%;
    background: -o-radial-gradient(#d2f1df, #d3d7fa, #bad8f4) 0 0/400% 400%;
    background: radial-gradient(#d2f1df, #d3d7fa, #bad8f4) 0 0/400% 400%;
    -webkit-animation: 15s ease 0s infinite normal none running gradient;
    -moz-animation: 15s ease 0s infinite normal none running gradient;
    -o-animation: 15s ease 0s infinite normal none running gradient;
    animation: 15s ease 0s infinite normal none running gradient
}

a {
    text-decoration: none;
}

ul, ol, li {
    list-style: none;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}

*:after, *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

/* 溢出省略 */
.toe {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.Flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
}
</style>
