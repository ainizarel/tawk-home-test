<template>
	<div class="main-layout">
		<!-- Header and Search Bar Layout -->
		<div class="header-search-layout">
			<!-- Header -->
			<tawk-header></tawk-header>

			<!-- Category Search -->
			<category-search @search-input="handleSearch"></category-search>
		</div>

		<!-- Category List Layout -->
		<div class="content-layout">
			<!-- Category List -->
			<div class="category-list">
				<div 
					v-for="category in filteredCategories" 
					:key="category.id" 
					class="category-item"
                     @click="goToCategory(category.id)"
				>
					  <!-- Category Icon with custom class -->
                        <font-awesome-icon 
                            :icon="getCategoryIcon(category.id)" 
                            class="custom-icon"
                        />

					<h2>{{ category.title }}</h2>
					<span class="article-count">{{ category.totalArticle }} articles</span>
					<p class="article-updated">{{ formatUpdatedOn(category.updatedOn) }}</p> 
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TawkHeader from '../components/Header.vue';
import CategorySearch from '../components/CategorySearch.vue';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
	components: {
		'tawk-header': TawkHeader,
		'category-search': CategorySearch,
		'font-awesome-icon': FontAwesomeIcon
	},
	data() {
		return {
			categories: [],  // Categories from API
			searchQuery: '',  // Search query from input
		};
	},
	computed: {
		// Filter categories by search query and enabled status, then sort by 'order'
		filteredCategories() {
			return this.categories
				.filter(category => category.enabled && 
				category.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
				.sort((a, b) => a.order - b.order);
		}
	},
	methods: {
		handleSearch(query) {
			this.searchQuery = query;
		},
		async fetchCategories() {
			try {
				const response = await axios.get('http://localhost:9000/api/categories');
				this.categories = response.data;
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		},
		formatUpdatedOn(updatedOn) {
			const updatedDate = new Date(updatedOn);
			const now = new Date();
			const timeDifference = now - updatedDate;

			const seconds = Math.floor(timeDifference / 1000);
			const minutes = Math.floor(seconds / 60);
			const hours = Math.floor(minutes / 60);
			const days = Math.floor(hours / 24);

			if (days > 0) {
				return `Last updated ${days} day${days > 1 ? 's' : ''} ago`;
			} else if (hours > 0) {
				return `Last updated ${hours} hour${hours > 1 ? 's' : ''} ago`;
			} else if (minutes > 0) {
				return `Last updated ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
			} else {
				return `Last updated ${seconds} second${seconds > 1 ? 's' : ''} ago`;
			}
		},
		// Get the correct icon based on the category ID
		getCategoryIcon(categoryId) {
			const icons = {
				'cat1': ['fas', 'play'],
				'cat2': ['far', 'comment'],
				'cat3': ['fas', 'desktop'],
				'cat4': ['fas', 'link'],
				'cat5': ['far', 'gem'],
				'cat7': ['fas', 'cart-shopping']
			};
			return icons[categoryId] || ['fas', 'question']; // Return default icon if not found
		},
        goToCategory(categoryId) {
            this.$router.push({ name: 'CategoryPage', params: { id: categoryId } });
        },
	},
	mounted() {
		this.fetchCategories();
	}
}
</script>

<style lang="scss" scoped>
	@import '../scss/_variables.scss';
.main-layout {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.header-search-layout {
	width: 100%;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.content-layout {
	width: 100%;
	padding-top: 150px;
	display: flex;
	flex-direction: column;
	align-items: center;
    background-color: #fafafa;
    min-height: 500px;
    font-family: $font-family;
	color: $text-black;
}

.category-list {
	width: 100%;
	display: grid;
	max-width: 1200px;
	grid-template-columns: repeat(3, 1fr); /* 3 items per row */
    grid-gap: 20px; /* Space between the grid items */
    padding: 20px;

  /* Media query for small screens (e.g., mobile phones) */
    @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 items per row on smaller screens */
  }

  /* Media query for extra small screens (e.g., phones in portrait mode) */
    @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 item per row on very small screens */
  }
}

.category-item {
	background-color: #f9f9f9;
	padding: 15px;
	border-radius: 8px;
	box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column; /* Stack items vertically */
    align-items: center; /* Horizontally center items */
    text-align: center; /* Center text */
    width: 90%;
}

/* Hover effect for category items */
.category-item:hover {
  background-color: #d6e2d4; /* Change background color on hover */
  transform: scale(1.05); /* Slightly scale up the item */
  cursor: pointer; /* Change cursor to pointer */
}

/* Optional: Add hover effect for the icon as well */
.category-item:hover .custom-icon {
  color: darkgreen; /* Darken the icon color on hover */
  text-shadow: 3px 3px 7px rgba(0, 0, 0, 0.4); /* Adjust the shadow on hover */
}


.article-count {
	color: #19bd1f; 
}

.article-updated {
	font-size: 12px;
	color: #9da89d; 
}

.custom-icon {
  font-size: 3em;

  /* Make icon green */
  color: green;
}

</style>
