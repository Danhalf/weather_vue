import Vue from 'vue';
import App from './App.vue';
import vuetify from '@/plugins/vuetify';
import getWeather from './API/getWeather';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) =>
    h(App, {
      props: {
        weatherAPI: getWeather,
      },
    }),
}).$mount('#app');
