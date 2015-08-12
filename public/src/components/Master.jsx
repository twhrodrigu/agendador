var React = require('react'),
    Reflux = require('reflux'),
    PreventDefault = require('../utils/PreventDefault'),
    AuthStore = require('../stores/AuthStore'),
    Actions = require('../actions/Actions'),
    RouteHandler = require('react-router').RouteHandler,
    Link = require('react-router').Link,
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    Paper = mui.Paper,
    Colors = mui.Styles.Colors,
    Typography = mui.Styles.Typography;

var Master = React.createClass({
  mixins: [ Reflux.connect(AuthStore) ],

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
          {this.state.loggedIn &&
            <div style={styles.currentUserBar}>
              <a style={styles.logoutLink} href ref='logout' onClick={PreventDefault} onTouchTap={Actions.logout}>Logout</a>
              <Link to="info">search people</Link>
            </div>
          }
          <Paper zDepth={1}>
            <RouteHandler />
          </Paper>
        </div>
      </div>
    )
  }
});

module.exports = Master;
