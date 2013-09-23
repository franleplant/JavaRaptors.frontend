describe('Jraptors Services', function() {

	beforeEach(  module('jraptorsServices')  );


	describe('UserSession', function () {

		var UserSession;

		beforeEach(function () {
			inject(  function($injector) {
				UserSession = $injector.get('UserSession');
			});

			UserSession.name('username');
			UserSession.role('userrole');
			UserSession.token('token');
		});

		it('should return an UserSession object', function () {
			expect(  typeof(UserSession)  ).toBe('object');
		});


		describe('name method', function () {
			it('should be a getter when no arguments are passed', function () {
				expect(  UserSession.name()  ).toBe('username');
			});

			it('should be a setter when an argument is passed', function () {
				UserSession.name('username2');
				expect(  UserSession.name()  ).toBe('username2');
			});
		});


		describe('role method', function () {
			it('should be a getter when no arguments are passed', function () {
				expect(  UserSession.role()  ).toBe('userrole');
			});

			it('should be a setter when an argument is passed', function () {
				UserSession.role('userrole2');
				expect(  UserSession.role()  ).toBe('userrole2');
			});
		});

		describe('token method', function () {
			it('should be a getter when no arguments are passed', function () {
				expect(  UserSession.token()  ).toBe('token');
			});

			it('should be a setter when an argument is passed', function () {
				UserSession.role('token2');
				expect(  UserSession.role()  ).toBe('token2');
			});
		});

		describe('isAllowedTo method', function () {
			beforeEach(function () {
				UserSession.role('admin');
			});

			it('should return true with a valid relative path', function () {
				expect(  UserSession.isAllowedTo('/book')  ).toBe(true);
			});

			it('should return false with a non valid relative path', function () {
				expect(  UserSession.isAllowedTo('/not_a_valid_path')  ).toBe(false);
			});
		});
	});


	describe('PathSelector', function(){

		var PathSelector;

		beforeEach(function() {
			//http://docs.angularjs.org/api/angular.mock.inject
			//http://docs.angularjs.org/api/angular.mock.module
			//https://github.com/angular/angular.js/tree/v1.2.0rc1/src/ngMock
			inject(  function($injector) {
				PathSelector = $injector.get('PathSelector');
			});
		});

		describe('get_firt_directory function', function () {

			it('should get the first directory of one level path right', function() {

				var result = PathSelector.get_first_directory('/book');

				expect(result[0]).toBe('/book');
				expect(result[1]).toBe('');
			});



			it('should get the first directory of a multiple level path right', function() {

				var result = PathSelector.get_first_directory('/book/test/of/a/path');

				expect(result[0]).toBe('/book');
				expect(result[1]).toBe('/test/of/a/path');
			});


			it('should parse empty string right', function() {

				var result = PathSelector.get_first_directory('');

				expect(result[0]).toBe('');
			});

		});


		describe('match_paths function', function () {

			it('should return true with equal routes', function() {

				var result = PathSelector.match_paths('/book', '/book');

				expect(result).toBe(true);
			});


			it('should return false with different routes', function() {

				var result = PathSelector.match_paths('/book', '/other');

				expect(result).toBe(false);
			});

			it('should return true with any route when the general route has "/*" postfix', function() {

				var result = PathSelector.match_paths('/book/*', '/book/what/ever/path');

				expect(result).toBe(true);
			});

			it('should return false with different based routes when the general route has "/*" postfix', function() {

				var result = PathSelector.match_paths('/book/*', '/other/what/ever/path');

				expect(result).toBe(false);
			});

			it('should match multi level routes', function() {

				var result = PathSelector.match_paths('/book/id/123', '/book/id/123');

				expect(result).toBe(true);
			});

			it('should fail on multi level routes begining the same and differ later', function() {

				var result = PathSelector.match_paths('/book/id/200', '/book/id/100');

				expect(result).toBe(false);
			});

			it('should match multi level routes with "/*" postfix', function() {

				var result = PathSelector.match_paths('/book/id/123/*', '/book/id/123/a/route');

				expect(result).toBe(true);
			});


			it('should match base route with "/base/*" route', function() {

				var result = PathSelector.match_paths('/book/*', '/book');

				expect(result).toBe(true);
			});

			it('should match every route with "/*"', function() {

				var result1 = PathSelector.match_paths('/*', '/book/id/123/a/route'),
					result2 = PathSelector.match_paths('/*', ''),
					result3 = PathSelector.match_paths('/*', '/');

				expect(result1).toBe(true);
				expect(result2).toBe(true);
				expect(result3).toBe(true);
			});
		});
	});

	
	describe('bookCreateDefaultsLoader', function () {

		var default_book;

		beforeEach(function () {
			inject(  function($injector) {
				default_book = $injector.get('bookCreateDefaultsLoader') ();
			});
		});

		it('should have default authors, copys and a blank editorial', function () {
			expect( default_book.authors ).toBeDefined();
			expect( default_book.copys ).toBeDefined();
			expect( default_book.editorial ).toBeDefined();
			expect( default_book.title ).toBeUndefined();
		});
	});

	describe('Book', function () {

		var scope, $httpBackend, Book,
			mock_response_ok = {'status': 'ok'},
			mock_response_GET = {'title': 'El Aleph'};
	

		beforeEach(inject(function(_$httpBackend_, $injector) {
			$httpBackend = _$httpBackend_;



			Book = $injector.get('Book');
		}));

		describe('GET', function () {

			beforeEach(function () {
				$httpBackend.expectGET('/api/book/1?format=json').
					respond( mock_response_GET );
			});


			it('should return a book with a GET request', function () {
				var b = Book.get({id: 1});

				$httpBackend.flush();

				expect(b.title).toBe('El Aleph');

			});

		});





		describe('POST: create a new book', function () {
			beforeEach(function () {
				$httpBackend.expectPOST('/api/book?format=json').
					respond(  mock_response_ok  );
			});

			it('should save a new book with a POST request and URL like: /api/book/create', function () {

				var b = Book.save({title: 'some_new_Book'});

				$httpBackend.flush();

				expect(b.status).toBe('ok');
			});

		});

		describe('POST: edit an existing book', function () {
			beforeEach(function () {
				$httpBackend.expectPOST('/api/book/1?format=json').
					respond(  mock_response_ok  );
			});


			it('should change an existing book with a POST request and URL like: /api/book/edit/:id', function () {

				var b = Book.save({id: 1, title: 'some_existing_Book'});

				$httpBackend.flush();

				expect(b.status).toBe('ok');
			});

		});

		describe('DELETE', function () {
			beforeEach(function () {
				$httpBackend.expectDELETE('/api/book/1?format=json').
					respond(  mock_response_ok  );
			});


			it('should remove an existing book with a DELETE request and URL like: /api/book/delete/:id', function () {

				var b = Book.remove({id: 1});

				$httpBackend.flush();

				expect(b.status).toBe('ok');
			});

		});

	});
});