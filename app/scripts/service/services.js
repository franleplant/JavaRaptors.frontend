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
				function get_firt_directory(str) {
					var re = new RegExp('(/[^/]*)(.*)'),
						tokens = str.match(re);

					if ( !tokens ) {
						return [''];
					};


					tokens.shift();

					return tokens || [];
				};

				function match_paths( general, particular ) {

					var p1    = get_firt_directory(general),
						base1 = p1.shift(), 
						rest1 = base1 === '' ? null : p1.shift(),
						p2    = get_firt_directory(particular),
						base2 = p2.shift(),
						rest2 = base2 === '' ? null : p2.shift();

						console.log(base1, base2);

					if (  base1 === base2 ) {
						
						
						if ( rest1 == '/*') {

							return true;
							
						} else {
							if (rest1 === rest2) {
								return true;
							};

							return match_paths(rest1, rest2);
						}
					};

					return false;
				};

				
				return {
					match_paths: match_paths,
					get_firt_directory: get_firt_directory
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