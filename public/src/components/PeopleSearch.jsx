'use strict';

var React = require('react'),
    TextField = require('material-ui').TextField;

var PeopleSearch = React.createClass({
  render: function() {
    var message = "Search";

    return (
      <TextField id="people-search-field" hintText="Search Thoughtworkers" />
    );
  }
});

module.exports = PeopleSearch;