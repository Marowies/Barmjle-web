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
                primary: "#06b6d4", // Cyan-500
                secondary: "#7c3aed", // Violet-600
                dark: "#020617", // Slate-950
                light: "#f8fafc",
                "surface-dark": "#0f172a", // Slate-900
            },
            fontFamily: {
                sans: ["var(--font-cairo)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "hero-pattern": "url('/grid.svg')", // We might need to add this or use CSS pattern
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
export default config;
