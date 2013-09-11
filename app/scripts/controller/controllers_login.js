
jraptors.controller('LoginController', 
	[
		'$scope', 'SearchUsers', '$window', '$cookieStore', 
		function ($scope, SearchUsers, $window, $cookieStore) {

			$scope.ComprobarLogin = function(){

				$scope.results = SearchUsers.query({entityType: 'user'}, function (data) {
					var validate = 'false';

					for (var i = 0; i < data.length; i++) {
						data[i];
						if (data[i].userName == $scope.userName) {
							if (data[i].userPsw == $scope.userPsw) {
								validate = 'true';

								//seteo valores con put para $cokieStore
					        	$cookieStore.put('Id', data[i].userId);
					        	$cookieStore.put('Name', data[i].userName);

					        	// traigo un dato de la cookie 
					        	//console.log($cookieStore.get('Name'));
						
					        	//fijate que angular provee metodos para ir a otra pagina
								window.location.href = 'app.html';
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

jraptors.controller('SelectEntityController',
	[
		'$scope', '$location',
		function ($scope, $location) {
			$scope.$location = $location;
		}
	]
);