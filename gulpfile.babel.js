import gulp from 'gulp';
import webpack from 'webpack';
import {exec} from 'child_process';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';

gulp.task('dev', ['dev:client'])

gulp.task('dev:client', () => {
  const compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, {
    contentBase: './',
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    quiet: false,
    historyApiFallback: true,
    noInfo: false,
    inline: true,
    stats: {
      colors: true,
      chunks: false
    }
  }).listen(3000, '0.0.0.0', (err, stats) => {
    if (err) console.log(err);
    console.log(`webpack was listenning: http://localhost:3000`);
  });
});

// build client
gulp.task('build', () => {
	webpack(webpackConfig).run((err, stats) => {
		console.log(stats.toString({
			chunks: false,
			colors: true
		}))
	})
})
