/*global angular */

'use strict';

angular.module('pokeangular', [])

  .constant('pokeapi', {
    url: 'http://pokeapi.co/api/v1/',
    img: 'http://img.pokemondb.net/artwork/'
  })

  .service('RestService', ['$http', function ($http) {

    function RestService(serviceUrl) {
      this._serviceUrl = serviceUrl;
    }

    Object.defineProperties(RestService.prototype, {
      serviceUrl: {
        get: function () {
          return this._serviceUrl;
        }
      }
    });

    RestService.prototype.getById = function (id) {
      var url = this.serviceUrl + id.toString();
      return $http.get(url)
        .then(function (response) {
          return response.data;
        });
    };

    return RestService;
  }])

  .service('Pokemon', ['pokeapi', 'RestService', function (pokeapi, RestService) {

    var pokemonEndpoint = pokeapi.url + 'pokemon/';

    var pokemonService = new RestService(pokemonEndpoint);

    return pokemonService;

  }])

  .controller('PokemonStats', ['$scope', 'Pokemon', function ($scope, Pokemon) {

    $scope.selected = null;

    $scope.selectMove = function (move) {
      $scope.selected = move;
    };

    $scope.setPokemon = function (num) {
      if (!(num <= num)) {
        return;
      }
      Pokemon.getById(num)
        .then(function (pokemon) {
          $scope.pokemon = pokemon;
        });
    };

    $scope.setPokemon();

  }]);