<template>
  <div class="page-container">
    <div v-if="fetchError">
      <p class="error-message">Error loading data: {{ fetchError }}</p>
    </div>
    <div v-else>
      <SearchResult :items="items" />
      <div v-if="loading" class="loading-message">Loading more...</div>
      <div class="button-container">
        <button v-if="!loading && hasMore" @click="loadMore" class="primary-button">Load More</button>
        <button v-if="items.length" @click="scrollToTop" class="secondary-button">Back to Top</button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResult from '~/components/SearchResult.vue';
import { fetchObjectIds, fetchObjectDetailsByPage } from '~/api/metMuseum';

export default {
  name: 'IndexPage',
  components: {
    SearchResult,
  },
  data() {
    return {
      items: [],
      fetchError: null,
      loading: false,
      objectIds: [],
      page: 1,
      pageSize: 50,
      hasMore: true,
    };
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        const metadataDate = '2024-09-01';
        this.objectIds = await fetchObjectIds(metadataDate);
        console.log('Fetched object IDs:', this.objectIds.length);
        this.loadMore();
      } catch (error) {
        this.fetchError = error.message;
        this.loading = false;
      }
    },
    async loadMore() {
      try {
        this.loading = true;
        const batchDetails = await fetchObjectDetailsByPage(this.objectIds, this.page, this.pageSize);
        console.log('Fetched batch details:', batchDetails.length);
        this.items.push(...batchDetails);
        this.page += 1;
        if (this.items.length >= this.objectIds.length) {
          this.hasMore = false;
        }
      } catch (error) {
        this.fetchError = error.message;
      } finally {
        this.loading = false;
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
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
  color: #333; /* Dark gray for primary text */
}

.error-message {
  color: #ff4d4d; /* Red for error messages */
}

.loading-message {
  color: #1E90FF; /* DodgerBlue for loading messages */
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 1em; /* Add spacing between buttons */
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
  background-color: #1E90FF; /* DodgerBlue for primary button */
}

.primary-button:hover {
  background-color: #1C86EE; /* Slightly darker blue for hover */
}

.secondary-button {
  background-color: #6c757d; /* Gray for secondary button */
}

.secondary-button:hover {
  background-color: #5a6268; /* Slightly darker gray for hover */
}
</style>
