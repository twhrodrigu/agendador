var React = require('react/addons'),
    Router = require('react-router'),
    Master = require('../components/Master'),
    Login = require('../components/Login'),
    AuthStore = require('../stores/AuthStore'),
    Actions = require('../actions/Actions'),
    setMuiTheme = require('./set-mui-theme'),
    TestContext = require('./test-context'),
    TestLocation = require('react-router/lib/locations/TestLocation'),
    TestUtils = React.addons.TestUtils;

require('react-tap-event-plugin')();
setMuiTheme(Master);

describe("Auth Views", function() {
  var _view, _router;

  beforeEach(function () {
    location.hash = '';
  });

  it('master view should not have logout button when no user is authenticated', function () {
    var StubbedMaster = TestContext.stubRouterContext(Master);
    var stub = TestUtils.renderIntoDocument(<StubbedMaster />);
    var master = TestUtils.findRenderedComponentWithType(stub, Master);
    expect(master.getDOMNode().textContent).not.toMatch(/Logout/);
  });

  it('master view should have logout button when a user is authenticated', function () {
    var StubbedMaster = TestContext.stubRouterContext(Master);
    var stub = TestUtils.renderIntoDocument(<StubbedMaster />);
    var master = TestUtils.findRenderedComponentWithType(stub, Master);
    master.setState({ loggedIn: true });
    expect(master.getDOMNode().textContent).toMatch(/Logout/);
  });

  it('should redirect to login when an unauthenticated user accesses the app', function (done) {
    var routes = require('../Router').routes,
        location = new TestLocation(['/available']);

    spyOn(AuthStore, 'isLoggedIn').and.returnValue(false);

    Router.run(routes, location, function (Handler, state) {
      var app = React.render(<Handler/>, document.createElement('div'));
      expect(location.getCurrentPath()).toMatch('/login');
      expect(app.getDOMNode().textContent).toMatch(/Acessar/);
      this.stop();
      done();
    });
  })

  it('should access the requested page when an authenticated user accesses the app', function (done) {
    var routes = require('../Router').routes,
        location = new TestLocation(['/available']);

    spyOn(AuthStore, 'isLoggedIn').and.returnValue(true);

    Router.run(routes, location, function (Handler, state) {
      var app = React.render(<Handler/>, document.createElement('div'));
      expect(location.getCurrentPath()).toMatch('/available');
      expect(app.getDOMNode().textContent).toMatch(/Logout/);
      expect(app.getDOMNode().textContent).toMatch(/Buscar/);
      this.stop();
      done();
    });
  })

  it('should trigger the login action when the Acessar button is clicked', function () {
    spyOn(Actions, 'login');
    var StubbedMaster = TestContext.stubRouterContext(Master, null, function (router) {
      router.getRouteAtDepth = function () {
        var routes = require('../Router').routes;
        return routes[0].childRoutes[0]; // [0][0] == "/login" route
      }
      return router;
    });
    var master = TestUtils.renderIntoDocument(<StubbedMaster />);
    var login = TestUtils.findRenderedComponentWithType(master, Login);
    TestUtils.Simulate.touchTap(login.refs.login.getDOMNode().firstChild);
    expect(Actions.login).toHaveBeenCalled();
  });

  it('should trigger the logout action when the Logout button is clicked', function () {
    spyOn(Actions, 'logout');
    var StubbedMaster = TestContext.stubRouterContext(Master, null, function (router) {
      router.getRouteAtDepth = function () {
        var routes = require('../Router').routes;
        return routes[0].childRoutes[1]; // [0][1] == '/available' route
      }
      return router;
    });
    var stub = TestUtils.renderIntoDocument(<StubbedMaster />);
    var master = TestUtils.findRenderedComponentWithType(stub, Master);
    master.setState({ loggedIn: true });
    TestUtils.Simulate.touchTap(master.refs.logout.getDOMNode());
    expect(Actions.logout).toHaveBeenCalled();
  });
});
