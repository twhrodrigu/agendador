/** @jsx React.DOM */
var context = require.context('./spec', true, /.jsx$/);

//make sure you have your directory and regex test set correctly!
context.keys().forEach(context);
module.exports = context;
