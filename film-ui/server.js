var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack_dev.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
        console.error(err);
    }
});