angular.module('jr.login.controllers', []).

controller('SigninController', ['$scope',
	
		function ($scope) {
			$scope.signin = function () {
				if ($scope.userName === 'cacho') {
					location.href = "index.html";
				}
			};


		}
	]
);