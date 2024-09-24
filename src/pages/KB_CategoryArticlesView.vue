<template>
    <div class="main-layout">
        <!-- Header and Search Bar Layout -->
        <div class="header-search-layout">
            <!-- Header -->
            <tawk-header></tawk-header>

            <!-- Category Search -->
            <category-search ></category-search>
        </div>

        <!-- Main Content Layout -->
        <div class="content-layout">
            <!-- Selected Category Details -->

                <div class="content-layout-category-selected-details"> 
                    <div 
                        v-for="category in categories.filter(cat => cat.id === this.id)" 
                        :key="category.id">

                        <!-- Breadcrumb Navigation -->
                        <nav class="breadcrumb">
                            <span @click="goToHomePage" class="breadcrumb-link">All Categories</span>
                            <span> > </span>
                            <span class="current-category">{{ category.title }}</span>
                        </nav>

                        <!-- Display the selected category title and articles -->
                        <div class="category-item">
                            <span class="article-count">{{ category.totalArticle }} articles</span><br></br>
                            <font-awesome-icon :icon="getCategoryIcon(category.id)" class="custom-icon" />
                            <h2>{{ category.title }}</h2>
                            <p class="article-updated">updated {{ formatUpdatedOn(category.updatedOn) }}</p>                   
                            <div class="article-description">
                                <div class="icon-container">
                                    <!-- Centered info circle icon with green color -->
                                    <font-awesome-icon :icon="['fas', 'circle-info']" style="color: green;" size="2x" />
                                </div>
                            <span>{{ category.description }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Articles List Details -->
        <div class="content-layout-articles-list"> 
            <!-- Display the selected category title and articles -->
            <h1>{{ categoryTitle }}</h1>
            <div v-if="articles.length">
            <div v-for="article in articles" :key="article.id" class="article-card" @click="openModal(article)">
            <div class="article-header">
                <font-awesome-icon :icon="['fas', 'file-lines']" class="article-icon"/>
                <div class="article-header-content">
                <h2 class="article-title">{{ article.title }}</h2>
                <p class="updated-date">Updated on: {{ formatDate(article.updatedOn) }}</p>
                </div>
            </div>
            <div class="article-content">
                <!-- You can add more article content here -->
            </div>
            </div>
        </div>
            <p v-else>No articles available for this category.</p>
        </div>

            <!-- Modal Dialog -->
            <div v-if="isModalOpen" class="modal">
                <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                
                <!-- Title -->
                <h2 class="modal-title">{{ selectedArticle.title }}</h2>

                <!-- Author -->
                <p class="modal-author">Author: {{ authorName || 'Loading...' }}</p>

                <!-- Article Content -->
                <div class="modal-body">{{ selectedArticle.content }}</div>
                </div>
            </div>

        </div>
        
        <!-- Bottom Content Layout with Scrollable Categories -->
        <div class="content-layout-bottom">
            <div id="content-text">
                <h3>Other Categories</h3>
            </div>

            <!-- Scroll Arrow Left -kiv-->
       
            <!-- Category List (Scrollable) -->
            <div class="content-layout-others">
                <div v-for="category in categories" :key="category.id" class="category-item" @click="goToCategory(category.id)">
                    <font-awesome-icon :icon="getCategoryIcon(category.id)" class="custom-icon" />
                    <h2>{{ category.title }}</h2>
                    <span class="article-count">{{ category.totalArticle }} articles</span>
                    <p class="article-updated">{{ formatUpdatedOn(category.updatedOn) }}</p>
                </div>

            </div>

            <!-- Scroll Arrow Right -kiv -->

        </div>
        
    </div>
</template>


<script>
import axios from 'axios';
import TawkHeader from '../components/Header.vue';
import CategorySearch from '../components/CategorySearch.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


export default {
    
    components: {
        'tawk-header': TawkHeader,
        'category-search': CategorySearch,
        'font-awesome-icon': FontAwesomeIcon
    },
    props: {
    id: {
        type: String,
        required: true
    }
},
    data() {
        return {
            isModalOpen: false,
            categories: [],
            categoryTitle: '',
            articles: [],
            authorName: '', // Add this line to define authorName
            selectedArticle: {} // Ensure selectedArticle is defined
             
        };
    },
    created() {
        this.fetchCategories(); 
        this.fetchCategoryArticles(); 
    },

    methods: {
        goToHomePage() {
            this.$router.push({ name: 'Home' }); // Assuming 'HomePage' is the route name for your homepage
        },
        async fetchCategoryArticles() {
            try {
                const response = await axios.get(`http://localhost:9000/api/category/${this.id}`);
                this.categoryTitle = response.title;
                this.articles = response.data
                    ? Array.isArray(response.data) 
                        ? response.data.filter(article => article.status === 'published') 
                        : [response.data]
                    : [];
            } catch (error) {
                console.error('Error fetching category articles:', error);
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },

        async fetchCategories() {
            try {
                const response = await axios.get('http://localhost:9000/api/categories');
                
                // Filter categories to include only those where enabled is true
                this.categories = response.data.filter(category => category.enabled === true);
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
                return `${days} day${days > 1 ? 's' : ''} ago`;
            } else if (hours > 0) {
                return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            } else if (minutes > 0) {
                return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else {
                return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
            }
        },
        // Scroll the category list to the left
        scrollLeft() {
            const container = this.$el.querySelector('.content-layout-others');
            container.scrollBy({ left: -300, behavior: 'smooth' });
        },
        // Scroll the category list to the right
        scrollRight() {
            const container = this.$el.querySelector('.content-layout-others');
            container.scrollBy({ left: 300, behavior: 'smooth' });
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
        // Get the correct icon based on the articles ID
        getArticlesIcon(articlesId) {
            const icons = {
                'article1': ['fas', 'play'],
                'cat2': ['far', 'comment'],
                'cat3': ['fas', 'desktop'],
                'cat4': ['fas', 'link'],
                'cat5': ['far', 'gem'],
                'cat7': ['fas', 'cart-shopping']
            };
            return icons[articlesId] || ['fas', 'question']; // Return default icon if not found
        },
        goToCategory(categoryId) {
            this.$router.push({ name: 'CategoryPage', params: { id: categoryId } });
        },
             async fetchAuthor(authorId) {
      try {
        const response = await fetch(`http://localhost:9000/api/author/${authorId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const authorData = await response.json();
        this.authorName = authorData.name; // Set the author name
      } catch (error) {
        console.error('Error fetching author:', error);
        this.authorName = 'Unknown Author'; // Fallback in case of an error
      }
    },
    openModal(article) {
      this.selectedArticle = article;
      this.fetchAuthor(article.authorId); // Fetch author data when opening the modal
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedArticle = null;
      this.authorName = ''; // Reset author name on modal close
    },
    },
    mounted() {
        this.fetchCategories();
    },
};
</script>


<style lang="scss" scoped>
	@import '../scss/_variables.scss';

.breadcrumb{
padding:1rem;
color:#688073;
}

.breadcrumb-link {
    padding: 1rem;
    color: green; /* Default color */
    transition: color 0.3s ease, font-weight 0.3s ease; /* Smooth transition */
}

.breadcrumb-link:hover {
    color: #688073; /* Change color to match breadcrumb on hover */
    font-weight: bold; /* Increase font weight on hover */
    cursor: pointer;
}

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
	flex-direction: row;
	align-items: center;
    background-color: #fafafa;
    min-height: 500px;
    font-family: $font-family;
	color: $text-black;
    border-bottom: 1px solid #ccc; 
}

/* Media Query for Mobile View */
@media (max-width: 768px) { /* Adjust the max-width as needed */
    .content-layout {
        /* Remove flex display on mobile */
        flex-direction: column; /* You can change to 'column' or any layout you want */
        align-items: flex-start; /* Align items to the start */
        padding-top: 20px; /* Optional: Adjust padding for mobile */
    }
}

.content-layout-bottom {
	width: 100%;
	display: flex;
    flex-direction: column;
	align-items: center;
    background-color: #fafafa;
    min-height: 500px;
    font-family: $font-family;
	color: $text-black;
    border-bottom: 1px solid #ccc; 
}
.content-layout-category-selected-details {
    flex: 1; /* 1/3 of the width */
    max-width: 33.33%; /*1/3*/
    padding: 20px; /* Optional padding */
}
.content-layout-articles-list {
    flex: 2; /* 2/3 of the width */
    max-width: 66.67%;
    padding: 20px; /* Optional padding */
}
.content-layout-others {
    display: flex;
    gap: 20px;
    padding: 20px;
    overflow-x: scroll;  /* Enable horizontal scrolling */
    scroll-behavior: smooth;
    position: relative;
    width: 900px; /* Set width */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}

/* For WebKit browsers (Chrome, Safari, etc.) */
.content-layout-others::-webkit-scrollbar {
    display: none;
}

/* Modal styles */
.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  height: 100%;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 70%;
  margin:20px;
}

.close {
  float: right;
  font-size: 1.5em;
  cursor: pointer;
}

/* Custom styles for modal content */
.modal-title {
  font-size: 2em;
  margin-bottom: 10px;
  color: #333;
}

.modal-author {
  font-size: 1em;
  font-style: italic;
  margin-bottom: 15px;
  color: #666;
}

.modal-body {
  font-size: 1.2em;
  color: #444;
  line-height: 1.6;
  overflow: auto;
  max-height: 600px;
}

.article-card {
    display: flex;
    flex-direction: column; /* Arrange items vertically */
    padding: 14px; /* Padding around the card content */
    margin: 10px; /* Margin between cards */
    border: 1px solid #ccc; /* Border around the card */
    border-radius: 8px; /* Rounded corners */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transitions for hover effects */
    background-color: #fff; /* Background color for the card */
    
    &:hover {
        transform: translateY(-5px); /* Slight lift on hover */
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow on hover */
        cursor: pointer; /* Pointer cursor on hover */
    }
}

.article-header {
    display: flex;
    align-items: center; /* Vertically center items */
}

.article-icon {
    margin-right: 10px; 
    color: #82a685;
    font-size: 2em; 
    padding: 20px;
}

.article-title {
    margin: 0; /* Remove default margin */
}

.updated-date {
    color: #888; /* Color for updated date */
    font-size: 0.9em; /* Font size for the updated date */
}
.article-title {
    transition: color 0.3s ease; /* Smooth color transition */
}

.article-title:hover {
    color: #19bd1f; /* Change color on hover */
    cursor: pointer; /* Change cursor to pointer on hover */
}

/* Optionally change the icon color on hover */
.article-title:hover .article-icon {
    color: #f39c12; /* Change icon color on hover */
}

.category-item {
    min-width: 250px;
    background-color: #f9f9f9;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);
    text-align: center;
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


.scroll-arrow-left, .scroll-arrow-right {
    font-size: 24px;
    cursor: pointer;
    margin: 0 10px;
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
}


.scroll-arrow-left {
    left: 10px;
}

.scroll-arrow-right {
    right: 10px;
}

/* Optional Hover Effects */
.scroll-arrow-left:hover, .scroll-arrow-right:hover {
    color: darkgreen;
}

.article-description{
	color: #7e887e; 
    padding:5px;
    border-top: groove;
    font-size: 14px;
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

.icon-container {
  display: flex;
  justify-content: center;  /* Center horizontally */
  align-items: center;      /* Center vertically */
  height: 7vh;            /* Adjust height as needed */
}


	#content-text{
		text-align: center;
		font-family: $font-family;
		color: $text-black;
		padding: 50px;

		h3{
			font-style: normal;
			font-weight: normal;
			font-size: 20px;
			line-height: 24px;
		}
	}
</style>
