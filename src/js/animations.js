
//
// Build an animation proxy for event dispatcher
//
jraptros.animations = $({});

(function ($) {



	// Search panel going up panel
	// this should be a custom event named "first valid search"
	//$('#search').click(function () {
	jsraptors.animations.on("search.first_valid", function () {
		$("#search_group").animate({'marginTop': '0px'}, 500);
	});

}) (jQuery);




