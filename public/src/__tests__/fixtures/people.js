var pedro_rocha = {
  id: 1,
  login: "procha",
  name: "Pedro Rocha",
  email: "procha@thoughtworks.com",
  role: "Dev",
  p3: "Lead",
  p2: "Pair"
},
patrick_prado = {
  id: 2,
  login: "pprado",
  name: "Patrick Prado",
  email: "pprado@thoughtworks.com",
  role: "BA",
  p3: "Not Allowed",
  p2: "Not Allowed"
};

module.exports = function(){
  return [pedro_rocha, patrick_prado];
};
