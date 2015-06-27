/*global angular */

'use strict';

angular.module('pokeangular')

  .controller('PokemonStats', ['$scope', 'Pokemon', 'Move', function ($scope, Pokemon, Move) {

    $scope.selectedMoveInfo = null;
    $scope.selectedMove = null;

    function notExist(value) {
      return value === null || value === undefined;
    }

    function setPokemon(pokemon) {
      $scope.pokemon = pokemon;
      $scope.selectedMove = null;
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