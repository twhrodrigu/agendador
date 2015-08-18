var inconsistentData = function(){
  return [
    {"id": 1, "name":"Pedro Rocha"},

    {
      "id": 2,
      "login": "pprado",
      "name":"Patrick Prado",
      "email":"pprado@thoughtworks.com",
      "team":"agendador",
      "role": "Dev",
      "p3": "Not Allowed",
      "p2": "Not Allowed",
      "other_prop": "something"
    }
  ];
};

module.exports = [
  {
    pattern: 'consultants',
    fixtures: inconsistentData,
    callback: function(match, data) {
      return { ok: true, body: data };
    }
  }
];
