import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bone: "#f3ece3",
        fog: "#d5c7b6",
        signal: "#ff4d00",
        "signal-dim": "#ff4d0033",
        hud: "#ff4d0055",
        terminal: "#00ff88",
        smoke: "#8f847a",
        void: "#0a0a0a",
        panel: "#111111",
        "panel-edge": "#1a1a1a"
      },
      fontFamily: {
        display: ['"Inter"', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        body: ['"Inter"', '"Segoe UI Variable Text"', 'sans-serif']
      },
      boxShadow: {
        "hud": "0 0 30px rgba(255, 77, 0, 0.15)",
        "hud-strong": "0 0 60px rgba(255, 77, 0, 0.25)",
        "glass-lg": "0 24px 100px rgba(0, 0, 0, 0.35)",
        "glass-xl": "0 40px 140px rgba(0, 0, 0, 0.42)"
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      keyframes: {
        "scan-in": {
          "0%": { opacity: "0", transform: "translateY(20px)", clipPath: "inset(0 0 20% 0)" },
          "100%": { opacity: "1", transform: "translateY(0)", clipPath: "inset(0 0 0 0)" }
        },
        "hud-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" }
        },
        "typewriter": {
          "0%": { width: "0" },
          "100%": { width: "100%" }
        },
        "glow-line": {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "scaleX(1)", opacity: "0.6" }
        }
      },
      animation: {
        "scan-in": "scan-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "hud-pulse": "hud-pulse 2s ease-in-out infinite",
        "glow-line": "glow-line 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards"
      }
    }
  },
  plugins: []
};

export default config;
