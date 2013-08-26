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
				when('/book', {templateUrl: 'template/book.html',   controller: 'SearchController'}).
				when('/affiliate', {templateUrl: 'template/affiliate.html',   controller: 'SearchController'}).

			//	when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
				otherwise({redirectTo: '/book'});
		}
	]
);

