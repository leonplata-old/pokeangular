/*global angular */

'use strict';

angular.module('pokeangular')

  .factory('RestService', ['$http', function ($http) {

    function RestService(serviceUrl) {
      this.serviceUrl = serviceUrl;
    }

    function getDataOnly(obj) {
      return obj.data;
    }

    RestService.prototype.getById = function (id) {
      var url = this.serviceUrl + id.toString();
      return $http.get(url).then(getDataOnly);
    };

    return RestService;
  }]);