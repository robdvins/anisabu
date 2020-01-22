import Vue from 'vue'
import Vuex from 'vuex'
import { ipcRenderer } from 'electron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {},
    toDownload: [],
    isDownloading: false,
    downloadDir: '',
  },
  getters: {
    isInfoSet(state) {
      return Object.keys(state.info).length > 0 ? true : false
    },
    isToDownloadSet(state) {
      return state.toDownload.length > 0 ? true : false
    },
  },
  mutations: {
    SET_INFO(state, info) {
      state.info = info
    },
    SET_TO_DOWNLOAD(state, list) {
      state.toDownload = list
    },
    SET_IS_DOWNLOADING(state, flag) {
      state.isDownloading = flag
    },
    SET_DOWNLOAD_DIR(state, path) {
      state.downloadDir = path
    },
  },
  actions: {
    async fetchInfo({ commit }, episodeID) {
      const info = await ipcRenderer.invoke('subtitle-channel', episodeID)
      commit('SET_INFO', info)
    },
    fillToDownload({ commit }, list) {
      commit('SET_TO_DOWNLOAD', list)
    },
    changeIsDownloading({ commit }, flag) {
      commit('SET_IS_DOWNLOADING', flag)
    },
    initializeDownloadDir({ commit }) {
      ipcRenderer.send('download-dir')
      ipcRenderer.on('download-path', (_, path) => {
        commit('SET_DOWNLOAD_DIR', path)
      })
    },
    changeDownloadDir({ commit }, path) {
      commit('SET_DOWNLOAD_DIR', path)
    },
  },
})
