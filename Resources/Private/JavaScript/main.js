const topNavigationWrap = document.querySelector('.top-navigation-wrap');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 0) {
        topNavigationWrap.classList.add('scrolling');
    } else {
        topNavigationWrap.classList.remove('scrolling');
    }
});