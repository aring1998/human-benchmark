// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "/src/assets/styles/var.scss";
        `
      }
    }
  }
}
