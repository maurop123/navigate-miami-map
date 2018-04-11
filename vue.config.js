module.exports = {
  lintOnSave: false,
  configureWebpack: {
    output: {
      publicPath: process.env.PUBLIC_PATH,
    },
  },
}
