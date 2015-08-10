var Actions = require('../actions/Actions');

describe("Auth Store", function() {
  var _store;

  beforeEach(function() {
    _store = require('../stores/AuthStore');
    _store.emitter.removeAllListeners();
    _store.getInitialState();
  });

  it('should initialize unauthenticated', function () {
    expect(!!_store.isLoggedIn()).toBe(false);
  });

  it('should listen to the login action', function (done) {
    _store = require('../stores/AuthStore');
    spyOn(_store.google, 'login').and.callFake(function () {
      expect(_store.google.login).toHaveBeenCalled();
      return { then: done };
    });
    Actions.login();
  }),

  it('should listen to the logout action', function (done) {
    _store = require('../stores/AuthStore');
    spyOn(_store.google, 'logout').and.callFake(function () {
      expect(_store.google.logout).toHaveBeenCalled();
      return { then: done };
    });
    Actions.logout();
  });

  it('should be logged in if has a recent token', function () {
    spyOn(_store.google, 'getAuthResponse').and.returnValue({
      access_token: 'token',
      expires: ((new Date().getTime() / 1000) + 1000)
    });
    expect(!!_store.isLoggedIn()).toEqual(true);
  })

  it('should not be logged in if has an expired token', function () {
    spyOn(_store.google, 'getAuthResponse').and.returnValue({
      access_token: 'token',
      expires: ((new Date().getTime() / 1000) - 1000)
    });
    expect(!!_store.isLoggedIn()).toEqual(false);
  })

  it('should not be logged in if doesn\'t have a token', function () {
    spyOn(_store.google, 'getAuthResponse').and.returnValue({
      access_token: null,
      expires: ((new Date().getTime() / 1000) + 1000)
    });
    expect(!!_store.isLoggedIn()).toEqual(false);
  })

  it('should trigger state change on login', function (done) {
    spyOn(_store, 'isLoggedIn').and.returnValue(true);
    spyOn(_store.google, 'login').and.callFake(function () {
      return { then: function (callback) { callback.apply(arguments); } }; // mock promise
    });
    _store.listen(function (state) {
      expect(state.loggedIn).toEqual(true);
      done();
    });
    _store.onLogin();
  });

  it('should trigger state change on logout', function (done) {
    spyOn(_store.google, 'logout').and.callFake(function () {
      return { then: function (callback) { callback.apply(arguments); } }; // mock promise
    });
    _store.listen(function (state) {
      expect(state.loggedIn).toEqual(false);
      done();
    });
    _store.onLogout();
  });
});
