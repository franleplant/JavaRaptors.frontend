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

