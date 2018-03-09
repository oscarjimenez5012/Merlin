(function() {
    'use strict';

    angular
        .module("merlin")
        .controller('ListRedditsController', ListRedditsController);


        // controller implementation
        function ListRedditsController(dataService, PagerService) {

        // set default variables
        var vm = this;
        vm.total = 0;
        vm.pager = {};
        vm.setPage = setPage;

        // save info from reddit select by user
        vm.setRedditsDetails = function(item){
            dataService.setRedditDetails(item);
        };

        // Call function to import reddits JSON.
        listReddits();

        function initController() {
            // initialize to page 1
            vm.setPage(1);
        }
        function setPage(page) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }

            // get pager object from service
            vm.pager = PagerService.GetPager(vm.total, page);

            // get current page of items
            vm.items = vm.listOfReddits.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
        }
        function listReddits() {
            return dataService.getReddits()
                .then(function(data) {
                    vm.listOfReddits = data.data.children;
                    vm.total = dataService.numberOfReddits();
                    initController();
                })
        }
    }
})();