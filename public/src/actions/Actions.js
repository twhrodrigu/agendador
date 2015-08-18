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

actions.getConsultants = Reflux.createAction({ asyncResult: true });
actions.updateConsultant = Reflux.createAction({ asyncResult: true });

module.exports = actions;
