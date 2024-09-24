import Vue from 'vue';
import Router from 'vue-router';
import KBHomeView from '../pages/KB_HomeView.vue';
import KBCategoryArticlesView from '../pages/KB_CategoryArticlesView.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: KBHomeView, // Make sure this component exists and is imported correctly
  },
  {
    path: '/category/:id', // Dynamic route for category
    name: 'CategoryPage',
    component: KBCategoryArticlesView, // The component that will handle category articles
    props: true, // Pass route params as props
  },
  // other routes...
];

const router = new Router({
  mode: 'history', // Ensures cleaner URLs
  routes,
});

export default router;
