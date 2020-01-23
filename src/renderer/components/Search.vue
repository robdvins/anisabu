<template>
  <div class="flex flex-col justify-center h-20">
    <div class="flex items-center w-full">
      <input
        type="text"
        v-model="url"
        placeholder="https://www.crunchyroll.com/one-piece/episode-918-its-on-the-special-operation-to-bring-down-kaido-793016"
        class="mr-3 py-2 px-3 h-8 flex-grow text-xs text-gray-600 border rounded focus:outline-none focus:border-gray-500"
      />
      <BaseButton @click="search" :disabled="isDownloading || isSearching" class="w-16 h-8">
        <svg v-if="isSearching" viewBox="25 25 50 50" class="loader w-4 h-4">
          <circle cx="50" cy="50" r="20" />
        </svg>
        <span v-if="!isSearching">Search</span>
      </BaseButton>
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
