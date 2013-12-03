angular.module('jraptorsConfig', []).


// Easy api root route changing
// Select one of the following two

// 'standalone': for running the Front End solo with the mocked API
// 'backend': for running the Front End with the real API provided by the backend
value('Mode', 'standalone').

value('Routes', {
	standalone: '/api/',
	backend: '/javaraptors.backend/api/'
}).

value('entityLabel', {
	'book': '',
	'copy': 'label-inverse',
	'affiliate': 'label-info',
	'editorial': 'label-warning',
	'author': 'label-success',
	'user':'label-important',
	'location': 'label-important'
}).

value('UserRoles', {
	'admin': {
		'allowedRoutes': ['/book/*', '/affiliate/*','/author/*', '/editorial/*', '/location/*', '/report/*']
	},
	'super': {
		'allowedRoutes': ['/*']
	}
}).

value('spanish', {
	'book': 'libro',
	'copy': 'ejemplar',
	'affiliate': 'socio',
	'author': 'autor',
	'editorial': 'editorial',
	'user': 'usuario',
	'location': 'ubicacion',
	'foreign': 'domiciliario',
	'local': 'local'
}).

value('availableCopyActions', {
	true: 'Devolver',
	false: 'Prestar'
}).

value('availableCopyClasses', {
	true: 'icon-arrow-left',
	false: 'icon-arrow-right'
});