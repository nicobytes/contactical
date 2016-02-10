(function() {
  'use strict';

  angular
    .module('app.filters')
    .filter('proper', properFilter);

  properFilter.$inject = [];

  function properFilter() {
    return function( name ){
      var type = typeof name;
      if(type !== 'string' && type !== 'number') throw new Error();
      return name.toString().split(" ").map(function(word){
        return word[0].toUpperCase().concat(word.slice(1));
      }).join(" ");
    }
  }
})();