var React = require('react'),
    AuthStore = require('../stores/AuthStore');

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      var nextPath = transition.path;
      if (!AuthStore.isLoggedIn()) {
        transition.redirect('/login',{}, { 'nextPath' : nextPath });
      }
    }
  }
};

module.exports = Authentication;
