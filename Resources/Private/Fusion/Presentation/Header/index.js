import Alpine from 'alpinejs';

Alpine.data('header', (homeUri) => ({
    mobileMenuOpen: false,
    showShadow: false,
    desktopView: true,
    enableCollapse: false,
    isCurrentPage(path) {
        const currentPath = window.location.pathname;
        // If we are on the homepage, we need to check if the current path is the homepage
        if (path === homeUri) {
            return currentPath === homeUri;
        }
        // Otherwise we check if the current path starts with the path
        return currentPath.startsWith(path);
    },
    onResize() {
        this.mobileMenuOpen = false;

        this.$nextTick(() => {
            // Check if the mobile menu button is hidden
            this.desktopView = !this.$refs.mobileMenuButton.offsetParent;
            const height = this.$root.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${height}px`);
            this.enableCollapse = !this.desktopView;
        });
    },
    onScroll() {
        this.showShadow = this.desktopView && !!window.pageYOffset;
    },
    init() {
        this.onResize();
        this.onScroll();
    },
    header: {
        // You could also write @resize.window.passive.throttle
        'x-on:resize.window.passive.throttle'() {
            this.onResize();
        },
        'x-on:resize.window.passive.debounce'() {
            this.onResize();
        },
        'x-on:scroll.window.passive.throttle'() {
            this.onScroll();
        },
        'x-on:scroll.window.passive.debounce'() {
            this.onScroll();
        },
        ':class'() {
            return this.showShadow && 'shadow-lg';
        },
        'x-on:keydown.window.escape'() {
            this.mobileMenuOpen = false;
        },
        'x-trap.noscroll.inert'() {
            return this.mobileMenuOpen;
        },
        'x-on:click.outside'() {
            this.mobileMenuOpen = false;
        },
    },
}));

Alpine.data('language', () => ({
    open: false,
    current: document.documentElement.lang?.replace('-', '_'),
    getLink(language) {
        return document.querySelector(`link[rel="alternate"][hreflang="${language.replace('_', '-')}"]`)?.href;
    },
}));
