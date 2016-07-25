'use strict';

/* Services */


// Showing how to register services
// In this case it is a simple value service.
angular.module('movieSite.services', [])
    .factory('movieSiteService', ['$http', function($http) {

        var movies = function() {
            return $http({
                method: 'GET',
                url: 'https://api.themoviedb.org/3/collection/528?api_key=8b05853e33a36859b7c1f0abef6d2c86'
            });
        };

        var moviePoster = function(posterPath) {
            var baseImageUrl = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
            return baseImageUrl + posterPath;
        };

        var movieCredits = function(filmId) {
            return $http({
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/' + filmId + '/credits?api_key=8b05853e33a36859b7c1f0abef6d2c86'
            });
        };

        var renderSimilarMovies = function(id) {
            return $http({
                method: 'GET',
                url: 'http://api.themoviedb.org/3/movie/' + id + '/similar?api_key=8b05853e33a36859b7c1f0abef6d2c86'
            });
        };

        return {
            movies: movies,
            moviePosters: moviePoster,
            movieCredits: movieCredits,
            renderSimilarMovies: renderSimilarMovies
        }

    }]);
