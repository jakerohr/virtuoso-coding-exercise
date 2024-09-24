<template>
  <div>
    <div v-if="fetchError">
      <p>Error loading data: {{ fetchError }}</p>
    </div>
    <div v-else-if="items.length">
      <SearchResultItem v-for="item in items" :key="item.objectID" :item="item" />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  components: {
  },
  data() {
    return {
      items: [],
      fetchError: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      console.log('fetchData');
    },
  },
};
</script>

<style scoped>
/* Add page styles here */
</style>