angular.module('jraptorsFilters', []).

	filter('availableToLendCopys', function() {


		function readyToLendCopys_calculator(e) {
			return !e.hasOwnProperty('lend');
		}

		return function(input) {
			return input.filter(  readyToLendCopys_calculator  ).length;
		};
	});