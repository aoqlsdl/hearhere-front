/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    PINK: "#E24848",
                    L_BLACK: "#383838",
                    S_BLACK: "#464444",
                },
            },
            fontFamily: {
                sans: ["Pretendard-Regular", "sans-serif"], // default font
                Inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
