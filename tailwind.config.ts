import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#070A0F",
          secondary: "#0C1018",
          card: "#0F1520",
          "card-hover": "#141C2A",
          "card-active": "#172035",
        },
        blue: {
          primary: "#2D6BFF",
          glow: "#1A4BD6",
          dim: "#1A3B8A",
          faint: "#0E2260",
        },
        cyan: {
          primary: "#3EC9F5",
          dim: "#1E8FAF",
        },
        text: {
          primary: "#E8F1FF",
          secondary: "#7FA3D4",
          muted: "#4A6A9B",
          ghost: "#2A4A72",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-ibm-plex-sans)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 12px rgba(45, 107, 255, 0.3)" },
          "50%": { boxShadow: "0 0 24px rgba(45, 107, 255, 0.6)" },
        },
        "dot-bounce": {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%": { transform: "translateY(-6px)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "dot-1": "dot-bounce 1.4s ease-in-out infinite 0s",
        "dot-2": "dot-bounce 1.4s ease-in-out infinite 0.2s",
        "dot-3": "dot-bounce 1.4s ease-in-out infinite 0.4s",
        shimmer: "shimmer 2s linear infinite",
      },
      boxShadow: {
        "glow-blue": "0 0 20px rgba(45, 107, 255, 0.4)",
        "glow-blue-sm": "0 0 10px rgba(45, 107, 255, 0.25)",
        "glow-cyan": "0 0 20px rgba(62, 201, 245, 0.4)",
        "glow-cyan-sm": "0 0 10px rgba(62, 201, 245, 0.25)",
        card: "0 1px 3px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)",
      },
    },
  },
  plugins: [],
};

export default config;
