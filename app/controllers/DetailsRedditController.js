(function() {
    'use strict';

    angular
        .module("merlin")
        .controller('detailsController', detailsController);

        // default page size is 10
        function detailsController(dataService){
        var vm = this;



        // Call function to import Reddit details
        getRedditDetails();

        // Call Function to import Reddit Comments.
        listRedditDetails();





        // Function to import Reddit details
        function getRedditDetails() {
            var data = dataService.getRedditDetails();
            vm.info = {
                header_title: data.header_title,
                banner_img: data.banner_img,
                description_html: data.description_html,
                submit_text_html: data.submit_text_html,
                url: data.url
            }
        }

        // Function to import Reddit Comments
        function listRedditDetails(){
            return dataService.getRedditsComments(vm.info.url)
                .then(function(data) {
                    vm.redditDetails = data.data.children;
                })
        }

    }
})();