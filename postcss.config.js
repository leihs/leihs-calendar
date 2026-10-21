const autoprefixer = require('autoprefixer');
const cssImport = require('postcss-import');
const nested = require('postcss-nested');

module.exports = {
  plugins: [cssImport(), nested(), autoprefixer()],
};
