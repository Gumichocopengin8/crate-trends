// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  distDir: '../../build/next',

  webpack(config, options) {
    config.plugins = config.plugins || [];

    config.plugins = [...config.plugins];

    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['api'] = path.join(__dirname, 'api');
    return config;
  },
};
