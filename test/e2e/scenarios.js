'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing 

describe('my app', function() {

  beforeEach(function() {
	browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
	expect(browser().location().url()).toBe("/view1");
  });


  describe('view1', function() {

	beforeEach(function() {
	  browser().navigateTo('#/view1');
	});


	it('should render view1 when user navigates to /view1', function() {
	  expect(element('[ng-view] p:first').text()).
		toMatch(/partial for view 1/);
	});

  });


  describe('view2', function() {

	beforeEach(function() {
	  browser().navigateTo('#/view2');
	});


	it('should render view2 when user navigates to /view2', function() {
	  expect(element('[ng-view] p:first').text()).
		toMatch(/partial for view 2/);
	});

  });
});

*/

describe('jraptors', function () {

	describe('empty url redirection', function () {

		beforeEach(function() {
			browser().navigateTo('../../app/index.html');
		});


		it('should automatically redirect to /book when location hash/fragment is empty', function() {
			expect(browser().location().url()).toBe("/book");
		});

	});

	describe('not valid url redirection', function () {

		beforeEach(function() {
			browser().navigateTo('../../app/index.html#/not_a_valid_path');
		});

		it('should automatically redirect to /book when location hash/fragment is not a valid path', function() {
			expect(browser().location().url()).toBe("/book");
		});

	});


	describe('/book', function () {

		beforeEach(function() {
			browser().navigateTo('../../app/index.html#/book');
		});


		describe('/book search view', function () {


			it('should render /book when user navigates to /book', function() {
				expect(element('.dropdown-toggle').text()).toMatch(/libro/i);
			});  
		});


		describe('book search results (with results)', function () {


			it('should render book_snippet template whenever a search is done', function () {

				input('search_query').enter('Harry Potter');

				element('#search').click();

				expect(  repeater('#results > div.result').count()  ).toBeGreaterThan(1);				
			});


		});

	  

	});






});
