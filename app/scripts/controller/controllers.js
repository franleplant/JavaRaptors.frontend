
angular.module('jraptors.Controllers', ['ui.bootstrap']).controller('SearchController',
	[
		'$scope', 'animations', 'Search', '$location',
		function ($scope, animations, Search, $location) {

			$scope.location = $location;

			$scope.search = function (page) {
				
				// This is to test no_result, TODO: MAKE A TEST CASE
				//$scope.results = Search.query({entityType: 'book_no_result'}, function (data) {
				$scope.response = Search.query({
						q: $scope.search_query,
						page_number: page || 1,
						entityType: $location.path().slice(1)
					},
					function (data) {
						$scope.no_result = data.no_result ? true : false;
					});

				animations.proxy.trigger('search.first_valid');

			};

			$scope.reload = function () {
				//TODO: Lubricate edge cases of changing between entities after a search was perfomed
				$scope.response = [];
			};
		}
	]
).

controller('SelectEntityController',
	[
		'$scope', '$location',
		function ($scope, $location) {
			$scope.$location = $location;
		}
	]
).


controller('DetailedViewController',
	[
		'$scope', 'entity',
		function ($scope, entity) {

			$scope.entity = entity;
		}
	]
).


controller('AuthorDetailedViewController',
	[
		'$scope', 'author',
		function ($scope, author) {

			$scope.author = author;
		}
	]
).

controller('BookDetailedViewController',
	[
		'$scope', 'book',
		function ($scope, book) {

			$scope.book = book;
		}
	]
).


controller('UserDetailedViewController',
	[
		'$scope', 'user',
		function ($scope, user) {

			$scope.user = user;
		}
	]
).



controller('DetailedViewControllerAffiliate',
	[
		'$scope', 'affiliate',
		function ($scope, affiliate) {

			$scope.affiliate = affiliate;
		}
	]
).

controller('DetailedViewControllerEditorial',
	[
		'$scope', 'editorial',
		function ($scope, editorial) {

			$scope.editorial = editorial;
		}
	]
).


controller('EditController',
	[
		'$scope',
		function ($scope) {
		}
	]
).


controller('ReturnController',
	[
		'$scope',
		function ($scope) {
		}
	]
).


controller('LendController',
	[
		'$scope',
		function ($scope) {


		}
	]
).




controller('CreateEditBookController',
	[
		'$scope', '$timeout', 'Book', '$location', 'book', '$modal',
		function ($scope, $timeout, Book, $location, book, $modal) {

			$scope.book = book || new Book();


			var i = 2,
				j = 2,
				k = 1;


			//TODO: refactor this
			$scope.rm_author = function (i) {
				$scope.book.authors.splice(i,1);
			};

			$scope.add_author = function () {

				$scope.book.authors = $scope.book.authors || [];

				$scope.book.authors.push({
					nick:'new_author' + i
				});
				i++;
			};

			$scope.rm_copy = function (i) {
				$scope.book.copies.splice(i,1);
			};

			$scope.add_copy = function () {

				$scope.book.copies = $scope.book.copies || [];

				$scope.book.copies.push({
					comments: 'new copy' + j,
					lendType: 'foreign',
					editionYear: (new Date()).getFullYear(),
					state: 'nuevo'
				});
				j++;
			};

			$scope.rm_genre = function (i) {
				$scope.book.genres.splice(i,1);
			};

			$scope.add_genre = function () {

				$scope.book.genres = $scope.book.genres || [];


				$scope.book.genres.push({name:'new genre' + k});
				k++;
			};

			$scope.save = function () {

				var c, i;
				for ( i in $scope.book.copies ) {

					c = $scope.book.copies[i];
					delete c.local;
					delete c.foreign;

					console.log(c);
				}

				$scope.book.$save(function (data) {

					if ( data.status === 'ok'){
						window.alert('El libro se ha guardado exitosamente');
						$location.path('/book');
					} else {
						window.alert('Ups, algo salio mal, por favor intentalo de nuevo');
					}

				},
				function () {
					//error callback
				});
			};

			$scope.open_modal_delete = function () {

				var modalInstance = $modal.open({
					templateUrl: 'views/modal_delete.html',
					controller: 'ModalController',
					scope: $scope
				});
			
			};

			$scope.confirm = function () {

				var result = window.confirm('¿Esta seguro que desea borrar este Libro?');
				if (result) {
					$scope.remove();
				}
			};

			$scope.remove = function (callback) {

				Book.remove({id: $scope.book.id}).$then(function () {
					window.alert('El libro ha sido borrado con exito');
					$location.path('/book');

					//callback();
				});
			};


			// TODO: fill this typeaheads models with server calls (detail)
			$scope.dummys_authors= ['author1', 'author2'];
			//TODO: http://stackoverflow.com/questions/15928644/how-to-use-a-resource-to-populate-angular-ui-bootstrap-typeahead
			$scope.editorials = [{name:'editorial1'},{name: 'editorial2'}];

		}
	]
).



controller('CreateEditAffiliateController',
	[
		'$scope', '$timeout', 'Affiliate', '$location', 'affiliate', '$modal',
		function ($scope, $timeout, Affiliate, $location, affiliate, $modal) {

			$scope.affiliate = affiliate || new Affiliate();

			//TODO: refactor this

			$scope.save = function () {

				$scope.affiliate.$save(function () {
					$location.path('/affiliate');
				},
				function () {
					//error callback
				});
			};

			$scope.open_modal_delete = function () {

				var modalInstance = $modal.open({
					templateUrl: 'views/modal_delete.html',
					controller: 'ModalController',
					scope: $scope
				});
			
			};

			$scope.remove = function (callback) {

				affiliate.remove({id: $scope.affiliate.id}).$then(function () {
					$location.path('/affiliate');
					callback();
				});
			};

		}
	]
).


controller('ModalController',
	[
		'$scope', '$modalInstance',
		function ($scope, $modalInstance) {

			$scope.ok = function () {
				$scope.remove($modalInstance.close);
			};

			$scope.cancel = function () {
				$modalInstance.dismiss();
			};
		}
	]
).


controller('CreateEditAuthorController',
	[
		'$scope', '$timeout', 'Author', '$location', 'author',
		function ($scope, $timeout, Author, $location, author) {

			$scope.author = author || new Author();

			$scope.save = function () {

				$scope.author.$save(function () {
					$location.path('/');
				},
				function () {
					//error callback
				});
			};

		}
	]
).

controller('CreateEditUserController',
	[
		'$scope', '$timeout', 'User', '$location', 'user',
		function ($scope, $timeout, User, $location, user) {

			$scope.user = user || new User();

			$scope.remove = function (callback) {

				User.remove({id: $scope.user.id}).
					$then(function () {
						$location.path('/');
						callback();
					}
				);
			};

			$scope.save = function () {

				$scope.user.$save(function () {
					$location.path('/');
				},
				function () {
					//error callback
				});
			};

		}
	]
).


controller('CreateEditEditorialController',
	[
		'$scope', '$timeout', 'Editorial', '$location', 'editorial',
		function ($scope, $timeout, Editorial, $location, editorial) {

			$scope.editorial = editorial || new Editorial();


			$scope.remove = function (callback) {

				Editorial.remove({id: $scope.editorial.id}).
					$then(function () {
						$location.path('/');
						callback();
					}
				);
			};

			$scope.save = function () {

				$scope.editorial.$save(function () {
					$location.path('/');
				},
				function () {
					//error callback
				});
			};

		}
	]
).

controller('RmvController',
	[
		'$scope', '$modal',
		function ($scope, $modal) {

			$scope.open_modal_delete = function () {

				var modalInstance = $modal.open({
					templateUrl: 'views/modal_delete.html',
					controller: 'ModalController',
					scope: $scope
				});
			
			};

		}
	]
).

controller('NavBarController',
	[
		'$scope',
		function ($scope) {
		}
	]
).

controller('BreadcrumbController',
	[
		'$scope',
		function ($scope) {
		}
	]
).

controller('ReportController',
	[
		'$scope',
		function ($scope) {
		}
	]
).

controller('ReportLendsController',
	[
		'$scope', 'reportLends',
		function ($scope, reportLends) {
			$scope.reportLends = reportLends;
		}
	]
).

controller('ReportLateReturnsController',
	[
		'$scope', 'reportLateReturns',
		function ($scope, reportLateReturns) {
			$scope.reportLateReturns = reportLateReturns;
		}
	]
).

controller('ReportTopsController',
	[
		'$scope', 'reportLops',
		function ($scope, reportLops) {
			$scope.reportLops = reportLops;
		}
	]
).

controller('LendTypeSelectController',
	[
		'$scope',
		function ($scope) {
			

			$scope.copy.local = $scope.copy.lendTypes.indexOf('local') >= 0 ? true : false;
			$scope.copy.foreign = $scope.copy.lendTypes.indexOf('foreign') >= 0 ? true : false;
			
			$scope.lendTypes_options = ['foreign', 'local'];

			$scope.change = function (type) {
				
				var i = $scope.copy.lendTypes.indexOf(type);


				
				// if select that type
				if ( $scope.copy[type]  ) {
					if ( i < 0) {
						$scope.copy.lendTypes.push(type);
					}
					
				} else {
					if ( i >= 0 ) {
						$scope.copy.lendTypes.splice(i, 1);
					}
					
				}
				
				console.log('CHANGE', type, $scope.copy[type], $scope.copy.lendTypes);

			};
		}
	]
).

controller('DatePickerController',
	[
		'$scope', '$timeout',
		function ($scope, $timeout) {

			$scope.open = function() {
				$timeout(function() {
					$scope.opened = true;
				});
			};
		}
	]
);