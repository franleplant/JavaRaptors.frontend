

jraptors.controller('SearchController',
	[
		'$scope', '$http', 'animations', 'messages_spanish', '$route',
		function ($scope, $http, animations, messages, $route) {

			$scope.search = function () {

				var no_results;

				function readyToLendCopys_calculator(e) {
					return !e.hasOwnProperty('lend');
				}

				if (  $scope.search_query  ) {
					$http.get('/dbmock/' + /^.*\/(.*).html/gi.exec($route.current.templateUrl)[1] + '.json?q=' + $scope.search_query ).success(  function(data) {

							var i, result, length;

							$scope.results = data;

							no_results = data.no_results ? true : false;

							length = $scope.results.length;

							for (i = 0; i < length; i++) {
								result = $scope.results[i];
								result.readyToLendCopys = result.copys.filter(  readyToLendCopys_calculator  ).length;
							}

						});

					animations.proxy.trigger('search.first_valid');

					if ( no_results ) {
						$scope.message = messages.search_no_results;
					} else {
						$scope.message = '';
					}
					

				} else {
					$scope.message = messages.search_no_query;

				}
			};

			$scope.reload = function () {
				$scope.results = [];
			};

		}
	]
);

