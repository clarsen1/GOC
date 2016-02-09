(function($) {
    $(window).load(function(){
        
	    $('.image > img').contenthover({
	    effect:'slide',
	    slide_speed:300,
	    overlay_background: '#000',
	    overlay_opacity: 0.6
	    });
        
    });
})(jQuery);

(function($) {
	$(window).load(function(){

		$('.big-button .content').wrap("<a href = '/grants' style = 'color:white'></a>");

	});
})(jQuery);