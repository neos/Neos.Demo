(function($) {
	// Calculate fixed tabs width
	$.fn.calculateTabsWidth = function() {

	$(this).each(function() {

		var o = $(this);
		var list = $(o).find('li');
		var oWidth = o.outerWidth(true);

		o.parent().width(oWidth); // fix for FF4 :)

		var tabsNo = $(list).length;
		tabsNo = (tabsNo == 0) ? 1 : tabsNo;

		var tabsWidth = 0, addWidth = 0, mod = 0, counter = 0;

		$(list).each(function() {
			tabsWidth += $(this).outerWidth(true);
		});

		mod = (oWidth - tabsWidth) % tabsNo;
		addWidth = (oWidth - mod - tabsWidth) / tabsNo;

		$(list).each(function() {

			newWidth = (counter < mod) ? $(this).width() + addWidth + 1 : $(this).width() + addWidth;

			$(this).css({'width': newWidth});
			$(this).find('a').css({'width': newWidth-1}); // for IE7 fix

			counter++;
		});

	});

	}

})(jQuery);

$(document).ready(function(){
	$('body').removeClass('js-off');

	$(".tabs:not(.js-off):not(.search-result)").tabs("> .tab-panes > div", {tabs: 'li', current: 'act', initialIndex: 0});

	// Home page Main Scroller/ Tabs
	if ($('#top-slider').length > 0) {
		$('#top-slider .slider-nav').tabs('#top-slider .slides > .slide', {tabs: 'li', current: 'active', effect: 'fade', fadeInSpeed: 1000, fadeOutSpeed: 1000, rotate: true}).slideshow({autoplay:true,interval:8000});
	}

	$('.lightbox').colorbox();
	// END Home page Main Scroller/ Tabs

	$('.vimeoBadge a').live('click', function() {
		$(this).attr('target', '_blank');
	});

});