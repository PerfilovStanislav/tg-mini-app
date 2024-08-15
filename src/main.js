import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Tag from 'primevue/tag';

import PrimeVue from 'primevue/config';
import BadgeDirective from 'primevue/badgedirective';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import DataView from 'primevue/dataview';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import VueTelegram from 'vue-tg';
import eruda from 'eruda';

import '@/assets/styles.scss';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);

app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);

app.component('Button', Button);
app.component('Carousel', Carousel);
app.component('DataView', DataView);
app.component('Toast', Toast);
app.component('Tag', Tag);

let urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('debug') === '1') {
    eruda.init();
}
app.use(VueTelegram);

app.mount('#app');
