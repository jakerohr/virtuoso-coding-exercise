<template>
  <div class="lightbox" @click.self="closeLightbox">
    <div class="lightbox-content">
      <button @click="closeLightbox">Close</button>
      <template v-if="imageSrc">
        <img :src="imageSrc" alt="Lightbox Image">
      </template>
      <template v-else>
        <div class="image-placeholder">Not Available</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: false,
      default: null
    }
  },
  methods: {
    closeLightbox() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-content {
  position: relative;
  background: #fff;
  padding: 1em;
  border-radius: 8px;
  max-width: calc(100% - 80px);
  max-height: calc(100% - 80px);
}

.lightbox-content img {
  max-width: 100%;
  max-height: 80vh;
}

.lightbox-content button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #000;
  color: #fff;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
}

.image-placeholder {
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  background-color: #e0e0e0;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 8px;
}
</style>
