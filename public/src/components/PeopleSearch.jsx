'use strict';

var React = require('react'),
    Actions = require('../actions/Actions'),
    TextField = require('material-ui').TextField;

var PeopleSearch = React.createClass({
  types: function(event){
    if(event.nativeEvent.target.value.length >= 3){
      Actions.getConsultants();
    }
  },

  render: function() {
    var message = "Search";

    return (
      <TextField id="people-search-field"
                 hintText="Search Thoughtworkers"
                 onKeyUp={this.types}/>
    );
  }
});

module.exports = PeopleSearch;