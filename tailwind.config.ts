import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      'xl': {'max': '571'},
      'lg': {'max': '500px'},
      'md': {'max': '439px'},
      'sm': {'max': '390px'},
    }
  }
} satisfies Config;
