import Vue from 'vue'
import Vuex from 'vuex'
import { ipcRenderer } from 'electron'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {},
    toDownload: [],
    isDownloading: false,
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
  },
})
