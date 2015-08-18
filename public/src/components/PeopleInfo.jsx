'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions/Actions'),
    PeopleInfoList = require('./PeopleInfoList'),
    PeopleInfoStore = require('../stores/PeopleInfoStore');

var PeopleInfo = React.createClass({
  mixins: [ Reflux.connect(PeopleInfoStore) ],

  componentDidMount: function() {
    console.log('PeopleInfo.jsx componentDidMount v3');
    Actions.getConsultants();
    // this.loadData();
  },

  loadData: function(){
    console.log('PeopleInfo.jsx loadData');
    PeopleInfoStore.getAll().end(function(error, response){
      console.log('PeopleInfo.jsx getAll.end');
      var data = PeopleInfoStore.formatData(PeopleInfoStore.rejectData(response.body));
      this.setState({people: data});
    }.bind(this));
  },

  render: function(){
    console.log('PeopleInfo.jsx render');
    return (
      <div id="people-info" className="people-list">
        <div className="container">
          <ul className="people-items titles">
            <li className="people-list-tile">
              <div className="people-tile-text">
                <div className="people-info-name">Name and email</div>
              </div>
              <div className="people-skills">
                <div className="people-info-p3">P3</div>
                <div className="people-info-tech-pairing">Technical</div>
              </div>
            </li>
          </ul>
        </div>
        <PeopleInfoList people={this.state.people} />
      </div>
    );
  }

});

module.exports = PeopleInfo;
