

jraptors.controller('SearchController',
	[
		'$scope', '$http', 'animations', 'spanish', '$route',
		function ($scope, $http, animations, spanish, $route) {

			$scope.message = spanish.status_msg.search_no_query;

			$scope.search = function () {

				var no_results;

				$http.get('/dbmock/' + /^.*\/(.*).html/gi.exec($route.current.templateUrl)[1] + '.json?q=' + $scope.search_query ).success(  function(data) {

						$scope.results = data;

						no_results = data.no_results ? true : false;

					});

				animations.proxy.trigger('search.first_valid');

				if ( no_results ) {
					$scope.message = spanish.status_msg.search_no_results;
				} else {
					$scope.message = '';
				}
					

			};

			$scope.reload = function () {
				$scope.results = [];
			};

		}
	]
);

jraptors.controller('SelectEntityController',
	[
		'$scope', '$location',
		function ($scope, $location) {
			$scope.$location = $location;
		}
	]
);