const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:3001/', //original url
			changeOrigin: true,
			//secure: false,
			onProxyRes: function (proxyRes, req, res) {
				proxyRes.headers['Access-Control-Allow-Origin'] = '*';
			}
		})
	);
};