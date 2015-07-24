/** @jsx React.DOM */
var React = require('react'),
    Gravatar = require('./Gravatar'),
    mui = require('material-ui'),
    Paper = mui.Paper;

var Classable = require('../../node_modules/material-ui/lib/mixins/classable');

var Avatar = React.createClass({
  mixins: [Classable],

  propTypes: {
    email: React.PropTypes.string.isRequired,
    size: React.PropTypes.number.isRequired,
    circle: React.PropTypes.bool.isRequired,
    zDepth: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return  {
      size: 50,
      circle: true,
      zDepth: 0
    }
  },

  render: function () {
    var avatarStyle = {
      width: this.props.size,
      height: this.props.size,
      overflow: 'hidden'
    }

    var classes = this.getClasses('person-avatar');

    return (
      <Paper zDepth={this.props.zDepth}
             circle={this.props.circle}
             style={avatarStyle}
             className={classes}>
        <Gravatar email={this.props.email}
                  size={this.props.size}
                  rating='g'
                  default='retro'/>
      </Paper>
    )
  }
});

module.exports = Avatar;
