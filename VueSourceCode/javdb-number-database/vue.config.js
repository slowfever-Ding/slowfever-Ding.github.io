const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  publicPath: './', // build 编译打包改为相对路径
  lintOnSave: true, // ( true 默认开启，false 关闭 ) 暂时关闭 eslint 代码监测
  // 配置标题
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'JavDB番号收藏数据库'
        return args
      })
  },
  // 压缩代码
  configureWebpack: config => {
    // 只在生产环境中生效
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer = [
        new (require('terser-webpack-plugin'))({
          terserOptions: {
            compress: {
              drop_console: true, // 删除console
              drop_debugger: true // 删除debugger
            }
          }
        })
      ]
    }
  }
}
