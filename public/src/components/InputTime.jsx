/** @jsx React.DOM */
var React = require('react'),
    mui = require('material-ui'),
    DropDownMenu = mui.DropDownMenu;

var InputTime = React.createClass({

  getInitialState: function() {
    var menuItems = _generateTimeValues();

    return { menuItems: menuItems }
  },

  render: function(){
    return (
      <div>
        <DropDownMenu id="drop-down-start" menuItems={this.state.menuItems} onChange={this.props.onChange} />
      </div>
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
