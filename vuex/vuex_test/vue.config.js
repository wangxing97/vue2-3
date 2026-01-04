module.exports = {
  lintOnSave:false,
  devServer: {
    proxy: {
      '/wx/sap/bc': {
        target: 'https://yks4d01.ykjt.cc:8081',
        pathRewrite:{'^/wx':''},
        changeOrigin: true
      },
      '/sap': {
        target: 'http://yks4d01.ykjt.cc:8080',
        changeOrigin: true
      }
    }
  }
}