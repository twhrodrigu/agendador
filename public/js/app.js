var angular = require('angular');

angular
  .module('AgendaEntrevista', [])
  .run(function ($log) {
    $log.info('Angular Started');
  })
