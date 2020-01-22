<template>
  <div>
    <BaseButton @click="download" :disabled="!isToDownloadSet || isDownloading">Download</BaseButton>
    <p v-if="show">{{msg}}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { ipcRenderer } from 'electron'

export default {
  name: 'save-subtitle',
  data() {
    return {
      msg: 'Downloading subtitles...',
      show: false,
    }
  },
  computed: {
    ...mapState(['info', 'toDownload', 'downloadDir', 'isDownloading']),
    ...mapGetters(['isToDownloadSet']),
  },
  methods: {
    ...mapActions(['changeIsDownloading']),
    async download() {
      this.changeIsDownloading(true)
      this.show = true

      for (const sub of this.toDownload) {
        let filename = `${this.info.animeTitle} - ${this.info.episodeNumber} [${sub.lang}]`
        filename = filename.replace(/:/g, '')

        const savePath = this.downloadDir + '/' + filename

        await ipcRenderer.invoke('save-sub', { subID: sub.subID, savePath })
      }

      this.changeIsDownloading(false)
    },
  },
}
</script>
