'use strict';

var React        = require('react'),
    Avatar       = require('./Avatar'),
    _            = require('underscore'),
    mui          = require('material-ui'),
    Actions      = require('../actions/Actions'),
    DropDownMenu = mui.DropDownMenu;

var PeopleInfoItem = React.createClass({
  menuItems: [
    {payload: null, text: 'Unset' },
    {payload: 0,    text: 'Not Allowed' },
    {payload: 1,    text: 'Pair' },
    {payload: 2,    text: 'Lead' }
  ],

  getStyles: function() {
    return {
      root: {
         width: 110
      },
      label: {
        paddingLeft: 0
      },
      underline: {
        margin: "-1px 0"
      },
      menuItem: {
        width: "auto"
      },
      icon: {
        right: 0
      }
    };
  },

  updateAttribute: function(attrName, e, selectedIndex, menuItem) {
    var attr = {}
    attr[attrName] = menuItem.payload;
    Actions.updateConsultant(this.props.login, attr);
  },

  findSelectedIndex: function(prop) {
    var intProp = (prop != null) ? parseInt(prop) : null; 
    return _.findIndex(this.menuItems, function (item) {
        return (intProp === item.payload) || (prop === item.text);
    })
  },

  render: function() {
    var styles = this.getStyles();

    var p3Index = this.findSelectedIndex(this.props.p3);
    var p2Index = this.findSelectedIndex(this.props.p2);

    return (
      <li className="people-list-tile">
        <Avatar size={40} className='people-tile-avatar' email={this.props.email}/>
        <div className="people-tile-text">
          <div className="people-tile-text-name">{this.props.name}</div>
          <div className="people-tile-text-email">{this.props.email}</div>
        </div>
        <div className="people-skills">
          <div className="people-info-p3"><DropDownMenu className="p3-dropdown" selectedIndex={p3Index} menuItems={this.menuItems} onChange={this.updateAttribute.bind(this, "p3")} style={styles.root} labelStyle={styles.label} underlineStyle={styles.underline} menuItemStyle={styles.menuItem} iconStyle={styles.icon} /></div>
          <div className="people-info-p2"><DropDownMenu className="p2-dropdown" selectedIndex={p2Index} menuItems={this.menuItems} onChange={this.updateAttribute.bind(this, "p2")} style={styles.root} labelStyle={styles.label} underlineStyle={styles.underline} menuItemStyle={styles.menuItem} iconStyle={styles.icon} /></div>
        </div>
      </li>
    );
  }
});

module.exports = PeopleInfoItem;
