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

		describe('get_firt_directory function', function () {

			it('should get the first directory of one level path right', function() {

				var result = PathSelector.get_firt_directory("/book")

				expect(result[0]).toBe("/book");
				expect(result[1]).toBe("");
			});



			it('should get the first directory of a multiple level path right', function() {

				var result = PathSelector.get_firt_directory("/book/test/of/a/path")

				expect(result[0]).toBe("/book");
				expect(result[1]).toBe("/test/of/a/path");
			});


			it('should parse empty string right', function() {

				var result = PathSelector.get_firt_directory("")

				expect(result[0]).toBe("");
			});			

		});


		describe('match_paths function', function () {

			it('should return true with equal routes', function() {

				var result = PathSelector.match_paths("/book", "/book")

				expect(result).toBe(true);
			});


			it('should return false with different routes', function() {

				var result = PathSelector.match_paths("/book", "/other")

				expect(result).toBe(false);
			});

			it('should return true with any route when the general route has "/*" postfix', function() {

				var result = PathSelector.match_paths("/book/*", "/book/what/ever/path");

				expect(result).toBe(true);
			});

			it('should return false with different based routes when the general route has "/*" postfix', function() {

				var result = PathSelector.match_paths("/book/*", "/other/what/ever/path");

				expect(result).toBe(false);
			});

			it('should match multi level routes', function() {

				var result = PathSelector.match_paths("/book/id/123", "/book/id/123");

				expect(result).toBe(true);
			});

			it('should fail on multi level routes begining the same and differ later', function() {

				var result = PathSelector.match_paths("/book/id/200", "/book/id/100");

				expect(result).toBe(false);
			});

			it('should match multi level routes with "/*" postfix', function() {

				var result = PathSelector.match_paths("/book/id/123/*", "/book/id/123/a/route");

				expect(result).toBe(true);
			});


			it('should match every route with "/*"', function() {

				var result1 = PathSelector.match_paths("/*", "/book/id/123/a/route"),
					result2 = PathSelector.match_paths("/*", ""),
					result3 = PathSelector.match_paths("/*", "/");

				expect(result1).toBe(true);
				expect(result2).toBe(true);
				expect(result3).toBe(true);
			});
	    });
  });
});