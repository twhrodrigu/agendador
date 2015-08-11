'use strict';

var React = require('react'),
    PeopleInfoItem = require('./PeopleInfoItem.jsx');

var PeopleInfoList = React.createClass({
  peopleItems: function(){
    return this.props.people.map(function(person, id){
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
