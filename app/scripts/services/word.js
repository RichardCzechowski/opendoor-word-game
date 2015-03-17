angular.module('opendoorApp')
.service('WordService', [ '$http', function ($http) {
  //Get initial word
  var url = "https://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=proper-noun&minCorpusCount=15000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=4&maxLength=6&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
  var get = function(){
    return $http.get(url);
  };

  //Check for word in case user recombines word in new way
  var checkUrlBase = "https://api.wordnik.com:80/v4/word.json/";
  var checkUrlEnd = "/definitions?limit=1&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
  var check = function(word){
    word = word.toLowerCase();
    return $http.get(checkUrlBase + word + checkUrlEnd);
  };

  return {
    get : get,
    check : check
  };

}]);
