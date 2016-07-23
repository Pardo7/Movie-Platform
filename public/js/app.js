var app = angular.module("movieSite", ["ngResource", "ngRoute", "movieSite.controllers", "movieSite.services", "movieSite.directives"])
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .otherwise({
                redirectTo: "/"
            });
    }]);