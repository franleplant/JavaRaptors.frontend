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
			return function(input, prefix, sufix) {
				input = input === 'copy' ? 'book' : input;
				return prefix + input + sufix;
			};
		}
	]
).

filter('checkmark',
	function() {
		return function(input) {
			return input ? '\u2713' : '\u2718';
		};
	}
).

filter('isActive',
	function() {
		return function(input) {
			return input ? 'Activo' : 'Suspendido';
		};
	}
).

filter('copysToAction', [ 'availableCopyActions',
		function(availableCopyActions) {
			return function(input) {
				return input ? availableCopyActions[true] : availableCopyActions[false];
			};
		}
	]
).

filter('copysToClass', [ 'availableCopyClasses',
		function(availableCopyClasses) {
			return function(input) {
				return input ? availableCopyClasses[true] : availableCopyClasses[false];
			};
		}
	]
).

filter('hasAttribute', [
		function() {
			return function(input) {
				return input ? true : false;
			};
		}
	]
).

filter('not', [
		function() {
			return function(input) {
				return input ? false : true;
			};
		}
	]
).

filter('boolToLendReturn', [
		function() {
			return function(input) {
				return input ? 'lend' : 'return';
			};
		}
	]
).

filter('testPathRegExp', ['$location',
		function($location) {
			return function(str) {

				var list = str.split(', '),
					len = list.length,
					flag = false,
					path = $location.path(),
					re,
					action,
					i;

				
				action = path.match(/(?:\/[^\/]*\/)([^\/]*)(?:\/?.*)/)[1];


				re = new RegExp(action, 'g');

				for (i = 0; i < len; i++) {
					flag = flag || re.test(  list.pop()  );
					
					if (flag) {
						break;
					}
				}

				return  flag;
			};
		}
	]
).

filter('isEdit', [
		function() {
			return function(input) {

				if (input) {
					return 'views/fragments/edit.html';
				}
				return 'views/fragments/view.html';
			};
		}
	]
);
