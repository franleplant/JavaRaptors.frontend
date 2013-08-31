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

	filter('pathToEntity',	[ 'spanish',

			function(spanish) {
				var key;
				return function(input) {
					key = input.slice(1);

					return spanish.translate[key];
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
				'author': 'label-success'
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
	);