angular.module('jraptorsFilters', []).

	filter('availableToLendCopys', function() {


		function is_available(e) {
			return !e.hasOwnProperty('lend');
		}

		return function(input) {
			input = input || [];
			return input.filter(  is_available  ).length;
		};
	}).

	filter('pathToEntity',	[ 

			function() {
				return function(input) {
					return input.slice(1);
				};
			}
		]
	).

	filter('toClassLabel',	function() {

			var mapper = {
				'book': '',
				'copy': 'label-inverse',
				'affiliate': 'label-info',
				'editorial': 'label-warning',
				'author': 'label-success',
				'user':'label-important',
				'location': 'label-important'
			};

			return function(input) {
				return mapper[input];
			};
		}
		
	).

	filter('translate',	[ 'spanish',

			function(spanish) {

				return function(input) {
					return spanish.translate[input];
				};
			}
		]
	).

	filter('typeToTemplate', [

			function() {

				var mapper = {
					'book': 'book',
					'copy': 'book',
					'affiliate': 'affiliate',
					'author': 'author',
					'user': 'user',
					'location': 'location'
				}

				return function(input, prefix, posfix) {
					return prefix + mapper[input] + posfix;
				};
			}
		]
	);