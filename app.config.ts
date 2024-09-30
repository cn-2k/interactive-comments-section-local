// app.config.ts
export default defineAppConfig({
  ui: {
    button: {
      color: {
        base: {
          link: "text-base-moderate-blue/80 dark:text-white hover:text-base-moderate-blue dark:hover:text-gray-300 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400",
          solid: "bg-base-moderate-blue/90 text-white dark:text-white hover:bg-base-moderate-blue focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-moderate-blue dark:focus-visible:outline-base-moderate-blue disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 disabled:bg-base-moderate-blue aria-disabled:bg-base-moderate-blue dark:disabled:bg-base-moderate-blue/80 dark:aria-disabled:bg-base-moderate-blue/80",
        },
      },
    },
  },
})
