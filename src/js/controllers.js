

jraptors.controller('SearchController',
	[
		'$scope', '$http', 'animations', 'messages_english',
		function ($scope, $http, animations, messages) {

			$scope.search = function () {
				if (  $scope.search_query  ) {
					$http.get('/db-mock/books.json?q=' + $scope.search_query ).success(  function(data) {
							$scope.results = data;
						});

					animations.proxy.trigger('search.first_valid');
					$scope.message = '';

				} else {
					$scope.results = [];
					$scope.message = messages.search_no_query;

				}
			};

		}
	]
);


