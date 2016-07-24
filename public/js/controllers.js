angular.module('movieSite.controllers', [])
    .controller('MovieSiteCtrl', ['$scope', 'movieSiteService', function ($scope, movieSiteService) {

        $scope.movies;

        movieSiteService.success(function(data) {
            $scope.movies = data;
            console.log($scope.movies);
        });
    }]);
