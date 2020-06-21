// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const isDev = process.env.NODE_ENV;

module.exports = {
  distDir: '../../build/next',

  env: {
    BASE_URL: isDev ? 'http://localhost:8080/api/v1' : process.env.BASE_URL,
  },

  webpack(config, options) {
    config.plugins = config.plugins || [];

    config.plugins = [...config.plugins];

    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['api'] = path.join(__dirname, 'api');
    config.resolve.alias['interfaces'] = path.join(__dirname, 'interfaces');
    return config;
  },
};
