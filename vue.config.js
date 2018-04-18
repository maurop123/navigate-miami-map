module.exports = {
  lintOnSave: false,
  configureWebpack: cfg => {
    cfg.output.publicPath = process.env.PUBLIC_PATH
  },
  outputDir: 'docs',
}
