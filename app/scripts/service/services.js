// Move every service into factory, it is more clear what they do, see http://jsfiddle.net/manishchhabra/Ne5P8/



angular.module('jraptorsServices', ['jraptorsConfig', 'ngResource']).

service('animations', function () {
	this.proxy = jraptors.animations;
}).

factory('RootRoute', [ 'Mode', 'Routes',

		function (Mode, Routes) {
			return Routes[Mode];
		}
	]
).

factory('Search', ['$resource', 'RootRoute',

		function ($resource, RootRoute) {
			return $resource(  RootRoute + ':entityType', {page_number: 1}, {
				query: {
					method: 'GET',
					isArray: false
				}
			});
		}
	]
).

factory('Book', ['$resource', 'RootRoute',

		function ($resource, RootRoute) {
			return $resource(  RootRoute + 'book/:id', {id: '@id'}, {});
		}
	]
).

factory('bookLoader', ['Book', '$route', '$q',

		function(Book, $route, $q) {
			return function() {
				var dfd = $q.defer();

				Book.get({id: $route.current.params.id}, function(book) {
					dfd.resolve(book);
				}, function() {
					dfd.reject('Unable to fetch book '  + $route.current.params.id);
				});
				return dfd.promise;
			};
		}
	]
).

factory('bookCreateDefaultsLoader', ['Book',

		function(Book) {
			return function() {
				return new Book({
					'title': 'Ingrese Titulo',
					'isbn': 'Ingerese ISBN',
					'genres': [
						{
							'name':'Ingrese el Genero'
						}
					],
					'editionNumber': '3erd',
					'editionCountry': 'Mexico',
					'summary': 'Harrys potters is a little child',
					img: 'http://www.andrew.cmu.edu/user/jdeng/Images/Slowpoke.png',
					authors: [{
						name: 'new_author1'
					}],
					copies: [{
						comments: 'new copy1',
						lendType: ['foreign'],
						editionYear: (new Date()).getFullYear(),
						state: 'nuevo'
					}],
					editorial: {
						name: ''
					}
				});
			};
		}
	]
).


factory('Author', ['$resource', 'RootRoute',
		function ($resource, RootRoute) {
			return $resource(  RootRoute + 'author/:id', {id: '@id'}, {});
		}
	]
).

factory('authorLoader', ['Author', '$route', '$q',

		function(Author, $route, $q) {
			return function() {
				var dfd = $q.defer(),
					id = $route.current.params.id;

				Author.get({id: id}, function(author) {
					dfd.resolve(author);
				}, function() {
					dfd.reject('Unable to fetch author '  + id);
				});
				return dfd.promise;
			};
		}
	]
).

factory('authorCreateDefaultsLoader', ['Author', '$route', '$q',

		function(Author, $route, $q) {
			return function() {
				var dfd = $q.defer();

				Author.get({id: 0}, function(author) {

					delete author.id;
					dfd.resolve(author);
				}, function() {
					dfd.reject('Server Error');
				});
				return dfd.promise;
			};
		}
	]
).


factory('Affiliate', ['$resource', 'RootRoute',

		function ($resource, RootRoute) {
			return $resource(  RootRoute + 'affiliate/:id', {id: '@id'}, {});
		}
	]
).

factory('affiliateLoader', ['Affiliate', '$route', '$q',

		function(Affiliate, $route, $q) {
			return function() {
				var dfd = $q.defer();
				Affiliate.get({id: $route.current.params.id}, function(affiliate) {
					dfd.resolve(affiliate);
				}, function() {
					dfd.reject('Unable to fetch affiliate '  + $route.current.params.id);
				});
				return dfd.promise;
			};
		}
	]
).


factory('affiliateCreateDefaultsLoader', ['Affiliate', '$route', '$q',

		function(Affiliate, $route, $q) {
			return function() {
				var dfd = $q.defer();

				Affiliate.get({id: 0}, function(affiliate) {

					delete affiliate.id;
					dfd.resolve(affiliate);
				}, function() {
					dfd.reject('Server Error');
				});
				return dfd.promise;
			};
		}
	]
).


factory('User', ['$resource', 'RootRoute',
		function ($resource, RootRoute) {
			return $resource(  RootRoute + 'user/:id', {id: '@id'}, {});
		}
	]
).


factory('userLoader', ['User', '$route', '$q',

		function(User, $route, $q) {
			return function() {
				var dfd = $q.defer(),
					id = $route.current.params.id;

				User.get({id: id}, function(user) {

					dfd.resolve(user);
				}, function() {
					dfd.reject('Unable to fetch user '  + id);
				});
				return dfd.promise;
			};
		}
	]
).



factory('Editorial', ['$resource', 'RootRoute',
		function ($resource, RootRoute) {
			return $resource(  RootRoute + 'editorial/:id', {id: '@id'}, {});
		}
	]
).


factory('editorialLoader', ['Editorial', '$route', '$q',

		function(Editorial, $route, $q) {
			return function() {
				var dfd = $q.defer();

				Editorial.get({id: $route.current.params.id}, function(editorial) {
					dfd.resolve(editorial);
				}, function() {
					dfd.reject('Unable to fetch editorial '  + $route.current.params.id);
				});
				return dfd.promise;
			};
		}
	]
).



factory('ReportLends', ['$resource', 'RootRoute',
		function ($resource, RootRoute) {
			return $resource(  RootRoute + 'report_lends/', {}, {});
		}
	]
).



factory('reportLendsLoader', ['ReportLends', '$route', '$q',

		function(ReportLends, $route, $q) {
			return function() {
				var dfd = $q.defer();

				ReportLends.query( function(reportLends) {
					dfd.resolve(reportLends);
				}, function() {
					dfd.reject('Unable to fetch reportLends');
				});
				return dfd.promise;
			};
		}
	]
).



factory('ReportLateReturns', ['$resource', 'RootRoute',
		function ($resource, RootRoute) {
			return $resource(   RootRoute  +  'report_late_returns/', {}, {});
		}
	]
).


factory('reportLateReturnsLoader', ['ReportLateReturns', '$route', '$q',

		function(ReportLateReturns, $route, $q) {
			return function() {
				var dfd = $q.defer();

				ReportLateReturns.query( function(reportLateReturns) {
					dfd.resolve(reportLateReturns);
				}, function() {
					dfd.reject('Unable to fetch reportLateReturns');
				});
				return dfd.promise;
			};
		}
	]
).



factory('ReportTops', ['$resource', 'RootRoute',
		function ($resource, RootRoute) {
			return $resource( RootRoute + 'report_top/', {}, {});
		}
	]
).


factory('reportTopsLoader', ['ReportTops', '$route', '$q',

		function(ReportTops, $route, $q) {
			return function() {
				var dfd = $q.defer();

				ReportTops.query( function(reportTops) {
					dfd.resolve(reportTops);
				}, function() {
					dfd.reject('Unable to fetch reportTops');
				});
				return dfd.promise;
			};
		}
	]
).




factory('PathSelector', [ function () {

			//TODO: Document this function and the next one
			function get_first_directory(str) {
				var re = new RegExp('(/[^/]*)(.*)'),
					tokens = str.match(re);

				if ( !tokens ) {
					return [''];
				}


				tokens.shift();

				return tokens || [];
			}

			function match_paths( general, particular ) {

				var p1    = get_first_directory(general),
					base1 = p1.shift(),
					rest1 = base1 === '' ? null : p1.shift(),
					p2    = get_first_directory(particular),
					base2 = p2.shift(),
					rest2 = base2 === '' ? null : p2.shift();

				if (  base1 === '/*') {
					return true;
				}

				if (  base1 === base2 ) {
					if (rest1 === rest2) {
						return true;
					}
					return match_paths(rest1, rest2);
				}

				return false;
			}


			return {
				match_paths: match_paths,
				get_first_directory: get_first_directory
			};
		}
	]
).

 factory('UserSession', [ 'PathSelector', 'UserRoles',

		function (PathSelector, UserRoles) {
			var user_session = {};

			var name, role, token;



			//TODO: Refactor
			user_session.name = function (newValue) {
				if (!newValue) {
					return name;
				}

				name = newValue;
				return name;
			};

			user_session.role = function (newValue) {
				if (!newValue) {
					return role;
				}

				role = newValue;
				return role;
			};

			user_session.token = function (newValue) {
				if (!newValue) {
					return token;
				}

				token = newValue;
				return token;
			};

			user_session.isAllowedTo = function (path) {
				var i,
					allowedRoutes = UserRoles[role].allowedRoutes,
					len = allowedRoutes.length;

				for (i = 0; i < len; i++) {
					if ( PathSelector.match_paths( allowedRoutes[i], path )) {
						return true;
					}
				}

				return false;
			};

			return user_session;
		}
	]
).



factory('Copy_Lend', ['$resource', 'RootRoute',

		function ($resource, RootRoute) {
			return $resource(  RootRoute + 'copy/lend/:id', {id: '@id'}, {});
		}
	]
).

factory('copy_Lend_Loader', ['Copy_Lend', '$route', '$q',

		function(Copy_Lend, $route, $q) {
			return function() {
				var dfd = $q.defer();

				Copy_Lend.get({id: $route.current.params.id}, function(copy) {
					dfd.resolve(copy);
				}, function() {
					dfd.reject('Unable to fetch copy '  + $route.current.params.id);
				});
				return dfd.promise;
			};
		}
	]
).


factory('Copy_Return', ['$resource', 'RootRoute',

		function ($resource, RootRoute) {
			return $resource(  RootRoute + 'copy/return/:id', {id: '@id'}, {});
		}
	]
).

factory('copy_Return_Loader', ['Copy_Return', '$route', '$q',

		function(Copy_Return, $route, $q) {
			return function() {
				var dfd = $q.defer();

				Copy_Return.get({id: $route.current.params.id}, function(copy) {
					dfd.resolve(copy);
				}, function() {
					dfd.reject('Unable to fetch copy '  + $route.current.params.id);
				});
				return dfd.promise;
			};
		}
	]
);
