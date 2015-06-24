var React = require('react'),
    Avatar = require('./Avatar');

var Classable = require('../../node_modules/material-ui/lib/js/mixins/classable');

var PeopleList = React.createClass({displayName: "PeopleList",
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
        React.createElement("li", {key: idx, className: "people-list-tile"}, 
          React.createElement(Avatar, {size: "40", className: "people-tile-avatar", email: person.email}), 
          React.createElement("span", {className: "people-tile-text"}, person.email)
        )
      )
    }

    return (
      React.createElement("ul", {className: classes}, 
        React.createElement("li", {className: "people-list-divider"}, "Disponíveis (", this.props.people.length, ")"), 
        this.props.people.map(peopleItem)
      )
    )
  }
});

module.exports = PeopleList;
