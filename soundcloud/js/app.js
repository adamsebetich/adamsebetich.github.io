'use strict';

var BASE_URL = 'https://api.soundcloud.com'; //website we fetch information from
var CLIENT_ID = '66268ce5c536edc9a27abe02688a942e' //application ID for requests

var myApp = angular.module('myApp', [])
  .controller('MyCtrl', ['$scope', '$http', function($scope, $http) { 
  
    //function called to fetch tracks based on the scope's query
    $scope.getTracks = function() {
      var request = BASE_URL + '/tracks' + '?' +'client_id='+ CLIENT_ID + '&q=' + $scope.query; //build the RESTful request
      $http.get(request) //Angular AJAX call
        .then(function (response) {
          $scope.tracks = response.data; //save results to available model
        });
    };
    

}])
