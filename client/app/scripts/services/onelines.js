'use strict';

/**
 * @ngdoc service
 * @name clientApp.onelines
 * @description
 * # onelines
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('onelines', ['$http', function ($http) {
    
    var o = {
      onelines: []
    };

    // Get all onelines
    o.getAll = function() {
      return $http.get('/onelines').success(function(data) {
        angular.copy(data, o.onelines);
      });
    };

    o.create = function(oneline) {
      return $http.post('/onelines', oneline).success(function(data) {
        o.onelines.push(data);
      });
    };

    return o;
  }]);
