const {
  mergeWithCustomize,
  customizeArray,
} = require('webpack-merge');

module.exports = mergeWithCustomize({
  customizeArray: customizeArray({
    entry: 'prepend',
  }),
});
