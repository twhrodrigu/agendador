var React = require('react'),
    md5 = require('md5'),
    querystring = require('querystring'),
    isRetina = require('is-retina');


var Gravatar = React.createClass({
  propTypes: {
    email: React.PropTypes.string.isRequired,
    size: React.PropTypes.number.isRequired,
    default: React.PropTypes.number.isRequired,
    rating: React.PropTypes.number.isRequired,
    https: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return  {
      size: 50,
      rating: 'g',
      https: false,
      default: "retro"
    }
  },

  render: function () {
    var secure = "https://secure.gravatar.com/avatar/",
        unsecure = 'http://www.gravatar.com/avatar/',
        base = this.props.https ? secure : unsecure,
        size  = isRetina() ? this.props.size * 2 : this.props.size;

    var query = querystring.stringify({
          s: size,
          r: this.props.rating,
          d: this.props.default
        });

    var src = base + md5.digest_s(this.props.email) + "?" + query

    return (
      <img className="react-gravatar" 
        src={src} alt={this.props.email} 
        height={this.props.size} 
        width={this.props.size} />
    )
  }
});

module.exports = Gravatar;
