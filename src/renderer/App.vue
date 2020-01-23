<template>
  <div id="app" class="flex flex-col h-full px-4">
    <Search />
    <Details />
    <Languages />
    <div class="mt-auto pb-6">
      <DownloadDirectory />
      <SaveSubtitle />
    </div>
  </div>
</template>

<script>
import Search from '@/renderer/components/Search.vue'
import Details from '@/renderer/components/Details.vue'
import Languages from '@/renderer/components/Languages.vue'
import DownloadDirectory from '@/renderer/components/DownloadDirectory.vue'
import SaveSubtitle from '@/renderer/components/SaveSubtitle.vue'

export default {
  name: 'app',
  components: {
    Search,
    Details,
    Languages,
    DownloadDirectory,
    SaveSubtitle,
  },
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
