angular.module('jraptorsFilters', []).

	filter('availableToLendCopys', function() {


		function is_available(e) {
			return !e.hasOwnProperty('lend');
		}

		return function(input) {
			return input.filter(  is_available  ).length;
		};
	});