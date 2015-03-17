angular.module('opendoorApp')
.service('ScrambleService', [ function () {

  var scrambler =
    function (array) {
      var counter = array.length, temp, index;

      // While there are elements in the array
      console.log(array);
      while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }

      console.log(array);
      return array;
    }

    return scrambler;

}]);
