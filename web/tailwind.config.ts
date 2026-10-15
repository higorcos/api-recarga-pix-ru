import type { Config } from "tailwindcss";
// import taiFrom from '@tailwindcss/forms'
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "icone-default": "#FFFF",
        "default-title": "#DEDEDE",
        "default-txt-color": "#DEDEDE",
        "default-txt-color-hover": "#C3C3CA",
        "default-button": "#FFFF",
        "default-color-background": "#202024",
        "color-input-focus": "#BE9063",
        "color-ternaria": "#BE9063",
        "color-segundaria": "#FFFFF",
        "color-c1-loading": "#FFFFF",
        "color-c2-loading": "#BE9063",
        "color-andamento": "#B3B707",
        "color-finalizado": "#078440",
        "color-pendente": "#840707",
      }
      
    },
  },
  plugins: [

    // taiFrom
    // require('@tailwindcss/forms'),

  ],
};
export default config;
   