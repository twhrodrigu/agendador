'use strict';

var React = require('react'),
    Avatar = require('./Avatar');

var PeopleInfoItem = React.createClass({
  render: function(){
    return (
      <li className="people-list-tile">
        <Avatar size={40} className='people-tile-avatar' email={this.props.email}/>
        <div className="people-tile-text">
          <div className="people-tile-text-name">{this.props.name}</div>
          <div className="people-tile-text-email">{this.props.email}</div>
        </div>
        <div className="people-skills">
          <div className="people-info-p3">{this.props.p3}</div>
          <div className="people-info-tech-pairing">{this.props.tech_pairing}</div>
        </div>
      </li>
    );
  }
});

module.exports = PeopleInfoItem;
