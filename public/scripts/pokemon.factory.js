/*global angular */

'use strict';

angular.module('pokeangular')

  .factory('Pokemon', ['pokeapi', 'RestService', function (pokeapi, RestService) {

    var pokemonEndpoint = pokeapi.url + 'pokemon/';

    var pokemonService = new RestService(pokemonEndpoint);

    return pokemonService;

  }]);