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
    DatePicker = mui.DatePicker,
    Toolbar = mui.Toolbar,
    ToolbarGroup = mui.ToolbarGroup,
    RaisedButton = mui.RaisedButton,
    DropDownMenu = mui.DropDownMenu,
    moment = require('moment');



var PeopleAvailable = React.createClass({
  mixins: [ Authentication ],

  getInitialState: function() {
    return {
      selectedDate: DateInput.now(),
      selectedStartTime: null,
      selectedEndTime: null,
      selectedRoleIndex: 0,
      selectedOfficeIndex: 0,
      roles: ["BA", "Dev", "QA", "UI Dev", "XD", "PM", "DevOps"],
      people: [],
      offices:["São Paulo", "Porto Alegre", "Recife", "Belo Horizonte"]
    }
  },

  formatDate: function(value) {
    return DateInput.formatDate(value)
  },

  render: function () {
    return (
      <div className="tempo-livre-page">
        <div className="search-form">
          <DatePicker hintText="Choose the day" mode="landscape" defaultDate={this.state.selectedDate} formatDate={this.formatDate} onChange={this._handleDateChange} required/>

          <InputTime className="start-time-box" ref={this._timeBoxDidMount} onChange={this._handleTimeChange.bind(this, 'startTimeBox')} />
          <InputTime className="end-time-box" ref={this._timeBoxDidMount} onChange={this._handleTimeChange.bind(this, 'endTimeBox')} />
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

  _handleDateChange: function(e, date) {
    this.setState({selectedDate: DateInput.parseDate(date)});
  },

  _timeBoxDidMount:  function(component) {
    component.props.className == 'start-time-box'
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
