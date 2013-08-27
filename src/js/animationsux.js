// Animations and UX
// Put all the js code regarding animations, and user experience, 
// you will be propably using jquery, put everything inside the anonymous function


(function ($) {

	// On page load focus on the search query
	$('#search_query').focus();

	// When you click on the search query select all the text
	$('#search_query').on('click', function () {
		$(this).select();
	});


	// Search panel going up panel
	jraptors.animations.on('search.first_valid', function () {
		$('#search_group').animate({'marginTop': '0px'}, 500);
	});

}) (jQuery);




