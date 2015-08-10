// implementation copied from https://github.com/rackt/react-router/blob/0.13.x/docs/guides/testing.md

var React = require('react/addons'),
    Router = require('react-router'),
    Route = Router.Route,
    TestUtils = React.addons.TestUtils,
    TestLocation = require('react-router/lib/locations/TestLocation');

var TestContext = {
  getRouterComponent: function(TargetComponent) {
    var component,
        div = document.createElement('div'),
        routes = (
          <Route path="/">
            <Route name="test" handler={TargetComponent} />
          </Route>
        );

    var location = new TestLocation(['/test']);

    Router.run(routes, location, function (Handler) {
      var mainComponent = React.render(<Handler />, div);
      component = TestUtils.findRenderedComponentWithType(mainComponent, TargetComponent);
    });

    return component;
  },

  stubRouterContext: function(Component, props, routerContext) {
    var RouterStub = function() {};

    RouterStub.makePath = function() {};
    RouterStub.makeHref = function() {};
    RouterStub.transitionTo = function() {};
    RouterStub.replaceWith = function() {};
    RouterStub.goBack = function() {};
    RouterStub.getCurrentPath = function() {};
    RouterStub.getCurrentRoutes = function() {};
    RouterStub.getCurrentPathname = function() {};
    RouterStub.getCurrentParams = function() {};
    RouterStub.getCurrentQuery = function() {};
    RouterStub.isActive = function() {};
    RouterStub.getRouteAtDepth = function() {};
    RouterStub.setRouteComponentAtDepth = function() {};

    if (routerContext) {
      RouterStub = routerContext(RouterStub);
    }

    return React.createClass({
        childContextTypes: {
          router: React.PropTypes.func,
          routeDepth: React.PropTypes.number
        },

        getChildContext: function() {
          return {
            router: RouterStub,
            routeDepth: 0
          };
        },

        render: function() {
          return <Component {...props} />
        }
    });
  }
};

module.exports = TestContext;
