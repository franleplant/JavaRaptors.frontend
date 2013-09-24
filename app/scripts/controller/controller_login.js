angular.module('jr.login.controllers', []).

controller('SigninController', ['$scope', '$http',
	
		function ($scope, $http) {

			$scope.validation = {
				userName: true,
				password: true
			};

			$scope.signin = function () {

				$http({
					method: 'POST',
					url: '/api/signin'
				}).

					success(function(data, status, headers, config) {
						console.log('success', data);

						if (data.userName && data.password) {
							//location.href = 'index.html';
							return;		
						}

						$scope.validation.userName = data.userName;
						$scope.validation.password = data.password;
					}).
					error(function(data, status, headers, config) {
						console.log('error', data);
					});

				

			};


		}
	]
);