(function($) {
    /**
     * Check if page is scrolled and switch 'scrolling' class for top navigation.
     * In our case this adds a nice shadow effect.
     */
    let $topNavigationWrap = $('.top-navigation-wrap');
    $(window).on('scrollstart scrollend', function() {
        $topNavigationWrap.toggleClass('scrolling', $(document).scrollTop() > 0);
    });
})(jQuery);
