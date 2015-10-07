var uobannerSidebarActive = false;

(function ($, Drupal, window, document, undefined) {

	function addSidebarLink(addLink, list) {
		var formattedLink = '<li><a href="' + addLink.attr('href') + '">' + addLink.text() + '</a></li>'
		if (list == 0) {
			$('#uobanner-sidebar .utility-nav').append(formattedLink);
		} else if (list == 1) {
			$('#uobanner-sidebar .site-nav').append(formattedLink);
		}
	}

	function generateSidebar() {
		var bgColor = $("body").css('backgroundColor');
		$('body').append('<div id="uobanner-sidebar">');

		/* Move the body's children into the uobanner-wrapper div. */
		$('body').append('<div id="uobanner-wrapper">');
		$('body > *').each(function(i) {
			var curId = $(this).attr('id');

			if ((curId != "uobanner-wrapper") && (curId != "uobanner-sidebar")) {
				$(this).appendTo("#uobanner-wrapper");
			}
		});

		/*
		 * Add the links and search box.
		 */
		$('#uobanner-sidebar').append('<ul class="utility-nav">');
		$('#uobanner-sidebar').append('<hr />');
		$('#uobanner-sidebar').append('<ul class="site-nav">');

		/* Pull in the UOBanner active links */
		$('#uobanner-links a').each(function(index) {
			addSidebarLink($(this),0);
		});

		/* Pull in the site navigation */
		$('#main-menu a').each(function(index) {
			addSidebarLink($(this),1);
		});

		$("#uobanner").css({"left": "0", "width": "100%"});
		$("#uobanner-sidebar").css({"display": "block", "width": "250px"});
		$("#uobanner-sidebar").css({"display": "hidden", "width": "0"});
		$("#uobanner-wrapper").css({"left":"0", "width": "100%"});
	}

	function toggleUobannerSidebar() {
		if (uobannerSidebarActive) {
			uobannerSidebarActive = false;

			$("#uobanner").css({"left": "0", "width": "100%"});
			$("#uobanner-sidebar").css({"display": "hidden", "width": "0"});
			$("#uobanner-wrapper").css({"left":"0", "width": "100%"});
		} else {
			uobannerSidebarActive = true;

			$("#uobanner").css({"left": "250px", "width": "calc(100%-250px)"});
			$("#uobanner-sidebar").css({"display": "block", "width": "250px"});
			$("#uobanner-wrapper").css({"left":"250px","width": "calc(100%-250px)"});
		}
	}

	$(document).ready(function() {
		if ($('body').hasClass('uobanner-sidebar')) { 
			generateSidebar();

			/* Open the sidebar when the hamburger menu is clicked. */
			$("#uobanner-navmenu").click(toggleUobannerSidebar);
		}
	});

})(jQuery, Drupal, this, this.document);