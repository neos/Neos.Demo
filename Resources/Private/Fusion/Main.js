import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
import collapse from '@alpinejs/collapse';
import './Presentation/Section/Header';
import './Presentation/Section/Splide';

Alpine.plugin(focus);
Alpine.plugin(collapse);

// We use this to enable the AlpineJS debugger in the browser.
if (document.documentElement.classList.contains('development')) {
    window.Alpine = Alpine;
}

Alpine.start();
