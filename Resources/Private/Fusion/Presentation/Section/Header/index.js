import Alpine from 'alpinejs';

Alpine.data('header', () => ({
    mobileMenuOpen: false,
    showShaow: false,
    desktopView: true,
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
        });
    },
    onScroll() {
        this.showShaow = this.desktopView && window.pageYOffset;
    },
    init() {
        this.onResize();
        this.onScroll();
    },
    header: {
        '@resize.window.passive.throttle'() {
            this.onResize();
        },
        '@scroll.window.passive.throttle'() {
            this.onScroll();
        },
        '@scroll.window.passive.debounce'() {
            this.onScroll();
        },
        ':class'() {
            return this.showShaow && 'shadow-lg';
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
