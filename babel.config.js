module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // sourceMaps: true,
  plugins: [
    // ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
  env: {
		production: {
			plugins: ["transform-remove-console"]
		}
	}
};
