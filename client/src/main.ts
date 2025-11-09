import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    customWhite: '#F8F8F8', // define your color here
                },
            },
        },
    },
});

const app = createApp(App);

app.use(vuetify);

app.mount('#app');
