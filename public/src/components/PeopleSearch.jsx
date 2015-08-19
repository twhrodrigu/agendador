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

  getStyles: function () {
    return {
      root: {
        margin: '10px 0 25px 0',
        width: '100%'
      }
    };
  },

  render: function() {
    var styles = this.getStyles();
    var message = "Search";

    return (
      <TextField id="people-search-field"
                 hintText="Search Thoughtworkers"
                 style={styles.root} 
                 onKeyUp={this.types}/>
    );
  }
});

module.exports = PeopleSearch;
