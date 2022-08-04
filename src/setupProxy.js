const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/regulatory-system', {
      target: 'http://8.136.83.2128:9995', // 测试
      secure: false,
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值,为true时，与服务器同域
      pathRewrite: {
        '^/regulatory-system': '/regulatory-system',
      },
    })
  );
};
