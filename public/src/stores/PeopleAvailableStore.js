var Reflux  = require('reflux'),
    Actions = require('../actions/Actions'),
    DateInput = require('../utils/DateInput'),
    AuthStore = require('./AuthStore'),
    request = require('superagent'),
    moment  = require('moment');

var store = Reflux.createStore({
    listenables: Actions,

    getInitialState: function () {
      var obj = {
        selectedDate:           (this.selectedDate = new Date()),
        selectedStartTimeIndex: (this.selectedStartTimeIndex = 0),
        selectedEndTimeIndex:   (this.selectedEndTimeIndex = 1),
        selectedRoleIndex:      (this.selectedRoleIndex = 0),
        selectedOfficeIndex:    (this.selectedOfficeIndex = 0),
        roles:                  (this.roles = ["All", "BA", "Dev", "QA", "UI Dev", "XD", "PM", "DevOps"].map((role, idx) => ({payload: idx, text: role}))),
        people:                 (this.people = []),
        offices:                (this.offices = ["São Paulo", "Porto Alegre", "Recife", "Belo Horizonte"].map((office, idx) => ({payload: idx, text: office})))
      }
      return obj;
    },

    onSearchRequest: function () {
      var start = DateInput.setTime(this.selectedDate, this.selectedStartTime),
          end = DateInput.setTime(this.selectedDate, this.selectedEndTime),
          token = AuthStore.getToken(),
          start_time_timezone = moment(start).format(),
          end_time_timezone = moment(end).format(),
          role = this.roles[this.selectedRoleIndex].text,
          office = this.offices[this.selectedOfficeIndex].text;

      this.people = []
      this.loading = true;
      request
      .get('/v1/calendar/available')
      .query({ token: token })
      .query({ start: start_time_timezone })
      .query({ end: end_time_timezone})
      .query({ role: role })
      .query({ office: office })
      .end(function (error, response) {
        if (response.ok)
          this.searchCompleted(response.body);
        else
          this.searchFailed(response.text);
        this.loading = false;
      }.bind(this));
    },

    searchCompleted: function (response) {
      this.people = response;
      this.trigger({ people: this.people });
    },

    searchFailed: function (message) {
      this.people = []; 
      this.trigger({ people: this.people });
    },

    onSelectDate: function (event, date) {
      this.selectedDate = date;
      this.trigger({ selectedDate: this.selectedDate });
    },

    onSelectStartTime: function (event, index, item) {
      this.selectedStartTime = DateInput.parseTime(item.text);
      this.trigger({ selectedStartTimeIndex: index});
    },

    onSelectEndTime: function (event, index, item) {
      this.selectedEndTime = DateInput.parseTime(item.text);
      this.trigger({ selectedEndTimeIndex: index});
    },

    onSelectRole: function (event, index, item) {
      this.selectedRoleIndex = index;
      this.trigger({ selectedRoleIndex: this.selectedRoleIndex });
    },

    onSelectOffice: function (event, index, item) {
      this.selectedOfficeIndex = index;
      this.trigger({ selectedOfficeIndex: this.selectedOfficeIndex });
    },
});

module.exports = store;
