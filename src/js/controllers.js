

jraptors.controller('SearchController',
	[
		'$scope', '$http', 'animations', 'messages_spanish',
		function ($scope, $http, animations, messages) {

			$scope.search = function () {

				function readyToLendCopys_calculator(e) {
					return e.hasOwnProperty('lend');
				}

				if (  $scope.search_query  ) {
					$http.get('/dbmock/book.json?q=' + $scope.search_query ).success(  function(data) {

							var i, result, length;

							$scope.results = data;

							length = $scope.results.length;

							for (i = 0; i < length; i++) {
								result = $scope.results[i];
								result.readyToLendCopys = result.copys.filter(  readyToLendCopys_calculator  ).length;
							}

						});

					animations.proxy.trigger('search.first_valid');

					if ( $scope.results ) {
						$scope.message = '';
					} else {
						$scope.message = messages.search_no_results;
					}
					

				} else {
					$scope.results = [];
					$scope.message = messages.search_no_query;

				}
			};

		}
	]
);


