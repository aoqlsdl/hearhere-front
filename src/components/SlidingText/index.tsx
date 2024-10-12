import { useEffect, useRef, useState } from "react";

interface Props {
    title: string;
}
const SlidingText = (title: Props) => {
    const musicTitle = title.title;
    const textRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        if (textRef.current && containerRef.current) {
            const textWidth = textRef.current.scrollWidth;
            const containerWidth = containerRef.current.clientWidth;
            setIsOverflow(textWidth > containerWidth);
        }
    }, [title]);

    return (
        <div
            ref={containerRef}
            className="max-w-[40.88rem] text-[3.25rem] text-primary-PINK font-medium leading-[4.5rem] overflow-hidden whitespace-nowrap relative w-full m-auto mt-0 mb-0"
        >
            <div
                ref={textRef}
                className={`w-full inline-block ${isOverflow ? "animate-slide" : ""}`}
            >
                {musicTitle}
                {textRef.current &&
                containerRef.current &&
                textRef.current?.scrollWidth > containerRef.current?.clientWidth ? (
                    <>&nbsp; {musicTitle}</>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default SlidingText;
