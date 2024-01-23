const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	entry: {
		popup: "./src/popup.jsx",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							["@babel/preset-react", { runtime: "automatic" }],
						],
					},
				},
			},
			{
				test: /\.(gif|svg|jpg|png)$/,
				loader: "file-loader",
			},
			{ test: /\.css$/, use: ["style-loader", "css-loader"] },
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/popup.html",
			filename: "popup.html",
		}),
		new CopyPlugin({
			patterns: [{ from: "public" }],
		}),
		new webpack.ProvidePlugin({
			process: "process/browser",
		}),
	],
};
