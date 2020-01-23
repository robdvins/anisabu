<template>
  <div v-if="isInfoSet">
    <h1 class="mb-1 text-sm font-medium text-gray-900">Details</h1>
    <table class="table-fixed w-full">
      <thead>
        <tr>
          <th class="p-2 text-xs text-left text-gray-900">Anime</th>
          <th class="p-2 text-xs text-left text-gray-900">Episode name</th>
          <th class="p-2 text-xs w-16 text-gray-900">#</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border p-2 text-xs text-gray-700">{{info.animeTitle}}</td>
          <td class="border p-2 text-xs text-gray-700">{{info.episodeTitle}}</td>
          <td class="border p-2 text-xs text-center text-gray-700">{{info.episodeNumber}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'sub-details',
  computed: { ...mapState(['info']), ...mapGetters(['isInfoSet']) },
}
</script>
