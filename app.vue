<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === "dark" ? "#111827" : "white")

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [
    { rel: "icon", href: "/favicon.ico" },
  ],
  htmlAttrs: {
    lang: "en",
  },
})
</script>

<template>
  <div>
    <ClientOnly>
      <!-- Alterado para left-8 -->
      <ColorModePicker class="top-5 left-full mr-10 z-50 sticky" />
      <template #fallback>
        <div class="top-5 left-full mr-10 z-50 sticky" />
      </template>
    </ClientOnly>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
