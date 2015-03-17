angular.module('opendoorApp')
.service('FirebaseService', [ '$http', function ($http) {

  var createRef = new Firebase("https://opendoorwordgame.firebaseio.com/");
  var readRef = new Firebase("https://opendoorwordgame.firebaseio.com/scores");

  var create = function(player){
    createRef.child('scores').push({
      name: player.name,
      score: player.score
    });
  };

  var read = function(){
    return readRef.orderByChild('score').limitToLast(5)
  };

  return {
    create : create,
    read : read
  };

}]);
