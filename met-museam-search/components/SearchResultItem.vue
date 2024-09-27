<template>
  <div class="search-result-item">
    <div v-if="renderItem">
      <div class="search-result-item__card">
        <div class="search-result-item__image">
          <img :src="item.primaryImageSmall" :alt="item.title" data-testid="item-image" />
        </div>
        <div class="search-result-item__details">
          <h2 class="search-result-item__title" data-testid="item-title">{{ item.title || 'Not Available' }}</h2>
          <p class="search-result-item__date" data-testid="item-date">{{ item.objectDate || 'Not Available' }}</p>
          <p class="search-result-item__department" data-testid="item-department">{{ item.department || 'Not Available' }}</p>
          <p class="search-result-item__artist-role" data-testid="item-artist-role">{{ item.artistRole || 'Not Available' }}</p>
          <p class="search-result-item__artist-name" data-testid="item-artist-name">{{ item.artistDisplayName || 'Not Available' }}</p>
          <p class="search-result-item__artist-nationality" data-testid="item-artist-nationality">{{ item.artistNationality || 'Not Available' }}</p>
          <div class="search-result-item__tags" data-testid="item-tags">
            <span v-for="tag in itemTags" :key="`tag-${tag}`" class="search-result-item__tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Not Available</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResultItem',
  props: {
    item: {
      type: Object,
      default: () => {},
      required: true,
    }
  },
  computed: {
    renderItem() {
      return this.item && Object.keys(this.item).length > 0;
    },
    itemTags() {
      return this.item.tags ? this.item.tags.slice(0, 3) : [];
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
