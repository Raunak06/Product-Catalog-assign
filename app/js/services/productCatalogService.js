/**
    * @ngdoc service
    * @name productCatalogService
    * @memberof productCatalogApp
    *
    * @param $http service that helps in handling AJAX calls
    * @param $q service which runs functions asynchronously
    * @param $location service that parses the URL in the browser address bar and makes the URL available to the application
    *
    * @description
    * 1. This service handles the AJAX requests to fetch list of products available
    * 2. returns array of the products.
    */

(function (angular) {
    angular.module('productCatalogApp')
        .factory('productCatalogService', productCatalogService);

    productCatalogService.$inject = ['$http', '$q', '$location'];
    function productCatalogService($http, $q, $location) {
        var productCatalogService = {};

        productCatalogService.getProductCatalogData = getProductCatalogData;
        return productCatalogService;

        /**
            * @ngdoc method
            * @name getProductCatalogData
            * @memberof productCatalogApp.productCatalogService
            *
            * @description
            * 1. Makes an ajax to recieve the list of available products 
            */

        function getProductCatalogData() {
            var deferred = $q.defer();
            var url = $location.absUrl() + 'json/productData.json';

            $http({
                url: url,
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                async: 'true'
            })
            .then( function(data) {
                deferred.resolve(data);
            }, function(data) {
                deferred.reject(data);
            });

            return deferred.promise;
        }
    }
}(angular));