var Reflux  = require('reflux'),
    Router = require('react-router'),
    Actions = require('../actions/Actions'),
    request = require('superagent');

var GOOGLE_CLIENT_ID = require('../config.js');
var SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/calendar.readonly'
].join(' ');

var store = Reflux.createStore({
  listenables: Actions,

  init: function () {
    var hello = require('hellojs');
    hello.init({ google: GOOGLE_CLIENT_ID });
    this.google = hello('google');
  },

  getInitialState: function () {
    return { loggedIn: this.isLoggedIn() };
  },

  onLogin: function () {
    this.googleLogin().then(function (loggedIn) {
      if (this.isLoggedIn()) {
        var Router = require('../Router'),
            query = Router.getCurrentQuery(),
            nextPath = (query) ? query.nextPath : null;
        if (nextPath) {
          Router.transitionTo(nextPath);
        } else {
          Router.replaceWith('/');
        }
        this.trigger({ loggedIn: true });
      }
    }.bind(this));
  },

  onLogout: function () {
    this.google.logout().then(function () {
      var Router = require('../Router');
      Router.transitionTo('login', {}, {nextPath: '/'});
      this.trigger({ loggedIn: false });
    }.bind(this));
  },

  googleLogin: function() {
    if (this.isLoggedIn()) {
      return this.google.login({ force: false, scope: SCOPES })
    } else {
      return this.google.login({
        scope: SCOPES,
        approval_prompt: true,
        include_granted_scopes: true
      })
    }
  },

  isLoggedIn: function () {
    return this.getToken() && this.isTokenValid();
  },

  isTokenValid: function () {
    var session = this.google.getAuthResponse();
    var current_time = (new Date().getTime() / 1000);
    return session && session.expires > current_time;
  },

  getToken: function () {
    var session = this.google.getAuthResponse();
    return session? session.access_token : undefined
  }
});

module.exports = store;
