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


angular.module('jraptorsServices', ['jraptorsConfig']).

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

					if (  base1 === '/*') {
						return true
					};

					if (  base1 === base2 ) {
						if (rest1 === rest2) {
							return true
						};					
						return match_paths(rest1, rest2);
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

	factory('UserSession', [ 'PathSelector', 'UserRoles',

			function (PathSelector, UserRoles) {
				var user_session = {};

				var name, role;


				//TODO: Refactor and test
				user_session.name = function (newValue) {
					if (!newValue) {
						return name;
					};

					name = newValue;
					return name;	
				};

				user_session.role = function (newValue) {
					if (!newValue) {
						return role;
					};

					role = newValue;
					return role;	
				};

				user_session.isAllowedTo = function (path) {				
					var i,
						allowedRoutes = UserRoles[role].allowedRoutes,
						len = allowedRoutes.length;

					for (i = 0; i < len; i++) {
						if ( PathSelector.match_paths( allowedRoutes[i], path )) {
							return true;
						}
					};

					return false;
				};

				return user_session;
			}
		]
	);

