'use strict';

var React = require('react'),
    PeopleInfoItem = require('./PeopleInfoItem.jsx'),
    _ = require('underscore');

var PeopleInfoList = React.createClass({
  peopleItems: function(){
    return _.map(this.props.people, function(person, id){
      return <PeopleInfoItem key={id} name={person.name} email={person.email} />;
    });
  },

  render: function(){
    return (
      <div className="container">
        <ul className="people-items">
          {this.peopleItems()}
        </ul>
      </div>
    );
  }
});

module.exports = PeopleInfoList;
