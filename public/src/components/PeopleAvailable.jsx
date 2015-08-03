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
    moment = require('moment'),
    ThemeManager = new mui.Styles.ThemeManager(),
    Colors = mui.Styles.Colors,
    Typography = mui.Styles.Typography;



var PeopleAvailable = React.createClass({
  mixins: [ Authentication ],

  getStyles: function() {
    return {
      freeTimePage: {
        backgroundColor: Colors.indigo500,
      },
      searchForm: {
        padding: 16
      },
      bottomToolbar: {
        backgroundColor: Colors.indigo700,
        height: 64,
        padding: '0px 20px'
      }
    };
  },

  getInitialState: function() {
    return {
      selectedDate: DateInput.now(),
      selectedStartTime: null,
      selectedEndTime: null,
      selectedRoleIndex: 0,
      selectedOfficeIndex: 0,
      roles: ["All", "BA", "Dev", "QA", "UI Dev", "XD", "PM", "DevOps"].map((role, idx) => ({payload: idx, text: role})),
      people: [],
      offices:["São Paulo", "Porto Alegre", "Recife", "Belo Horizonte"].map((office, idx) => ({payload: idx, text: office}))
    }
  },

  formatDate: function(value) {
    return DateInput.formatDate(value)
  },

  render: function () {
    var styles = this.getStyles();
    return (
      <div style={styles.freeTimePage}>
        <div style={styles.searchForm}>
          <DatePicker className="date-picker" hintText="Choose the day" mode="landscape" defaultDate={this.state.selectedDate} formatDate={this.formatDate} onChange={this._handleDateChange} required/>

          <InputTime className="start-time-box" ref={this._timeBoxDidMount} onChange={this._handleTimeChange.bind(this, 'start-time-box')} />
          <InputTime className="end-time-box"   ref={this._timeBoxDidMount} onChange={this._handleTimeChange.bind(this, 'end-time-box')} />
          </div>
        <Toolbar style={styles.bottomToolbar}>
          <ToolbarGroup float="left">
            {this.state.roles.length > 0 &&
              <DropDownMenu className="roles-box" autoWidth={true} menuItems={this.state.roles} onChange={this._handleRoleChange} />
            }
          </ToolbarGroup>
          <ToolbarGroup float="left">
            {this.state.offices.length > 0 &&
              <DropDownMenu className="offices-box" autoWidth={true} menuItems={this.state.offices} onChange={this._handleOfficeChange} />
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
    name == 'start-time-box'
      ? this.setState({selectedStartTime: DateInput.parseTime(item.text)})
      : this.setState({selectedEndTime: DateInput.parseTime(item.text)});
  },

  _handleDateChange: function(e, date) {
    this.setState({selectedDate: date});
  },

  _timeBoxDidMount:  function(component) {
    if (component) {
      component.props.className == 'start-time-box'
        ? this.setState({selectedStartTime: DateInput.parseTime(component.state.menuItems[0].text)})
        : this.setState({selectedEndTime: DateInput.parseTime(component.state.menuItems[0].text)});
    }
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
