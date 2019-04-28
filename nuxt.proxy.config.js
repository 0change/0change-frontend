module.exports = {
  '/api': {
    target: process.env.API_TARGET,
    // changeOrigin: true,
    // pathRewrite: {'^/api': '/api'}
  }
}
