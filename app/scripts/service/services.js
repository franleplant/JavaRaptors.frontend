// Move every service into factory, it is more clear what they do, see http://jsfiddle.net/manishchhabra/Ne5P8/


jraptors.factory('Search', ['$resource',

		function ($resource) {
			return $resource('/dbmock/:entityType.json', {}, {
				query: {
					method: 'GET',
					isArray: true
				}
			});
		}
	]
);


jraptors.service('animations', function () {
	this.proxy = jraptors.animations;
});


jraptors.service('english', function () {

	this.status_msg = {
		search_no_query: 'Please input some text to make the search',
		search_no_results: 'The search has thrown no results, please re define it'
	};
});



jraptors.service('spanish', function () {

	this.status_msg = {
		search_no_query: 'Por favor ingrese texto para realizar la busqueda',
		search_no_result: 'La busqueda no ha arrojado resultados, por favor re definala'
	};

	this.translate = {
		'book': 'libro',
		'copy': 'ejemplar',
		'affiliate': 'socio',
		'author': 'autor',
		'editorial': 'editorial',
		'user': 'usuario',
		'location': 'ubicacion'
	};

});


angular.module('jraptorsService', []).

	factory('PathSelector', [
			function () {

				//TODO: Document this function and the next one
				function parse (str) {
					var re = new RegExp("(/[^/]*)(.*)"),
						tokens = str.match(re);

					tokens.shift();

					return tokens;
				};

				function match_paths( general, particular ) {
					var t1 = parse(general),
						t2 = parse(particular);

					if (  t1.shift() === t2.shift() ) {
						if ( t1[0] === '/*') {
							return true
						} else {
							match_paths(t1.join(''), t2.join(''))
						}
					};

					return false;
				};
				return {
					match_paths: match_paths
				};
			}
		]
	).

	factory('UserSession', [ 'SuperRestrictedRoutes', 'PathSelector',

			function (restrictedRoutes, PathSelector) {
				var user_session = {};

				var name = '';
				var role = 0;

				function get_set(container, newValue) {
					if (!newValue) {
						return container;
					};

					container = newValue;
					return container;				
				};




				user_session.name = function (newValue) {
					get_set(name, newValue);
				};

				user_session.role = function (newValue) {
					get_set(role, newValue);
				};

				user_session.isAllowedTo = function (path) {

					var i,
						len = restrictedRoutes.length;

					for (i = 0; i < len; i++) {
						if ( PathSelector.match_paths( restrictedRoutes[i], path )) {
							return true
						}
					};

					return false;

				};

				return user_session;
			}
		]
	).

	value('UserRoles', ['admin', 'super'] ).
	value('SuperRestrictedRoutes', ['/user/*'])