require('../less/app.less');
require('react-tap-event-plugin')();

var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    Redirect = Router.Redirect;
    DefaultRoute = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,
    Auth = require('./Auth'),
    Master = require('./components/Master'),
    PeopleAvailable = require('./components/PeopleAvailable'),
    Login = require('./components/Login');

React.initializeTouchEvents();
Router
  .create({
    routes: (
      <Route name="root" path="/" handler={Master}>
        <Route name="login" handler={Login} />
        <Route name="available" handler={PeopleAvailable} />
        <DefaultRoute handler={PeopleAvailable}/>
      </Route>
    )
  })
  .run(function (Handler) {
    React.render(<Handler/>, document.body)
  })

