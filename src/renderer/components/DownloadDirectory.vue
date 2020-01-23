<template>
  <div class="flex items-center mb-3">
    <BaseButton @click="openDir">Change</BaseButton>
    <div class="flex items-center ml-3 text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-4 h-4"
      >
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
      <span class="ml-2 text-sm">{{downloadDir}}</span>
    </div>
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
