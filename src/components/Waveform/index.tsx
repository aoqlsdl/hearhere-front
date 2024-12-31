import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

interface WaveformProps {
    audioUrl: string;
}

const Waveform = ({ audioUrl }: WaveformProps) => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const waveSurferInstance = useRef<WaveSurfer | null>(null);

    useEffect(() => {
        if (!waveformRef.current) return;

        waveSurferInstance.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#E24848",
            progressColor: "#E24848",
            height: 60,
            barWidth: 4,
            barGap: 4,
            barRadius: 10,
        });

        waveSurferInstance.current.load(audioUrl);

        return () => {
            waveSurferInstance.current?.destroy();
        };
    }, [audioUrl]);

    return (
        <div className="bg-white drop-shadow-sm rounded-md">
            <div ref={waveformRef}></div>
        </div>
    );
};

export default Waveform;
