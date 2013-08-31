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
				when('/book',      {templateUrl: 'views/search.html', controller: 'SearchController'}).
				when('/affiliate', {templateUrl: 'views/search.html', controller: 'SearchController'}).
				when('/author',    {templateUrl: 'views/search.html', controller: 'SearchController'}).
				when('/editorial', {templateUrl: 'views/search.html', controller: 'SearchController'}).


				when('/book/detailed_view/:id',      {templateUrl: 'views/book.html',      controller: 'DetailedViewController'}).
				when('/affiliate/detailed_view/:id', {templateUrl: 'views/affiliate.html', controller: 'DetailedViewController'}).
				when('/author/detailed_view/:id',    {templateUrl: 'views/author.html',    controller: 'DetailedViewController'}).
				when('/editorial/detailed_view/:id', {templateUrl: 'views/editorial.html', controller: 'DetailedViewController'}).

				when('/book/edit/:id',      {templateUrl: 'views/book_edit.html',      controller: 'EditController'}).
				when('/affiliate/edit/:id', {templateUrl: 'views/affiliate_edit.html', controller: 'EditController'}).
				when('/author/edit/:id',    {templateUrl: 'views/author_edit.html',    controller: 'EditController'}).
				when('/editorial/edit/:id', {templateUrl: 'views/editorial_edit.html', controller: 'EditController'}).

				when('/book/return/:id',      {templateUrl: 'views/book_return.html',      controller: 'ReturnController'}).
				when('/affiliate/return/:id', {templateUrl: 'views/affiliate_return.html', controller: 'ReturnController'}).
				when('/author/return/:id',    {templateUrl: 'views/author_return.html',    controller: 'ReturnController'}).
				when('/editorial/return/:id', {tempreteUrl: 'views/editorial_return.html', controller: 'ReturnController'}).


				when('/book/lend/:id',      {templateUrl: 'views/book_lend.html',      controller: 'LendController'}).
				when('/affiliate/lend/:id', {templateUrl: 'views/affiliate_lend.html', controller: 'LendController'}).
				when('/author/lend/:id',    {templateUrl: 'views/author_lend.html',    controller: 'LendController'}).
				when('/editorial/lend/:id', {templateUrl: 'views/editorial_lend.html', controller: 'LendController'}).


				when('/book/create/:id',      {templateUrl: 'views/book_create.html',      controller: 'CreateController'}).
				when('/affiliate/create/:id', {templateUrl: 'views/affiliate_create.html', controller: 'CreateController'}).
				when('/author/create/:id',    {templateUrl: 'views/author_create.html',    controller: 'CreateController'}).
				when('/editorial/create/:id', {templateUrl: 'views/editorial_create.html', controller: 'CreateController'}).

				otherwise({redirectTo: '/book'});
		}
	]
);

