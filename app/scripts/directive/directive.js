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
			// view -> model
			elm.on('blur', function() {
				console.log(scope)
				scope.$apply(function() {
					ctrl.$setViewValue(elm.html());
				});
			});

			// model -> view
			ctrl.$render = function() {
				elm.html(ctrl.$viewValue);
			};

		}
	};
});