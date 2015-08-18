'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    Actions = require('../actions/Actions'),
    PeopleInfoList = require('./PeopleInfoList'),
    PeopleInfoStore = require('../stores/PeopleInfoStore');

var PeopleInfo = React.createClass({
  mixins: [ Reflux.connect(PeopleInfoStore) ],

  componentDidMount: function() {
    Actions.getConsultants();
  },

  render: function() {
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
                <div className="people-info-p2">Technical</div>
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
