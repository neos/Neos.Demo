(function($) {
    $('.top-navigation-wrap').addClass('navbar-fixed-top');

    /**
     * Check if page is scrolled and switch 'scrolling' class for top navigation.
     * In our case this adds a nice shadow effect.
     */
    $(window).on('scrollstart scrollend', function() {
        $topNavigationWrap.toggleClass('scrolling', $(document).scrollTop() > 0);
    });
})(jQuery);
