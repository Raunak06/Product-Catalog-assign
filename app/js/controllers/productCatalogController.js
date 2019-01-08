/**
    * @ngdoc controller
    * @name productCatalogController
    * @memberof productCatalogApp
    *
    * @param productCatalogService service that helps in handling AJAX calls
    * @param $scope model object that helps in communication between view and controller
    *
    * @description
    * Controller that handles all the operations like -
    *   1. Get all the available products list
    *   2. Add selected product to shopping cart and remove from product grid
    *   3. Remove product from shopping cart and add it to product grid
    */

(function (angular) {
    angular.module('productCatalogApp')
        .controller('productCatalogController', productCatalogController);

    productCatalogController.$inject = ['productCatalogService', '$scope'];
    function productCatalogController(productCatalogService, $scope) {
        $scope.productList = [];
        $scope.shoppingCartList = [];
        $scope.showShoppingCartProducts = false;

        $scope.getProductCatalogData = getProductCatalogData;
        $scope.addProductToCart = addProductToCart;
        $scope.removeProductFromCart = removeProductFromCart;

        /**
            * @ngdoc method
            * @name getProductCatalogData
            * @memberof productCatalogApp.productCatalogController
            *
            * @description
            * 1. Get all the available products list using productCatalogService service getProductCatalogData method
            */
        function getProductCatalogData() {
            productCatalogService.getProductCatalogData().then(function(response) {
                $scope.productList = response.data;
            });
        }

        /**
            * @ngdoc method
            * @name addProductToCart
            * @memberof productCatalogApp.productCatalogController
            *
            * @description
            * 1. Add selected product to shopping cart list
            * 2. Remove 'No product selected' and display products in shopping cart if shopping cart list isn't empty
            * 3. Call 'removeProductFromList' method to remove selected product from product grid
            */
        function addProductToCart(productDetails) {
            $scope.shoppingCartList.push(productDetails);

            if ($scope.shoppingCartList.length !== 0) {
                $scope.showShoppingCartProducts = true;
            }

            // Remove product from product grid
            removeProductFromList($scope.productList, productDetails);
        }

        /**
            * @ngdoc method
            * @name addProductToCart
            * @memberof productCatalogApp.productCatalogController
            *
            * @description
            * 1. Call 'removeProductFromList' method to remove selected product from shopping cart
            * 2. Display 'No product selected' in shopping cart if shopping cart list is empty
            * 3. Add selected product to product grid
            */
        function removeProductFromCart(productDetails) {
            // Remove product from shopping cart list
            removeProductFromList($scope.shoppingCartList, productDetails);
    
            if ($scope.shoppingCartList.length === 0) {
                $scope.showShoppingCartProducts = false;
            }

            $scope.productList.push(productDetails);
        }

        /**
            * @ngdoc method
            * @name removeProductFromList
            * @memberof productCatalogApp.productCatalogController
            * 
            * @param productList list of products (product grid or shopping cart list)
            * @param productToRemove selected product to remove from the list
            * 
            * @description
            * 1. Common method to remove product from product grid or shopping cart list given the list in param
            */
        function removeProductFromList(productList, productToRemove) {
            var indexOfProductToBeRemoved;
            if (productList.length !== 0) {
                angular.forEach(productList, function(product, index) {
                    if (product.productName === productToRemove.productName) {
                        indexOfProductToBeRemoved = index;
                    }
                });
            }
            productList.splice(indexOfProductToBeRemoved, 1);
        }
    }
}(angular));