<template>
  <div class="flex items-center">
    <BaseButton
      @click="download"
      :disabled="!isToDownloadSet || isDownloading"
      class="h-8 px-0 w-20"
      :class="[{'opacity-50': !isToDownloadSet},{'hover:bg-gray-400': isToDownloadSet}]"
    >
      <svg v-if="isDownloading" viewBox="25 25 50 50" class="loader w-4 h-4">
        <circle cx="50" cy="50" r="20" />
      </svg>
      <span v-if="!isDownloading">Download</span>
    </BaseButton>
    <div v-if="isDownloaded" class="flex items-center ml-3 text-green-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-5 h-5 mr-1"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <p class="text-sm">Subtitles downloaded successfully</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { ipcRenderer } from 'electron'

export default {
  name: 'save-subtitle',
  data() {
    return {
      isDownloaded: false,
    }
  },
  computed: {
    ...mapState(['info', 'toDownload', 'downloadDir', 'isDownloading']),
    ...mapGetters(['isToDownloadSet']),
  },
  methods: {
    async download() {
      this.isDownloaded = false
      this.$store.dispatch('changeIsDownloading', true)

      for (const sub of this.toDownload) {
        let filename = `${this.info.animeTitle} - ${this.info.episodeNumber} [${sub.lang}]`
        filename = filename.replace(/:/g, '')

        const savePath = this.downloadDir + '/' + filename

        await ipcRenderer.invoke('save-sub', { subID: sub.subID, savePath })
      }

      this.$store.dispatch('changeIsDownloading', false)
      this.isDownloaded = true
    },
  },
}
</script>
