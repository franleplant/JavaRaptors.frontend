

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
		'$scope', '$timeout',
		function ($scope, $timeout) {

			var i = 2,
				j = 2;

			$scope.new_book = {
				authors: [{name: 'new_author1'}],
				copys: [{
					comments: 'new copy1',
					lendType: 'foreign',
					editionYear: (new Date()).getFullYear(),
					state: 'nuevo'
				}],
				editorial: {
					name: ''
				}
			};

			//TODO: refactor this
			$scope.rm_author = function (i) {
				$scope.new_book.authors.splice(i,1);
			};

			$scope.add_author = function () {
				$scope.new_book.authors.push({
					name:'new_author' + i
				});
				i++;
			};

			$scope.rm_copy = function (i) {
				$scope.new_book.copys.splice(i,1);
			};

			$scope.add_copy = function () {
				$scope.new_book.copys.push({
					comments: 'new copy' + j,
					lendType: 'foreign',
					editionYear: (new Date()).getFullYear(),
					state: 'nuevo'
				});
				j++;
			};


			$scope.dummys_authors= ['author1', 'author2'];
			$scope.dummys_editorials = ['editorial1', 'editorial2'];

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
