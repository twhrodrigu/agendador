require('../less/app.less')
require('react-tap-event-plugin')();

var React = require('react'),
    Router = require('./Router');

Router.run(function (Handler) {
  React.render(<Handler/>, document.body)
})
