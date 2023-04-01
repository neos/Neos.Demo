import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
import collapse from '@alpinejs/collapse';
import './Presentation/Header';
import './Presentation/Slider';

Alpine.plugin(focus);
Alpine.plugin(collapse);

// We use this to enable the AlpineJS debugger in the browser.
if (document.documentElement.dataset.debug != undefined) {
    window.Alpine = Alpine;
}

Alpine.start();
