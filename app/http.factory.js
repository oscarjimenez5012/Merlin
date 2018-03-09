(function() {
    'use strict';

    angular
        .module('merlin')
        .factory('dataService', dataService)
        .filter('trusted', ['$sce', function($sce) {
        var div = document.createElement('div');
        return function(text) {
            div.innerHTML = text;
            return $sce.trustAsHtml(div.textContent);
        };
    }])
        .factory('PagerService', PagerService);

    dataService.$inject = ['$http'];

    var redditDetails = {};
    function dataService($http) {
        var cantidadDeReddits = 0;
        return {
            getReddits: getReddits,
            setRedditDetails: setRedditDetails,
            getRedditDetails: getRedditDetails,
            getRedditsComments: getRedditsComments,
            numberOfReddits: numberOfReddits
        };

        function getReddits() {
            return $http.get('https://www.reddit.com/reddits.json')
                .then(getRedditsComplete)
                .catch(getRedditsFailed);

            function getRedditsComplete(response) {
                cantidadDeReddits = response.data.data.children.length;
                return response.data;
            }

            function getRedditsFailed(error) {
                console.log('XHR Failed for getAvengers.' + error.data);
            }
        }
        function setRedditDetails(data){
            redditDetails = {
                header_title: data.header_title,
                banner_img: data.banner_img,
                description_html: data.description_html,
                submit_text_html: data.submit_text_html,
                url: data.url
            };
            return true;

        }
        function getRedditDetails(){
                return redditDetails;
        }
        function getRedditsComments(url) {
            return $http.get('https://www.reddit.com'+url+'.json')
            //$http.get('https://www.reddit.com'+url)
                .then(getRedditsDetailsComplete)
                .catch(getRedditsDetailsFailed);
            function getRedditsDetailsComplete(response) {
                return response.data;
            }

            function getRedditsDetailsFailed(error) {
                console.log('XHR Failed for getAvengers.' + error.data);
            }
        }
        function numberOfReddits(){
            return cantidadDeReddits;
        }

    }
    function PagerService() {
        // service definition
        var service = {};

        service.GetPager = GetPager;

        return service;

        // service implementation
        function GetPager(totalItems, currentPage, pageSize) {
            // default to first page
            currentPage = currentPage || 1;

            // default page size is 10
            pageSize = pageSize || 10;

            // calculate total pages
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // calculate start and end item indexes
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages to ng-repeat in the pager control
            var pages = [];
            for(var i = 1; i <= totalPages; i++){
                pages.push(i);
                //pages.push(
            }




            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
    }
})();