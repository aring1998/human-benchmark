const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const productionGzipExtensions = ['js', 'css']
const timeStamp = new Date().getTime()

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
      return {
        output: {
          // 输出的js文件名，处理缓存问题
          filename: `static/js/[name].${timeStamp}.js`,
          chunkFilename: `static/js/[name].${timeStamp}.js`
        }
      }
    }
  },
  css: {
    extract: {
      // 输出的css文件名，处理缓存问题
      filename: `css/[name].${timeStamp}.css`,
      chunkFilename: `css/[name].${timeStamp}.css`
    },
    loaderOptions: {
      sass: {
        prependData: '@import "/src/assets/styles/var.scss";'
      }
    }
  }
}
