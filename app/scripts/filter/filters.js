angular.module('jraptorsFilters', ['jraptorsConfig']).

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

	filter('toClassLabel', [ 'entityLabel',
			function(entityLabel) {
				return function(input) {
					return entityLabel[input];
				};
			}
		]
	).

	filter('translate',	[ 'spanish',

			function(spanish) {

				return function(input) {
					return spanish[input];
				};
			}
		]
	).

	filter('typeToTemplate', [

			function() {
				return function(input, prefix, posfix) {
					input = input === 'copy' ? 'book' : input
					return prefix + input + posfix;
				};
			}
		]
	).

	filter('checkmark', 
		function() {
			return function(input) {
				return input ? '\u2713' : '\u2718';
			};
	}).

	filter('copysToAction', [ 'availableCopyActions',
			function() {
				return function(input) {
					return input ? '\u2713' : '\u2718';
				};
			}
		]
	);