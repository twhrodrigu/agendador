'use strict';

var React = require('react'),
    Avatar = require('./Avatar'),
    mui = require('material-ui'),
    DropDownMenu = mui.DropDownMenu;

var PeopleInfoItem = React.createClass({
  menuItems: [
    {payload: null, text: 'Unset' },
    {payload: 0,    text: 'Not allowed' },
    {payload: 1,    text: 'Pair' },
    {payload: 2,    text: 'Lead' }
  ],

  render: function() {
    return (
      <li className="people-list-tile">
        <Avatar size={40} className='people-tile-avatar' email={this.props.email}/>
        <div className="people-tile-text">
          <div className="people-tile-text-name">{this.props.name}</div>
          <div className="people-tile-text-email">{this.props.email}</div>
        </div>
        <div className="people-skills">
          <div className="people-info-p3"><DropDownMenu className="p3-dropdown" selectedIndex={parseInt(this.props.p3)} menuItems={this.menuItems} /></div>
          <div className="people-info-p2"><DropDownMenu className="p2-dropdown" selectedIndex={parseInt(this.props.p2)} menuItems={this.menuItems} /></div>
        </div>
      </li>
    );
  }
});

module.exports = PeopleInfoItem;
