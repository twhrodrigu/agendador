var React = require('react'),
    Auth = require('../Auth'),
    mui = require('material-ui'),
    Paper = mui.Paper,
    Router = require('react-router'),
    PreventDefault = require('../utils/PreventDefault'),
    RouteHandler = Router.RouteHandler,
    ThemeManager = new mui.Styles.ThemeManager(),
    Colors = mui.Styles.Colors,
    Typography = mui.Styles.Typography;

var Master = React.createClass({
  mixins: [ Router.Navigation ],

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  getStyles: function() {
    return {
      root: {
        paddingTop: 20,
        paddingBottom: 20,
        height: 'auto'
      },
      content: {
        height: 'auto',
        width: 600,
        margin: 'auto'
      },
      currentUserBar: {
        padding: '16px'
      },
      logoutLink: {
        textDecoration: 'none',
        color: Colors.pinkA100,
        fontWeight: Typography.fontWeightLight,
        fontFamily: 'Roboto, sans-serif',
        fontSize: '10pt'
      }
    };
  },

  render: function () {
    var styles = this.getStyles();
    return (
      <div style={styles.root}>
        <div style={styles.content}>
          {Auth.loggedIn() &&
            <div style={styles.currentUserBar}>
              <a style={styles.logoutLink} href onClick={PreventDefault} onTouchTap={this._handleTapLogout}>Logout</a>
            </div>
          }
          <Paper zDepth={1}>
            <RouteHandler />
          </Paper>
        </div>
      </div>
    )
  },
  _handleTapLogout: function (e) {
    Auth.logout().then(function () {
      this.transitionTo('login', {}, {nextPath: '/'});
    }.bind(this));
    e.preventDefault();
  }
});

module.exports = Master;
