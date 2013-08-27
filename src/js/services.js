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