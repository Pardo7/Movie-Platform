angular.module('movieSite.controllers', [])
    .controller('MovieSiteCtrl', ['$scope', 'movieSiteService', '$timeout', function ($scope, movieSiteService, $timeout) {
        // Setting our film scope variable for use in rendering our list of movies later
        $scope.films = {
            movies: [],
            directors: [],
            filmIds: [],
            movieCredits: []
        };
        // Setting our selected film scope variable for rendering an individual films detail in the
        // right column
        $scope.selectedFilm = {
            movie: "",
            director: "",
            writers: [],
            credits: [],
            star: ""
        };

        // Setting our selected film and its view details for the right column detail view
        $scope.selectedFeatureFilm = function(movie) {
            $scope.selectedFilm.movie = movie;
            var filmCrew = $scope.films.movieCredits.filter(function(data){
                if (data.id === movie.id) return data;
            });

            $scope.selectedFilm.director = filmCrew[0].crew.filter(function(crew){
                return crew.job.indexOf('Director') >= 0;
            })[0].name;

            $scope.selectedFilm.writers = filmCrew[0].crew.filter(function(crew){
                return crew.job.indexOf('Writer') >= 0;
            }).map(function(writer){ return writer });


            $scope.selectedFilm.credits = filmCrew[0].cast.slice(0, 5);
        };
        // Our image url function will allow us to take the partial url in our film object data -
        // and query our service 'the movie API', for the complete image
        $scope.imageUrl = function(url) {
            return movieSiteService.moviePosters(url);
        };
        // Allows us to render the appropriate film director using our ng-repeat in the movielist template
        $scope.filmDirector = function($index) {
            return $scope.films.directors[$index];
        };
        // Sets the large profile pic for the our selected movie star by passing in the index of that selection
        $scope.selectedStarPic = function($index) {
            $scope.selectedFilm.star = $scope.imageUrl($scope.selectedFilm.credits[$index].profile_path);
        };
        // Submits a request to our API service, sets our films to list, and also organizes our film id's for later use
        movieSiteService.movies().success(function(data) {
            $scope.films.movies = data.parts;
            $scope.films.filmIds = data.parts.map(function(data) {
               return data.id;
            });
        // After we've set our object data to render in our list view. We also call our generateMovieCredits function -
        // which will take all of the organized film id's, and submit a request to our service for all of the movie credit -
        // json data that we'll need for those movies in order to render the credits section of our movieInfoPanel directive.
            generateMovieCredits();
        // Selecting the first film in our list :)
            initialSelection();
        });
        // Our generateMovieCredits function will take our array of film id's and submit an api request for all of the -
        // credits json data to those films
        var generateMovieCredits = function() {
           angular.forEach($scope.films.filmIds, function(id) {
               movieSiteService.movieCredits(id).success(function(data) {
                   $scope.films.movieCredits.push(data);
       // We also simultaneously parse through the data returned, and identify who all our directors are for each film -
       // and store that list of directors in our film object
                   angular.forEach(data.crew, function(crew) {
                       if (crew.job === "Director") this.push(crew.name);
                   }, $scope.films.directors);
               });
           });
        };
        // ASSUMPTION HERE | Here I am assuming that we would like to allow the user to continue searching for similar movies
        // we use the most recent film id and submit an api request to our service for a new list of movies
        $scope.moreFilms = function() {
            var searchId = $scope.films.filmIds[$scope.films.filmIds.length - 1];
            movieSiteService.renderSimilarMovies(searchId).success(function(data) {
                $scope.films.movies = data.results;
                $scope.films.filmIds = data.results.map(function(data) {
                    return data.id;
                });
        // We submit an api request for the json movie credits data to those new movies as well
                generateMovieCredits();
                initialSelection();
            });
        };
        // Selects the first movie in our list
        $scope.initialSelection = function() {
            $timeout(function () {
                var button = angular.element(document.getElementsByClassName('poster'));
                button[0].click();
            }, 500);
        };

        $scope.selectedIndex = 0;
        $scope.selectedStarIndex = 0;
        // Our setActive function allows us to use our ng-class in tandem, in order to toggle selected films in our view
        $scope.setActive = function ($index) {
            $scope.selectedIndex = $index;
        };
        // Our setActiveStar function allows us to use ng-class in tandem, in order to toggle our selected movie star in our view
        $scope.setActiveStar = function($index) {
            $scope.selectedStarIndex = $index;
        };

    }]);
