
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

;(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
				},o.delay);	
			},
			getMenu = function($menu){
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;
			
			$('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
				if (o.autoArrows) addArrow( $('>a:first-child',this) );
			})
			.not('.'+c.bcClass)
				.hideSuperfishUl();
			
			var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
			});
			o.onInit.call(this);
			
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function(){
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
			this.toggleClass(sf.c.shadowClass+'-off');
		};
	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator',
		shadowClass : 'sf-shadow'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		speed		: 'normal',
		autoArrows	: true,
		dropShadows : true,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility','hidden');
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				sh = sf.c.shadowClass+'-off',
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility','visible');
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});

})(jQuery);
;

/*
 * Supersubs v0.2b - jQuery plugin
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */

;(function($){ // $ will refer to jQuery within this closure

	$.fn.supersubs = function(options){
		var opts = $.extend({}, $.fn.supersubs.defaults, options);
		// return original object to support chaining
		return this.each(function() {
			// cache selections
			var $$ = $(this);
			// support metadata
			var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
			// get the font size of menu.
			// .css('fontSize') returns various results cross-browser, so measure an em dash instead
			var fontsize = $('<li id="menu-fontsize">&#8212;</li>').css({
				'padding' : 0,
				'position' : 'absolute',
				'top' : '-999em',
				'width' : 'auto'
			}).appendTo($$).width(); //clientWidth is faster, but was incorrect here
			// remove em dash
			$('#menu-fontsize').remove();
			// cache all ul elements
			$ULs = $$.find('ul');
			// loop through each ul in menu
			$ULs.each(function(i) {	
				// cache this ul
				var $ul = $ULs.eq(i);
				// get all (li) children of this ul
				var $LIs = $ul.children();
				// get all anchor grand-children
				var $As = $LIs.children('a');
				// force content to one line and save current float property
				var liFloat = $LIs.css('white-space','nowrap').css('float');
				// remove width restrictions and floats so elements remain vertically stacked
				var emWidth = $ul.add($LIs).add($As).css({
					'float' : 'none',
					'width'	: 'auto'
				})
				// this ul will now be shrink-wrapped to longest li due to position:absolute
				// so save its width as ems. Clientwidth is 2 times faster than .width() - thanks Dan Switzer
				.end().end()[0].clientWidth / fontsize;
				// add more width to ensure lines don't turn over at certain sizes in various browsers
				emWidth += o.extraWidth;
				// restrict to at least minWidth and at most maxWidth
				if (emWidth > o.maxWidth)		{ emWidth = o.maxWidth; }
				else if (emWidth < o.minWidth)	{ emWidth = o.minWidth; }
				emWidth += 'em';
				// set ul to width in ems
				$ul.css('width',emWidth);
				// restore li floats to avoid IE bugs
				// set li width to full width of this ul
				// revert white-space to normal
				$LIs.css({
					'float' : liFloat,
					'width' : '100%',
					'white-space' : 'normal'
				})
				// update offset position of descendant ul to reflect new width of parent
				.each(function(){
					var $childUl = $('>ul',this);
					var offsetDirection = $childUl.css('left')!==undefined ? 'left' : 'right';
					$childUl.css(offsetDirection,emWidth);
				});
			});
			
		});
	};
	// expose defaults
	$.fn.supersubs.defaults = {
		minWidth		: 9,		// requires em unit.
		maxWidth		: 25,		// requires em unit.
		extraWidth		: 0			// extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
	};
	
})(jQuery); // plugin code ends
;
jQuery(function($){
    $(document).ready(function(){
      // superFish
       $('#main-menu ul.menu').supersubs({
       minWidth:    16, // minimum width of sub-menus in em units
       maxWidth:    40, // maximum width of sub-menus in em units
       extraWidth:  1 // extra width can ensure lines don't sometimes turn over
     })
    .superfish(); // call supersubs first, then superfish
     });
});
;
/*!
 * ContentHover jQuery plugin v0.1
 * http://www.backslash.gr/demos/contenthover-jquery-plugin/
 *
 * Copyright 2011 by Nikos Tsaganos
 * http://www.backslash.gr/
 */


/*Global variable modified in other js*/
            var initial_css = {};

(function($){  
	var methods = {
		init : function(options) {
			var defaults = {  
				data_selector: '.contenthover',	// The selector for the element that will be the content of the overlay element to show on hover 
				width: 0,			// Set to 0 to let the plugin figure it out
				height: 0,			// Set to 0 to let the plugin figure it out
				overlay_width: 0,		// The overlay element's width. Set to 0 to use the same as 'width'
				overlay_height: 0,		// The overlay element's height. Set to 0 to use the same as 'height'
				overlay_x_position: 'center',	// [center, left, right] The position of the overlay horizontally (if overlay_width is different from width)
				overlay_y_position: 'bottom',	// [center, top, bottom] The position of the overlay vertically (if overlay_width is different from width)
				overlay_background: '',		// The css background of the overlay element
				overlay_opacity: 1,		// [0-1] The opacity of the overlay element
				effect: 'fade', 		// [fade, slide, show] The effect to use
				fade_speed: 400, 		// Effect ducation for the 'fade' effect only
				slide_speed: 400, 		// Effect ducation for the 'slide' effect only
				slide_direction: 'bottom',	// [top, bottom, right, left] From which direction should the overlay apear, for the slide effect only
				zindex: 2,			// The base z-index value
				wrapper_class: 'ch_wrapper', 	// CSS class to add to the wrapper
				normal_class: 'ch_normal',  	// CSS class to add to the 'normal' element
				hover_class: 'ch_hover',  	// CSS class to add to the 'hover' element
				onshow: function(){}, 		// Callback function when the 'hover' element is shown
				onhide: function(){} 		// Callback function when the 'hover' element is hidden
			},  
			settings = $.extend({}, defaults, options);  
		  			
            
			return this.each(function(){
				var $this = $(this),
					w = '33.33vw',
                    h = '33.33vw',
					overlay_w = settings.overlay_width ? settings.overlay_width : w,
					overlay_h = settings.overlay_height ? settings.overlay_height : h,
					$data = $this.next(settings.data_selector);
					
				if ($data.length) {
					
					$data.hide();
					
					var $ch_wrapper = $('<div>').addClass('ch_element').addClass(settings.wrapper_class).insertAfter($this);
					
					var $ch_normal = $('<div>').addClass(settings.normal_class).appendTo($ch_wrapper);
					$this.clone().appendTo($ch_normal);
					$this.hide();

				    var $ch_hover = $('<div>').addClass(settings.hover_class).appendTo($ch_wrapper);
					$data.clone().show().appendTo($ch_hover);
					
					var ch_hover_css = {};
					
					if (settings.overlay_background) { 
						ch_hover_css.background = settings.overlay_background; 
					}
					if (settings.overlay_opacity<1) { 
						ch_hover_css.opacity = settings.overlay_opacity; 
					}
					
		
					if (settings.overlay_x_position=='left') { 
						ch_hover_css.left = 0;
					} else if (settings.overlay_x_position=='right') {
						ch_hover_css.left = (w-overlay_w)+'px';
					} else {
						ch_hover_css.left = (w/2 - overlay_w/2)+'px';
					}
					
					
					if (settings.overlay_y_position=='top') { 
						ch_hover_css.top = '33.33vw';
					} else if (settings.overlay_y_position=='bottom') {
                            var width = $(window).width();
                            var height = $(window).height();
                            if(width > 768){
                                width = width / 6;
                                ch_hover_css.top = width + 'px';
                            } else {
                                height = height/8;
                                ch_hover_css.top = height + 'px' };
                            }
					} else {
						ch_hover_css.top = (h/2 - overlay_h/2)+'px';
					}
					
					$ch_hover.css(ch_hover_css); 
					
					// slide effect
					if (settings.effect=='slide'){
			
						
						if (settings.slide_direction=='top') {
							initial_css = { top:('-'+overlay_h+'px') }; 
						}
						if (settings.slide_direction=='bottom') {
							var width = $(window).width();
                            var height = $(window).height();
                            if(width > 768){
                                width = width / 3;
                                width = width - 55;
                                initial_css = { top: width + 'px' };
                            } else {
                                height = height/4;
                                height = height - 55;
                                initial_css = { top: height + 'px' };
                            }
						}
						if (settings.slide_direction=='left') {
							initial_css = { left:('-'+overlay_w+'px') };
						}
						if (settings.slide_direction=='right') {
							initial_css = { left:w+'px' };
						}
									
						$ch_hover.css('z-index',settings.zindex+1).css(initial_css);
						$ch_wrapper.hover(function () {
							$ch_hover.stop(true, true).animate({ 'top': ch_hover_css.top, 'left': ch_hover_css.left }, settings.slide_speed, settings.onshow());
						}, function () {
							$ch_hover.stop(true, true).animate(initial_css, settings.slide_speed, settings.onhide());
						});
						
                        $(window).resize(function(){
                            var width = $(window).width();
                            var height = $(window).height();
                            if(width > 768){
                                width = width / 3;
                                width = width - 55;
                                initial_css = { top: width + 'px' };
                            } else {
                                height = height/4;
                                height = height - 55;
                                initial_css = { top: height + 'px' };
                            }
                            width = $(window).width();
                            height = $(window).height();
                            if(width > 768){
                                width = width / 6;
                                ch_hover_css.top = width + 'px';
                            } else {
                                height = height/8;
                                ch_hover_css.top = height + 'px' };
                            }
                            
                            $ch_hover.css('z-index',settings.zindex+1).css(initial_css);
                        });
											
					// fade effect
					} else if (settings.effect=='fade') {
						
						$ch_hover.css('z-index',settings.zindex+1).hide();
						$ch_wrapper.hover(function () {
							$ch_hover.stop(true, true).fadeIn(settings.fade_speed, settings.onshow());
						}, function () {
							$ch_hover.stop(true, true).fadeOut(settings.fade_speed, settings.onhide());
						});
					
					// just show/hide
					} else {
						$ch_hover.css('z-index',settings.zindex+1).hide();
						$ch_wrapper.hover(function () {
							$ch_hover.show(0, settings.onshow());
						}, function () {
							$ch_hover.hide(0, settings.onhide());
						});
					}
				}
			});
		},
		
		stop : function() {
			return this.each(function(){
				var $this = $(this),
					$data = $this.next('.ch_element');
					
				$this.show();
				$data.remove();
				$this.unbind('.contenthover');
			});
		},
		
		destroy : function() {
			return this.each(function(){
				$(this).show();
				$('.ch_element').remove();
				$(window).unbind('.contenthover');
			});
		}
	};
	
	$.fn.contenthover = function(method) {  
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method '+ method +' does not exist in contentHover plugin.');
		}  
	}; 
	
    
    
})(jQuery);  ;
(function($) {
    $(window).load(function(){
            $('.image > img').contenthover({
            effect:'slide',
            slide_speed:300,
            overlay_background: '#000',
            overlay_opacity: 0.8
            });
        });
    
    
})(jQuery);;
