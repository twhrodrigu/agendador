var React = require('react'),
    Reflux = require('reflux'),
    PeopleList = require('./PeopleList'),
    PeopleAvailableStore = require('../stores/PeopleAvailableStore'),
    Authentication = require('../mixins/Authentication'),
    DateInput = require('../utils/DateInput'),
    Actions = require('../actions/Actions'),
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
  mixins: [ Authentication, Reflux.connect(PeopleAvailableStore) ],

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

  formatDate: function(value) {
    return DateInput.formatDate(value)
  },

  render: function () {
    var styles = this.getStyles();
    return (
      <div style={styles.freeTimePage}>
        <div style={styles.searchForm}>
          <DatePicker ref="date" className="date-picker" hintText="Choose the day" mode="landscape" defaultDate={this.state.selectedDate} formatDate={this.formatDate} onChange={Actions.selectDate} required/>

          <InputTime ref="startTime" className="start-time-box" selectedIndex={this.state.selectedStartTimeIndex} onChange={Actions.selectStartTime} />
          <InputTime ref="endTime"   className="end-time-box"   selectedIndex={this.state.selectedEndTimeIndex}   onChange={Actions.selectEndTime} />
        </div>
        <Toolbar style={styles.bottomToolbar}>
          <ToolbarGroup float="left">
            {this.state.roles.length > 0 &&
              <DropDownMenu ref="role" className="roles-box" selectedIndex={this.state.selectedRoleIndex} autoWidth={true} menuItems={this.state.roles} onChange={Actions.selectRole} />
            }
          </ToolbarGroup>
          <ToolbarGroup float="left">
            {this.state.offices.length > 0 &&
              <DropDownMenu ref="office" className="offices-box" selectedIndex={this.state.selectedOfficeIndex} autoWidth={true} menuItems={this.state.offices} onChange={Actions.selectOffice} />
            }
          </ToolbarGroup>
          <ToolbarGroup float="right">
          <RaisedButton ref="search"
                        label={this.state.loading? 'Buscando':'Buscar'}
                        primary={true}
                        onTouchTap={Actions.searchRequest}/>
          </ToolbarGroup>
        </Toolbar>
        {this.state.people.length > 0 &&
          <PeopleList ref="people" people={this.state.people}/>
        }
      </div>
    )
  },
});

module.exports = PeopleAvailable;
