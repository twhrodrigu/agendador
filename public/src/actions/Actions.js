var Reflux = require('reflux');
var actions = Reflux.createActions([
    'searchRequest',
    'selectDate',
    'selectStartTime',
    'selectEndTime',
    'selectRole',
    'selectOffice',
    'login',
    'logout'
]);

module.exports = actions;
