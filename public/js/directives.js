'use strict';

angular.module('movieSite.directives', [])
    .directive('movieList', function() {
        return {
            templateUrl: 'partials/movieList.html',
            controller: 'MovieSiteCtrl'
        }
    });