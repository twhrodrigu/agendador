'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions/Actions'),
    PeopleInfoItem = require('./PeopleInfoItem.jsx'),
    PeopleInfoStore = require('../stores/PeopleInfoStore'),
    _ = require('underscore');

var PeopleInfoList = React.createClass({
  peopleItems: function() {
    return _.map(this.props.people, function(person, id) {
      return <PeopleInfoItem key={id} name={person.name} email={person.email} p3={person.p3} p2={person.p2}/>;
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
