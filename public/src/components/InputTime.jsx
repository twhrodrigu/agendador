var React = require('react'),
    mui = require('material-ui'),
    DropDownMenu = mui.DropDownMenu,
    Colors = mui.Styles.Colors,
    ThemeManager = new mui.Styles.ThemeManager();

var InputTime = React.createClass({

  getInitialState: function() {
    var menuItems = _generateTimeValues();

    return { menuItems: menuItems }
  },

  render: function(){
    return (
      <DropDownMenu className="time-box" selectedIndex={this.props.selectedIndex} menuItems={this.state.menuItems} onChange={this.props.onChange} />
    )
  }

});

function _generateTimeValues() {
  var timeValues = [];
  for (var i = 7; i <= 19; i++) {
      timeValues.push({payload : i, text: i + ':00' });
      timeValues.push({payload : i, text: i + ':30' });
  }
  return timeValues
};

module.exports = InputTime;
