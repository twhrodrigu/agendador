var Reflux = require('reflux');
var actions = Reflux.createActions([
    'searchRequest',
    'selectDate',
    'selectStartTime',
    'selectEndTime',
    'selectRole',
    'selectOffice'
]);

module.exports = actions;
