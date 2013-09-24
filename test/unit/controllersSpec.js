//http://docs.angularjs.org/tutorial/step_05
//http://docs.angularjs.org/tutorial/step_11

describe('Controllers', function(){
	var animations;

	beforeEach(  module('jraptors.Controllers')  );
	beforeEach(  module('jraptorsServices')  );

	beforeEach(  function() {
		this.addMatchers({
			toEqualData: function (expected) {
				return angular.equals(this.actual, expected);
			}
		});

		inject(  function($injector) {
			animations = $injector.get('animations');
		});

	});

	describe('SearchController',  function () {

		var scope, ctrl, $httpBackend,
			mock_response = {
				'page_total': 10,
				'page_number': 1,
				'results': [
					{
						'title': 'book1'
					},{
						'title': 'book2'
					},{
						'title': 'book3'
					}
				]
			};
	


		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $location) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('/app/dbmock/book.json?page_number=1').
				respond(  mock_response  );

			$location.path('/book');
			scope = $rootScope.$new();
			ctrl = $controller('SearchController', {$scope: scope});
		}));

	

		describe('search method', function () {
			it('should create "response" model with 3 books and search meta data fetched from xhr', function() {

				expect(scope.response).toBeUndefined();

				scope.search();

				$httpBackend.flush();

				expect(scope.response).toEqualData(  mock_response  );
			});
		});

		describe('reload method', function () {
			it('should empty the reponse object', function() {

				scope.response = mock_response;

				expect(scope.response).toEqualData(  mock_response  );

				scope.reload();

				expect(scope.response).toEqualData(  [] );
			});
		});


	});



	describe('CreateEditBookController',  function () {

		var scope, ctrl, $httpBackend, location,
			mock_response = {'status': 'ok'};
	


		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $location, bookCreateDefaultsLoader) {
			$httpBackend = _$httpBackend_;
			$httpBackend.whenPOST('/api/book?format=json').
				respond(  mock_response  );

			$location.path('/book/create');
			location = $location;
			scope = $rootScope.$new();

			//see http://docs.angularjs.org/api/ng.$controller
			ctrl = $controller('CreateEditBookController', {$scope: scope, book: bookCreateDefaultsLoader()});
		}));

	

		describe('rm_author method', function () {
			it('should remove the author in the position 2 of the authors array', function() {

				scope.book.authors = ['author0', 'author1', 'author2', 'author3'];

				scope.rm_author(2);

				expect(scope.book.authors.length).toBe(  3  );
				expect(scope.book.authors[2]).toBe(  'author3'  );
			});
		});

		describe('add_author method', function () {
			it('should add an author to the authors array', function() {

				expect(scope.book.authors.length).toBe(  1  );

				scope.add_author();

				expect(scope.book.authors.length).toBe(  2  );
			});
		});



		describe('rm_copy method', function () {
			it('should remove the copy in the position 0 of the copys array', function() {

				scope.book.copys.push({
					comments: 'new copy2',
					lendType: 'foreign',
					editionYear: (new Date()).getFullYear(),
					state: 'nuevo'
				});

				expect(scope.book.copys.length).toBe(  2  );

				scope.rm_copy(0);

				expect(scope.book.copys.length).toBe(  1  );
				expect(scope.book.copys[0].comments).toBe(  'new copy2'  );
			});
		});

		describe('add_copy method', function () {
			it('should add a copy to the copys array', function() {

				expect(scope.book.copys.length).toBe(  1  );

				scope.add_copy();

				expect(scope.book.copys.length).toBe(  2  );
			});
		});


		describe('create method', function () {
			it('should make a POST request to the server creating a new book in the server side', function() {

				scope.save();

				$httpBackend.flush();

				expect(location.path()).toBe(  '/book'  );

				//expect(scope.book).toEqualData(  mock_response  );
			});
		});



	});

	// describe('PhoneDetailCtrl', function(){
	// var scope, $httpBackend, ctrl,
	//     xyzPhoneData = function() {
	//       return {
	//         name: 'phone xyz',
	//             images: ['image/url1.png', 'image/url2.png']
	//       }
	//     };


	// beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
	//   $httpBackend = _$httpBackend_;
	//   $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

	//   $routeParams.phoneId = 'xyz';
	//   scope = $rootScope.$new();
	//   ctrl = $controller(PhoneDetailCtrl, {$scope: scope});
	// }));


	// it('should fetch phone detail', function() {
	//   expect(scope.phone).toEqualData({});
	//   $httpBackend.flush();

	//   expect(scope.phone).toEqualData(xyzPhoneData());
	// });
	// });


	describe('SelectEntityController',  function () {

		it('should ....', inject(function() {
		//spec body
		}));



		it('should ....', inject(function() {
		//spec body
		}));
	});






});

