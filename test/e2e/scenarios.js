/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */


describe('jraptors', function () {

	describe('empty url redirection', function () {

		beforeEach(function() {
			browser().navigateTo('../../app/index.html');
		});


		it('should automatically redirect to /book when location hash/fragment is empty', function() {
			expect(  browser().location().url()  ).toBe('/book');
		});

	});

	describe('not valid url redirection', function () {

		beforeEach(function() {
			browser().navigateTo('../../app/index.html#/not_a_valid_path');
		});

		it('should automatically redirect to /book when location hash/fragment is not a valid path', function() {
			expect(  browser().location().url()  ).toBe('/book');
		});

	});


	describe('/book', function () {

		beforeEach(function() {
			browser().navigateTo('../../app/index.html#/book');
		});


		describe('/book search view', function () {


			it('should render /book when user navigates to /book', function() {
				expect(  element('.dropdown-toggle').text()  ).toMatch(/libro/i);
			});
		});


		describe('book search results (with results)', function () {

			beforeEach(function() {
				input('search_query').enter('Harry Potter');
				element('#search').click();
			});


			it('should render book search results', function () {
				expect(  repeater('div.result').count()  ).toBeGreaterThan(1);
			});

			it('should render book_snippet template', function () {
				expect(  repeater('div.result:first > div > span').count()  ).toBe(1);
				expect(  repeater('div.result:first > div > a').count()  ).toBe(1);
				expect(  repeater('div.result:first > div > div.media-body').count()  ).toBe(1);
			});

			it('should render pagination helpers', function () {
				expect(  element('#results > div.pagination').count()  ).toBe(2);
			});

		});
	});

});
