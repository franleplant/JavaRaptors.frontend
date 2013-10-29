angular.module('jraptorsDirectives', []).

// Directive to hide elements according to user Role
directive('restrictToRole',  [ 'UserSession',
		function (UserSession) {

			function link(scope, element, attrs) {
				if (  UserSession.role()  !== attrs.restrictToRole) {
					element.hide();
				}
			}

			return {
				link: link
			};
		}
	]
).

//http://docs.angularjs.org/guide/forms
directive('contenteditable', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {

			if (  attrs.contentEditable  ) {
				// view -> model
				elm.on('blur', function() {
					scope.$apply(function() {
						ctrl.$setViewValue(elm.html());
					});
				});

				// model -> view
				ctrl.$render = function() {
					elm.html(ctrl.$viewValue);
				};

			}

		}
	};
}).


//https://github.com/angular/angular.js/wiki/Understanding-Directives
//http://docs.angularjs.org/guide/directive
directive('jrDisplayAndEdit',[

	function() {

		return {
			require: 'ngModel',
			restrict: 'E',
			replace: true,
			template: "<ng-include src=\"'edit, create' | testPathRegExp | isEdit\"></ng-include>",
			scope: {
				placeholder: '@jrPlaceholder',
				model: '=ngModel'

			},
		};
	}
]

);