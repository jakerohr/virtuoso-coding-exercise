<template>
  <div class="page-container">
    <div v-if="fetchError">
      <p>Error loading data: {{ fetchError }}</p>
    </div>
    <div v-else>
      <button v-if="!loading && hasMore" @click="loadAll">Load All</button>
      <SearchResult :items="items" />
      <div v-if="loading">Loading more...</div>
      <button v-if="!loading && hasMore" @click="loadMore">Load More</button>
    </div>
  </div>
</template>

<script>
import SearchResult from '~/components/SearchResult.vue';
import { fetchObjectIds, fetchObjectDetailsByPage, fetchAllObjectDetails } from '~/api/metMuseum';

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
      allDetailsFetched: false,
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
    async loadAll() {
      try {
        console.log('Load All button clicked');
        this.loading = true;
        const allDetails = await fetchAllObjectDetails(this.objectIds);
        console.log('Fetched all details:', allDetails.length);
        this.items = allDetails;
        this.hasMore = false;
        this.allDetailsFetched = true;
      } catch (error) {
        console.error('Error fetching all details:', error);
        this.fetchError = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1em;
}
</style>