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
      var data = PeopleInfoStore.formatData(PeopleInfoStore.rejectData(response.body));
      this.setState({people: data});
    }.bind(this));
  },

  render: function(){
    return (
      <div id="people-info" className="people-list">
        <PeopleInfoList people={this.state.people} />
      </div>
    );
  }

});

module.exports = PeopleInfo;
