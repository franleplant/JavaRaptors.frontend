describe('Jraptors Services', function() {
 
	describe('PathSelector', function(){

		var PathSelector;

		beforeEach(function() {

			module('jraptorsService')
			//http://docs.angularjs.org/api/angular.mock.inject
			//http://docs.angularjs.org/api/angular.mock.module
			//https://github.com/angular/angular.js/tree/v1.2.0rc1/src/ngMock
			inject(  function($injector) {
				PathSelector = $injector.get('PathSelector');
			});
		});

	    it('test3', function() {

	    	//var result = PathSelector.match_paths("/book", "/book/test")
	 
			expect(false).toBe(false);
	    });
  });
});