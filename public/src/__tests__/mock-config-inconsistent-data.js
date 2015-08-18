var inconsistentData = function(){
  return [
    {"id": 1, "name":"Pedro Rocha"},

    {
      "id": 2,
      "name":"Patrick Prado",
      "email":"pprado@thoughtworks.com",
      "team":"agendador",
      "p3": "Not Allowed",
      "tech_pairing": "Not Allowed",
      "other_prop": "something"
    }
  ];
};

module.exports = [
  {
    pattern: 'people',
    fixtures: inconsistentData,
    callback: function(match, data) {
      return { ok: true, body: data };
    }
  }
];
