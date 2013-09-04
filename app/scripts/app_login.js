/*var jraptors = angular.module('jraptors_login', ['ngResource','jraptorsFilters']);*/
var jraptors = angular.module('jraptors', ['ngResource','jraptorsFilters','ngCookies']);

//
// Build an animation proxy for event dispatcher
//

jraptors.config(
	[
		'$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$locationProvider.html5Mode(false);//read more at http://docs.angularjs.org/guide/dev_guide.services.$location

			$routeProvider.
				when('/login',     {templateUrl: 'login.html', controller: 'LoginController'}).
				when('/book',      {templateUrl: 'views/search.html', controller: 'SearchController'}).

				/*otherwise({redirectTo: '/book'});*/
				otherwise({redirectTo: '/login'});
		}
	]
);

