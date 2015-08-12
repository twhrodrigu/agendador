'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    PeopleInfoList = require('./PeopleInfoList'),
    PeopleInfoStore = require('../stores/PeopleInfoStore');

var PeopleInfo = React.createClass({
  mixins: [ Reflux.connect(PeopleInfoStore) ],

  componentDidMount: function(){
    this.loadData();
  },

  loadData: function(){
    PeopleInfoStore.getAll().end(function(error, response){
      this.setState({people: response.body});
    }.bind(this));
  },

  render: function(){
    return (
      <div id="people-info">
        <PeopleInfoList people={this.state.people} />
      </div>
    );
  }

});

module.exports = PeopleInfo;
