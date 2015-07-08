/** @jsx React.DOM */
var React = require('react'),
    mui = require('material-ui'),
    DropDownMenu = mui.DropDownMenu;

var InputTime = React.createClass({

  getInitialState: function() {
    var items = [];
    for (var i = 7; i <= 19; i++) {
        items.push({payload : i, text: i + ':00' });
        items.push({payload : i, text: i + ':30' });
    }

    return { menuItems: items }
  },

  render: function(){
    return (
      <div>
        <DropDownMenu id="drop-down-start" menuItems={this.state.menuItems} onChange={this.props.onChange} />
      </div>
    )
  }

});

module.exports = InputTime;
