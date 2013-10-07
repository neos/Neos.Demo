(function(scope, $) {
	var document = scope.document,
		location = scope.location;

	$(function() {
		/**
		 * Check if page is scrolled and switch 'scrolling' class for top navigation.
		 * In our case this adds a nice shadow effect.
		 */
		var $topNavigationWrap = $('.top-navigation-wrap');
		$(scope).on('scrollstart scrollend', function() {
			$topNavigationWrap.toggleClass('scrolling', $(document).scrollTop() > 0);
		});

	});
})(window, jQuery);