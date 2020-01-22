<template>
  <div>
    <input
      type="text"
      v-model="url"
      placeholder="https://www.crunchyroll.com/one-piece/episode-918-its-on-the-special-operation-to-bring-down-kaido-793016"
    />
    <BaseButton @click="search" :disabled="isDownloading || isSearching">Search</BaseButton>
    <div v-if="isSearching">
      <svg viewBox="25 25 50 50" class="loader">
        <circle cx="50" cy="50" r="20" />
      </svg>
      <span>Searching...</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'search',
  data() {
    return {
      url: '',
      isSearching: false,
    }
  },
  computed: {
    episodeID() {
      return this.url.match(/[0-9]+$/)[0]
    },
    ...mapState(['isDownloading']),
  },
  methods: {
    async search() {
      this.isSearching = true
      await this.$store.dispatch('fetchInfo', this.episodeID)
      this.isSearching = false
    },
  },
}
</script>
