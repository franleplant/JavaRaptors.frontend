angular.module('jraptorsConfig', []).

	value('entityLabel', {
				'book': '',
				'copy': 'label-inverse',
				'affiliate': 'label-info',
				'editorial': 'label-warning',
				'author': 'label-success',
				'user':'label-important',
				'location': 'label-important'
			}
	).

	value('UserRoles', {
		'admin': {
			'allowedRoutes': ['/book/*', '/affiliate/*','/author/*', '/editorial/*', '/location/*', '/report/*']
		}, 
		'super': {
			'allowedRoutes': ['/*']
		}
	});