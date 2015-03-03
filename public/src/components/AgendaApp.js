var React = require('react'),
    mui = require('material-ui'),
    Paper = mui.Paper,
    DropDownMenu = mui.DropDownMenu,
    RaisedButton = mui.RaisedButton,
    Toolbar = mui.Toolbar,
    ToolbarGroup = mui.ToolbarGroup;

var AgendaApp = React.createClass({
  render: function () {
    var roles = [
       { payload: '1', text: 'Never' },
       { payload: '2', text: 'Every Night' },
       { payload: '3', text: 'Weeknights' },
       { payload: '4', text: 'Weekends' },
       { payload: '5', text: 'Weekly' },
    ];
    return (
      <div className="container">
        <Paper zDepth={1}>
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <DropDownMenu menuItems={roles} />
            <DropDownMenu menuItems={roles} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <RaisedButton label="Search" primary={true} />
          </ToolbarGroup>
        </Toolbar>
        </Paper>
      </div>
    )
  }
});

module.exports = AgendaApp;
