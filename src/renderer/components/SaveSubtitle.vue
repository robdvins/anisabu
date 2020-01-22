<template>
  <div>
    <BaseButton @click="download">Download</BaseButton>
    <p v-if="show">{{msg}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer } from 'electron'

export default {
  name: 'save-subtitle',
  data() {
    return {
      msg: 'Downloading subtitles...',
      show: false,
    }
  },
  computed: mapState(['info', 'toDownload']),
  methods: {
    async download() {
      this.show = true
      for (const sub of this.toDownload) {
        let filename = `${this.info.animeTitle} - ${this.info.episodeNumber} [${sub.lang}]`
        filename = filename.replace(/:/g, '')

        const path = this.downloadDir + '/' + filename

        await ipcRenderer.invoke('save-subs', { subID: sub.subID, path })
      }
    },
  },
}
</script>
