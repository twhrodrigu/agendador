/** @jsx React.DOM */
var React = require('react'),
    Auth = require('../Auth'),
    mui = require('material-ui'),
    Paper = mui.Paper,
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

var Master = React.createClass({
  mixins: [ Router.Navigation ],

  render: function () {
    return (
      <div>
        <div className="content">
          {Auth.loggedIn() &&
            <div className="current-user-bar">
              <a href onTouchTap={this._handleTapLogout}>Logout</a>
            </div>
          }
          <Paper className="content-card" zDepth={1}>
            <RouteHandler />
          </Paper>
        </div>
      </div>
    )
  },
  _handleTapLogout: function (e) {
    Auth.logout().then(function () {
      this.transitionTo('/login', {}, {'nextPath': '/'});
    }.bind(this));
  }
});

module.exports = Master;
