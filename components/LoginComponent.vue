<template>
  <div
    class="rounded-xl ring-1 ring-gray-200 dark:ring-gray-800 shadow max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur"
  >
    <div class="px-4 py-5 sm:p-6">
      <div class="w-full max-w-sm space-y-6">
        <div class="text-center">
          <p class="text-2xl text-gray-900 dark:text-white font-bold">
            Login
          </p>
          <div class="text-gray-500 dark:text-gray-400 mt-1">
            Use your GitHub account to sign in!
          </div>
        </div>

        <div class="flex flex-col">
          <div class="space-y-3">
            <UButton
              icon="i-mdi-github"
              size="lg"
              block
              class="rounded-full"
              color="white"
              variant="solid"
              label="Continue with Github"
              @click="login"
            />
          </div>
        </div>

        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
          By signing in, you agree to our <a
            href="/"
            class="text-primary font-medium"
          >Terms of Service</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const login = githubLogin
</script>
