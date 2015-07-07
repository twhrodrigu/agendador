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
        <DropDownMenu id="drop-down-start" menuItems={this.generateTimeValues()} onChange={this.props.onChange} />
      </div>
    )
  },

  generateTimeValues: function(){
    itens = [];
    for (var i = 7; i <= 19; i++) {
        itens.push({payload : i, text: i + ':00' });
        itens.push({payload : i, text: i + ':30' });
    }
    return itens;
  }

});

module.exports = InputTime;
