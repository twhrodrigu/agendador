var React = require('react'),
    mui = require('material-ui'),
    DropDownMenu = mui.DropDownMenu;

var RolesDropdownMenu = React.createClass({
  render: function () {
    var menuItems = [
       { payload: '1', text: 'Never' },
       { payload: '2', text: 'Every Night' },
       { payload: '3', text: 'Weeknights' },
       { payload: '4', text: 'Weekends' },
       { payload: '5', text: 'Weekly' },
    ];

    return (
      <DropDownMenu menuItems={menuItems} />
    )
  }
});

module.exports = RolesDropdownMenu;
