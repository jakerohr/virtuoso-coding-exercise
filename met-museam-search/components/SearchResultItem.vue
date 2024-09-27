<template>
  <a :href="item.objectURL" target="_blank" class="search-result-item">
    <div v-if="renderItem">
      <div class="search-result-item__card">
        <div class="search-result-item__image">
          <img v-if="item.primaryImageSmall" v-bind="imageProps" data-testid="item-image" />
          <div v-else class="image-placeholder" data-testid="item-image">Not Available</div>
        </div>
        <div class="search-result-item__details">
          <h2 class="search-result-item__title" data-testid="item-title">{{ item.title || 'Not Available' }}</h2>
          <p class="search-result-item__date" data-testid="item-date"><strong>Date:</strong> {{ item.objectDate || 'Not Available' }}</p>
          <p class="search-result-item__department" data-testid="item-department"><strong>Department:</strong> {{ item.department || 'Not Available' }}</p>
          <p class="search-result-item__artist-role" data-testid="item-artist-role"><strong>Artist Role:</strong> {{ item.artistRole || 'Not Available' }}</p>
          <p class="search-result-item__artist-name" data-testid="item-artist-name"><strong>Artist Name:</strong> {{ item.artistDisplayName || 'Not Available' }}</p>
          <p class="search-result-item__artist-nationality" data-testid="item-artist-nationality"><strong>Artist Nationality:</strong> {{ item.artistNationality || 'Not Available' }}</p>
          <div class="search-result-item__tags" data-testid="item-tags">
            <strong>Tags:</strong> <span v-for="tag in itemTags" :key="`tag-${tag}`" class="search-result-item__tag">{{ tag.term }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Not Available</p>
    </div>
  </a>
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
    },
    defaultImage() {
      return 'https://via.placeholder.com/150';
    },
    imageProps() {
      return {
        src: this.item.primaryImageSmall || this.defaultImage,
        alt: this.item.title || 'Default Image',
      };
    }
  }
}
</script>

<style scoped>
.search-result-item {
  text-decoration: none;
  color: inherit;
}

.search-result-item__card {
  border: 1px solid #ccc;
  padding: 1em;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  height: 400px; 
  overflow: hidden;
}

.search-result-item__card:hover {
  transform: translateY(-5px);
}

.search-result-item__image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  border-radius: 8px;
}

.search-result-item__image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: top;
  border-radius: 8px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  background-color: #e0e0e0;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 8px;
}

.search-result-item__details {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.search-result-item__title {
  margin: 0.5em 0;
  font-size: 1.2em;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-result-item__date,
.search-result-item__department,
.search-result-item__artist-role,
.search-result-item__artist-name,
.search-result-item__artist-nationality {
  margin: 0.3em 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-result-item__tags {
  margin-top: 0.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-result-item__tag {
  display: inline-block;
  background-color: #e0e0e0;
  border-radius: 12px;
  padding: 0.2em 0.6em;
  margin: 0 0.2em;
}
</style>
