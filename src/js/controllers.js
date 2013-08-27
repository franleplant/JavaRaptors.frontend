

jraptors.controller('SearchController',
	[
		'$scope', '$http', 'animations', 'spanish', '$route',
		function ($scope, $http, animations, spanish, $route) {

			$scope.message = spanish.status_msg.search_no_query;
			$scope.msg_no_result = spanish.status_msg.search_no_result;

			$scope.search = function () {

				$http.get('/dbmock/' + /^.*\/(.*).html/gi.exec($route.current.templateUrl)[1] + '.json?q=' + $scope.search_query ).success(  function(data) {

						$scope.results = data;
						$scope.no_result = data.no_result ? true : false;

					});

				animations.proxy.trigger('search.first_valid');


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
