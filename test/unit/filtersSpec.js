/* jasmine specs for filters go here 

describe('filter', function() {
  beforeEach(module('myApp.filters'));


  describe('interpolate', function() {
    beforeEach(module(function($provide) {
      $provide.value('version', 'TEST_VER');
    }));


    it('should replace VERSION', inject(function(interpolateFilter) {
      expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
    }));
  });
});

*/

// DOC for injecting deps into it() statements
// http://docs.angularjs.org/api/angular.mock.inject
describe('filters', function () {
	beforeEach(  module('jraptorsFilters')  );

	describe('not', function () {

		it('should boolean negate a given boolean value', inject(function(notFilter) {
				expect(  notFilter(true)  ).toBe(false);
				expect(  notFilter(false)  ).toBe(true);
		}));

	});


});