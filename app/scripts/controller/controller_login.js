angular.module('jr.login.controllers', []).

controller('SigninController', ['$scope', '$http',
	
		function ($scope, $http) {

			$scope.valid = false;

			$scope.signin = function () {

				$http({
					method: 'POST',
					url: '/LoginServlet',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					data: $.param({
						'username':  $scope.user,
						'password':  $scope.pwd
					})
				}).
				//this probably wont be necessary
				success(function(data, status, headers, config) {

					if (data.userName && data.password) {
						//location.href = 'index.html';
						return;
					}
				}).
				error(function(data, status, headers, config) {
					$scope.valid = false;
				});

				

			};


		}
	]
);