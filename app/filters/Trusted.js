(function() {
    'use strict';


    angular
        .module("merlin")
        .filter('trusted', trustedFunction);

    trustedFunction.$inject = ['$sce'];

    function trustedFunction($sce) {
            var div = document.createElement('div');
            return function(text) {
                div.innerHTML = text;
                return $sce.trustAsHtml(div.textContent);
            };
        }
})();