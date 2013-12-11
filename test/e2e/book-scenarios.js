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
	
	describe('edit a book', function () {
		
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
		    

		    //Dont know why this works, but it works!!
		    alertOK();
		    	
			element('input:first').query(function(el, done) {          
                el[0].dispatchEvent(evtInput);
                done();	                
			});
	


	    
			
			
			element('button:first').click();
			alertOK();

			sleep(2);
			
			input('search_query').enter('TITULO');
			element('#search').click();
			sleep(2);
			expect(  repeater('#results > div.search-result > div').count()  ).toBeGreaterThan(0);
		    

		});
	});
	
	describe('create a book', function () {
		
		it('Should allow to create a book', function () {
			
			var evtInput = document.createEvent('Event');
		    evtInput.initEvent('input', true, false);
			
			
			//Click on create
			element('form button + a').click();
			sleep(2);
			
			
			//Input the required fields
			element('[placeholder=Titulo]').val('NUEVO');
			element('[placeholder=ISBN]').val('Dummy');
			element('[placeholder=Editorial]').val('Dummy');
			
			
		    //Dont know why this works, but it works!!
		    alertOK();
		    	
			element('[placeholder=Titulo]').query(function(el, done) {          
                el[0].dispatchEvent(evtInput);
                done();	                
			});
			
			element('[placeholder=ISBN]').query(function(el, done) {          
                el[0].dispatchEvent(evtInput);
                done();	                
			});
			
			element('[placeholder=Editorial]').query(function(el, done) {          
                el[0].dispatchEvent(evtInput);
                done();	                
			});
			
			//add dummy author and genre
			element('[ng-click="add_author()"]').click();
			element('[ng-click="add_genre()"]').click();
			
			
			//Save Changes
			element('[type=submit]').click();
			
			sleep(2);
			input('search_query').enter('NUEVO');
			element('#search').click();
			sleep(2);
			expect(  repeater('#results > div.search-result > div').count()  ).toBeGreaterThan(0);
			
			
			
		});

		
	});
	

	describe('delete a book', function () {
		it('Should allow to delete a book', function () {
			
			input('search_query').enter('TITULO');
			element('#search').click();
			sleep(2);
			
			//detailed_view
			element('#results > div.search-result  div.media-body:first > a:first').click();
			sleep(2);
			
			confirmOK();
			alertOK();
			//edit
			element('img + a').click();
			sleep(2);
			
			
			element('.delete_entity').click();

			sleep(2);
			
			input('search_query').enter('TITULO');
			element('#search').click();
			sleep(2);
			expect(  repeater('#results > div.search-result > div').count()  ).toBe(0);
		});
		
	});
	
});