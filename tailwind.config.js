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
                    SAND: "#B5A7A4",
                },
            },
            fontFamily: {
                sans: ["Pretendard-Regular", "sans-serif"], // default font
                Inter: ["Inter", "sans-serif"],
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
        },
    },
    plugins: [],
};
