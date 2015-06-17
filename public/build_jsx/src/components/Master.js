var React = require('react'),
    Auth = require('../Auth'),
    mui = require('material-ui'),
    Paper = mui.Paper,
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

var Master = React.createClass({displayName: "Master",
  mixins: [ Router.Navigation ],

  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "content"}, 
          Auth.loggedIn() &&
            React.createElement("div", {className: "current-user-bar"}, 
              React.createElement("a", {href: true, onTouchTap: this._handleTapLogout}, "Logout"), 
              React.createElement("a", {href: "https://git.thoughtworks.net/agendadorentrevistas/agenda-mvp/issues", 
                 target: "_blank", 
                 style: {float: 'right'}}, 
                "Feedback"
              )
            ), 
          
          React.createElement(Paper, {className: "content-card", zDepth: 1}, 
            React.createElement(RouteHandler, null)
          )
        )
      )
    )
  },
  _handleTapLogout: function (e) {
    Auth.logout().then(function () {
      this.transitionTo('/login', {}, {'nextPath': '/'});
    }.bind(this));
  }
});

module.exports = Master;
