'use strict';

angular.module('ShoppingApp', ['ngSanitize', 'ui.router', 'ui.bootstrap'])

.config(function($stateProvider){

	$stateProvider
		.state('home', {
			url: '/', //"root" directory
			templateUrl: 'partials/home.html',
			controller: 'HomepageCtrl'
		})
		.state('information', {
			url: '/#Information', 
			templateUrl: 'partials/home.html'
		})
		.state('menu', {
			url: '/#Menu', 
			templateUrl: 'partials/home.html'
		})
		.state('story', {
			url: '/#Story',
			templateUrl: 'partials/home.html'
		})

		.state('order', {
			url: '/orders', 
			templateUrl: 'partials/order.html',
			controller: 'OrderCtrl'
		})

		.state('bean-id', {
			url: '/orders/bean-{id}', 
			templateUrl: 'partials/bean.html',
			controller: 'BeanCtrl'
		})	
		.state('shoppingCart', {
			url: '/orders/cart', 
			templateUrl: 'partials/shoppingCart.html',
			controller: 'shoppingCartCtrl'
		})
})
	// $stateProvider.otherwise('/');

.controller('HomepageCtrl', ['$scope', '$http', function($scope, $http) {

}])

.controller('OrderCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.sortingCriteria = '';

	$http.get('data/products.json').then(function(response) {
 		$scope.app = response.data;
 	});
 	 	$scope.saveBean = function(bean) {
 		bean.Name = bean.name;
 		bean.Description = bean.description;
 		bean.Categories = bean.categories;
 		cartList.saveBean(bean);
 		console.log("saved: ");
 		console.log(bean);
 		};
}])

.controller('BeanCtrl', ['$scope', '$http', '$uibModal', '$stateParams', '$filter', function($scope, $http, $uibModal, $stateParams, $filter) {
	
	$scope.categories = ['blends', 'dark roast', 'espresso', 'varietals', 'luxury'];
	
	$scope.addTocart = function(){
			//show modal!
			var modalInstance = $uibModal.open({
			   templateUrl: 'partials/cart.html',
			   controller: 'CartCtrl',
			   scope: $scope //pass in all our scope variables!
			});

			//get a result from the modal
			modalInstance.result.then(function(selectedBeans) {
			   $scope.bean = selectedBeans; //THIS IS WHERE I AM NOW!!!!!!!!!!!!!!!!!
			   console.log($scope.bean);
			});

		var name = $scope.bean.name; //get values
		var grind = $scope.bean.categories;

		// var theNewPost = {'title':title, 'date':date, 'content':body}; //object that is the new post

		// $scope.posts.push(theNewPost);
	};


	$http.get('data/products.json').then(function(response) {
		$scope.searchResults = response.data.Search;
   		$scope.bean = $filter('filter')(response.data, { //filter the array
      id: $stateParams.id //for items whose id property is targetId
   	}, true)[0]; //save the 0th result
 	});
 	$scope.saveBean = function(bean, priority) {
		bean.priority = $scope.priorities.indexOf(priority);
		watchList.saveBean(bean);
	}; 	
}])

.controller('CartCtrl', function($scope, $http, $uibModalInstance) {
  $scope.selectedBeans = {}; //nothing selected by default
  //when hit okay, return result
  // $scope.ok = function () {
  //    $uibModalInstance.close($scope.selectedBeans);
  // };
  // $scope.cancel = function () {
  //    $uibModalInstance.dismiss('cancel');
  // };
  $scope.select = function(bean) {
     $scope.selectedBeans = bean;
  }


})
.controller('shoppingCartCtrl', ['$scope', '$http', function($scope, $http) {
}])
.factory('cartList', function(){
	var service = {};

	service.app = [];

	service.saveBean = function(bean){
		service.app.push(bean);
	};

	return service; 
})

