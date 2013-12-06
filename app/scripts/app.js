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
					controller: 'SearchController',
					label: 'Libros'
				}).


				when('/book/detailed_view/:id', {
					templateUrl: 'views/book.html',
					controller: 'BookDetailedViewController',
					label: 'Detalle',
					resolve: {
						book: function(bookLoader) {
							return bookLoader();
						}
					}
				}).
				


				when('/book/edit/:id', {
					templateUrl: 'views/book.html',
					controller: 'CreateEditBookController',
					label: 'Editar',
					resolve: {
						book: function(bookLoader) {
							return bookLoader();
						}
					}
				}).

				when('/book/create', {
					templateUrl: 'views/book.html',
					controller: 'CreateEditBookController',
					label: 'Crear',
					resolve: {
						book: function() {
							return;
						}
					}
				}).

				when('/book/return/:id',    {templateUrl: 'views/book_return.html',		label: 'Devolver',    controller: 'ReturnController'}).
				when('/book/lend/:id',      {templateUrl: 'views/book_lend.html', label: 'Prestar',      controller: 'LendController'}).


				//USER
	
				when('/user', {
					templateUrl: 'views/search.html',
					controller: 'SearchController',
					label: 'Usuarios'
				}).
				when('/user/detailed_view/:id',{
					templateUrl: 'views/user.html',
					controller: 'UserDetailedViewController',
					label: 'Detalle',
					resolve: {
						user: function(userLoader) {
							return userLoader();
						}
					}
				}).
				when('/user/edit/:id', {
					templateUrl: 'views/user.html',
					controller: 'CreateEditUserController',
					label: 'Editar',
					resolve: {
						user: function(userLoader) {
							return userLoader();
						}
					}
				}).
				when('/user/create', {
					templateUrl: 'views/user.html',
					controller: 'CreateEditUserController',
					label: 'Crear',
					resolve: {
						user: function() {
							return;
						}
					}
				}).


				//AFFILIATE
		
				when('/affiliate', {templateUrl: 'views/search.html', label: 'Socios', controller: 'SearchController'}).

				when('/affiliate/detailed_view/:id', {
					templateUrl: 'views/affiliate.html',
					controller: 'DetailedViewControllerAffiliate',
					label: 'Detalle',
					resolve: {
						affiliate: function(affiliateLoader) {
							return affiliateLoader();
						}
					}
				}).

				when('/affiliate/edit/:id', {
					templateUrl: 'views/affiliate.html',
					controller: 'CreateEditAffiliateController',
					label: 'Editar',
					resolve: {
						affiliate: function(affiliateLoader) {
							return affiliateLoader();
						}
					}
				}).

				when('/affiliate/create', {
					templateUrl: 'views/affiliate.html',
					controller: 'CreateEditAffiliateController',
					label: 'Crear',
					resolve: {
						affiliate: function() {
							return;
						}
					}
				}).
				
				when('/editorial', {templateUrl: 'views/search.html', label: 'Editoriales', controller: 'SearchController'}).

				when('/editorial/detailed_view/:id',{
					templateUrl: 'views/editorial.html',
					controller: 'DetailedViewControllerEditorial',
					label: 'Detalle',
					resolve: {
						editorial: function(editorialLoader) {
							return editorialLoader();
						}
					}
				}).


				when('/editorial/edit/:id', {
					templateUrl: 'views/editorial.html',
					controller: 'CreateEditEditorialController',
					label: 'Editar',
					resolve: {
						editorial: function(editorialLoader) {
							return editorialLoader();
						}
					}
				}).

				when('/editorial/create', {
					templateUrl: 'views/editorial.html',
					controller: 'CreateEditEditorialController',
					label: 'Crear',
					resolve: {
						editorial: function() {
							return;
						}
					}
				}).




				when('/author',{
					templateUrl: 'views/search.html',
					controller: 'SearchController',
					label: 'Autores'
				}).

				when('/author/detailed_view/:id', {
					templateUrl: 'views/author.html',
					controller: 'AuthorDetailedViewController',
					label: 'Detalle',
					resolve: {
						author: function(authorLoader) {
							return authorLoader();
						}
					}
				}).

				when('/author/edit/:id',{
					templateUrl: 'views/author.html',
					controller: 'CreateEditAuthorController',
					label: 'Editar',
					resolve: {
						author: function(authorLoader) {
							return authorLoader();
						}
					}
				}).

				when('/author/create',{
					templateUrl: 'views/author.html',
					controller: 'CreateEditAuthorController',
					label: 'Crear',
					resolve: {
						author: function() {
							return;
						}
					}
				}).


				when('/report',      {templateUrl: 'views/report.html', label: 'Reportes', controller: 'ReportController'}).

				when('/report/lends',{
					templateUrl: 'views/report_lends.html',
					controller: 'ReportLendsController',
					label: 'Retiros',
					resolve: {
						reportLends: function(reportLendsLoader) {
							return reportLendsLoader();
						}
					}
				}).

				when('/report/late_returns',{
					templateUrl: 'views/report_late_returns.html',
					controller: 'ReportLateReturnsController',
					label: 'Devoluciones en mora',
					resolve: {
						reportLateReturns: function(reportLateReturnsLoader) {
							return reportLateReturnsLoader();
						}
					}
				}).

				when('/report/top',{
					templateUrl: 'views/report_top.html',
					controller: 'ReportTopsController',
					label: 'Libros más retirados',
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

