var ReactTools = require('react-tools');

module.exports = {
  process: function(src, file) {
    return ReactTools.transform(src); 
  }
};
