import webpack from 'webpack';
import path from 'path';

const join = (...joinpath) => path.join.apply(undefined, [__dirname, ...joinpath]);

const config = {
	entry: {
		app: './app/index.js'
	},
	output: {
		path: join('./assets'),
		filename: '[name].js',
		chunkFilename: '[name].[chunkhash:5].chunk.js',
		publicPath: '/assets/'
	},
	resolve: {
		root: [
			join('./node_modules'),
			join('./app')
		],
	  extensions: ['', '.js', '.jsx', '.css', '.scss']
	},
	module: {
		loaders: [
			{
			  test: /\.(js|jsx)$/,
			  loader: 'babel'
			}, {
			  test: /\.json$/,
			  loader: 'json'
			}, {
			  test: /\.css$/,
			  loader: 'style-loader!css-loader'
			}, {
			  test: /\.(sass|scss)$/,
			  loader: 'style-loader!css-loader!postcss-loader'
			}, {
			  test: /\.(png|jpg|jpeg|gif)$/,
			  loader: 'url-loader'
			}, {
			  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			  loader: 'url-loader?minetype=application/font-woff'
			}, {
			  test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			  loader: 'url-loader'
			}
		]
	},
	postcss: () => [
	  require('precss')
	],
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
		    'process.env.NODE_ENV': '"'+process.env.NODE_ENV+'"'
		})
	]
}

if(process.env.NODE_ENV == 'production'){
	config.plugins.concat([
		new webpack.optimize.UglifyJsPlugin({
		  compress: {
		    warnings: false
		  },
		  comments: false
		})
	])
} else {
	config.entry.app = [
		`webpack-dev-server/client?http://localhost:3000`,
		'webpack/hot/only-dev-server',
		config.entry.app
	]
	config.devtool = 'eval'
	config.plugins.unshift(
		new webpack.HotModuleReplacementPlugin()
	)
}

export default config