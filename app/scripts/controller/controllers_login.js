
jraptors.controller('LoginController',
	[
		'$scope', 'SearchUsers', '$window', '$cookieStore', '$location',
		function ($scope, SearchUsers, $window, $cookieStore, $location) {

			$scope.ComprobarLogin = function(){

				$scope.results = SearchUsers.query({entityType: 'user'}, function (data) {
					var validate = 'false';
					var validate_user = 'false';
					$('.text-error').hide();

					for (var i = 0; i < data.length; i++) {

						if (data[i].userName === $scope.userName) {

							validate_user = 'true';

							if (data[i].userPsw === $scope.userPsw) {
								validate = 'true';

								//seteo valores con put para $cokieStore
								$cookieStore.put('Id', data[i].userId);
								$cookieStore.put('Name', data[i].userName);

								//console.log($cookieStore.get('Name'));
						
								$window.location.href = '/index.html';
								
							} else {
								//console.log('no pas');
								$('#alert-contrasenia').show();
							}
						} else {
								//console.log('no user');
						}
					}

					if (validate_user === 'false') {
						$('#alert-username').show();
					}
					
					console.log(validate);
				});
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