module.exports = {
  lintOnSave:false,
  devServer: {
    proxy: {
      '/sap': {
        target: 'http://yks4d01.ykjt.cc:8080',
        changeOrigin: true
      }
    }
  }
}