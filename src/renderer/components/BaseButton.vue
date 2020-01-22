<template>
  <button v-on="$listeners" v-bind="$attrs">
    <slot />
  </button>
</template>
