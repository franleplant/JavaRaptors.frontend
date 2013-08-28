

jraptors.controller('SearchController',
	[
		'$scope', 'animations', 'spanish', 'Search', 'Parse',
		function ($scope, animations, spanish, Search, Parse) {

			$scope.message =       spanish.status_msg.search_no_query;
			$scope.msg_no_result = spanish.status_msg.search_no_result;

			$scope.search = function () {

				// This is to test no_result, TODO: MAKE A TEST CASE
				//$scope.results = Search.query({entityType: 'book_no_result'}, function (data) {
				$scope.results = Search.query({entityType: Parse.tmplToEntity()}, function (data) {
					$scope.no_result = data[0].no_result ? true : false;
				});

				animations.proxy.trigger('search.first_valid');

			};

			$scope.reload = function () {
				//TODO: Lubricate edge cases of changing between entities after a search was perfomed
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
