var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    Redirect = Router.Redirect,
    NotFoundRoute = Router.NotFoundRoute,
    Master = require('./components/Master'),
    PeopleAvailable = require('./components/PeopleAvailable'),
    PeopleInfo = require('./components/PeopleInfo'),
    Login = require('./components/Login');

var router = Router.create({
  routes: (
    <Route name="root" path="/" handler={Master}>
      <Route name="login" handler={Login} />
      <Route name="available" handler={PeopleAvailable} />
      <Route name="info" handler={PeopleInfo} />
      <DefaultRoute handler={PeopleAvailable}/>
    </Route>
  )
});

module.exports = router;
