module.exports = [
  {
    pattern: 'consultants',
    fixtures: require('./fixtures/people.js'),
    callback: function(match, data){
      return { ok: true, body: data };
    }
  }
];
