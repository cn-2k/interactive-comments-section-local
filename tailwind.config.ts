import type { Config } from "tailwindcss"

import defaultTheme from "tailwindcss/defaultTheme"

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
export default <Partial<Config>>{
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        base: {
          "moderate-blue": "hsl(238, 40%, 52%)",
          "soft-red": "hsl(358, 79%, 66%)",
          "light-grayish-blue": "hsl(239, 57%, 85%)",
          "pale-red": "hsl(357, 100%, 86%)",
        },
        neutral: {
          "dark-blue": "hsl(212, 24%, 26%)",
          "grayish-blue": "hsl(211, 10%, 45%)",
          "light-gray": "hsl(223, 19%, 93%)",
          "very-light-gray": "hsl(228, 33%, 97%)",
          "white": "hsl(0, 0%, 100%)",
        },
      },
      screens: {
        mobile: "375px",
        desktop: "1440px",
      },
    },
  },
  plugins: [],
  content: [],
}
