<template>
  <div class="search-result-item">
    <div v-if="renderItem">
      <div class="search-result-item__card">
        <div class="search-result-item__image">
          <img :src="item.primaryImageSmall" :alt="item.title" data-testid="item-image" />
        </div>
        <div class="search-result-item__details">
          <h2 class="search-result-item__title" data-testid="item-title">{{ item.title }}</h2>
          <p class="search-result-item__date" data-testid="item-date">{{ item.objectDate }}</p>
          <p class="search-result-item__department" data-testid="item-department">{{ item.department }}</p>
          <p class="search-result-item__artist-role" data-testid="item-artist-role">{{ item.artistRole }}</p>
          <p class="search-result-item__artist-name" data-testid="item-artist-name">{{ item.artistDisplayName }}</p>
          <p class="search-result-item__artist-nationality" data-testid="item-artist-nationality">{{ item.artistNationality }}</p>
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
      required: true,
    },
  },
  computed: {
    renderItem() {
      return Object.keys(this.item).length > 0;
    },
    itemTags() {
      return this.item.tags.slice(0, 3);
    }
  },
};
</script>

<style lang="scss" scoped></style>
