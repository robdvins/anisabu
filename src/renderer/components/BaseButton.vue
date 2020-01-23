<template>
  <button
    v-on="$listeners"
    v-bind="$attrs"
    class="flex items-center justify-center py-2 px-3 text-xs text-gray-800 rounded cursor-default bg-gray-300 hover:bg-gray-400 focus:outline-none"
  >
    <slot />
  </button>
</template>
