<!-- SearchResultsPage.vue -->
<template>
  <div>
    <h1>Search Results for: {{ decodedQuery }}</h1>
    <ul v-if="articles.length">
      <li v-for="article in articles" :key="article.id">
        <h2>{{ article.title }}</h2>
        <p>{{ article.content }}</p>
        <small>Created On: {{ new Date(article.createdOn).toLocaleDateString() }}</small>
      </li>
    </ul>
    <p v-else>No articles found.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    decodedQuery() {
      return decodeURIComponent(this.$route.params.query);
    }
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axios.get(`http://localhost:9000/api/search/${this.decodedQuery}`);
        this.articles = response.data;
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add any styles here */
</style>
