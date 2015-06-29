/** @jsx React.DOM */
var React = require('react'),
    mui = require('material-ui'),
    DropDownMenu = mui.DropDownMenu;

var InputTime = React.createClass({

  getInitialState: function(){
    return {
      menuItems: [
        { payload: '1', text: 'Never ' },
        { payload: '2', text: 'Every Night' },
        { payload: '3', text: 'Weeknights' },
        { payload: '4', text: 'Weekends' },
        { payload: '5', text: 'Weekly' },
      ]
    }
  },

  render: function(){
    return (
      <div>
        <DropDownMenu id="drop-down-start" menuItems={this.state.menuItems} />
        <DropDownMenu id="drop-down-end" menuItems={this.state.menuItems} />
      </div>
    )
  }

});

module.exports = InputTime;
