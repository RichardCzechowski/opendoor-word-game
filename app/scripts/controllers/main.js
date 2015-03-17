'use strict';

/**
 * @ngdoc function
 * @name opendoorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the opendoorApp
 */
angular.module('opendoorApp')
.controller('MainCtrl',[ '$scope', '$timeout', '$location', 'WordService', 'ScrambleService', 'KeyBinderService', 'FirebaseService', function ($scope, $timeout, $location, WordService, ScrambleService, keyBinder, firebase) {


  //variable initialization
  $scope.word ={
    word: [],
    definition: 'Start to find out!'
  }
  $scope.scrambled = [];
  $scope.answer = [];
  $scope.winner = "";
  $scope.time = 120;
  $scope.player ={
    score: 0,
    name: ''
  }
  $scope.gameOver = false;

  $scope.timer = function(){
    $timeout(function() {
      if ($scope.time > 0){
        $scope.time--;
        $scope.timer();
      }
      else{
        $scope.loseGame();
      }
    }, 1000);
  };

  //user wordnix api to get word, fix word format, then scramble word
  $scope.getWord = function(){
    WordService.get()
    .success(function(data, status, headers, config) {
      $scope.answer = [];
      $scope.winner = "";
      $scope.word.word = data.word.toUpperCase().replace(/\W+/g, "").split('');
      $scope.scrambled = ScrambleService(angular.copy($scope.word.word));
    })
    .error(function(data, status, headers, config) {
      console.log(data);
    });
  };

  $scope.init = function(){
    $scope.timer();
    $scope.getWord();
  };

  //entry point into app
  $scope.init();

  //when a letter is either clicked or typed, it is removed from the scrambled array and added to the answer array.
  //then we check to see if all the letters have been used, if so, they are passed to the answer 'check' function.
  $scope.addLetter = function (letter){
    if ($scope.scrambled.indexOf(letter) >=0){
      $scope.answer.push(letter);
      var temp = $scope.scrambled.indexOf(letter);
      $scope.scrambled.splice(temp, 1);
      if ($scope.answer.length == $scope.word.word.length){
        $scope.check();
      }
    }
  };

  //instead of checking to see if the unscrambled word is the one we got from the api, we check to see if it is ANY word
  //this keeps us from having a word like 'steam' unscrambled into 'meats' and being counted as wrong.
  $scope.check = function(){
    var answer = $scope.answer.join('');
    WordService.check(answer)
    .success(function(data, status, headers, config) {
      console.log(data);
      if (data.length){
        $scope.winner = 'win';
        $scope.win();
        console.log(data[0].text);
        $scope.word.definition = data[0].text;
      }
      else{
        $scope.winner = 'lose';
        $scope.lose();
      }
    })
    .error(function(data, status, headers, config) {
      console.log(data);
    });
  };

  //if you win an individual round, count points, then get new word
  $scope.win = function(){
    $scope.player.score += $scope.word.word.length;
    $scope.getWord();
  }

  //if you lose, subtract a point, then replace scrambled array with answer array so player can try again.
  $scope.lose = function(){
    $timeout(function(){
      $scope.scrambled = $scope.answer;
      $scope.answer = [];
    }, 1000);
    $scope.player.score--;
  };

  //show game over, hide player screen
  $scope.loseGame = function(){
    $scope.gameOver = true;
  };

  //save scrores to firebase, then reset form, finally fetch scores to see how we've done!
  $scope.saveScore = function(player){
    firebase.create(player);
    $scope.player = {
      name: '',
      score: 0
    }

    firebase.read().on("value", function(snapshot) {
      $scope.topscores = [];
      snapshot.forEach(function(data) {
        $scope.topscores.push({name: data.val().name, score: data.val().score});
      });
      $scope.$apply();
      console.log($scope.topscores);
    });
  };

  //controls
  $scope.skip= function(){
    $scope.player.score--;
    $scope.getWord();
  };

  $scope.shuffle = function(){
    $scope.answer = [];
    $scope.scrambled = ScrambleService(angular.copy($scope.word.word));
  };

  //cheat function to reaload window. It pushes the user to a redirect to home.
  $scope.reset = function(){
    $location.path('/x');
  };

  //listen for keypresses and add them to the answer array
  $scope.$on('keyPressed', function(e, value) {
    var letter = String.fromCharCode(value)
    console.log(letter, value)
    $scope.addLetter(letter);
    $scope.$apply();
  });

}]);
