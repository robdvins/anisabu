<template>
  <div v-if="isInfoSet">
    <h1>Subtitle details</h1>
    <p>Anime: {{info.animeTitle}}</p>
    <p>Episode name: {{info.episodeTitle}}</p>
    <p>Episode #: {{info.episodeNumber}}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'sub-details',
  computed: { ...mapState(['info']), ...mapGetters(['isInfoSet']) },
}
</script>
