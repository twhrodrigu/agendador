'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions/Actions'),
    PeopleInfoItem = require('./PeopleInfoItem.jsx'),
    PeopleInfoStore = require('../stores/PeopleInfoStore'),
    _ = require('underscore');

var PeopleInfoList = React.createClass({
  peopleItems: function() {
    return _.map(this.props.people, function(person, idx) {
      return <PeopleInfoItem key={idx} id={person.id} login={person.login} name={person.name} email={person.email} p3={person.p3} p2={person.p2}/>;
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
