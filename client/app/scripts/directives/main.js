'use strict';

angular.module('clientApp').directive('header', function() {
  return {
    restrict: 'A',
    templateUrl: '../../views/header.html'
  };
});
