var jraptors = angular.module('jraptors', [
	'jraptors.Controllers', 'jraptorsFilters', 'jraptorsServices', 'jraptorsDirectives', 'jraptorsConfig', 'jraptorsConfigBlock', 'jraptorsRunBlock', 'ui.bootstrap'
]);

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
				when('/book',      {templateUrl: 'views/search.html', controller: 'SearchController'}).
				when('/affiliate', {templateUrl: 'views/search.html', controller: 'SearchController'}).
				when('/author',    {templateUrl: 'views/search.html', controller: 'SearchController'}).
				when('/editorial', {templateUrl: 'views/search.html', controller: 'SearchController'}).
				when('/user',      {templateUrl: 'views/search.html', controller: 'SearchController'}).
				when('/location',  {templateUrl: 'views/search.html', controller: 'SearchController'}).

				when('/book/return/:id',    {templateUrl: 'views/book_return.html',    controller: 'ReturnController'}).
				when('/book/lend/:id',      {templateUrl: 'views/book_lend.html',      controller: 'LendController'}).


				when('/book/detailed_view/:id',      {templateUrl: 'views/book.html',      controller: 'DetailedViewController'}).
				when('/affiliate/detailed_view/:id', {templateUrl: 'views/affiliate.html', controller: 'DetailedViewController'}).
				when('/author/detailed_view/:id',    {templateUrl: 'views/author.html',    controller: 'DetailedViewController'}).
				when('/editorial/detailed_view/:id', {templateUrl: 'views/editorial.html', controller: 'DetailedViewController'}).
				when('/user/detailed_view/:id',      {templateUrl: 'views/user.html',      controller: 'DetailedViewController'}).
				when('/location/detailed_view/:id',  {templateUrl: 'views/location.html',  controller: 'DetailedViewController'}).

				when('/book/edit/:id', {
					templateUrl: 'views/book_edit_create.html',
					controller: 'CreateBookController',
					resolve: {
						book: function(BookLoader) {
							return BookLoader();
						}
					}
				}).
				when('/affiliate/edit/:id', {templateUrl: 'views/affiliate_edit.html', controller: 'EditController'}).
				when('/author/edit/:id',    {templateUrl: 'views/author_edit.html',    controller: 'EditController'}).
				when('/editorial/edit/:id', {templateUrl: 'views/editorial_edit.html', controller: 'EditController'}).
				when('/user/edit/:id',      {templateUrl: 'views/user_edit.html',      controller: 'EditController'}).
				when('/location/edit/:id',  {templateUrl: 'views/location_edit.html',  controller: 'EditController'}).


				when('/book/create',      {templateUrl: 'views/book_edit_create.html',      controller: 'CreateBookController'}).
				when('/affiliate/create', {templateUrl: 'views/affiliate_create.html', controller: 'CreateController'}).
				when('/author/create',    {templateUrl: 'views/author_create.html',    controller: 'CreateController'}).
				when('/editorial/create', {templateUrl: 'views/editorial_create.html', controller: 'CreateController'}).
				when('/user/create',      {templateUrl: 'views/user_create.html',      controller: 'CreateController'}).
				when('/location/create',  {templateUrl: 'views/location_create.html',  controller: 'CreateController'}).


				when('/report',      {templateUrl: 'views/report.html', controller: 'ReportController'}).

				when('/401',         {templateUrl: 'views/401.html', controller: 'ReportController'}).

				otherwise({redirectTo: '/book'});
		}
	]
);


//HTTP interceptor for server errors, mainly auth errors
angular.module('jraptorsConfigBlock', []).config(
	[
		'$httpProvider',
		function ($httpProvider) {
			//http://bneijt.nl/blog/post/angularjs-intercept-api-error-responses/
			$httpProvider.interceptors.push(
				[
					'$q', '$location',
					function ($q, $location) {
						return {
							'response': function (response) {
								return response;
							},
							'responseError': function (rejection) {
								if(rejection.status === 401) {
									$location.path('/401');
								}
								return $q.reject(rejection);
							}
						};
					}
				]
			);
		}
	]
);

angular.module('jraptorsRunBlock', ['ngCookies']).run(
	[
		'$rootScope', 'UserSession', '$cookies', '$location',
		function ($rootScope, UserSession, $cookies, $location) {
			
			$cookies.username = 'franleplant';
			$cookies.userrole = 'admin';

			UserSession.name(  $cookies.username  );
			UserSession.role(  $cookies.userrole  );

			//http://docs.angularjs.org/api/ngRoute.$route
			$rootScope.$on('$routeChangeStart', function () {
				if (  !UserSession.isAllowedTo( $location.path() )  ) {
					$location.path('/401');
				}
			});


		}

	]
);

