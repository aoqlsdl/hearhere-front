/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        // theme: {
        screens: {
            1440: "1441px",
        },
        // },
        extend: {
            colors: {
                primary: {
                    PINK: "#E24848",
                    PINK_LIGHT: "#FFE5E5",
                    BLACK100: "#383838",
                    BLACK200: "#464444",
                    BLACK300: "#0B0606",
                    SAND: "#B5A7A4",
                    BEIGE100: "#EEEEEE",
                    BEIGE200: "#CECECE",
                    BEIGE300: "#817674",
                    GRAY100: "#828282",
                    GRAY200: "#CFCFCF",
                    GRAY300: "#47403F",
                    GRAY400: "#ECEBEB",
                    GRAY500: "#F8F7F7",
                    GRAY600: "#E7E7E7",
                    GRAY700: "#464444",
                },
            },
            fontFamily: {
                pre: ["Pretendard"], // default
                Inter: ["Inter", "sans-serif"],
                Luxurious: ["LuxuriousScript"],
            },
            width: {
                "707px": "707px",
                "10px": "10px",
                "20px": "20px",
                "40px": "40px",
                turntable: "25.438rem",
                m_turntable: "11.25rem",
            },
            height: {
                "479px": "479px",
                "437px": "437px",
                "20px": "20px",
                "40px": "40px",
                "89px": "89px",
                turntable: "25.438rem",
                m_turntable: "11.25rem",
            },
            fontSize: {
                title: "7.5rem",
                subtitle: "1.875rem",
                point: "1.88rem",
            },
            spacing: {
                "5.938rem": "5.938rem",
                "2.938rem": "2.938rem",
                "5.313rem": "5.313rem",
            },
            keyframes: {
                slide: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            animation: {
                slide: "slide 15s linear infinite",
            },
            backgroundImage: {
                lps: "url('/assets/img/about_bg.webp')",
                lp: "url('/assets/img/loading_lp.webp')",
                lp_sm: "url('/assets/img/login_lp_sliced.webp')",
                lp_cover: "url('/assets/img/library_cover.webp')",
                tune: "url('/assets/icons/tune.svg')",
                play: "url('/assets/icons/play.svg')",
                pause: "url('/assets/icons/pause.svg')",
                forward: "url('/assets/icons/forward.svg')",
                backward: "url('/assets/icons/backward.svg')",
            },
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
