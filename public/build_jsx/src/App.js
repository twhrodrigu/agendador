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
      React.createElement(Route, {name: "root", path: "/", handler: Master}, 
        React.createElement(Route, {name: "login", handler: Login}), 
        React.createElement(Route, {name: "available", handler: PeopleAvailable}), 
        React.createElement(DefaultRoute, {handler: PeopleAvailable})
      )
    )
  })
  .run(function (Handler) {
    React.render(React.createElement(Handler, null), document.body)
  })

