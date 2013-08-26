jraptors.controller('SearchController', ['$scope', '$http', 
	function ($scope, $http) {

		$scope.search = function () {
			if (  $scope.search_query  ) {
				 $http.get('/db-mock/books.json?q=' + $scope.search_query ).
				 	success(  function(data) {
						$scope.results = data;
					});
			} else {

				$scope.status_message = "Please input some text to do the search";

			};
		};

	}
]);

