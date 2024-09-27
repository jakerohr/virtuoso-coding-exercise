<template>
  <div>
    <div class="header-container">
      Total: {{ totalCount }}
    </div>
    <div class="top-departments">
      <h3>Top Departments</h3>
      <ul>
        <li v-for="department in topDepartments" :key="department">{{ department }}</li>
      </ul>
    </div>
    <div class="results-container">
      <SearchResultItem v-for="item in items" :key="item.objectID" :item="item" class="search-result-item" />
    </div>
  </div>
</template>

<script>
import SearchResultItem from './SearchResultItem.vue';

export default {
  name: 'SearchResult',
  components: {
    SearchResultItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    totalCount() {
      return this.items.length;
    },
    topDepartments() {
      const departmentCount = this.items.reduce((acc, item) => {
        acc[item.department] = (acc[item.department] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(departmentCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(entry => entry[0]);
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  font-size: 1.5em;
  margin-bottom: 1em;
}

.top-departments {
  margin-bottom: 1em;
}

.results-container {
  display: flex;
  flex-direction: column;
}
</style>