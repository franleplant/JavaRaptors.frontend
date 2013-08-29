var jraptors = angular.module('jraptors', ['ngResource','jraptorsFilters']);

//
// Build an animation proxy for event dispatcher
//
jraptors.animations = $({});


jraptors.config(
	[
		'$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$locationProvider.html5Mode(false);//read more at http://docs.angularjs.org/guide/dev_guide.services.$location

			$routeProvider.
				when('/book', {templateUrl: 'template/book.html',   controller: 'SearchController'}).
				when('/affiliate', {templateUrl: 'template/affiliate.html',   controller: 'SearchController'}).

			//	when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
				otherwise({redirectTo: '/book'});
		}
	]
);

