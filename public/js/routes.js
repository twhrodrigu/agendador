module.exports = function ($routeProvider) {
  $routeProvider
    .when('/entrevistas', {
      templateUrl: 'construcao.html',
      controller: 'EntrevistasCtrl'
    })
    .when('/consultores', {
      templateUrl: 'construcao.html',
      controller: 'ConsultoresCtrl'
    })
    .when('/sobre', {
      templateUrl: 'sobre.html',
      controller: 'SobreCtrl'
    })
    .otherwise({ redirectTo: '/entrevistas' });
}

module.exports.$inject = ['$routeProvider']
