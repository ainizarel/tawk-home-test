<template>
  <!-- Search Input Field with Icon Button -->
  <div class="search-container">
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Search for answers..."
      class="search-input"
    />
    <button @click="emitSearchQuery" class="search-button">
      <!-- You can use a search icon from Font Awesome or Material Icons -->
      <i class="fa fa-search"></i> <!-- Example using Font Awesome -->
      <!-- Or use Material Icons -->
      <!-- <span class="material-icons">search</span> -->
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
    emitSearchQuery() {
      // Emit the search query to parent if needed
      this.$emit('search-input', this.searchQuery);
    }
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
}

.search-button i {
  font-size: 18px; /* Adjust icon size */
}
</style>
