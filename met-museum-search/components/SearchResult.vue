<template>
  <div>
    <div class="header-container">
      <h1>Metropolitan Museum of Art Collection</h1>
      <p data-testid="total-count">Total Results: {{ filteredItems.length }} of {{ totalResults }}</p>
      <div class="top-departments">
        <h2>Top Departments</h2>
        <p>Click on a department to filter the results</p>
        <ul>
          <li v-for="department in topDepartments" :key="department" @click="filterByDepartment(department)" class="clickable">
            {{ department }}
          </li>
        </ul>
        <button v-if="selectedDepartment" @click="resetFilter">Show All</button>
      </div>
    </div>
    <div class="results-grid">
      <SearchResultItem v-for="item in filteredItems" :key="item.objectID" :item="item" />
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
    },
    totalResults: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      selectedDepartment: null,
    };
  },
  computed: {
    topDepartments() {
      const departmentCount = this.items.reduce((acc, item) => {
        acc[item.department] = (acc[item.department] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(departmentCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(entry => entry[0]);
    },
    filteredItems() {
      if (this.selectedDepartment) {
        return this.items.filter(item => item.department === this.selectedDepartment);
      }
      return this.items;
    }
  },
  methods: {
    filterByDepartment(department) {
      this.selectedDepartment = department;
    },
    resetFilter() {
      this.selectedDepartment = null;
    }
  }
}
</script>

<style scoped>
.header-container {
  font-size: 1.5em;
  margin-bottom: 1em;
}

.top-departments {
  margin-bottom: 1em;
}

.clickable {
  cursor: pointer;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1em;
}
</style>