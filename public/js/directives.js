'use strict';
// Segmenting our left and right columns into modular directives
angular.module('movieSite.directives', [])
    .directive('movieList', function () {
        return {
            templateUrl: 'partials/movieList.html'
        }
    })
    .directive('movieInfoPanel', function () {
        return {
            templateUrl: 'partials/movieInfoPanel'
        }
    });