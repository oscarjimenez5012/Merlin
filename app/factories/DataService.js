(function() {
    'use strict';

    angular
        .module('merlin')
        .factory('dataService', dataService)



    dataService.$inject = ['$http'];

    var redditDetails = {};

    // service implementation
    function dataService($http) {
        var cantidadDeReddits = 0;
        return {
            getReddits: getReddits,
            setRedditDetails: setRedditDetails,
            getRedditDetails: getRedditDetails,
            getRedditsComments: getRedditsComments,
            numberOfReddits: numberOfReddits
        };
        // import json from https://www.reddit.com/reddits.json.
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

        // save reddit select by user.
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
        // return info from reddit select by user.
        function getRedditDetails(){
                return redditDetails;
        }


        // import json of reddit by the user.
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

        // save total items in reddits json.
        function numberOfReddits(){
            return cantidadDeReddits;
        }

    }

})();