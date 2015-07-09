/** @jsx React.DOM */
var React = require('react'),
    PeopleList = require('./PeopleList'),
    Authentication = require('../mixins/Authentication'),
    DateInput = require('../utils/DateInput'),
    Auth = require('../Auth'),
    request = require('superagent'),
    mui = require('material-ui'),
    InputTime = require('./InputTime'),
    TextField = mui.TextField,
    Toolbar = mui.Toolbar,
    ToolbarGroup = mui.ToolbarGroup,
    RaisedButton = mui.RaisedButton,
    DropDownMenu = mui.DropDownMenu,
    moment = require('moment');



var PeopleAvailable = React.createClass({
  mixins: [ Authentication ],

  componentDidMount: function() {
    request
      .get('/v1/roles')
      .end(function (e, r) {
        this.setState({
          roles: r.body.map((role, idx) => ({payload: idx, text: role}))
        });
      }.bind(this));

      request
        .get('/v1/offices')
        .end(function (e, r) {
          this.setState({
            offices: r.body.map((office, idx) => ({payload: idx, text: office}))
          });
        }.bind(this));
  },

  getInitialState: function() {
    return {
      selectedDate: DateInput.parseDate(DateInput.now()),
      selectedStartTime: null,
      selectedEndTime: null,
      selectedRoleIndex: 0,
      selectedOfficeIndex: 0,
      roles: [],
      people: [],
      offices:[]
    }
  },

  render: function () {
    return (
      <div className="tempo-livre-page">
        <div className="search-form">
          <TextField hintText="Dia"
              type="date"
              value={DateInput.formatDate(this.state.selectedDate)}
              floatingLabelText="Dia"
              onChange={this._handleDateChange}
              required/>
          <InputTime className="startTimeBox" ref={this._timeBoxDidMount} onChange={this._handleTimeChange.bind(this, 'startTimeBox')} />
          <InputTime className="endTimeBox" ref={this._timeBoxDidMount} onChange={this._handleTimeChange.bind(this, 'endTimeBox')} />
          </div>
        <Toolbar>
          <ToolbarGroup float="left">
            {this.state.roles.length > 0 &&
              <DropDownMenu autoWidth={false} menuItems={this.state.roles} onChange={this._handleRoleChange} />
            }
          </ToolbarGroup>
          <ToolbarGroup float="left">
            {this.state.offices.length > 0 &&
              <DropDownMenu autoWidth={false} menuItems={this.state.offices} onChange={this._handleOfficeChange} />
            }
          </ToolbarGroup>
          <ToolbarGroup float="right">
          <RaisedButton label={this.state.loading? 'Buscando':'Buscar'}
                        primary={true}
                        onTouchTap={this._handleTapSearch}/>
          </ToolbarGroup>
        </Toolbar>
        {this.state.people.length > 0 &&
          <PeopleList people={this.state.people}/>
        }
      </div>
    )
  },

  _handleRoleChange: function (e, idx, item) {
    this.setState({selectedRoleIndex: idx})
  },
  _handleOfficeChange: function (e, idx, item) {
    this.setState({selectedOfficeIndex: idx})
  },

  _handleTimeChange: function(name, e, idx, item) {
    name == 'startTimeBox'
      ? this.setState({selectedStartTime: DateInput.parseTime(item.text)})
      : this.setState({selectedEndTime: DateInput.parseTime(item.text)});
  },

  _handleDateChange: function(e) {
    this.setState({selectedDate: DateInput.parseDate(e.target.value)});
  },

  _timeBoxDidMount:  function(component) {
    component.props.className == 'startTimeBox'
      ? this.setState({selectedStartTime: DateInput.parseTime(component.state.menuItems[0].text)})
      : this.setState({selectedEndTime: DateInput.parseTime(component.state.menuItems[0].text)});
  },

  _handleTapSearch: function(e) {
    var start = DateInput.setTime(this.state.selectedDate, this.state.selectedStartTime);
    var end = DateInput.setTime(this.state.selectedDate, this.state.selectedEndTime);
    var token = Auth.getToken(),
        start_time_timezone = moment(start).format(),
        end_time_timezone = moment(end).format(),
        role = this.state.roles[this.state.selectedRoleIndex].text,
        office = this.state.offices[this.state.selectedOfficeIndex].text;

    this.setState({people: [], loading: true});
    request
      .get('/v1/calendar/available')
      .query({ token: token })
      .query({ start: start_time_timezone })
      .query({ end: end_time_timezone})
      .query({ role: role })
      .query({ office: office })
      .end(function (e, r) {
        people = r.body;
        this.setState({people: people, loading: false});
      }.bind(this));

  }
});

module.exports = PeopleAvailable;
