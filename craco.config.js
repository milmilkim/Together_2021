const CracoLessPlugin = require('craco-less');

/* craco.config.js */
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#5cdbd3', //포인트컬러
              '@layout-header-background': '#ffffff', //헤더 색
              '@layout-body-background': '#ffffff', //바디 색
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
