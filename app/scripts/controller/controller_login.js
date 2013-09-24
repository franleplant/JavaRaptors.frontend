angular.module('jr.login.controllers', []).

controller('SigninController', ['$scope', '$http',
	
		function ($scope, $http) {

			$scope.signin = function () {

				$http({
					method: 'POST',
					url: '/api/signin'
				}).

					success(function(data, status, headers, config) {
						console.log('success', data);
					}).
					error(function(data, status, headers, config) {
						console.log('error', data);
					});

				//location.href = 'index.html';

			};


		}
	]
);