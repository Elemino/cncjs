import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';
import log from './lib/logger';
import config from '../../webpack.webconfig.development';

const webpackDevServer = (app) => {
    if (process.env.NODE_ENV !== 'development') {
        log.error('The process.env.NODE_ENV should be "development" while running a webpack server');
        return;
    }

    const compiler = webpack({
        ...config,
        plugins: [
            // https://github.com/gajus/write-file-webpack-plugin
            // Forces webpack-dev-server to write bundle files to the file system.
            new WriteFileWebpackPlugin()
        ].concat(config.plugins)
    });

    // https://github.com/webpack/webpack-dev-middleware
    // webpack-dev-middleware handle the files in memory.
    app.use(webpackDevMiddleware(compiler, {
        noInfo: false,
        quite: false,
        lazy: false,
        // https://webpack.github.io/docs/node.js-api.html#compiler
        watchOptions: {
            poll: true, // use polling instead of native watchers
            ignored: /node_modules/
        },
        publicPath: config.output.publicPath,
        stats: {
            colors: true
        }
    }));

    app.use(webpackHotMiddleware(compiler));
};

export default webpackDevServer;
