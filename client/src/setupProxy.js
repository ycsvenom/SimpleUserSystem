const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			changeOrigin: true,
			cookieDomainRewrite: "localhost",
			secure: false,
			target: "https://localhost:3001",
			headers: {
				host: "localhost:3001",
				origin: null,
			},
			onProxyReq: function (proxyReq, req, res) {
				proxyReq.setHeader("accept-encoding", "identity");
			},
		})
	);
};