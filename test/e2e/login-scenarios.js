describe('login', function () {
	
	//it('Should redirect the user to the login site if trying to access the index -- HARD TO TEST', function () {});
	
	it('Should display an error msg when wron username and/or password are submitted', function () {
		browser().navigateTo('../../app/login.html');
		input('user').enter('wrong_user@gmail.com');
		input('pwd').enter('wrongpwd');
		element('button').click();
		
		expect(  element('.ng-hide').count()  ).toBe(0);
	});
	it('Should redirect the user to the app/#/book page', function () {
		
		browser().navigateTo('../../app/login.html');
		input('user').enter('clau@guzman.com');
		input('pwd').enter('hola');
		element('button').click();
		
		sleep(2);
		
		expect(  browser().window().path()  ).toBe('/javaraptors.backend/frontend/app/index.html');
		
		
	});
	
});