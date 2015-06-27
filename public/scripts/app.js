/*global angular */

'use strict';

angular.module('pokeangular', [])

  .constant('pokeapi', {
    url: 'http://pokeapi.co/api/v1/',
    img: 'http://img.pokemondb.net/artwork/'
  })

  .service('RestService', ['$http', function ($http) {

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
  }])

  .service('Api', ['pokeapi', 'RestService', function (pokeapi, RestService) {

    var apiService = new RestService(pokeapi.url);

    return apiService;

  }])

  .service('Pokemon', ['pokeapi', 'RestService', function (pokeapi, RestService) {

    var pokemonEndpoint = pokeapi.url + 'pokemon/';

    var pokemonService = new RestService(pokemonEndpoint);

    return pokemonService;

  }])

  .service('Move', ['pokeapi', 'RestService', function (pokeapi, RestService) {

    var pokemonEndpoint = pokeapi.url + 'move/';

    var pokemonService = new RestService(pokemonEndpoint);

    return pokemonService;

  }])

  .controller('PokemonStats', ['$scope', 'Pokemon', 'Move', function ($scope, Pokemon, Move) {

    $scope.selectedMoveInfo = null;
    $scope.selectedMove = null;

    function notExist(value) {
      return value === null || value === undefined;
    }

    function setPokemon(pokemon) {
      $scope.pokemon = pokemon;
    }

    function extractMoveId(uri) {
      var elements = uri.split('/');
      var index = elements.length - 2;
      return elements[index];
    }

    function setMove(move) {
      $scope.selectedMove = move;
    }

    function findMove(id) {

      if (notExist(id)) {
        return;
      }

      Move.getById(id).then(setMove);
    }

    $scope.selectMove = function (moveInfo) {
      $scope.selectedMoveInfo = moveInfo;
      var moveId = extractMoveId(moveInfo.resource_uri);
      findMove(moveId);
    };

    $scope.findPokemon = function (pokemonId) {

      if (notExist(pokemonId)) {
        return;
      }

      Pokemon.getById(pokemonId).then(setPokemon);
    };

  }]);