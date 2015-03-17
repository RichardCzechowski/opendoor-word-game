angular.module('opendoorApp')
.service('KeyBinderService', [ '$document', '$rootScope', function ($document, $rootScope) {
  var key;
  function keyupHandler(keyEvent) {
    console.log(keyEvent);
    key = keyEvent.keyCode;
    $rootScope.$broadcast("keyPressed", key);
  }
  $document.on('keyup', keyupHandler);
}]);
