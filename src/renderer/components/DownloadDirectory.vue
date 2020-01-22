<template>
  <div>
    <p>{{downloadDir}}</p>
    <BaseButton @click="openDir">Change</BaseButton>
  </div>
</template>

<script>
import { remote } from 'electron'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'download-dir',
  computed: mapState(['downloadDir']),
  methods: {
    ...mapActions(['changeDownloadDir']),
    openDir() {
      remote.dialog
        .showOpenDialog({ properties: ['openDirectory'] })
        .then(result => {
          this.changeDownloadDir(result.filePaths[0])
        })
        .catch(err => alert(err))
    },
  },
  created() {
    this.$store.dispatch('initializeDownloadDir')
  },
}
</script>
