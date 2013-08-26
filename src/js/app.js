var jraptors = angular.module('jraptors', []);

//
// Build an animation proxy for event dispatcher
//
jraptors.animations = $({});


jraptors.config(
	[
		'$routeProvider',
		function($routeProvider) {
			$routeProvider.
				when('/', {templateUrl: 'template/book.html',   controller: 'SearchController'}).
			//	when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
				otherwise({redirectTo: '/phones'});
		}
	]
);

