// 配置参考官网：https://www.npmjs.com/package/@craco/craco#configuration-file
const CracoLessPlugin = require('craco-less');
const path = require('path');
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  css: {
    sourceMap: true,
  },
  webpack: {
    alias: {
      '@': pathResolve('src'),
    },
    configure: (webpackConfig, { env, paths }) => {
      // 修改build的生成文件名称
      paths.appBuild = 'html/build';
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, 'html/build'),
        publicPath: '/',
      };
      return webpackConfig;
    },
  },
  devServer: {
    client: {
      overlay: false,
    },
  },
  babel: {
    plugins: [['styled-jsx/babel', { plugins: ['styled-jsx-plugin-sass'] }]],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890FF' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
