import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
import intersect from '@alpinejs/intersect';
import collapse from '@alpinejs/collapse';
import persist from '@alpinejs/persist';
import './Presentation/Section/Header';

Alpine.plugin(focus);
Alpine.plugin(intersect);
Alpine.plugin(collapse);
Alpine.plugin(persist);

// We use this to enable the AlpineJS debugger in the browser.
if (document.documentElement.classList.contains('development')) {
    window.Alpine = Alpine;
}

Alpine.start();
