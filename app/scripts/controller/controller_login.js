angular.module('jr.login.controllers', []).

controller('SigninController', ['$scope', '$http',
	
		function ($scope, $http) {

			$scope.validation = {
				userName: true,
				password: true
			};

			$scope.serverError = false;

			$scope.signin = function () {

				$scope.serverError = false;

				$http({
					method: 'POST',
					url: '/api/signin'
				}).

				success(function(data, status, headers, config) {

					if (data.userName && data.password) {
						location.href = 'index.html';
						return;
					}

					$scope.validation.userName = data.userName;
					$scope.validation.password = data.password;
				}).
				error(function(data, status, headers, config) {
					$scope.serverError = true;
				});

				

			};


		}
	]
);