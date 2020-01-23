<template>
  <div v-if="isInfoSet" class="mt-5">
    <h1 class="mb-3 text-sm font-medium text-gray-900">Available languages</h1>
    <div v-for="lang in info.langs" :key="lang.subID" class="flex items-center mb-3 w-full">
      <input
        :id="lang.subID"
        type="checkbox"
        :value="lang"
        v-model="selected"
        @change="fillToDownload(selected)"
        class="form-checkbox border-gray-400 h-3 w-3"
      />
      <label :for="lang.subID" class="text-xs ml-2">{{lang.lang}}</label>
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
