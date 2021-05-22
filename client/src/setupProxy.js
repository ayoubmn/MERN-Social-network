const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://[::1]:5050",
      changeOrigin: true,
      secure: false,
    })
  );
};
