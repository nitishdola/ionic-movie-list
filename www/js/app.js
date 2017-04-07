// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers']);

app.factory('Movies', function($http) {
  var cachedData;

  function getData(moviename, callback) {

    var url = 'http://api.themoviedb.org/3/',
      mode = 'search/movie?query=',
      name = '&query=' + encodeURI(moviename),
      key = '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';

    $http.get(url + mode + key + name).success(function(data) {

      console.log(JSON.stringify(data));

      cachedData = data.results;
      callback(data.results);
    });
  }

  return {
    list: getData,
    find: function(name, callback) {
      console.log(name);
      var movie = cachedData.filter(function(entry) {
        return entry.id == name;
      })[0];
      callback(movie);
    }
  };

});


app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: 'list.html',
      controller: 'ListCtrl'
    })
    .state('view', {
      url: '/movie/:movieid',
      templateUrl: 'view.html',
      controller: 'ViewCtrl'
    });

  $urlRouterProvider.otherwise("/");

});


app.controller('ListCtrl', function($scope, $http, Movies) {

  $scope.movie = {
    name: ''
  }

  $scope.searchMovieDB = function() {

    Movies.list($scope.movie.name, function(movies) {
      $scope.movies = movies;
    });
    
  };
});

app.controller('ViewCtrl', function($scope, $http, $stateParams, Movies) {
  Movies.find($stateParams.movieid, function(movie) {
    $scope.movie = movie;
  });
});