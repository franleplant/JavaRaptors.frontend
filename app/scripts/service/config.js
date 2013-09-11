angular.module('jraptorsConfig', []).

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
	'location': 'ubicacion'
}).

value('availableCopyActions', {
	true: 'Devolver',
	false: 'Prestar'
}).

value('availableCopyClasses', {
	true: 'icon-arrow-left',
	false: 'icon-arrow-right'
});