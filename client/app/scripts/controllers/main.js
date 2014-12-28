'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', ['$scope', 'onelines', function ($scope, onelines) {
    $scope.onelines = onelines.onelines;

    $scope.addOneline = function() {
      onelines.create({
        subject: $scope.subject,
        oneline: $scope.oneline
      });

      $scope.subject = '';
      $scope.oneline = '';
    };


  //  $scope.addOneline = function() {
  //    var oneline = {
  //      subject: $scope.subject,
  //      oneline: $scope.oneline
  //    };
  //    $http.post('/onelineable', oneline);
  //  };
  }]);
