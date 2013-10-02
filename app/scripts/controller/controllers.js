

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




//TODO
controller('DetailedViewController',
	[
		'$scope', 'book',
		function ($scope, book) {

			$scope.book = book;
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

			$scope.book = book;


			var i = 2,
				j = 2,
				k = 1;


			//TODO: refactor this
			$scope.rm_author = function (i) {
				$scope.book.authors.splice(i,1);
			};

			$scope.add_author = function () {
				$scope.book.authors.push({
					name:'new_author' + i
				});
				i++;
			};

			$scope.rm_copy = function (i) {
				$scope.book.copys.splice(i,1);
			};

			$scope.add_copy = function () {
				$scope.book.copys.push({
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
				$scope.book.genres.push({name:'new genre' + k});
				k++;
			};

			$scope.save = function () {

				$scope.book.$save(function () {
					$location.path('/book');
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

				Book.remove({id: $scope.book.id}).$then(function () {
					$location.path('/book');
					callback();
				});
			};


			// TODO: fill this typeaheads models with server calls (detail)
			$scope.dummys_authors= ['author1', 'author2'];
			//TODO: http://stackoverflow.com/questions/15928644/how-to-use-a-resource-to-populate-angular-ui-bootstrap-typeahead
			$scope.editorials = [{name:'editorial1'},{name: 'editorial2'}];

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
);
