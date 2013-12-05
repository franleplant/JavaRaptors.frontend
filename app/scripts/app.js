var jraptors = angular.module('jraptors', [
	'jraptors.Controllers', 'jraptorsFilters', 'jraptorsServices', 'jraptorsDirectives',
	'jraptorsConfig', 'jraptorsConfigBlock', 'jraptorsRunBlock', 'ui.bootstrap'
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


				//BOOK


				when('/book', {
					templateUrl: 'views/search.html',
					controller: 'SearchController'
				}).


				when('/book/detailed_view/:id', {
					templateUrl: 'views/book.html',
					controller: 'BookDetailedViewController',
					resolve: {
						book: function(bookLoader) {
							return bookLoader();
						}
					}
				}).
				


				when('/book/edit/:id', {
					templateUrl: 'views/book.html',
					controller: 'CreateEditBookController',
					resolve: {
						book: function(bookLoader) {
							return bookLoader();
						}
					}
				}).

				when('/book/create', {
					templateUrl: 'views/book.html',
					controller: 'CreateEditBookController',
					resolve: {
						book: function() {
							return;
						}
					}
				}).

				// id -> copy id
				when('/copy/lend/:id', {
					templateUrl: 'views/copy_lend.html',
					controller: 'LendController',
					resolve: {
						copy: function(copy_Lend_Loader) {
							return copy_Lend_Loader();
						}
					}
				}).

				when('/copy/return/:id', {
					templateUrl: 'views/copy_return.html',
					controller: 'ReturnController',
					resolve: {
						copy: function(copy_Return_Loader) {
							return copy_Return_Loader();
						}
					}
				}).
				


				//USER
	
				when('/user', {
					templateUrl: 'views/search.html',
					controller: 'SearchController'
				}).
				when('/user/detailed_view/:id',{
					templateUrl: 'views/user.html',
					controller: 'UserDetailedViewController',
					resolve: {
						user: function(userLoader) {
							return userLoader();
						}
					}
				}).
				when('/user/edit/:id', {
					templateUrl: 'views/user.html',
					controller: 'CreateEditUserController',
					resolve: {
						user: function(userLoader) {
							return userLoader();
						}
					}
				}).
				when('/user/create', {
					templateUrl: 'views/user.html',
					controller: 'CreateEditUserController',
					resolve: {
						user: function() {
							return;
						}
					}
				}).


				//AFFILIATE
		
				when('/affiliate', {templateUrl: 'views/search.html', controller: 'SearchController'}).

				when('/affiliate/detailed_view/:id', {
					templateUrl: 'views/affiliate.html',
					controller: 'DetailedViewControllerAffiliate',
					resolve: {
						affiliate: function(affiliateLoader) {
							return affiliateLoader();
						}
					}
				}).

				when('/affiliate/edit/:id', {
					templateUrl: 'views/affiliate.html',
					controller: 'CreateEditAffiliateController',
					resolve: {
						affiliate: function(affiliateLoader) {
							return affiliateLoader();
						}
					}
				}).

				when('/affiliate/create', {
					templateUrl: 'views/affiliate.html',
					controller: 'CreateEditAffiliateController',
					resolve: {
						affiliate: function() {
							return;
						}
					}
				}).
				
				when('/editorial', {templateUrl: 'views/search.html', controller: 'SearchController'}).

				when('/editorial/detailed_view/:id',{
					templateUrl: 'views/editorial.html',
					controller: 'DetailedViewControllerEditorial',
					resolve: {
						editorial: function(editorialLoader) {
							return editorialLoader();
						}
					}
				}).


				when('/editorial/edit/:id', {
					templateUrl: 'views/editorial.html',
					controller: 'CreateEditEditorialController',
					resolve: {
						editorial: function(editorialLoader) {
							return editorialLoader();
						}
					}
				}).

				when('/editorial/create', {
					templateUrl: 'views/editorial.html',
					controller: 'CreateEditEditorialController',
					resolve: {
						editorial: function() {
							return;
						}
					}
				}).




				when('/author',{
					templateUrl: 'views/search.html',
					controller: 'SearchController'
				}).

				when('/author/detailed_view/:id', {
					templateUrl: 'views/author.html',
					controller: 'AuthorDetailedViewController',
					resolve: {
						author: function(authorLoader) {
							return authorLoader();
						}
					}
				}).

				when('/author/edit/:id',{
					templateUrl: 'views/author.html',
					controller: 'CreateEditAuthorController',
					resolve: {
						author: function(authorLoader) {
							return authorLoader();
						}
					}
				}).

				when('/author/create',{
					templateUrl: 'views/author.html',
					controller: 'CreateEditAuthorController',
					resolve: {
						author: function() {
							return;
						}
					}
				}).


				when('/report',      {templateUrl: 'views/report.html', controller: 'ReportController'}).

				when('/report/lends',{
					templateUrl: 'views/report_lends.html',
					controller: 'ReportLendsController',
					resolve: {
						reportLends: function(reportLendsLoader) {
							return reportLendsLoader();
						}
					}
				}).

				when('/report/late_returns',{
					templateUrl: 'views/report_late_returns.html',
					controller: 'ReportLateReturnsController',
					resolve: {
						reportLateReturns: function(reportLateReturnsLoader) {
							return reportLateReturnsLoader();
						}
					}
				}).

				when('/report/top',{
					templateUrl: 'views/report_top.html',
					controller: 'ReportTopsController',
					resolve: {
						reportLops: function(reportTopsLoader) {
							return reportTopsLoader();
						}
					}
				}).

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
					'$q', '$location', 'UserSession',
					function ($q, $location, UserSession) {
						return {
							'request': function (request) {
								request.headers.Auth =  UserSession.token(); //sacar esto
								return request;
							},
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
			
			//This should be set by the server after sucessfully user login
			$cookies.username = 'franleplant';
			$cookies.userrole = 'super';


			//$cookies.sessionToken = 'someToken'; 


			UserSession.name(  $cookies.username  );
			UserSession.role(  $cookies.userrole  );
			
			//UserSession.token(  $cookies.sessionToken  );


			//http://docs.angularjs.org/api/ngRoute.$route
			$rootScope.$on('$routeChangeStart', function () {
				if (  !UserSession.isAllowedTo( $location.path() )  ) {
					$location.path('/401');
				}
			});


		}

	]
);

