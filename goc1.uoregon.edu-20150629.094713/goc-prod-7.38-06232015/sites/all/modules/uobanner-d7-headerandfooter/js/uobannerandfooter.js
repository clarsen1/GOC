var uobannerSidebarActive = false;

(function ($, Drupal, window, document, undefined) {

	$(document).ready(function() {
		// Run the bootstrapping methods
		generateSidebar();

		// Bootstrap the collapsable menus
		$(document).ready(function() { collapseMenuBootstrap() });
		
		// Open the sidebar when the hamburger menu is clicked.
		$("#uobanner-navmenu").click(toggleUobannerSidebar);
	});

	function generateSidebar() {
		/* Pull in drupal search box if its in the search region. */
		var searchBox = '<div class="block-search">' + $('.region-search #block-search-form').html() + '</div>';
		if ($('.region-search #block-search-form').html() != null) {
			$('#uobanner-sidebar').append(searchBox);
		}
	}

	/* UOBanner sidebar on/off behavior. */
	function toggleUobannerSidebar() {
		if (uobannerSidebarActive) {
			uobannerSidebarActive = false;
			$("body").removeClass("uobanner-sidebar-active");
		} else {
			uobannerSidebarActive = true;
			$("body").addClass("uobanner-sidebar-active");
		}
	}

	/*******************************************
	******** COLLAPSE MENU BOOTSTRAPPING *******
	*******************************************/
	function collapseMenuBootstrap() {
		// Collapsable menu support
		$('.collapsable').addClass('collapsed');

		$('.collapsable dt').click(function() {
			collapseMenuToggle($(this));
		});
	}
	function collapseMenuToggle(el) {
		if (el.parent().hasClass('collapsed')) {
			el.parent().removeClass('collapsed');
		} else {
			el.parent().addClass('collapsed');
		}
	}
})(jQuery, Drupal, this, this.document);