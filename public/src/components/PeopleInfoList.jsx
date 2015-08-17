'use strict';

var React = require('react'),
    PeopleInfoItem = require('./PeopleInfoItem.jsx'),
    _ = require('underscore');

var PeopleInfoList = React.createClass({
  peopleItems: function(){
    return _.map(this.props.people, function(person, id){
      return <PeopleInfoItem key={id} name={person.name} email={person.email} p3={person.p3} tech_pairing={person.tech_pairing}/>;
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
