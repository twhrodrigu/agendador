
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
    DropDownMenu = mui.DropDownMenu;



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
      selectedDate: DateInput.now(),
      selectedTime: DateInput.now(),
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
          <InputTime />
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

  _handleTimeChange: function(e) {
    this.setState({selectedTime: DateInput.parseTime(e.target.value)});
  },

  _handleDateChange: function(e) {
    this.setState({selectedDate: DateInput.parseDate(e.target.value)});
  },

  _handleTapSearch: function(e) {
    var token = Auth.getToken(),
        start = DateInput.setTime(this.state.selectedDate, this.state.selectedTime).toISOString(),
        role = this.state.roles[this.state.selectedRoleIndex].text,
        office = this.state.offices[this.state.selectedOfficeIndex].text;

    this.setState({people: [], loading: true});
    request
      .get('/v1/calendar/available')
      .query({ token: token })
      .query({ start: start })
      .query({ role: role })
      .query({ office: office })
      .end(function (e, r) {
        people = r.body.map((email) => ({email: email, name: email}))
        this.setState({people: people, loading: false});
      }.bind(this));

  }
});

module.exports = PeopleAvailable;
