// DOC for injecting deps into it() statements
// http://docs.angularjs.org/api/angular.mock.inject
describe('filters', function () {
	beforeEach(  module('jraptorsFilters')  );
	beforeEach(  module('jraptorsConfig')  );

	describe('not', function () {

		it('should boolean negate a given boolean value', inject(function(notFilter) {
				expect(  notFilter(true)  ).toBe(false);
				expect(  notFilter(false)  ).toBe(true);
			}
		));
	});

	describe('testPathRegExp', function () {

		var location;

		beforeEach(  inject(function ($location) {
				location = $location;
			}
		));

		it('should return true if the string is contained withing the path()', inject(function(testPathRegExpFilter) {

				location.path('/book/detailed_view/1');
				expect(  testPathRegExpFilter('detailed_view')  ).toBe(true);


				location.path('/book/edit/1');
				expect(  testPathRegExpFilter('edit')  ).toBe(true);
			}
		));

		it('should return false if the string is not contained withing the path()', inject(function(testPathRegExpFilter) {

				location.path('/book/detailed_view/1');
				expect(  testPathRegExpFilter('blah')  ).toBe(false);
			}
		));

		it('should return true if any of the strings passed as csv is contained within the path()', inject(function(testPathRegExpFilter) {

				location.path('/book/create');
				expect(  testPathRegExpFilter('edit, create')  ).toBe(true);
			}
		));

		it('should return false if all of the strings passed as csv is contained within the path()', inject(function(testPathRegExpFilter) {

				location.path('/book/detailed_view/1');
				expect(  testPathRegExpFilter('edit, create')  ).toBe(false);
			}
		));
	});

	describe('availableToLendCopys', function () {

		it('should return the number of lended copys you have inside an array of copys', inject(function(availableToLendCopysFilter) {

				var copys = [
					{
						'title': 'dummyBook1',
						'lend': 'its lended'
					},{
						'title': 'dummyBook1',
						'lend': 'its lended'
					},{

						'title': 'dummyBook1'
					}

				];

				expect(  availableToLendCopysFilter(copys)  ).toBe(1);
			}
		));

		it('should return 0 if an empty array or undefined passed as an argument', inject(function(availableToLendCopysFilter) {
				expect(  availableToLendCopysFilter(  undefined  )  ).toBe(0);
				expect(  availableToLendCopysFilter(  []  )  ).toBe(0);
			}
		));
	});

	describe('pathToEntity', function () {
		it('should extract the first character of a string', inject(function(pathToEntityFilter) {
				expect(  pathToEntityFilter('/book')  ).toBe('book');
			}
		));
	});

	describe('toClassLabel', function () {


		it('should return the right css label class for the right entity Type', inject(function(  toClassLabelFilter, $injector ) {
				

				var
					entityLabel = $injector.get('entityLabel'),
					entity;

				for (entity  in entityLabel) {
					if (  entityLabel.hasOwnProperty  ) {
						expect(  toClassLabelFilter(entity)  ).toBe(entityLabel[entity]);
					}
				}
			}
		));
	});

	describe('translate', function () {

		it('should return the right spanish word given its english translation', inject(function(  translateFilter, $injector  ) {

				var spanish = $injector.get('spanish'),
					key;

				for (key in spanish) {
					if (  spanish.hasOwnProperty(key)  ) {
						expect(  translateFilter(  key  )  ).toBe(  spanish[key]  );
					}
				}
			}
		));
	});

	describe('typeToTemplate', function () {

		it('should return the right template´s relative path when input is a word (entityType)', inject(function(typeToTemplateFilter) {
				expect(  typeToTemplateFilter('entityType', 'prefix ', ' sufix')  ).toBe('prefix entityType sufix');
			}
		));
	});

	describe('checkmark', function () {

		it('should return the right checkmark when boolean value is given', inject(function(checkmarkFilter) {
				expect(  checkmarkFilter(true)  ).toBe('\u2713');
				expect(  checkmarkFilter(false)  ).toBe('\u2718');
			}
		));
	});

	describe('copysToAction', function () {

		var availableCopyActions;

		beforeEach(  inject(function (  $injector  ) {
			availableCopyActions = $injector.get('availableCopyActions');
		}));

		it('should return "Devolver" when the input is true', inject(function(copysToActionFilter) {
				expect(  copysToActionFilter(true)  ).toBe(availableCopyActions[true]);
			}
		));

		it('should return "Prestar" when the input is false', inject(function(copysToActionFilter) {
				expect(  copysToActionFilter(false)  ).toBe(availableCopyActions[false]);
			}
		));
	});

	describe('copysToClass', function () {

		var availableCopyClasses;

		beforeEach(  inject(function (  $injector  ) {
			availableCopyClasses = $injector.get('availableCopyClasses');
		}));

		it('should return the right icon according to the input', inject(function(copysToClassFilter) {
				expect(  copysToClassFilter(true)  ).toBe(availableCopyClasses[true]);
				expect(  copysToClassFilter(false)  ).toBe(availableCopyClasses[false]);
			}
		));


	});

	describe('hasAttribute', function () {

		it('should return true if the parameter exists', inject(function(hasAttributeFilter) {
				var anExistingVariable = 'I Exist';
				expect(  hasAttributeFilter(anExistingVariable)  ).toBe(true);
			}
		));

		it('should return false if the parameter does not exists', inject(function(hasAttributeFilter) {
				expect(  hasAttributeFilter(undefined)  ).toBe(false);
			}
		));
	});

	describe('boolToLendReturn', function () {

		it('should return lend when the input is true', inject(function(boolToLendReturnFilter) {
				expect(  boolToLendReturnFilter(true)  ).toBe('lend');
			}
		));

		it('should return return when the input is false', inject(function(boolToLendReturnFilter) {
				expect(  boolToLendReturnFilter(false)  ).toBe('return');
			}
		));
	});



});