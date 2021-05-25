module.exports = {
  // lintOnSave: false
  devServer: {
    port:808,
    proxy: {
      "/": {
        target: "http://39.105.39.45:3000",
        // target:"http://musicapi.leanapp.cn/",
        changeOrigin: true,
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('less')
      .test(/\.less$/)
      .oneOf('vue')
      .use('px2rem-loader')
      .loader('px2rem-loader')
      .before('postcss-loader') // this makes it work.
      .options({ remUnit: 64, remPrecision: 8 })
      .end()
  }
}
