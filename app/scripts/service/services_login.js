// Move every service into factory, it is more clear what they do, see http://jsfiddle.net/manishchhabra/Ne5P8/

jraptors.factory('SearchUsers', ['$resource',

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