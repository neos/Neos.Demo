(function(scope, $) {
	var document = scope.document,
			$scope = $(scope),
			$document = $(document),
			$body = $('body');

	$(function() {
		var $topNavigationWrap = $('.top-navigation-wrap');

		/**
		 * Set the navbar fixed and update the body padding when the window resizes.
		 * This is required to move the content below the navbar when scrolled to the top.
		 */
		$topNavigationWrap.addClass('navbar-fixed-top');
		$scope.on('resize.topnav', function() {
			$body.css('paddingTop', $topNavigationWrap.outerHeight());
		}).resize();

		/**
		 * Check if page is scrolled and switch 'scrolling' class for top navigation.
		 * In our case this adds a nice shadow effect.
		 */
		$scope.on('scrollstart scrollend', function() {
			$topNavigationWrap.toggleClass('scrolling', $document.scrollTop() > 0);
		});

	});
})(window, jQuery);
