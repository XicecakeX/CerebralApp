const HtmlWebPackPlugin = require("html-webpack-plugin");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const autoprefixer = require('autoprefixer');

// Options for PostCSS as we reference these options twice
// Adds vendor prefixing to support IE9 and above
const postCSSLoaderOptions = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
  ],
};

module.exports = {
  mode: "development",
  module: {
    rules: [
      //Replace `$(variableHere)$` in all files with correct values from properties
      {
				enforce: "pre",
				test: /(\.jsx?)|(\.ejs)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: StringReplacePlugin.replace({
							replacements: [{
								pattern: /\$\((\w+)\)\$/g, //$(variableHere)$
								replacement: function(match, p1) {
									if (p1 == 'version') return require('./package.json').version;
									return require('./properties.dev.json')[p1];
								}
							}]
						})
					}
				]
			},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.ejs/,
        loader: 'raw-loader'
      },
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      // By default we support CSS Modules with the extension .module.css
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: postCSSLoaderOptions,
          },
        ],
      },
      // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
      // using the extension .module.css
      {
        test: /\.module\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: postCSSLoaderOptions,
          },
        ],
      },
    ]
  },
  devtool: "source-map",
  target: "web",
  resolve: {
      // you can now require('file') instead of require('file.json')
      extensions: ['.js', '.jsx', '.json', '.css', '.less'],
      modules: ["node_modules", "app_modules"]
  },
  devServer: {
     proxy: { // proxy URLs to backend development server
       '/api': 'http://localhost:3000'
     },
     compress: true, // enable gzip compression
     historyApiFallback: true, // true for index.html upon 404, object for multiple paths
     hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
     https: false, // true for self-signed, object for cert authority
     noInfo: true, // only errors & warns on hot reload
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.ejs",
      filename: "./index.html",
      inject: false //Don't inject <script> tag for main.js, this is included in index.ejs already
    })
  ]
};
