
(function ($) {

	$('#search_query').focus();

	// Search panel going up panel
	jraptors.animations.on('search.first_valid', function () {
		$('#search_group').animate({'marginTop': '0px'}, 500);
	});

}) (jQuery);




