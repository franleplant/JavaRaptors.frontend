

jraptors.controller('SearchController',
	[
		'$scope', 'animations', 'spanish', 'Search', '$location',
		function ($scope, animations, spanish, Search, $location) {

			$scope.message =       spanish.status_msg.search_no_query;
			$scope.msg_no_result = spanish.status_msg.search_no_result;

			$scope.search = function () {

				// This is to test no_result, TODO: MAKE A TEST CASE
				//$scope.results = Search.query({entityType: 'book_no_result'}, function (data) {
				$scope.results =Search.query(  {  entityType: $location.path().slice(1)  }, function (data) {
					$scope.no_result = data[0].no_result ? true : false;
				})
				;

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



//TODO
jraptors.controller('DetailedViewController',
	[
		'$scope',
		function ($scope) {
		}
	]
);

jraptors.controller('EditController',
	[
		'$scope',
		function ($scope) {
		}
	]
);


jraptors.controller('ReturnController',
	[
		'$scope',
		function ($scope) {
		}
	]
);


jraptors.controller('LendController',
	[
		'$scope',
		function ($scope) {
		}
	]
);

jraptors.controller('CreateController',
	[
		'$scope',
		function ($scope) {
		}
	]
);

jraptors.controller('NavBarController',
	[
		'$scope',
		function ($scope) {
		}
	]
);

jraptors.controller('BreadcrumbController',
	[
		'$scope',
		function ($scope) {
		}
	]
);

jraptors.controller('ReportController',
	[
		'$scope',
		function ($scope) {
		}
	]
);


jraptors.controller('LoginController', 
	[
		'$scope', 'SearchUsers', '$window',
		function ($scope, SearchUsers, $window) {

			$scope.ComprobarLogin = function(){

				$scope.results = SearchUsers.query({entityType: 'user'}, function (data) {
					var validate = 'false';

					for (var i = 0; i < data.length; i++) {
						data[i];
						if (data[i].userName == $scope.userName) {
							if (data[i].userPsw == $scope.userPsw) {
								validate = 'true';
								window.location.href = '/#/book';
							} else {
								//console.log('no pas');
							};
						} else {
								//console.log('no user');
							};
					};
					
					console.log(validate);
				})
			};
		}
	]
);
