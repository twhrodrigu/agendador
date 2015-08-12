module.exports = [
  {
    pattern: 'people',
    fixtures: require('./fixtures/people.js'),
    callback: function(match, data){
      return { body: data };
    }
  }
];
