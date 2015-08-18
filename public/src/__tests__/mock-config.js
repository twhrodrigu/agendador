module.exports = [
  {
    pattern: 'consultants.json',
    fixtures: require('./fixtures/people.js'),
    callback: function(match, data){
      return { ok: true, body: data };
    }
  },
  {
  	pattern: 'consultants/pprado.json',
  	fixtures: function() {
  		return { 
  			"id": 1,
  			"login": "pprado",
  			"name": "Patrick Prado",
  			"email": "pprado@thoughtworks.com",
  			"p2": "Lead",
  			"p3": "Lead",
  			"role": "Dev"
  		}
  	},
  	callback: function(match, data){
  		return { ok: true, body: data };
  	}
  }

];
