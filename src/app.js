// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router/index'; // Import the router

// FontAwesome setup
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlay, faDesktop, faLink, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faComment, faGem } from '@fortawesome/free-regular-svg-icons';
import { faFileLines, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

// Add FontAwesome icons to the library
library.add(faPlay, faComment, faDesktop, faLink, faGem, faCartShopping, faFileLines, faCircleInfo );

// Register FontAwesomeIcon component globally
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Create the Vue instance
new Vue({
  el: '#app',
  router, 
  render: h => h(App),
});
