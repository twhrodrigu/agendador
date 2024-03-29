var moment = require('moment');
var INPUT_DATE_FORMAT = 'YYYY-MM-DD';
var INPUT_TIME_FORMAT = 'HH:mm';

module.exports = {
  now: function () {
    return new Date();
  },

  format: function(d, mask) {
    return moment(d).format(mask);
  },

  parse: function(d, mask){
    return moment(d, mask).toDate();
  },

  formatDate: function(d) {
    return this.format(d, INPUT_DATE_FORMAT);
  },

  parseDate: function(str) {
    return this.formatDate(str);
  },

  parseTime: function(str) {
    return moment(str, INPUT_TIME_FORMAT);
  },

  setTime: function(d,t){
    return moment(d).startOf('day').add(moment(t)).toDate();
  }

}
