jraptors.service('animations', function () {
	this.proxy = jraptors.animations;
});


jraptors.service('messages_english', function () {
	this.search_no_query = 'Please input some text to make the search';
	this.search_no_results = 'The search has thrown no results, please re define it';
});


jraptors.service('messages_spanish', function () {
	this.search_no_query = 'Por favor ingrese texto para realizar la busqueda';
	this.search_no_results = 'La busqueda no ha arrojado resultados, por favor re definala';
});