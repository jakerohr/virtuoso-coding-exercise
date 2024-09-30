<template>
  <div class="page-container">
    <!-- Display error message if fetchError is set -->
    <div v-if="fetchError">
      <p class="error-message">Error loading data: {{ fetchError }}</p>
    </div>
    <div v-else>
      <!-- Display search results and total number of results -->
      <SearchResult :items="items" :totalResults="objectIds.length" />
      <!-- Show loading message when data is being fetched -->
      <div v-if="loading" class="loading-message">Loading more...</div>
      <div class="button-container">
        <!-- Load more button, shown if not loading and more data is available -->
        <button v-if="!loading && hasMore" @click="loadMore" class="primary-button">Load More</button>
        <!-- Back to top button, shown if there are items in the list -->
        <button v-if="items.length" @click="scrollToTop" class="secondary-button">Back to Top</button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResult from '~/components/SearchResult.vue';
import { fetchObjectIds, fetchObjectDetailsByPage } from '~/api/metMuseum';

/**
 * IndexPage component
 * 
 * This component is responsible for displaying search results from the Met Museum API.
 */
export default {
  name: 'IndexPage',
  components: {
    SearchResult,
  },
  data() {
    return {
      items: [], // List of fetched items
      fetchError: null, // Error message if fetching fails
      loading: false, // Loading state
      objectIds: [], // List of object IDs to fetch
      page: 1, // Current page number for pagination
      pageSize: 50, // Number of items per page
      hasMore: true, // Flag to check if more data is available
    };
  },
  methods: {
    /**
     * Fetch initial data from the API.
     * @returns {Promise<void>}
     */
    async fetchData() {
      try {
        this.loading = true;
        const metadataDate = '2024-09-01'; // Example metadata date
        this.objectIds = await fetchObjectIds(metadataDate);
        console.log('Fetched object IDs:', this.objectIds.length);
        this.loadMore(); // Load the first batch of items
      } catch (error) {
        this.fetchError = error.message;
        this.loading = false;
      }
    },
    /**
     * Load more data for pagination.
     * @returns {Promise<void>}
     */
    async loadMore() {
      try {
        this.loading = true;
        const batchDetails = await fetchObjectDetailsByPage(this.objectIds, this.page, this.pageSize);
        console.log('Fetched batch details:', batchDetails.length);
        this.items.push(...batchDetails);
        this.page += 1;
        // Check if all items have been loaded
        if (this.items.length >= this.objectIds.length) {
          this.hasMore = false;
        }
      } catch (error) {
        this.fetchError = error.message;
      } finally {
        this.loading = false;
      }
    },
    /**
     * Scroll to the top of the page.
     */
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  /**
   * Fetch data when the component is mounted.
   */
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1em;
  font-family: 'Montserrat', sans-serif;
  color: #333;
  padding-bottom: 2em;
}

.error-message {
  color: #ff4d4d;
}

.loading-message {
  color: #1E90FF;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-top: 1em;
}

button {
  padding: 0.5em 1em;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  transition: background-color 0.3s;
}

.primary-button {
  background-color: #1E90FF;
}

.primary-button:hover {
  background-color: #1C86EE;
}

.secondary-button {
  background-color: #6c757d;
}

.secondary-button:hover {
  background-color: #5a6268;
}
</style>
