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

jraptors.factory('Parse', ['$route',

		function ($route) {
			var re = /^.*\/(.*).html/gi;
			return {
				tmplToEntity: function () {
					return re.exec(  $route.current.templateUrl  )[1];
				}
			};
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


jraptors.service('messages_spanish', function () {

});


jraptors.service('spanish', function () {
	this.pathToEntity = {

		'/book': 'Libro',
		'/affiliate': 'Socio'

	};

	this.status_msg = {
		search_no_query: 'Por favor ingrese texto para realizar la busqueda',
		search_no_result: 'La busqueda no ha arrojado resultados, por favor re definala'
	};

});