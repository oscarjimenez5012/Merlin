(function() {
    'use strict';


    angular
        .module("merlin")
        .config(function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('');
            $routeProvider

                .when("/", {
                    templateUrl: "./views/content-page.html"
                })
                .when("/details/r/:url", {
                    templateUrl: "./views/details.html"
                })
                .when('/link1/:url', {
                    templateUrl: "./views/details.html"
                })
        })
})();