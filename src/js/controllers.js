

jraptors.controller('SearchController',
	[
		'$scope', '$http', 'animations', 'messages_spanish', '$route',
		function ($scope, $http, animations, messages, $route) {

			$scope.message = messages.search_no_query;

			$scope.search = function () {

				var no_results;

				if (  $scope.search_query  ) {
					$http.get('/dbmock/' + /^.*\/(.*).html/gi.exec($route.current.templateUrl)[1] + '.json?q=' + $scope.search_query ).success(  function(data) {

							$scope.results = data;

							no_results = data.no_results ? true : false;

						});

					animations.proxy.trigger('search.first_valid');

					if ( no_results ) {
						$scope.message = messages.search_no_results;
					} else {
						$scope.message = '';
					}
					

				}
			};

			$scope.reload = function () {
				$scope.results = [];
			};

		}
	]
);

