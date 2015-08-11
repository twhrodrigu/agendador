'use strict';

var React = require('react');

var PeopleInfoItem = React.createClass({
  render: function(){
    return (
      <li>
        <div className="person-info">
          <div className="person-info-name">{this.props.name}</div>
          <div className="person-info-email">{this.props.email}</div>
        </div>
      </li>
    );
  }
});

module.exports = PeopleInfoItem;
