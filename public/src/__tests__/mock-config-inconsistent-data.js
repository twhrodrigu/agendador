var inconsistentData = function(){
  return [
    {"id": 1, "name":"Pedro Rocha"},
    {"id": 2, "name":"Patrick Prado", "email":"pprado@thoughworks.com", "team":"agendador", "other_prop": "something"}
  ];
};

module.exports = [
  {
    pattern: 'people',
    fixtures: inconsistentData,
    callback: function(match, data){
      console.log("data ===> ", data);
      return { body: data };
    }
  }
];