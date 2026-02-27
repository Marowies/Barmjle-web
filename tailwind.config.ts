import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "rgb(var(--primary))",
                "primary-hover": "rgb(var(--primary-hover))",
                background: "rgb(var(--background))",
                foreground: "rgb(var(--foreground))",
                card: "rgb(var(--card))",
                "card-foreground": "rgb(var(--card-foreground))",
                border: "rgb(var(--border))",
                input: "rgb(var(--input))",
                ring: "rgb(var(--ring))",
                // Keeping legacy colors for compatibility during transition
                cyan: {
                    500: "#06b6d4",
                    600: "#0891b2",
                },
                slate: {
                    900: "#0f172a",
                    950: "#020617",
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-cairo)", "sans-serif"],
            },
            boxShadow: {
                premium: "0 10px 30px -10px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
                "premium-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            },

        },
    },
    plugins: [],
};
export default config;
