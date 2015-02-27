var angular = require('angular'),
    ngRoute = require('angular-route'),
    routes = require('./routes');

angular
  .module('AgendaEntrevista', [ngRoute])
  .config(routes)
  .run(function ($log) {
    $log.info('Angular Started');
  })
