<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === "dark"
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
  },
})
</script>

<template>
  <UButton
    :icon="isDark ? 'i-heroicons-moon-solid' : 'i-heroicons-sun'"
    color="gray"
    variant="solid"
    size="lg"
    aria-label="Theme"
    @click="isDark = !isDark"
  />
</template>
