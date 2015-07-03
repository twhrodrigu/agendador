/** @jsx React.DOM */
var React = require('react'),
    Avatar = require('./Avatar');

var Classable = require('../../node_modules/material-ui/lib/js/mixins/classable');

var PeopleList = React.createClass({
  mixins: [Classable],

  propTypes: {
    people: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {people: []};
  },

  render: function () {
    var classes = this.getClasses('people-list');

    function peopleItem(person, idx) {
      return (
        <li key={idx} className='people-list-tile'>
          <Avatar size={40} className='people-tile-avatar' email={person.email}/>
          <span className='people-tile-text'>{person.email}</span>
          <span className='people-tile-text'>{person.name}</span>
        </li>
      )
    }

    return (
      <ul className={classes}>
        <li className="people-list-divider">Disponíveis ({this.props.people.length})</li>
        {this.props.people.map(peopleItem)}
      </ul>
    )
  }
});

module.exports = PeopleList;
