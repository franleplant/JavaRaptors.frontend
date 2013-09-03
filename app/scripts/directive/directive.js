angular.module('jraptorsDirectives', []).
	directive('restrictToSuper',  [ 'UserSession',
			function (UserSession) {
				function link(scope, element, attrs) {
					console.log(arguments)
					if (  UserSession.role()  !== 'super') {
						element.hide();
					}
				};

				return link;
			} 
		]
	);