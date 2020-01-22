<template>
  <div v-if="isInfoSet">
    <h1>Available languages</h1>
    <div v-for="lang in info.langs" :key="lang.subID">
      <input
        :id="lang.subID"
        type="checkbox"
        :value="lang"
        v-model="selected"
        @change="fillToDownload(selected)"
      />
      <label :for="lang.subID">{{lang.lang}}</label>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'languages',
  data() {
    return {
      selected: [],
    }
  },
  computed: {
    ...mapState(['info']),
    ...mapGetters(['isInfoSet']),
  },
  methods: mapActions(['fillToDownload']),
}
</script>
