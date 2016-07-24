'use strict';

/* Services */


// Showing how to register services
// In this case it is a simple value service.
angular.module('movieSite.services', [])
.factory('movieSiteService', ['$http', function($http) {

    return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/collection/528?api_key=8b05853e33a36859b7c1f0abef6d2c86'
    });

}]);
