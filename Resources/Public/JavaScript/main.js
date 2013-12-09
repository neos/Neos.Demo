(function(scope, $) {
	var document = scope.document,
			$scope = $(scope),
			$document = $(document),
			$body = $('body'),
			$topNavigationWrap;

	function updateBodyPadding() {
		var paddingTop = $topNavigationWrap.length > 0 ? $topNavigationWrap.outerHeight() : 20;
		$body.css('paddingTop', paddingTop);
	}

	function initTopNavigationWrap() {
		$topNavigationWrap = $('.top-navigation-wrap').addClass('navbar-fixed-top');
		updateBodyPadding();
	}

	$(function() {
		var $topNavigationWrap = $('.top-navigation-wrap');

		/**
		 * Set the navbar fixed on pageload and update the body padding when the window resizes or neos refreshes the backend.
		 * This is required to move the content below the navbar when scrolled to the top.
		 */
		initTopNavigationWrap();
		$scope.on('resize.topnav', updateBodyPadding);
		document.addEventListener('Neos.PageLoaded', initTopNavigationWrap, false);

		/**
		 * Check if page is scrolled and switch 'scrolling' class for top navigation.
		 * In our case this adds a nice shadow effect.
		 */
		$scope.on('scrollstart scrollend', function() {
			$topNavigationWrap.toggleClass('scrolling', $document.scrollTop() > 0);
		});

	});
})(window, jQuery);
