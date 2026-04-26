import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080818",
        quantum: {
          dark: "#080818",
          purple: "#7C3AED",
          cyan: "#06B6D4",
          green: "#10B981",
          violet: "#4F46E5",
          accent: "#D946EF",
          text: {
            heading: "#F8FAFC",
            body: "#94A3B8"
          },
          // Dashboard-only palette — deep space quantum lab
          dash: {
            bg:         "#0D0D1F",
            panel:      "#12122A",
            card:       "#13132B",
            border:     "#1E1E3F",
            violet:     "#6D28D9",
            electric:   "#7C3AED",
            lavender:   "#A78BFA",
            cyan:       "#06B6D4",
            success:    "#10B981",
            warning:    "#F59E0B",
            error:      "#EF4444",
            textPri:    "#F1F5F9",
            textSec:    "#94A3B8",
          }
        }
      },
      backgroundImage: {
        'quantum-gradient': 'linear-gradient(to right bottom, #080818, #100b20)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-pattern': 'radial-gradient(circle at center, rgba(124,58,237,0.1) 0%, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glow-purple': '0 0 25px rgba(124, 58, 237, 0.5)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.5)',
        'glow-accent': '0 0 25px rgba(217, 70, 239, 0.5)',
        'card-hover': '0 10px 40px rgba(124, 58, 237, 0.2)',
        'dash-glow': '0 0 30px rgba(109, 40, 217, 0.4)',
        'dash-card': '0 4px 24px rgba(13, 13, 31, 0.8)',
        'dash-hover': '0 8px 40px rgba(109, 40, 217, 0.25)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-line': 'glow-line 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-line': {
          '0%, 100%': { opacity: "0.2" },
          '50%': { opacity: "1" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
