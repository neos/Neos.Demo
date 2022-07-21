import Alpine from 'alpinejs';

Alpine.data('header', () => ({
    mobileMenuOpen: false,
    showShadow: false,
    desktopView: true,
    enableCollapse: false,
    isCurrentPage(path) {
        return window.location.pathname.startsWith(path);
    },
    onResize() {
        this.mobileMenuOpen = false;
        // Check if the mobile menu button is hidden
        this.desktopView = !this.$refs.mobileMenuButton.offsetParent;
        this.$nextTick(() => {
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
        '@resize.window.passive.throttle'() {
            this.onResize();
        },
        '@resize.window.passive.debounce'() {
            this.onResize();
        },
        '@scroll.window.passive.throttle'() {
            this.onScroll();
        },
        '@scroll.window.passive.debounce'() {
            this.onScroll();
        },
        ':class'() {
            return this.showShadow && 'shadow-lg';
        },
        '@keydown.window.escape'() {
            this.mobileMenuOpen = false;
        },
        'x-trap.noscroll.inert'() {
            return this.mobileMenuOpen;
        },
        '@click.outside'() {
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
