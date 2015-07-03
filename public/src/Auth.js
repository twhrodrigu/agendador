var hello = require('hellojs');
var google = hello('google');
var env_var = require('./config.js');

var GOOGLE_CLIENT_ID = env_var;

var SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/calendar.readonly'
].join(' ')

var Auth = function() {
    hello.init({google: GOOGLE_CLIENT_ID});
}

Auth.prototype.login = function() {
  if (this.loggedIn()) {
    return google.login({force:false, scope: SCOPES})
  } else {
    return google.login({
      scope: SCOPES,
      approval_prompt: true,
      include_granted_scopes: true
    })
  }
}

Auth.prototype.loggedIn = function() {
  return this.getToken() && this.isTokenValid();
}

Auth.prototype.isTokenValid = function () {
  var session = google.getAuthResponse();
  var current_time = (new Date().getTime() / 1000);
  return session && session.expires > current_time;
}

Auth.prototype.getToken = function () {
  var session = google.getAuthResponse();
  return session? session.access_token : undefined
}

Auth.prototype.logout = function (cb) {
  return google.logout();
},

Auth.instance = new Auth();

module.exports = Auth.instance;
