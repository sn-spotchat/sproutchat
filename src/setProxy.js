//const proxy=require('http-proxy-middleware');
/*const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) =>{
    const socketProxy = createProxyMiddleware('/socket',{
        target: 'http://localhost:3002',
        changeOrigin: true,
        ws: true,
        logLevel: 'debug',
    });

    app.use(
        socketProxy
        proxy('/router',{
            target: 'http://localhost:3002/'
        })
    );
};*/