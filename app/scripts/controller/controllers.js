

angular.module('jraptors.Controllers', []).controller('SearchController',
	[
		'$scope', 'animations', 'Search', '$location',
		function ($scope, animations, Search, $location) {

			$scope.search = function (page) {
				
				// This is to test no_result, TODO: MAKE A TEST CASE
				//$scope.results = Search.query({entityType: 'book_no_result'}, function (data) {
				$scope.response = Search.query({
						q: $scope.search_query,
						page_number: page || 1,
						entityType: $location.path().slice(1)
					},
					function (data) {
						$scope.no_result = data.no_result ? true : false;
					});

				animations.proxy.trigger('search.first_valid');

			};

			$scope.reload = function () {
				//TODO: Lubricate edge cases of changing between entities after a search was perfomed
				$scope.response = [];
			};
		}
	]
).

controller('SelectEntityController',
	[
		'$scope', '$location',
		function ($scope, $location) {
			$scope.$location = $location;
		}
	]
).




//TODO
controller('DetailedViewController',
	[
		'$scope',
		function ($scope) {
		}
	]
).

controller('EditController',
	[
		'$scope',
		function ($scope) {
		}
	]
).


controller('ReturnController',
	[
		'$scope',
		function ($scope) {
		}
	]
).


controller('LendController',
	[
		'$scope',
		function ($scope) {
		}
	]
).




controller('CreateController',
	[
		'$scope',
		function ($scope) {
		}
	]
).





controller('NavBarController',
	[
		'$scope',
		function ($scope) {
		}
	]
).

controller('BreadcrumbController',
	[
		'$scope',
		function ($scope) {
		}
	]
).

controller('ReportController',
	[
		'$scope',
		function ($scope) {
		}
	]
);
