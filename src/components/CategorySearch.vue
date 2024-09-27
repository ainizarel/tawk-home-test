<template>
  <!-- Search Input Field with Icon Button -->
  <div class="search-container">
    <label for="search-input" class="sr-only">Search for answers</label>
    <input 
      id="search-input"
      type="text" 
      v-model="searchQuery" 
      @keydown.enter.prevent="performSearch" 
      placeholder="Search for answers..." 
      class="search-input" 
      aria-label="Search for answers"
    />
    <button 
      @click="performSearch" 
      class="search-button" 
      :disabled="!searchQuery.trim()"
      aria-label="Search"
    >
      <i class="fa fa-search"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '' // Bind this to a parent component or use for emitting
    };
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim()) {
        this.$emit('search', this.searchQuery.trim());
      }
    },
  },
  watch: {
    // Watch the searchQuery and emit changes
    searchQuery(newValue) {
      this.emitSearchQuery();
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  display: flex; /* Align input and button horizontally */
  width: 57%;
  height: 60px;
  padding: 20px;
  opacity: 1;
}

.search-input {
  flex: 1; /* Allow input to take full available width */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px; /* Rounded corners for left side */
  font-size: 16px;
  box-sizing: border-box;
}

.search-button {
  background-color: #03a84e; /* Button background color */
  color: white; /* Icon color */
  width: 15%;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 0 4px 4px 0; /* Rounded corners for right side */
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Disable button style */
  &:disabled {
    background-color: #ccc; /* Grey background when disabled */
    cursor: not-allowed; /* Change cursor to indicate disabled */
  }
}

.search-button i {
  font-size: 18px; /* Adjust icon size */
}
</style>
