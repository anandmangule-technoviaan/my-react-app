/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00433d",
        "primary-container": "#005c55",
        "primary-fixed": "#a7f0e6",
        "primary-fixed-dim": "#8cd4ca",
        "on-primary": "#ffffff",
        "on-primary-container": "#8ad2c8",
        
        secondary: "#006b5f",
        "secondary-container": "#6df5e1",
        "secondary-fixed": "#71f8e4",
        "secondary-fixed-dim": "#4fdbc8",
        "on-secondary": "#ffffff",
        
        tertiary: "#622a11",
        "tertiary-container": "#7f4025",
        "tertiary-fixed": "#ffdbce",
        "tertiary-fixed-dim": "#ffb598",
        "on-tertiary": "#ffffff",
        
        background: "#f9f9ff",
        surface: "#f9f9ff",
        "surface-bright": "#f9f9ff",
        "surface-dim": "#d3daef",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f1f3ff",
        "surface-container": "#e9edff",
        "surface-container-high": "#e1e8fd",
        "surface-container-highest": "#dce2f7",
        
        "on-surface": "#141b2b",
        "on-surface-variant": "#3f4947",
        "on-background": "#141b2b",
        "outline": "#6f7977",
        "outline-variant": "#bec9c6",
        "inverse-surface": "#293040",
        "inverse-on-surface": "#edf0ff",
        
        "success-vibrant": "#10B981",
        "error-alert": "#EF4444",
        error: "#ba1a1a"
      },
      spacing: {
        "sidebar-width": "280px",
        "top-bar-height": "64px",
        "section-gap": "32px",
        "container-padding": "24px",
        gutter: "16px"
      }
    },
  },
  plugins: [],
}
