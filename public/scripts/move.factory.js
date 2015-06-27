/*global angular */

'use strict';

angular.module('pokeangular')

  .factory('Move', ['pokeapi', 'RestService', function (pokeapi, RestService) {

    var pokemonEndpoint = pokeapi.url + 'move/';

    var pokemonService = new RestService(pokemonEndpoint);

    return pokemonService;

  }]);