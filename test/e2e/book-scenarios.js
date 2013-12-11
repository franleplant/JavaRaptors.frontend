describe('book', function () {
	
	beforeEach(function() {
		browser().navigateTo('../../app/index.html#/book');
	});
	
	describe('/book search view', function () {

		it('should render /book when user navigates to /book', function() {
			expect(  element('.dropdown-toggle').text()  ).toMatch(/libro/i);
		});
		
	});
	

		
		
	describe('book search results (with results)', function () {
		
		var search_results_path = '#results > div.search-result > div';
		

		beforeEach(function() {
			input('search_query').enter('harry');
			element('#search').click();
		});	

		it('should render book search results', function () {
			expect(  repeater(search_results_path).count()  ).toBeGreaterThan(0);
		});

		it('should render book_snippet template', function () {
			expect(  element(search_results_path + ':first  span').text()  ).toBe('libro');
			expect(  repeater(search_results_path + ':first > div  a').count()  ).toBeGreaterThan(1);
			expect(  repeater(search_results_path + ':first  div.media-body').count()  ).toBe(1);
		});

		
//		it('should render pagination helpers', function () {
//			expect(  element('#results > div.pagination').count()  ).toBe(2);
//		});

	});
	
	
	describe('detailed view', function () {
		
		beforeEach(function() {
			input('search_query').enter('harry');
			element('#search').click();
			sleep(2);
			element('#results > div.search-result  div.media-body:first > a:first').click();
			sleep(2);
		});	
	
		
		it('Should display the books title', function () {
			expect(  element('h1').text()  ).toBeDefined();
		});
		
		it('Should display the books author', function () {
			expect(  element('a > h3:first').text()  ).toBeDefined();
		});
		
		it('Should display the books ISBN', function () {
			expect(  element('ng-include > label').text()  ).toBeDefined();
		});
		
		it('Should display the books Editorial', function () {
			expect(  element('ng-include > a').text()  ).toBeDefined();
		});

		
	});
	
	describe('edit view', function () {
		
		it('should allow to edit the Books title', function () {
			input('search_query').enter('harry');
			element('#search').click();
			sleep(2);
			element('#results > div.search-result  div.media-body:first > a:first').click();
			sleep(2);
			element('img + a').click();
			sleep(2);
			
			element('input:first').val('TITULO');
			var evtInput = document.createEvent('Event');
		    evtInput.initEvent('input', true, false);

			element('input:first').query(function(el, done) {          
			                el[0].dispatchEvent(evtInput);
			                done();
			            });
			
			console.log(element('input:first'));
			
			//consider putting this inside the query func above
			element('button:first').click();
			alertOK();
			alertOK();
			sleep(2);
			input('search_query').enter('TITULO');
			element('#search').click();
			sleep(2);
			expect(  repeater('#results > div.search-result > div').count()  ).toBeGreaterThan(0);
		});
	});
	

	
});