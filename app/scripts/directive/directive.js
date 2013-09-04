angular.module('jraptorsDirectives', []).

	// Directive to hide elements according to user Role
	directive('restrictToRole',  [ 'UserSession',
			function (UserSession) {

				function link(scope, element, attrs) {
					if (  UserSession.role()  !== attrs.restrictToRole) {
						element.hide();
					}
				};

				return {
					link: link
				};
			} 
		]
	);