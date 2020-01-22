<template>
  <div>
    <input
      type="text"
      v-model="url"
      placeholder="https://www.crunchyroll.com/one-piece/episode-918-its-on-the-special-operation-to-bring-down-kaido-793016"
    />
    <BaseButton @click="fetchInfo(episodeID)">Search</BaseButton>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'search',
  data() {
    return {
      url: '',
    }
  },
  computed: {
    episodeID() {
      return this.url.match(/[0-9]+$/)[0]
    },
  },
  methods: mapActions(['fetchInfo']),
}
</script>
