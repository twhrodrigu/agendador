/** @jsx React.DOM */

var React = require('react/addons'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager();

var setMuiTheme = function (component) {
  component.childContextTypes = React.addons.update(component.childContextTypes || {}, { $merge: { muiTheme: React.PropTypes.object} });

  var oldGetChildContext = component.prototype.getChildContext;
  component.prototype.getChildContext = function() {
    var context = oldGetChildContext && typeof oldGetChildContext === 'function' && oldGetChildContext() || {};
    return React.addons.update(context, { $merge: { muiTheme: ThemeManager.getCurrentTheme() } });
  };
};

module.exports = setMuiTheme;
